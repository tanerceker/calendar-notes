
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations, Locale, TranslationKey } from '@/lib/i18n';

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('tr');

  useEffect(() => {
    // Check for saved locale in localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'tr' || savedLocale === 'en')) {
      setLocale(savedLocale);
    } else {
      // Check browser language as fallback
      const browserLang = navigator.language.split('-')[0];
      setLocale(browserLang === 'tr' ? 'tr' : 'en');
    }
  }, []);

  useEffect(() => {
    // Update localStorage when locale changes
    localStorage.setItem('locale', locale);
    // Update HTML lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
