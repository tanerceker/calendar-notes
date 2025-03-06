
import { addDays, startOfWeek, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, format } from 'date-fns';
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

export function getDayName(date: Date, format: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('en', { weekday: format }).format(date);
}

export function getMonthName(date: Date, format: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('en', { month: format }).format(date);
}

export function getFormattedDate(date: Date): string {
  return format(date, 'PPP');
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
