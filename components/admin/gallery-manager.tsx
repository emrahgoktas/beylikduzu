"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  GALLERY_SLOTS,
  type GallerySlotKey,
} from "@/data/gallery-slots";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type GalleryItem = {
  slot: GallerySlotKey;
  image_url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
};

type Props = {
  initialItems: GalleryItem[];
};

async function readImageDimensions(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const bitmap = await createImageBitmap(file);
    return { width: bitmap.width, height: bitmap.height };
  } catch {
    return await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new window.Image();
      image.onload = () =>
        resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = reject;
      image.src = objectUrl;
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function GalleryManager({ initialItems }: Props) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [items, setItems] = useState(initialItems);
  const [slot, setSlot] = useState<GallerySlotKey>("hero");
  const [altText, setAltText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentGuide = GALLERY_SLOTS[slot];

  const onUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!file) {
      setError("Lutfen bir gorsel secin.");
      return;
    }

    setLoading(true);

    try {
      const { width, height } = await readImageDimensions(file);
      const expectedRatio =
        currentGuide.recommendedWidth / currentGuide.recommendedHeight;
      const uploadedRatio = width / height;
      const ratioDiff = Math.abs(expectedRatio - uploadedRatio);

      if (ratioDiff > 0.08) {
        setError(
          `Secilen gorselin orani uygun degil. ${currentGuide.recommendedWidth}x${currentGuide.recommendedHeight} (${currentGuide.ratioLabel}) oraninda yukleyin.`,
        );
        setLoading(false);
        return;
      }

      const path = `${slot}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-images").getPublicUrl(path);

      const { error: dbError } = await supabase.from("gallery_items").upsert(
        {
          slot,
          image_url: publicUrl,
          alt_text: altText || currentGuide.fallbackAlt,
          width,
          height,
          is_active: true,
        },
        { onConflict: "slot" },
      );

      if (dbError) {
        setError(dbError.message);
        setLoading(false);
        return;
      }

      const newItem: GalleryItem = {
        slot,
        image_url: publicUrl,
        alt_text: altText || currentGuide.fallbackAlt,
        width,
        height,
      };
      setItems((prev) => {
        const filtered = prev.filter((item) => item.slot !== slot);
        return [newItem, ...filtered];
      });

      setMessage("Gorsel basariyla guncellendi. Sayfayi yenileyip kontrol edin.");
      setFile(null);
      setAltText("");
    } catch (unknownError) {
      const err = unknownError as Error;
      setError(err.message || "Beklenmeyen bir hata olustu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.7)] p-6">
      <h2 className="text-2xl">Galeri Yonetimi</h2>
      <p className="mt-2 text-sm text-[#B7B09B]">
        Gorsel yuklerken ideal oranlari koruyun. Sistem oran farkini kontrol
        ederek hatali yuklemeyi engeller.
      </p>

      <form onSubmit={onUpload} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
            Slot
          </span>
          <select
            value={slot}
            onChange={(event) => setSlot(event.target.value as GallerySlotKey)}
            className="mt-2 w-full rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)]"
          >
            {Object.entries(GALLERY_SLOTS).map(([key, slotData]) => (
              <option key={key} value={key}>
                {slotData.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
            Alt metni
          </span>
          <input
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            placeholder={currentGuide.fallbackAlt}
            className="mt-2 w-full rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)]"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
            Gorsel Dosyasi
          </span>
          <input
            required
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="mt-2 block w-full cursor-pointer rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)]"
          />
          <p className="mt-2 text-xs text-[#B7B09B]">
            Onerilen: {currentGuide.recommendedWidth}x
            {currentGuide.recommendedHeight} px ({currentGuide.ratioLabel})
          </p>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[var(--amber)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[var(--forest-deep)] disabled:opacity-60"
        >
          {loading ? "Yukleniyor..." : "Gorseli Kaydet"}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={`${item.slot}-${item.image_url}`}
            className="rounded-xl border border-[rgba(224,164,88,.2)] p-3"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--amber)]">
              {GALLERY_SLOTS[item.slot].label}
            </p>
            <div className="relative mt-2 h-40 overflow-hidden rounded-lg">
              <Image
                src={item.image_url}
                alt={item.alt_text || GALLERY_SLOTS[item.slot].fallbackAlt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <p className="mt-2 text-xs text-[#B7B09B]">
              {item.width ?? "-"}x{item.height ?? "-"} px
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
