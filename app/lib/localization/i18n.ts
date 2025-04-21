import i18next from "i18next";
import type { InitOptions, i18n } from "i18next";
import { initReactI18next } from "react-i18next";

export let i18nInstance: i18n | null = null;
export const defaultNS = "translations";

export const localeUrlParam = "locale";
export const defaultLanguage = "fr";

export const LOCALE_STORAGE_KEY = "i18nextLng";

export const initializeI18next = (config?: InitOptions) => {
  // Get language from localStorage if it exists
  const storedLanguage =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCALE_STORAGE_KEY)
      : null;

  if (!i18next.isInitialized) {
    const options = {
      initImmediate: false,
      debug: false,
      resources: {
        en: {
          translation: {},
        },
        fr: {
          translation: {},
        },
      },
      fallbackLng: defaultLanguage,
      supportedLngs: [defaultLanguage, "en"],
      ns: [defaultNS],
      defaultNS,
      fallbackNS: defaultNS,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      detection: {
        order: ["localStorage", "querystring", "navigator"],
        lookupQuerystring: localeUrlParam,
      },
      lng: storedLanguage || undefined,
      defaultLanguage: defaultLanguage,
      ...config,
    };

    i18next.use(initReactI18next).init(options);

    i18next.on("languageChanged", (lng) => {
      localStorage.setItem(LOCALE_STORAGE_KEY, lng);
    });

    i18nInstance = i18next;
  } else {
    const locales = config?.resources || {};
    Object.keys(locales).forEach((lang) => {
      Object.keys(locales[lang]).forEach((key) => {
        i18next.addResourceBundle(lang, key, locales[lang][key], true);
      });
    });
  }
};

export const getLanguage = () => {
  return i18nInstance?.resolvedLanguage || defaultLanguage;
};
