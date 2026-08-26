export type Review = {
  author: string;
  rating: number;
  text: string;
  source: "Google" | "Website";
};

// TODO: Gercek Google yorumlarini senkronize et.
export const REVIEWS: Review[] = [
  {
    author: "Bir Masaj Beylikduzu Misafiri",
    rating: 5,
    text: "Beylikduzu'nde boyle bir yer olduguna inanamadim. Gercekten bir ormana gitmis gibi hissettim.",
    source: "Website",
  },
  {
    author: "Istanbul Avrupa Yakasi Misafiri",
    rating: 5,
    text: "Masaj Beylikduzu'nda klasik masaj seansindan sonra kaslarim belirgin sekilde rahatladigini hissettim.",
    source: "Website",
  },
  {
    author: "Beylikduzu Cift Masaji Misafiri",
    rating: 5,
    text: "Cift masaji icin sakin ve temiz bir ortam ariyorduk, randevu sureci duzenli ve aciklayiciydi.",
    source: "Website",
  },
];
