
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
  | 'timeline'
  | 'loading'
  | 'moreNotes'
  | 'today'
  | 'delete'
  | 'confirmDelete'
  | 'confirmDeleteMessage'
  | 'welcome'
  | 'welcomeNote'
  | 'createNote'
  | 'updateNote'
  | 'deleteWarning'
  | 'clickAddNote'
  | 'work'
  | 'personal'
  | 'important'
  | 'meeting'
  | 'reminder'
  | 'idea'
  | 'task'
  | 'year'  
  | 'selectYear'
  | 'selectMonth'
  | 'markComplete'
  | 'markIncomplete'
  | 'edit'
  | 'pin'
  | 'unpin';

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
    pickDate: 'Tarih seçin',
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
    unpin: 'Sabitliği kaldır'
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
    unpin: 'Unpin'
  }
};
