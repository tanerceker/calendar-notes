
import { addDays, startOfWeek, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { CalendarDay, CalendarMonth, CalendarWeek, Note } from '@/types/calendar';

export function generateCalendarMonth(date: Date, notes: Note[] = []): CalendarMonth {
  const month = date.getMonth();
  const year = date.getFullYear();
  
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // Week starts on Monday
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
  
  const weeks: CalendarWeek[] = [];
  let currentWeek: CalendarDay[] = [];
  let currentDate = startDate;
  
  const today = new Date();
  
  while (currentDate <= endDate) {
    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
    
    const dayNotes = notes.filter(note => 
      isSameDay(new Date(note.date), currentDate)
    );
    
    currentWeek.push({
      date: new Date(currentDate),
      isCurrentMonth: isSameMonth(currentDate, date),
      isToday: isSameDay(currentDate, today),
      isSelected: false,
      notes: dayNotes
    });
    
    currentDate = addDays(currentDate, 1);
  }
  
  if (currentWeek.length > 0) {
    weeks.push({ days: currentWeek });
  }
  
  return {
    month,
    year,
    weeks
  };
}

export function getDayName(date: Date, locale: 'tr' | 'en' = 'en', format: 'long' | 'short' = 'long'): string {
  const dateLocale = locale === 'tr' ? tr : enUS;
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(date);
}

export function getMonthName(date: Date, locale: 'tr' | 'en' = 'en', format: 'long' | 'short' = 'long'): string {
  const dateLocale = locale === 'tr' ? tr : enUS;
  return new Intl.DateTimeFormat(locale, { month: format }).format(date);
}

export function getFormattedDate(date: Date, locale: 'tr' | 'en' = 'en'): string {
  const dateLocale = locale === 'tr' ? tr : enUS;
  return format(date, 'PPP', { locale: dateLocale });
}

export function getFormattedDateTime(date: Date, locale: 'tr' | 'en' = 'en'): string {
  const dateLocale = locale === 'tr' ? tr : enUS;
  return format(date, 'PPpp', { locale: dateLocale });
}

export function getFormattedTime(date: Date, locale: 'tr' | 'en' = 'en'): string {
  const dateLocale = locale === 'tr' ? tr : enUS;
  if (locale === 'tr') {
    // 24-hour format for Turkish
    return format(date, 'HH:mm', { locale: dateLocale });
  } else {
    // 12-hour format for English
    return format(date, 'h:mm a', { locale: dateLocale });
  }
}

export function groupNotesByDate(notes: Note[]): Record<string, Note[]> {
  return notes.reduce((acc, note) => {
    const dateKey = format(new Date(note.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(note);
    return acc;
  }, {} as Record<string, Note[]>);
}
