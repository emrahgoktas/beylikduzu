"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  const onClick = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/giris");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[var(--amber)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--forest-deep)]"
    >
      Cikis Yap
    </button>
  );
}
