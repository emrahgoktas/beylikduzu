"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  BusinessSettings,
  HomepageContent,
} from "@/lib/site-settings";

type Props = {
  initialBusiness: BusinessSettings;
  initialHomepage: HomepageContent;
};

function toQuickCardsText(cards: HomepageContent["quickCards"]) {
  return cards.map((card) => `${card.label}|${card.value}`).join("\n");
}

function fromQuickCardsText(input: string): HomepageContent["quickCards"] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, value] = line.split("|").map((part) => part.trim());
      return { label: label || "Kart", value: value || "-" };
    });
}

export function SettingsManager({ initialBusiness, initialHomepage }: Props) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [business, setBusiness] = useState(initialBusiness);
  const [homepage, setHomepage] = useState(initialHomepage);
  const [quickCardsRaw, setQuickCardsRaw] = useState(
    toQuickCardsText(initialHomepage.quickCards),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    const homepagePayload: HomepageContent = {
      ...homepage,
      quickCards: fromQuickCardsText(quickCardsRaw),
    };

    const { error: saveError } = await supabase.from("site_settings").upsert(
      [
        {
          key: "business_settings",
          value: JSON.stringify(business),
        },
        {
          key: "homepage_content",
          value: JSON.stringify(homepagePayload),
        },
      ],
      { onConflict: "key" },
    );

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    setHomepage(homepagePayload);
    setMessage("Ayarlar kaydedildi. Anasayfayi yenileyip sonucu gorebilirsiniz.");
    setSaving(false);
  };

  return (
    <section className="rounded-2xl border border-[rgba(224,164,88,.2)] bg-[rgba(12,23,18,.78)] p-6">
      <div className="mb-5">
        <h2 className="text-2xl">Site Ayarlari ve Anasayfa Icerigi</h2>
        <p className="mt-2 text-sm text-[#B7B09B]">
          Buradaki degisiklikler hero banner, iletisim alanlari ve anasayfa
          metinlerine yansir.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field
          label="Isletme Adi"
          value={business.name}
          onChange={(value) => setBusiness({ ...business, name: value })}
        />
        <Field
          label="Kisa Marka Adi"
          value={business.shortName}
          onChange={(value) => setBusiness({ ...business, shortName: value })}
        />
        <Field
          label="Telefon (Gorunen)"
          value={business.phoneDisplay}
          onChange={(value) => setBusiness({ ...business, phoneDisplay: value })}
        />
        <Field
          label="Telefon (E164)"
          value={business.phoneE164}
          onChange={(value) => setBusiness({ ...business, phoneE164: value })}
        />
        <Field
          label="WhatsApp Linki"
          value={business.whatsappUrl}
          onChange={(value) => setBusiness({ ...business, whatsappUrl: value })}
        />
        <Field
          label="E-posta"
          value={business.email}
          onChange={(value) => setBusiness({ ...business, email: value })}
        />
        <Field
          label="Adres Satiri"
          value={business.addressLine}
          onChange={(value) => setBusiness({ ...business, addressLine: value })}
        />
        <Field
          label="Calisma Saati"
          value={business.openingHours}
          onChange={(value) => setBusiness({ ...business, openingHours: value })}
        />
        <Field
          label="Harita Linki"
          value={business.mapsUrl}
          onChange={(value) => setBusiness({ ...business, mapsUrl: value })}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Field
          label="Hero Ust Baslik"
          value={homepage.heroEyebrow}
          onChange={(value) => setHomepage({ ...homepage, heroEyebrow: value })}
        />
        <Field
          label="Hero Baslik (On metin)"
          value={homepage.heroTitlePrefix}
          onChange={(value) =>
            setHomepage({ ...homepage, heroTitlePrefix: value })
          }
        />
        <Field
          label="Hero Vurgu Kelimesi"
          value={homepage.heroTitleHighlight}
          onChange={(value) =>
            setHomepage({ ...homepage, heroTitleHighlight: value })
          }
        />
        <Field
          label="Hero Badge"
          value={homepage.heroBadge}
          onChange={(value) => setHomepage({ ...homepage, heroBadge: value })}
        />
        <TextField
          label="Hero Aciklama"
          value={homepage.heroDescription}
          onChange={(value) =>
            setHomepage({ ...homepage, heroDescription: value })
          }
        />
        <TextField
          label="Quick Cards (label|value, her satir bir kart)"
          value={quickCardsRaw}
          onChange={setQuickCardsRaw}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Field
          label="Hizmetler Basligi"
          value={homepage.servicesHeading}
          onChange={(value) =>
            setHomepage({ ...homepage, servicesHeading: value })
          }
        />
        <Field
          label="Galeri Basligi"
          value={homepage.galleryHeading}
          onChange={(value) => setHomepage({ ...homepage, galleryHeading: value })}
        />
        <TextField
          label="Galeri Aciklama"
          value={homepage.galleryDescription}
          onChange={(value) =>
            setHomepage({ ...homepage, galleryDescription: value })
          }
        />
        <Field
          label="Hakkimizda Basligi"
          value={homepage.aboutHeading}
          onChange={(value) => setHomepage({ ...homepage, aboutHeading: value })}
        />
        <TextField
          label="Hakkimizda Metni 1"
          value={homepage.aboutText1}
          onChange={(value) => setHomepage({ ...homepage, aboutText1: value })}
        />
        <TextField
          label="Hakkimizda Metni 2"
          value={homepage.aboutText2}
          onChange={(value) => setHomepage({ ...homepage, aboutText2: value })}
        />
        <Field
          label="Saatler Basligi"
          value={homepage.hoursHeading}
          onChange={(value) => setHomepage({ ...homepage, hoursHeading: value })}
        />
        <TextField
          label="Saatler Aciklama"
          value={homepage.hoursDescription}
          onChange={(value) =>
            setHomepage({ ...homepage, hoursDescription: value })
          }
        />
        <Field
          label="Yorumlar Basligi"
          value={homepage.reviewsHeading}
          onChange={(value) =>
            setHomepage({ ...homepage, reviewsHeading: value })
          }
        />
        <Field
          label="SSS Basligi"
          value={homepage.faqHeading}
          onChange={(value) => setHomepage({ ...homepage, faqHeading: value })}
        />
        <TextField
          label="SSS Aciklama"
          value={homepage.faqText}
          onChange={(value) => setHomepage({ ...homepage, faqText: value })}
        />
        <Field
          label="Iletisim Basligi"
          value={homepage.contactHeading}
          onChange={(value) =>
            setHomepage({ ...homepage, contactHeading: value })
          }
        />
        <TextField
          label="Iletisim Aciklama"
          value={homepage.contactText}
          onChange={(value) => setHomepage({ ...homepage, contactText: value })}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={saveAll}
          disabled={saving}
          className="rounded-full bg-[var(--amber)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[var(--forest-deep)] disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Tum Ayarlari Kaydet"}
        </button>
        {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)]"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.1em] text-[#B7B09B]">
        {label}
      </span>
      <textarea
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[rgba(224,164,88,.22)] bg-[rgba(12,23,18,.6)] px-3 py-2 text-sm text-[var(--cream)]"
      />
    </label>
  );
}
