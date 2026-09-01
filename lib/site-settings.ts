import { BUSINESS } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BusinessSettings = {
  name: string;
  shortName: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappUrl: string;
  email: string;
  addressLine: string;
  openingHours: string;
  mapsUrl: string;
};

export type HomepageContent = {
  heroEyebrow: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroBadge: string;
  quickCards: { label: string; value: string }[];
  servicesHeading: string;
  galleryHeading: string;
  galleryDescription: string;
  aboutHeading: string;
  aboutText1: string;
  aboutText2: string;
  hoursHeading: string;
  hoursDescription: string;
  reviewsHeading: string;
  faqHeading: string;
  faqText: string;
  contactHeading: string;
  contactText: string;
};

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  name: BUSINESS.name,
  shortName: BUSINESS.shortName,
  phoneDisplay: BUSINESS.phoneDisplay,
  phoneE164: BUSINESS.phoneE164,
  whatsappUrl: BUSINESS.whatsappUrl,
  email: BUSINESS.email,
  addressLine: BUSINESS.addressLine,
  openingHours: BUSINESS.openingHours,
  mapsUrl: BUSINESS.mapsUrl,
};

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroEyebrow: "Beylikduzu · Sehir Icinde Dogal Siginak",
  heroTitlePrefix: "Beylikduzu Masaj Salonu - Ruhunuza iyi gelen",
  heroTitleHighlight: "sessiz bir mola",
  heroDescription:
    "Masaj Beylikduzu, Beylikduzu'nde ahsap dokular, mum isigi ve profesyonel terapistlerle klasik, aromaterapi, sicak tas ve sportif masaj hizmetlerini randevulu olarak sunar.",
  heroBadge: "Misafir memnuniyeti odakli deneyim · 10:00-21:00 randevu",
  quickCards: [
    { label: "Klasik Masaj", value: "60 dk" },
    { label: "Aromaterapi", value: "70 dk" },
    { label: "Sicak Tas", value: "90 dk" },
  ],
  servicesHeading: "Beylikduzu'nde Masaj Hizmetlerimiz",
  galleryHeading: "Mekanimizdan Kareler",
  galleryDescription:
    "Gorsel yuklerken kalite kaybi olmamasi icin asagidaki olculeri baz alin. Bu olculer galeri alanlarinin oranlariyla birebir uyumludur.",
  aboutHeading: "Neden Masaj Beylikduzu'nu Secmelisiniz",
  aboutText1:
    "Mekanda her oda gercek ahsap dokularla, dogal mum isigiyla ve canli bitkilerle tasarlandi. Masaj Beylikduzu, Beylikduzu'nde masaj deneyimini yogun sehir temposundan ayrisan sakin bir ritimde sunar.",
  aboutText2:
    "Beylikduzu'nun yesil alanlarina yakin, sakin bir sokakta randevulu ve az sayida misafirle calisiyoruz.",
  hoursHeading: "Salonumuz Hangi Saatlerde Acik?",
  hoursDescription:
    "Masaj Beylikduzu, Beylikduzu'nde her gun 10:00-21:00 saatleri arasinda randevu kabul eder.",
  reviewsHeading: "Misafir Yorumlari ve Sosyal Kanit",
  faqHeading: "Sikca Sorulan Sorular",
  faqText:
    "Masaj Beylikduzu hakkinda fiyat, randevu, cift masaji ve aromaterapi gibi sorularin net cevaplarini SSS sayfasinda bulabilirsiniz.",
  contactHeading: "Bize Ulasin",
  contactText:
    "Masaj Beylikduzu, Beylikduzu'nde randevulu calisan bir masaj salonudur. Telefon ve WhatsApp hatti uzerinden hizli sekilde seans saati planlayabilirsiniz.",
};

async function getJsonSetting<T>(key: string, fallback: T): Promise<T> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return fallback;
  }

  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle<{ value: string }>();

  if (!data?.value) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(data.value) as T;
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export async function getBusinessSettings() {
  return getJsonSetting<BusinessSettings>(
    "business_settings",
    DEFAULT_BUSINESS_SETTINGS,
  );
}

export async function getHomepageContent() {
  const content = await getJsonSetting<HomepageContent>(
    "homepage_content",
    DEFAULT_HOMEPAGE_CONTENT,
  );

  if (!Array.isArray(content.quickCards) || content.quickCards.length === 0) {
    return DEFAULT_HOMEPAGE_CONTENT;
  }

  return content;
}
