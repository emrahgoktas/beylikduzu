import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_BY_SLUG, SERVICES, type Service } from "@/data/services";
import { SITE_URL } from "@/lib/site";
import { getBusinessSettings } from "@/lib/site-settings";

type PageProps = {
  params: Promise<{ slug: Service["slug"] }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const business = await getBusinessSettings();

  if (!service) {
    return {};
  }

  const title = `${service.name} | Beylikduzu Masaj Salonu`;
  const description = `Masaj Beylikduzu, Beylikduzu'nde ${service.name.toLowerCase()} hizmetini ${service.duration} seans suresiyle sunar. Bilgi ve randevu icin: ${business.phoneDisplay}`;
  const canonical = `/hizmetler/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: "tr_TR",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${service.name} - Masaj Beylikduzu`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "og:type": "business.business",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const business = await getBusinessSettings();

  if (!service) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/hizmetler/${service.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    serviceType: service.name,
    areaServed: {
      "@type": "City",
      name: "Beylikduzu, Istanbul",
    },
    provider: {
      "@id": `${SITE_URL}/#business`,
      "@type": "DaySpa",
      name: business.name,
      url: SITE_URL,
      telephone: business.phoneE164,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: service.price.replace(" TL", "").replace(".", ""),
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${SITE_URL}/#hizmetler`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-36 md:px-10">
      <Script id={`service-schema-${service.slug}`} type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </Script>
      <Script id={`breadcrumb-schema-${service.slug}`} type="application/ld+json">
        {JSON.stringify(breadcrumbs)}
      </Script>

      <nav className="text-xs uppercase tracking-[0.12em] text-[#8A9086]">
        <Link href="/">Ana Sayfa</Link> / <span>Hizmetler</span> /{" "}
        <span>{service.name}</span>
      </nav>

      <header className="mt-7 rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.7)] p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--amber)]">
          Beylikduzu Masaj Hizmeti
        </p>
        <h1 className="mt-4 text-4xl">{service.name}</h1>
        <p className="mt-4 max-w-3xl text-[#C9C2AE]">{service.shortDescription}</p>
        <p className="mt-5 font-display text-lg italic text-[var(--amber)]">
          {service.duration} · {service.price}
        </p>
      </header>

      <section className="mt-10 space-y-4 rounded-2xl border border-[rgba(224,164,88,.1)] bg-[rgba(20,35,28,.7)] p-7">
        {service.detail.map((paragraph, index) => (
          <p key={index} className="text-[#C9C2AE]">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10 grid gap-4 rounded-2xl border border-[rgba(224,164,88,.2)] p-6 sm:grid-cols-2">
        <a
          href={`tel:${business.phoneE164}`}
          className="rounded-full bg-[var(--amber)] px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-[var(--forest-deep)]"
        >
          Telefonla Randevu Al
        </a>
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--amber)] px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-[var(--amber)]"
        >
          WhatsApp ile Ulas
        </a>
      </section>
    </main>
  );
}
