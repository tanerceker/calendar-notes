
import React, { createContext, useContext, useState, useEffect } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import { CalendarMode, Note } from '@/types/calendar';
import { generateCalendarMonth } from '@/lib/calendar-utils';
import { toast } from '@/hooks/use-toast';

interface CalendarContextType {
  currentDate: Date;
  selectedDate: Date;
  calendarMode: CalendarMode;
  notes: Note[];
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  setCalendarMode: (mode: CalendarMode) => void;
  nextPeriod: () => void;
  prevPeriod: () => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  getNotesForDate: (date: Date) => Note[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Calendar Notes',
    content: 'This is a sample note to get you started.',
    date: new Date(),
    tags: ['welcome'],
    color: '#3498db',
    reminder: null,
    isPinned: true,
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarMode, setCalendarMode] = useState<CalendarMode>('month');
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  
  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendarNotes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          date: new Date(note.date),
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
          reminder: note.reminder ? new Date(note.reminder) : null,
        }));
        setNotes(parsedNotes);
      } catch (error) {
        console.error('Failed to parse saved notes:', error);
      }
    }
  }, []);
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  }, [notes]);
  
  const nextPeriod = () => {
    switch (calendarMode) {
      case 'month':
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case 'day':
        setCurrentDate(addDays(currentDate, 1));
        setSelectedDate(addDays(selectedDate, 1));
        break;
    }
  };
  
  const prevPeriod = () => {
    switch (calendarMode) {
      case 'month':
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case 'day':
        setCurrentDate(subDays(currentDate, 1));
        setSelectedDate(subDays(selectedDate, 1));
        break;
    }
  };
  
  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes([...notes, newNote]);
    toast({
      title: "Note Added",
      description: "Your note has been successfully created.",
    });
  };
  
  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date() } 
        : note
    ));
    toast({
      title: "Note Updated",
      description: "Your note has been successfully updated.",
    });
  };
  
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note Deleted",
      description: "Your note has been successfully deleted.",
    });
  };
  
  const getNotesForDate = (date: Date): Note[] => {
    return notes.filter(note => {
      const noteDate = new Date(note.date);
      return noteDate.getDate() === date.getDate() &&
             noteDate.getMonth() === date.getMonth() &&
             noteDate.getFullYear() === date.getFullYear();
    });
  };
  
  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDate,
        calendarMode,
        notes,
        setCurrentDate,
        setSelectedDate,
        setCalendarMode,
        nextPeriod,
        prevPeriod,
        addNote,
        updateNote,
        deleteNote,
        getNotesForDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
