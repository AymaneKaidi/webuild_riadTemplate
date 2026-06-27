import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

// Retrieve saved language or default to 'en'
const savedLang = localStorage.getItem('dar-safaa-lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Setup document direction and lang attributes on load and language change
const updateDocumentContext = (lang: string) => {
  const isRtl = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  localStorage.setItem('dar-safaa-lang', lang);
};

// Run initially
updateDocumentContext(savedLang);

// Listen for changes
i18n.on('languageChanged', updateDocumentContext);

export default i18n;
