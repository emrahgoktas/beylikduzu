import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminState =
  | { status: "missing_env" }
  | { status: "unauthenticated" }
  | { status: "unauthorized"; userEmail?: string | null }
  | { status: "ok"; userEmail?: string | null; userId: string };

export async function getAdminState(): Promise<AdminState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "missing_env" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "unauthenticated" };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<{ role: string }>();

  if (error || profile?.role !== "admin") {
    return { status: "unauthorized", userEmail: user.email };
  }

  return { status: "ok", userEmail: user.email, userId: user.id };
}

export function redirectToLogin(redirectTo = "/admin") {
  redirect(`/giris?redirectTo=${encodeURIComponent(redirectTo)}`);
}
