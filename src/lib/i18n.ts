
import { TranslationKey } from '@/types/translations';

export type Locale = 'tr' | 'en';

export const translations: {
  [key in Locale]: {
    [key in TranslationKey]: string;
  };
} = {
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
    timeline: 'Zaman Çizelgesi',
    loading: 'Yükleniyor...',
    moreNotes: 'daha fazla',
    today: 'Bugün',
    delete: 'Sil',
    confirmDelete: 'Silmeyi Onayla',
    confirmDeleteMessage: 'Bu notu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    welcome: 'Hoş Geldiniz',
    welcomeNote: 'Takvim Notları uygulamasına hoş geldiniz! Başlamak için bir not ekleyin.',
    createNote: 'Not oluştur',
    updateNote: 'Notu güncelle',
    deleteWarning: 'Bu notu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    clickAddNote: 'Bir not eklemek için tıklayın',
    work: 'iş',
    personal: 'kişisel',
    important: 'önemli',
    meeting: 'toplantı',
    reminder: 'hatırlatıcı',
    idea: 'fikir',
    task: 'görev',
    year: 'Yıl',
    selectYear: 'Yıl seçin',
    selectMonth: 'Ay seçin',
    markComplete: 'Tamamlandı olarak işaretle',
    markIncomplete: 'Tamamlanmadı olarak işaretle',
    edit: 'Düzenle',
    pin: 'Sabitle',
    unpin: 'Sabitliği kaldır',
    confirm: 'Onayla',
    deleteNotePrompt: 'Notu silmek istediğinizden emin misiniz?',
    completed: 'Tamamlandı',
    incomplete: 'Tamamlanmadı',
    thisWeek: 'Bu Hafta',
    thisMonth: 'Bu Ay',
    older: 'Daha Eski',
    search: 'Ara',
    filterByTag: 'Etikete Göre Filtrele',
    noNotesFound: 'Not Bulunamadı',
    all: 'Tümü',
    pinned: 'Sabitlenmiş',
    notes: 'Notlar',
    sortBy: 'Sırala',
    dateCreated: 'Oluşturulma Tarihi',
    priority: 'Öncelik',
    selectTags: 'Etiketleri Seç',
    createNewTag: 'Yeni Etiket Oluştur',
    showCalendar: 'Takvimi Göster',
    showNotes: 'Notları Göster'
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
    timeline: 'Timeline',
    loading: 'Loading...',
    moreNotes: 'more',
    today: 'Today',
    delete: 'Delete',
    confirmDelete: 'Confirm Delete',
    confirmDeleteMessage: 'Are you sure you want to delete this note? This action cannot be undone.',
    welcome: 'Welcome',
    welcomeNote: 'Welcome to Calendar Notes! Add a note to get started.',
    createNote: 'Create a note',
    updateNote: 'Update note',
    deleteWarning: 'Are you sure you want to delete this note? This action cannot be undone.',
    clickAddNote: 'Click to add a note',
    work: 'work',
    personal: 'personal',
    important: 'important',
    meeting: 'meeting',
    reminder: 'reminder',
    idea: 'idea',
    task: 'task',
    year: 'Year',
    selectYear: 'Select Year',
    selectMonth: 'Select Month',
    markComplete: 'Mark as Complete',
    markIncomplete: 'Mark as Incomplete',
    edit: 'Edit',
    pin: 'Pin',
    unpin: 'Unpin',
    confirm: 'Confirm',
    deleteNotePrompt: 'Are you sure you want to delete this note?',
    completed: 'Completed',
    incomplete: 'Incomplete',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    older: 'Older',
    search: 'Search',
    filterByTag: 'Filter by Tag',
    noNotesFound: 'No Notes Found',
    all: 'All',
    pinned: 'Pinned',
    notes: 'Notes',
    sortBy: 'Sort By',
    dateCreated: 'Date Created',
    priority: 'Priority',
    selectTags: 'Select Tags',
    createNewTag: 'Create New Tag',
    showCalendar: 'Show Calendar',
    showNotes: 'Show Notes'
  }
};
