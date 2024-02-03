import { createContext, useEffect, useState } from "react";

export const defaultLocale = "en";
export const locales = ["en", "zh-CN", "zh", "ja", "ko", "vi"];
export const LanguageContext = createContext([]);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");
  const [browserLang, setBrowserLang] = useState(null);

  useEffect(() => {
    if (!window) {
      return;
    }

    if (browserLang === null) {
      setBrowserLang(navigator.language);
    }

    // set language
    console.log(browserLang);
    if (browserLang === "zh-CN") setLocale("zh-CN");
    else if (browserLang === "zh") setLocale("zh");
    else if (browserLang === "ja") setLocale("ja");
    else if (browserLang === "ko") setLocale("ko");
    else if (browserLang === "vi") setLocale("vi");
    else setLocale("en");

  }, [browserLang]);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
}
