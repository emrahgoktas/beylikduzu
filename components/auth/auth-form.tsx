"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  redirectTo?: string;
};

export function AuthForm({ redirectTo = "/admin" }: Props) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
      return;
    }

    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Kayit olusturuldu. E-postaniza gelen dogrulama linkini acip tekrar giris yapin.",
    );
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.72)] p-6">
      <div className="mb-5 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.12em] ${
            mode === "login"
              ? "bg-[var(--amber)] text-[var(--forest-deep)]"
              : "border border-[rgba(224,164,88,.4)] text-[var(--amber)]"
          }`}
        >
          Giris Yap
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.12em] ${
            mode === "register"
              ? "bg-[var(--amber)] text-[var(--forest-deep)]"
              : "border border-[rgba(224,164,88,.4)] text-[var(--amber)]"
          }`}
        >
          Uye Ol
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
            E-posta
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)] outline-none focus:border-[var(--amber)]"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
            Sifre
          </span>
          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)] outline-none focus:border-[var(--amber)]"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[var(--amber)] px-4 py-3 text-xs uppercase tracking-[0.14em] text-[var(--forest-deep)] disabled:opacity-70"
        >
          {loading
            ? "Isleniyor..."
            : mode === "login"
              ? "Giris Yap"
              : "Uyelik Olustur"}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
    </div>
  );
}
