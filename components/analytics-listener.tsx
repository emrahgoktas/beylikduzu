"use client";

import { useEffect } from "react";
import { getUtmPayload, pushEvent } from "@/lib/analytics";

const SESSION_KEY = "utm_session_saved";

export function AnalyticsListener() {
  useEffect(() => {
    const utmPayload = getUtmPayload();

    if (!utmPayload) {
      return;
    }

    const isSaved = sessionStorage.getItem(SESSION_KEY);
    if (isSaved) {
      return;
    }

    pushEvent("utm_parametresi_yakalandi", {
      event_category: "utm_capture",
      ...utmPayload,
    });
    sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  return null;
}
