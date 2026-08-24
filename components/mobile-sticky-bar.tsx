"use client";

import { BUSINESS } from "@/lib/site";
import { pushEvent } from "@/lib/analytics";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(224,164,88,0.3)] bg-[rgba(12,23,18,0.95)] p-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          className="rounded-full bg-[var(--amber)] px-3 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--forest-deep)]"
          onClick={() => pushEvent("telefon_tiklama", { location: "sticky_bar" })}
        >
          Randevu Al
        </a>
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--amber)] px-3 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--amber)]"
          onClick={() =>
            pushEvent("whatsapp_tiklama", { location: "sticky_bar" })
          }
        >
          WhatsApp&rsquo;tan Yaz
        </a>
      </div>
    </div>
  );
}
