import type { Metadata } from "next";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Iletisim | Beylikduzu Masaj Salonu Masaj Beylikduzu",
  description:
    "Masaj Beylikduzu ile iletisime gecin. Telefon, WhatsApp, adres ve yol tarifi bilgilerine bu sayfadan ulasin.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "Iletisim | Beylikduzu Masaj Salonu Masaj Beylikduzu",
    description:
      "Masaj Beylikduzu ile iletisime gecin. Telefon, WhatsApp, adres ve yol tarifi bilgilerine bu sayfadan ulasin.",
    url: "/iletisim",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Masaj Beylikduzu iletisim sayfasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iletisim | Beylikduzu Masaj Salonu Masaj Beylikduzu",
    description:
      "Masaj Beylikduzu ile iletisime gecin. Telefon, WhatsApp, adres ve yol tarifi bilgilerine bu sayfadan ulasin.",
    images: ["/og-image.svg"],
  },
  other: {
    "og:type": "business.business",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-36 md:px-10">
      <header className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.7)] p-8">
        <h1 className="text-4xl">Bize Ulasin</h1>
        <p className="mt-4 max-w-3xl text-[#C9C2AE]">
          Masaj Beylikduzu, Beylikduzu&rsquo;nde randevulu hizmet veren bir masaj
          salonudur. Randevu almak veya hizmet detaylarini ogrenmek icin telefon
          ve WhatsApp kanallarimizi kullanabilirsiniz.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-[rgba(224,164,88,.15)] p-6">
          <h2 className="text-2xl">Iletisim Bilgileri</h2>
          <ul className="mt-4 space-y-2 text-[#C9C2AE]">
            <li>Telefon: {BUSINESS.phoneDisplay}</li>
            <li>E-posta: {BUSINESS.email}</li>
            <li>Adres: {BUSINESS.addressLine}</li>
            <li>Calisma Saatleri: {BUSINESS.openingHours}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="rounded-full bg-[var(--amber)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[var(--forest-deep)]"
            >
              Telefonu Ara
            </a>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--amber)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
            >
              WhatsApp
            </a>
          </div>
        </article>
        <article className="rounded-xl border border-[rgba(224,164,88,.15)] p-6">
          <h2 className="text-2xl">Harita ve Yol Tarifi</h2>
          <p className="mt-4 text-[#C9C2AE]">
            Google Haritalar uzerinden yol tarifi almak icin baglantiyi
            kullanabilirsiniz.
          </p>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full border border-[var(--amber)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
          >
            Yol Tarifi Al
          </a>
        </article>
      </section>
    </main>
  );
}
