
export type Locale = 'tr' | 'en';

export type TranslationKey = 
  | 'calendarNotes'
  | 'addNote'
  | 'month'
  | 'week'
  | 'day'
  | 'lightMode'
  | 'darkMode'
  | 'language'
  | 'turkish'
  | 'english'
  | 'notFound'
  | 'pageNotFound'
  | 'returnToCalendar'
  | 'weekOf';

type Translations = {
  [key in Locale]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  tr: {
    calendarNotes: 'Takvim Notları',
    addNote: 'Not Ekle',
    month: 'Ay',
    week: 'Hafta',
    day: 'Gün',
    lightMode: 'Aydınlık Mod',
    darkMode: 'Karanlık Mod',
    language: 'Dil',
    turkish: 'Türkçe',
    english: 'İngilizce',
    notFound: 'Bulunamadı',
    pageNotFound: 'Hata! Aradığınız sayfa mevcut değil.',
    returnToCalendar: 'Takvime Dön',
    weekOf: 'Hafta'
  },
  en: {
    calendarNotes: 'Calendar Notes',
    addNote: 'Add Note',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    language: 'Language',
    turkish: 'Turkish',
    english: 'English',
    notFound: 'Not Found',
    pageNotFound: 'Oops! The page you are looking for doesn\'t exist.',
    returnToCalendar: 'Return to Calendar',
    weekOf: 'Week of'
  }
};
