
export type Locale = 'tr' | 'en';

export type TranslationKey = 
  | 'calendarNotes'
  | 'addNote'
  | 'editNote'
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
  | 'weekOf'
  | 'title'
  | 'content'
  | 'date'
  | 'time'
  | 'color'
  | 'tags'
  | 'addTag'
  | 'cancel'
  | 'update'
  | 'save'
  | 'noteAdded'
  | 'noteUpdated'
  | 'noteDeleted'
  | 'successfullyCreated'
  | 'successfullyUpdated'
  | 'successfullyDeleted'
  | 'noNotes'
  | 'allNotesFor'
  | 'currentHour'
  | 'pickDate'
  | 'timeline';

type Translations = {
  [key in Locale]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  tr: {
    calendarNotes: 'Takvim Notları',
    addNote: 'Not Ekle',
    editNote: 'Notu Düzenle',
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
    weekOf: 'Hafta',
    title: 'Başlık',
    content: 'İçerik',
    date: 'Tarih',
    time: 'Saat',
    color: 'Renk',
    tags: 'Etiketler',
    addTag: 'Etiket Ekle',
    cancel: 'İptal',
    update: 'Güncelle',
    save: 'Kaydet',
    noteAdded: 'Not Eklendi',
    noteUpdated: 'Not Güncellendi',
    noteDeleted: 'Not Silindi',
    successfullyCreated: 'Notunuz başarıyla oluşturuldu.',
    successfullyUpdated: 'Notunuz başarıyla güncellendi.',
    successfullyDeleted: 'Notunuz başarıyla silindi.',
    noNotes: 'Bu gün için not bulunmuyor',
    allNotesFor: 'Şu tarih için tüm notlar',
    currentHour: 'Şu anki saat - Not yok',
    pickDate: 'Tarih seçin',
    timeline: 'Zaman Çizelgesi'
  },
  en: {
    calendarNotes: 'Calendar Notes',
    addNote: 'Add Note',
    editNote: 'Edit Note',
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
    weekOf: 'Week of',
    title: 'Title',
    content: 'Content',
    date: 'Date',
    time: 'Time',
    color: 'Color',
    tags: 'Tags',
    addTag: 'Add a tag',
    cancel: 'Cancel',
    update: 'Update',
    save: 'Save',
    noteAdded: 'Note Added',
    noteUpdated: 'Note Updated',
    noteDeleted: 'Note Deleted',
    successfullyCreated: 'Your note has been successfully created.',
    successfullyUpdated: 'Your note has been successfully updated.',
    successfullyDeleted: 'Your note has been successfully deleted.',
    noNotes: 'No notes for this day',
    allNotesFor: 'All Notes for',
    currentHour: 'Current hour - No notes',
    pickDate: 'Pick a date',
    timeline: 'Timeline'
  }
};
