import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import en from './locales/en.json';
import hi from './locales/hi.json';
import tel from './locales/tel.json';

// Create a resource object
const resources = {
  en: {
    translation: en.translation,
  },
  hi: {
    translation: hi.translation,
  },
  tel: {
    translation: tel.translation,
  },
};

i18n
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // language to use if translation is missing for a key
    
    // interpolation settings to prevent XSS issues
    interpolation: {
      escapeValue: false, 
    },
    
    // settings for react-i18next
    react: {
      useSuspense: false, // Set to true if you wrap components in React Suspense
    },
  });

export default i18n;