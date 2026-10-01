// app/hooks/useLocale.ts
"use client";

import { useState, useEffect } from "react";

const DEBUG_LOCALE = ""; // 👈 force Arabic, change to "" for real detection

export const useLocale = (): "ar" | "en" => {
  const [locale, setLocale] = useState<"ar" | "en">("en");

  useEffect(() => {
    if (DEBUG_LOCALE) {
      setLocale(DEBUG_LOCALE as "ar" | "en");
      return;
    }
    const lang = navigator.language || navigator.languages?.[0] || "en";
    setLocale(lang.startsWith("ar") ? "ar" : "en");
  }, []);

  return locale;
};
