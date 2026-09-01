import { GALLERY_SLOTS, type GallerySlotKey } from "@/data/gallery-slots";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type GalleryImageConfig = {
  src: string;
  alt: string;
};

type GalleryRow = {
  slot: GallerySlotKey;
  image_url: string;
  alt_text: string | null;
};

export async function getGalleryImages() {
  const fallback = Object.fromEntries(
    Object.entries(GALLERY_SLOTS).map(([slot, def]) => [
      slot,
      { src: def.fallbackSrc, alt: def.fallbackAlt },
    ]),
  ) as Record<GallerySlotKey, GalleryImageConfig>;

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from("gallery_items")
    .select("slot,image_url,alt_text")
    .eq("is_active", true);

  if (error || !data) {
    return fallback;
  }

  const dynamicEntries = (data as GalleryRow[]).reduce<
    Partial<Record<GallerySlotKey, GalleryImageConfig>>
  >((acc, row) => {
    if (!row.slot || !GALLERY_SLOTS[row.slot]) {
      return acc;
    }

    acc[row.slot] = {
      src: row.image_url,
      alt: row.alt_text || GALLERY_SLOTS[row.slot].fallbackAlt,
    };
    return acc;
  }, {});

  return {
    ...fallback,
    ...dynamicEntries,
  };
}
