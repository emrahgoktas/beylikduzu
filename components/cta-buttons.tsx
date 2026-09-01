"use client";

import Link from "next/link";
import { BUSINESS } from "@/lib/site";
import { pushEvent } from "@/lib/analytics";
import type { BusinessSettings } from "@/lib/site-settings";

export function CtaButtons({
  compact = false,
  business = BUSINESS,
}: {
  compact?: boolean;
  business?: BusinessSettings;
}) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.18em] transition duration-300";

  return (
    <div className={`flex ${compact ? "flex-col" : "flex-wrap"} gap-3`}>
      <a
        href={`tel:${business.phoneE164}`}
        className={`${baseClass} border-[var(--amber)] bg-[var(--amber)] text-[var(--forest-deep)] hover:bg-transparent hover:text-[var(--amber)]`}
        onClick={() => pushEvent("telefon_tiklama", { location: "cta" })}
      >
        Randevu Al
      </a>
      <a
        href={business.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={`${baseClass} border-[var(--amber)] text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--forest-deep)]`}
        onClick={() => pushEvent("whatsapp_tiklama", { location: "cta" })}
      >
        WhatsApp&rsquo;tan Yaz
      </a>
      <Link
        href="/hizmetler/klasik-masaj"
        className={`${baseClass} border-[var(--moss)] text-[var(--cream)] hover:border-[var(--amber)] hover:text-[var(--amber)]`}
        onClick={() => pushEvent("randevu_tiklama", { location: "service_cta" })}
      >
        Hizmetleri Gor
      </Link>
    </div>
  );
}
