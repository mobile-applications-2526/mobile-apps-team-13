// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import nl from './locales/nl.json';
import en from './locales/en.json';

const deviceLanguage = getLocales()[0]?.languageCode ?? 'nl';

i18n
  .use(initReactI18next) 
  .init({
    compatibilityJSON: 'v3', 
    resources: {
      nl: { translation: nl },
      en: { translation: en },
    },
    lng: deviceLanguage, 
    fallbackLng: 'nl', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;