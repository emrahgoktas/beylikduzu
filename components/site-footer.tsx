import type { BusinessSettings } from "@/lib/site-settings";

export function SiteFooter({ business }: { business: BusinessSettings }) {
  return (
    <footer className="footer-ambient border-t border-[rgba(224,164,88,.14)] bg-[var(--forest-deep)] pb-24 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-10">
        <div>
          <span className="font-display text-2xl italic text-[var(--amber)]">
            {business.shortName}
          </span>
          <p className="mt-3 text-sm text-[#B7B09B]">
            Dogal dokular, sakin atmosfer ve profesyonel terapistlerle
            Beylikduzu&rsquo;nde randevulu masaj deneyimi.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--amber)]">
            Hizli Erisim
          </p>
          <div className="mt-3 space-y-2 text-sm text-[#B7B09B]">
            <p>{business.addressLine}</p>
            <a
              href={`tel:${business.phoneE164}`}
              className="block hover:text-[var(--amber)]"
            >
              {business.phoneDisplay}
            </a>
            <a
              href={business.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-[var(--amber)]"
            >
              WhatsApp ile Iletisim
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--amber)]">
            Cevrimici Randevu
          </p>
          <p className="mt-3 text-sm text-[#B7B09B]">
            Her gun 10:00 - 21:00 arasi telefon ve WhatsApp uzerinden seans
            planlanir.
          </p>
          <a
            href={`tel:${business.phoneE164}`}
            className="mt-4 inline-flex rounded-full border border-[var(--amber)] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--forest-deep)]"
          >
            Hemen Ara
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-[rgba(224,164,88,.14)] px-4 pt-6 text-center text-xs tracking-[0.05em] text-[#6E756A] md:px-10">
        © 2026 masajbeylikduzu.com - Masaj Beylikduzu
      </div>
    </footer>
  );
}
