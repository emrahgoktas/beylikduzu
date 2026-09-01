export type GallerySlotKey =
  | "hero"
  | "gallery1"
  | "gallery2"
  | "gallery3"
  | "gallery4"
  | "retreat";

export const GALLERY_SLOTS: Record<
  GallerySlotKey,
  {
    label: string;
    recommendedWidth: number;
    recommendedHeight: number;
    ratioLabel: string;
    fallbackSrc: string;
    fallbackAlt: string;
  }
> = {
  hero: {
    label: "Hero Arka Plan",
    recommendedWidth: 2400,
    recommendedHeight: 1350,
    ratioLabel: "16:9",
    fallbackSrc: "/images/galery-9.jpeg",
    fallbackAlt: "Masaj Beylikduzu icin dogal ambiyansli hero arka plan",
  },
  gallery1: {
    label: "Galeri Buyuk Kart",
    recommendedWidth: 1600,
    recommendedHeight: 2200,
    ratioLabel: "4:5",
    fallbackSrc: "/images/galery-1.jpeg",
    fallbackAlt: "Masaj Beylikduzu ic mekan gorunumu",
  },
  gallery2: {
    label: "Galeri Kucuk Kart 1",
    recommendedWidth: 1400,
    recommendedHeight: 900,
    ratioLabel: "14:9",
    fallbackSrc: "/images/galery-2.jpeg",
    fallbackAlt: "Beylikduzu spa terapi odasi ambiyansi",
  },
  gallery3: {
    label: "Galeri Kucuk Kart 2",
    recommendedWidth: 1400,
    recommendedHeight: 900,
    ratioLabel: "14:9",
    fallbackSrc: "/images/galery-3.jpeg",
    fallbackAlt: "Masaj Beylikduzu mum isigi ve ahsap detaylar",
  },
  gallery4: {
    label: "Galeri Genis Kart",
    recommendedWidth: 2200,
    recommendedHeight: 1200,
    ratioLabel: "11:6",
    fallbackSrc: "/images/galery-4.jpeg",
    fallbackAlt: "Beylikduzu masaj salonu dinlenme alani",
  },
  retreat: {
    label: "Mekan Gorseli",
    recommendedWidth: 1600,
    recommendedHeight: 1600,
    ratioLabel: "1:1",
    fallbackSrc: "/images/galery-5.jpeg",
    fallbackAlt: "Masaj Beylikduzu terapi alani genel gorunum",
  },
};
