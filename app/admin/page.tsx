import type { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { GALLERY_SLOTS, type GallerySlotKey } from "@/data/gallery-slots";
import { getAdminState, redirectToLogin } from "@/lib/admin-auth";
import {
  getBusinessSettings,
  getHomepageContent,
} from "@/lib/site-settings";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type GalleryItem = {
  slot: GallerySlotKey;
  image_url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
};

export const metadata: Metadata = {
  title: "Admin Panel | Masaj Beylikduzu",
  description: "Masaj Beylikduzu galeri ve icerik yonetim paneli.",
  alternates: {
    canonical: "/admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const adminState = await getAdminState();

  if (adminState.status === "unauthenticated") {
    redirectToLogin("/admin");
    return null;
  }

  if (adminState.status === "missing_env") {
    return (
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-10">
        <h1 className="text-4xl">Admin Panel Kurulumu</h1>
        <p className="mt-4 text-[#C9C2AE]">
          Supabase ortam degiskenleri eksik. Vercel ve lokal ortama
          `NEXT_PUBLIC_SUPABASE_URL` ile `NEXT_PUBLIC_SUPABASE_ANON_KEY`
          degerlerini ekleyin.
        </p>
      </main>
    );
  }

  if (adminState.status === "unauthorized") {
    return (
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-10">
        <h1 className="text-4xl">Yetkisiz Erisim</h1>
        <p className="mt-4 text-[#C9C2AE]">
          Giris yaptiniz ancak admin rolunuz yok. Supabase `profiles`
          tablosunda kullanici rolunu `admin` olarak guncelleyin.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-[var(--amber)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
          >
            Ana Sayfaya Don
          </Link>
          <SignOutButton />
        </div>
      </main>
    );
  }

  const supabase = await createSupabaseServerClient();
  const initialBusiness = await getBusinessSettings();
  const initialHomepage = await getHomepageContent();
  const items: GalleryItem[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("gallery_items")
      .select("slot,image_url,alt_text,width,height")
      .order("updated_at", { ascending: false });

    (data ?? []).forEach((row) => {
      if (row.slot in GALLERY_SLOTS) {
        items.push({
          slot: row.slot as GallerySlotKey,
          image_url: row.image_url,
          alt_text: row.alt_text,
          width: row.width,
          height: row.height,
        });
      }
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-36 md:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl">Admin Panel</h1>
          <p className="mt-2 text-sm text-[#B7B09B]">
            Giris yapilan hesap: {adminState.userEmail || "Admin"}
          </p>
        </div>
        <SignOutButton />
      </div>
      <DashboardShell
        initialBusiness={initialBusiness}
        initialHomepage={initialHomepage}
        galleryItems={items}
      />
    </main>
  );
}
