import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Karla } from "next/font/google";
import { AnalyticsListener } from "@/components/analytics-listener";
import { LayoutShell } from "@/components/layout-shell";
import { BUSINESS, DEFAULT_THEME_COLOR, SITE_URL } from "@/lib/site";
import { getBusinessSettings } from "@/lib/site-settings";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Beylikduzu Masaj Salonu | Masaj Beylikduzu",
    template: "%s | Masaj Beylikduzu",
  },
  description:
    "Beylikduzu'nde dogal, sakin ve profesyonel masaj deneyimi. Klasik, aromaterapi, sicak tas ve sportif masaj hizmetleri. Hemen randevu alin: 0532 151 96 91",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Beylikduzu Masaj Salonu | Masaj Beylikduzu - Profesyonel Masaj Merkezi",
    description:
      "Beylikduzu'nde dogal, sakin ve profesyonel masaj deneyimi. Klasik, aromaterapi, sicak tas ve sportif masaj hizmetleri.",
    url: SITE_URL,
    siteName: BUSINESS.name,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Masaj Beylikduzu masaj salonu marka gorseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Beylikduzu Masaj Salonu | Masaj Beylikduzu - Profesyonel Masaj Merkezi",
    description:
      "Beylikduzu'nde dogal, sakin ve profesyonel masaj deneyimi. Klasik, aromaterapi, sicak tas ve sportif masaj hizmetleri.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: DEFAULT_THEME_COLOR,
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const business = await getBusinessSettings();

  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--forest)] text-[var(--cream)]">
        {gtmId ? (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-script" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', { send_page_view: true });
              `}
            </Script>
          </>
        ) : null}

        <Script id="jsonld-dayspa" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DaySpa",
            "@id": `${SITE_URL}/#business`,
            name: business.name,
            image: `${SITE_URL}/og-image.svg`,
            url: SITE_URL,
            telephone: business.phoneE164,
            priceRange: "₺₺",
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS.streetAddress,
              addressLocality: "Beylikduzu",
              addressRegion: "Istanbul",
              postalCode: BUSINESS.postalCode,
              addressCountry: "TR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: BUSINESS.latitude,
              longitude: BUSINESS.longitude,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "10:00",
                closes: "21:00",
              },
            ],
            sameAs: [BUSINESS.googleBusinessUrl, BUSINESS.instagramUrl],
          })}
        </Script>
        <AnalyticsListener />
        <LayoutShell business={business}>{children}</LayoutShell>
      </body>
    </html>
  );
}
