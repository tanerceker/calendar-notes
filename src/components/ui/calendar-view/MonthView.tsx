
import React, { useState, useEffect } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { generateCalendarMonth } from '@/lib/calendar-utils';
import { format } from 'date-fns';
import { CalendarMonth } from '@/types/calendar';
import NoteDot from '@/components/ui/notes/NoteDot';

interface MonthViewProps {
  onOpenAddNote: (open: boolean) => void;
  onOpenEditNote: (open: boolean) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ onOpenAddNote, onOpenEditNote }) => {
  const { currentDate, selectedDate, setSelectedDate, notes, setSelectedNote } = useCalendar();
  const [calendarData, setCalendarData] = useState<CalendarMonth | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  
  useEffect(() => {
    const data = generateCalendarMonth(currentDate, notes);
    setCalendarData(data);
  }, [currentDate, notes]);
  
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  if (!calendarData) {
    return <div className="h-full flex items-center justify-center">Loading calendar...</div>;
  }
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleDateDoubleClick = (date: Date) => {
    setSelectedDate(date);
    onOpenAddNote(true);
  };
  
  const handleNoteClick = (e: React.MouseEvent, note: any) => {
    e.stopPropagation(); // Prevent triggering cell click
    setSelectedNote(note);
    onOpenEditNote(true);
  };
  
  return (
    <div className="w-full h-full flex flex-col overflow-hidden animate-in slide-in">
      <div className="calendar-grid mb-1">
        {weekdays.map((day) => (
          <div 
            key={day} 
            className="text-xs font-medium text-muted-foreground p-2 text-center"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-grid gap-1 flex-1">
        {calendarData.weeks.flatMap(week => 
          week.days.map((day, dayIndex) => {
            const isSelected = day.date.getDate() === selectedDate.getDate() && 
                               day.date.getMonth() === selectedDate.getMonth() &&
                               day.date.getFullYear() === selectedDate.getFullYear();
            
            return (
              <div
                key={`${day.date.toISOString()}-${dayIndex}`}
                className={`
                  relative h-full p-1 rounded-md flex flex-col items-start transition-all duration-200
                  ${day.isCurrentMonth ? 'bg-background hover:bg-secondary/50 cursor-pointer' : 'bg-muted/30 text-muted-foreground'}
                  ${day.isToday ? 'today-cell font-semibold border border-calendar-today' : ''}
                  ${isSelected ? 'ring-1 ring-primary' : ''}
                `}
                onClick={() => handleDateClick(day.date)}
                onDoubleClick={() => handleDateDoubleClick(day.date)}
              >
                <span className="text-xs p-1 w-6 h-6 flex items-center justify-center">
                  {format(day.date, 'd')}
                </span>
                
                <div className="w-full flex flex-wrap gap-1 mt-1 overflow-hidden">
                  {day.notes.slice(0, 3).map((note) => (
                    <div 
                      key={note.id} 
                      className="w-full px-1.5 py-0.5 text-xs truncate rounded bg-background cursor-pointer hover:bg-opacity-80"
                      style={{ backgroundColor: note.color ? `${note.color}10` : undefined }}
                      onClick={(e) => handleNoteClick(e, note)}
                    >
                      {note.title}
                    </div>
                  ))}
                  
                  {day.notes.length > 3 && (
                    <div className="text-xs text-muted-foreground px-1.5">
                      {day.notes.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MonthView;
