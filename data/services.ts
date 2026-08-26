export type Service = {
  slug:
    | "klasik-masaj"
    | "aromaterapi"
    | "sicak-tas-masaji"
    | "sportif-masaj"
    | "refleksoloji"
    | "cift-masaji";
  name: string;
  heroName: string;
  duration: string;
  price: string;
  shortDescription: string;
  detail: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "aromaterapi",
    name: "Aromaterapi Masaji",
    heroName: "Bitkisel Aromaterapi",
    duration: "70 dk",
    price: "1.400 TL",
    shortDescription:
      "Adacayi, lavanta ve okaliptus yaglariyla zihni sifirlayan yumusak dokunus.",
    detail: [
      "Masaj Beylikduzu, Beylikduzu'nde aromaterapi masaji hizmetini sertifikali terapistler esliginde sunar.",
      "Aromaterapi seansinda secilen bitkisel yaglar kaslarin gevsemesine yardim ederken zihinsel yorgunlugu azaltmayi hedefler.",
    ],
  },
  {
    slug: "sicak-tas-masaji",
    name: "Sicak Tas Masaji",
    heroName: "Sicak Tas Ormani",
    duration: "90 dk",
    price: "1.700 TL",
    shortDescription:
      "Dogal bazalt taslarla derin isi transferi, kronik gerginligi eritir.",
    detail: [
      "Masaj Beylikduzu, Beylikduzu'nde sicak tas masaji uygulamasinda dogal bazalt taslar kullanir.",
      "Sicak tas masaji, ozellikle sirt ve boyun bolgesindeki yogun kas sertlikleri icin daha derin bir rahatlama sunar.",
    ],
  },
  {
    slug: "klasik-masaj",
    name: "Klasik Masaj",
    heroName: "Klasik Bakim",
    duration: "60 dk",
    price: "1.150 TL",
    shortDescription:
      "Tum vucutta kas gerginligini cozen, dogal yaglarla desteklenen temel masaj.",
    detail: [
      "Masaj Beylikduzu, Beylikduzu'nde klasik masaj seanslarini hem gunluk stres hem de kas yorgunlugu icin planlar.",
      "Klasik masaj, duzenli uygulandiginda durus kalitesini destekler ve genel rahatlama hissini artirir.",
    ],
  },
  {
    slug: "sportif-masaj",
    name: "Sportif Masaj",
    heroName: "Kok Terapi (Sportif)",
    duration: "60 dk",
    price: "1.300 TL",
    shortDescription:
      "Aktif bedenler icin derin doku calismasi, toparlanmayi hizlandirir.",
    detail: [
      "Masaj Beylikduzu, Beylikduzu'nde sportif masaj hizmetini aktif yasam suren misafirler icin uygular.",
      "Sportif masaj, egzersiz sonrasi toparlanmaya destek olmak ve hareket kabiliyetini korumak amaciyla hedefli bolgelere odaklanir.",
    ],
  },
  {
    slug: "refleksoloji",
    name: "Refleksoloji",
    heroName: "Refleksoloji",
    duration: "45 dk",
    price: "900 TL",
    shortDescription:
      "Ayak tabanindaki noktalardan tum bedene yayilan dogal denge.",
    detail: [
      "Masaj Beylikduzu, Beylikduzu'nde refleksoloji seanslarini ayak tabanindaki basinc noktalarina odaklanarak gerceklestirir.",
      "Refleksoloji uygulamasi, gunluk yorgunlugu azaltmaya ve bedenin genel denge hissini desteklemeye yardimci olur.",
    ],
  },
  {
    slug: "cift-masaji",
    name: "Cift Masaji",
    heroName: "Cift Siginagi",
    duration: "75 dk",
    price: "2.400 TL",
    shortDescription:
      "Mum isigiyla aydinlatilan ozel odada, birlikte yasanan dogal huzur.",
    detail: [
      "Masaj Beylikduzu, Beylikduzu'nde cift masaji hizmetini ozel oda duzeninde ayni anda iki kisiye sunar.",
      "Cift masaji, birlikte kaliteli zaman gecirmek isteyen misafirler icin sakin bir ortamda planlanan eszamanli bir seanstir.",
    ],
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service]),
) as Record<Service["slug"], Service>;
