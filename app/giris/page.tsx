import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { hasSupabaseEnv } from "@/lib/supabase/config";

type Props = {
  searchParams: Promise<{ redirectTo?: string }>;
};

export const metadata: Metadata = {
  title: "Giris | Masaj Beylikduzu Admin",
  description:
    "Masaj Beylikduzu admin paneli icin giris veya uyelik olusturma sayfasi.",
  alternates: {
    canonical: "/giris",
  },
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const redirectTo = params.redirectTo || "/admin";

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-36 md:px-10">
      <h1 className="text-center text-4xl">Admin Girisi</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-[#C9C2AE]">
        Masaj Beylikduzu admin paneline erismek icin giris yapin. Yeni hesap
        acabilirsiniz; admin yetkisi Supabase uzerinden rol atamasi ile
        verilir.
      </p>

      {!hasSupabaseEnv ? (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[rgba(224,164,88,.25)] bg-[rgba(12,23,18,.7)] p-6 text-sm text-[#C9C2AE]">
          Supabase env degiskenleri eksik. Vercel ve lokal ortamda
          `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY`
          tanimlamaniz gerekiyor.
        </div>
      ) : (
        <div className="mt-10">
          <AuthForm redirectTo={redirectTo} />
        </div>
      )}
    </main>
  );
}
