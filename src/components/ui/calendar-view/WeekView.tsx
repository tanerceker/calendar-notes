
import React, { useState, useEffect } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { Note } from '@/types/calendar';

interface WeekViewProps {
  onOpenAddNote: (open: boolean) => void;
  onOpenEditNote: (open: boolean) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ onOpenAddNote, onOpenEditNote }) => {
  const { currentDate, selectedDate, setSelectedDate, getNotesForDate, setSelectedNote } = useCalendar();
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  
  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    setWeekDays(days);
  }, [currentDate]);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getNotesForHour = (date: Date, hour: number): Note[] => {
    const dayNotes = getNotesForDate(date);
    return dayNotes.filter(note => {
      const noteDate = new Date(note.date);
      return noteDate.getHours() === hour;
    });
  };
  
  const handleCellClick = (date: Date, hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    setSelectedDate(newDate);
  };
  
  const handleCellDoubleClick = (date: Date, hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    setSelectedDate(newDate);
    onOpenAddNote(true);
  };
  
  const handleNoteClick = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    setSelectedNote(note);
    onOpenEditNote(true);
  };
  
  return (
    <div className="w-full h-full overflow-auto hide-scrollbar animate-in slide-in">
      <div className="sticky top-0 z-10 bg-background flex">
        <div className="w-16 shrink-0"></div>
        {weekDays.map((day) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          
          return (
            <div 
              key={day.toISOString()} 
              className={`
                flex-1 text-center py-2 
                ${isToday ? 'font-semibold text-primary' : ''}
                ${isSelected ? 'bg-secondary/50' : ''}
              `}
            >
              <div className="text-xs">{format(day, 'EEE')}</div>
              <div className={`text-sm mt-1 ${isToday ? 'text-primary' : ''}`}>
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="relative">
        {hours.map((hour) => (
          <div key={hour} className="flex h-16 border-t border-border">
            <div className="w-16 shrink-0 pr-2 text-xs text-right text-muted-foreground flex items-start pt-1">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            
            {weekDays.map((day) => {
              const notesForHour = getNotesForHour(day, hour);
              const isCurrentHour = new Date().getHours() === hour && isSameDay(day, new Date());
              
              return (
                <div 
                  key={`${day.toISOString()}-${hour}`}
                  className={`
                    flex-1 border-l border-border p-1 relative cursor-pointer
                    ${isCurrentHour ? 'bg-blue-50 dark:bg-blue-950/20' : ''}
                    hover:bg-secondary/30
                  `}
                  onClick={() => handleCellClick(day, hour)}
                  onDoubleClick={() => handleCellDoubleClick(day, hour)}
                >
                  {notesForHour.map((note) => (
                    <div 
                      key={note.id}
                      className="text-xs p-1 mb-1 rounded truncate transition-opacity hover:opacity-90"
                      style={{ 
                        backgroundColor: note.color || '#3498db', 
                        color: 'white'
                      }}
                      title={note.title}
                      onClick={(e) => handleNoteClick(e, note)}
                    >
                      {note.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
