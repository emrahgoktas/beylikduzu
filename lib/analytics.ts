"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const pushEvent = (
  eventName:
    | "randevu_tiklama"
    | "whatsapp_tiklama"
    | "telefon_tiklama"
    | "utm_parametresi_yakalandi",
  params?: Record<string, unknown>,
) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

export const getUtmPayload = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const search = new URLSearchParams(window.location.search);
  const utmSource = search.get("utm_source");
  const utmMedium = search.get("utm_medium");
  const utmCampaign = search.get("utm_campaign");
  const utmTerm = search.get("utm_term");
  const utmContent = search.get("utm_content");

  if (
    !utmSource &&
    !utmMedium &&
    !utmCampaign &&
    !utmTerm &&
    !utmContent
  ) {
    return null;
  }

  return {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    utm_content: utmContent,
  };
};
