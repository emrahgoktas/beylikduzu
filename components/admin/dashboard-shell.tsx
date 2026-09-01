"use client";

import { useState } from "react";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { SettingsManager } from "@/components/admin/settings-manager";
import type { GallerySlotKey } from "@/data/gallery-slots";
import type {
  BusinessSettings,
  HomepageContent,
} from "@/lib/site-settings";

type GalleryItem = {
  slot: GallerySlotKey;
  image_url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
};

type Props = {
  initialBusiness: BusinessSettings;
  initialHomepage: HomepageContent;
  galleryItems: GalleryItem[];
};

export function DashboardShell({
  initialBusiness,
  initialHomepage,
  galleryItems,
}: Props) {
  const [tab, setTab] = useState<"overview" | "content" | "gallery">(
    "overview",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.72)] p-4 lg:sticky lg:top-28 lg:h-fit">
        <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[var(--amber)]">
          Admin Navigasyon
        </p>
        <div className="space-y-2">
          <TabButton
            active={tab === "overview"}
            onClick={() => setTab("overview")}
          >
            Dashboard Ozet
          </TabButton>
          <TabButton
            active={tab === "content"}
            onClick={() => setTab("content")}
          >
            Site Icerigi
          </TabButton>
          <TabButton active={tab === "gallery"} onClick={() => setTab("gallery")}>
            Galeri Gorselleri
          </TabButton>
        </div>
      </aside>

      <div className="space-y-6">
        {tab === "overview" ? (
          <section className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.78)] p-6">
            <h2 className="text-2xl">Yonetim Paneli</h2>
            <p className="mt-2 text-sm text-[#B7B09B]">
              Bu panelden anasayfa metinleri, banner icerigi, iletisim bilgileri
              ve galeri gorsellerini yonetebilirsiniz.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Card
                title="Aktif Galeri Slotu"
                value={`${galleryItems.length}/6`}
                hint="Hero + 4 galeri + mekan"
              />
              <Card
                title="Telefon"
                value={initialBusiness.phoneDisplay}
                hint="Header / footer / CTA"
              />
              <Card
                title="Hero Baslik"
                value={initialHomepage.heroTitleHighlight}
                hint="Anasayfa ana vurgu"
              />
            </div>
          </section>
        ) : null}

        {tab === "content" ? (
          <SettingsManager
            initialBusiness={initialBusiness}
            initialHomepage={initialHomepage}
          />
        ) : null}

        {tab === "gallery" ? <GalleryManager initialItems={galleryItems} /> : null}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
        active
          ? "bg-[rgba(224,164,88,.2)] text-[var(--amber)]"
          : "text-[#C9C2AE] hover:bg-[rgba(224,164,88,.1)]"
      }`}
    >
      {children}
    </button>
  );
}

function Card({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <article className="rounded-xl border border-[rgba(224,164,88,.2)] bg-[rgba(20,35,28,.66)] p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-[#B7B09B]">{title}</p>
      <p className="mt-2 text-2xl font-display text-[var(--amber)]">{value}</p>
      <p className="mt-1 text-xs text-[#8A9086]">{hint}</p>
    </article>
  );
}
