import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Beylikduzu Masaj Salonu SSS ve Fiyat Bilgileri",
  description:
    "Masaj Beylikduzu hakkinda sik sorulan sorular: fiyatlar, randevu, cift masaji, aromaterapi ve calisma saatleri.",
  alternates: {
    canonical: "/sss",
  },
  openGraph: {
    title: "Beylikduzu Masaj Salonu SSS ve Fiyat Bilgileri",
    description:
      "Masaj Beylikduzu hakkinda sik sorulan sorular: fiyatlar, randevu, cift masaji, aromaterapi ve calisma saatleri.",
    url: "/sss",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Masaj Beylikduzu SSS sayfasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beylikduzu Masaj Salonu SSS ve Fiyat Bilgileri",
    description:
      "Masaj Beylikduzu hakkinda sik sorulan sorular: fiyatlar, randevu, cift masaji, aromaterapi ve calisma saatleri.",
    images: ["/og-image.svg"],
  },
  other: {
    "og:type": "business.business",
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-36 md:px-10">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <header className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.7)] p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--amber)]">
          SSS / GEO Icerik
        </p>
        <h1 className="mt-4 text-4xl">Sikca Sorulan Sorular</h1>
        <p className="mt-4 max-w-3xl text-[#C9C2AE]">
          Masaj Beylikduzu hakkinda kullanicilarin
          arama motorlarina ve yapay zeka asistanlarina en sik sordugu
          sorulari acik, kisa ve kaynaklanabilir bicimde yanitliyoruz.
        </p>
      </header>

      <section className="mt-10 space-y-4">
        {FAQS.map((faq) => (
          <article
            key={faq.question}
            className="rounded-xl border border-[rgba(224,164,88,.15)] bg-[rgba(20,35,28,.7)] p-6"
          >
            <h2 className="text-2xl">{faq.question}</h2>
            <p className="mt-3 text-[#C9C2AE]">{faq.answer}</p>
          </article>
        ))}
      </section>

      <Link
        href="/"
        className="mt-10 inline-block rounded-full border border-[var(--amber)] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
      >
        Ana Sayfaya Don
      </Link>
    </main>
  );
}
