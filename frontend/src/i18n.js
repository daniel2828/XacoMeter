import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./utils/translations/en/translation.json";
import translationES from "./utils/translations/es/translation";
import translationFR from "./utils/translations/fr/translation";

const fallbackLng = ["en"];
const availableLanguages = ["en", "es", "fr"];

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,
    react: { 
      useSuspense: false 
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
