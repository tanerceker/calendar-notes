
import React, { useState, useEffect } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { useLanguage } from '@/context/LanguageContext';
import { format } from 'date-fns';
import { Note } from '@/types/calendar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const DayView: React.FC = () => {
  const { selectedDate, getNotesForDate } = useCalendar();
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isTimelineOpen, setIsTimelineOpen] = useState(true);
  
  useEffect(() => {
    setNotes(getNotesForDate(selectedDate));
  }, [selectedDate, getNotesForDate]);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getNotesForHour = (hour: number): Note[] => {
    return notes.filter(note => {
      const noteDate = new Date(note.date);
      return noteDate.getHours() === hour;
    });
  };
  
  const currentHour = new Date().getHours();
  
  return (
    <div className="flex flex-col h-full animate-in slide-in">
      <div className="text-center p-4">
        <h2 className="text-lg font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
        <p className="text-sm text-muted-foreground">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'} for today
        </p>
      </div>
      
      <Separator />
      
      <Collapsible
        open={isTimelineOpen}
        onOpenChange={setIsTimelineOpen}
        className="flex-1 overflow-auto hide-scrollbar"
      >
        <CollapsibleTrigger className="flex items-center justify-center w-full p-2 text-sm text-muted-foreground hover:bg-secondary/50">
          {t('timeline')} {isTimelineOpen ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="flex-1">
          <div className="space-y-1 p-2">
            {hours.map((hour) => {
              const hourNotes = getNotesForHour(hour);
              const isCurrentHour = hour === currentHour;
              
              return (
                <div key={hour} className="flex">
                  <div 
                    className={cn(
                      "w-16 shrink-0 text-xs text-right pr-2 py-2",
                      isCurrentHour ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                  >
                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                  </div>
                  
                  <div 
                    className={cn(
                      "flex-1 border-l-2 pl-4 py-2 min-h-[3rem] transition-colors",
                      isCurrentHour ? "border-primary" : "border-border",
                      hourNotes.length > 0 ? "bg-secondary/10" : ""
                    )}
                  >
                    {hourNotes.length > 0 ? (
                      <div className="space-y-2">
                        {hourNotes.map((note) => (
                          <div 
                            key={note.id}
                            className="p-2 rounded-md text-sm transition-all hover:translate-x-1"
                            style={{ 
                              backgroundColor: note.color ? `${note.color}15` : undefined,
                              borderLeft: `3px solid ${note.color || '#3498db'}`
                            }}
                          >
                            <div className="font-medium">{note.title}</div>
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {note.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground/50 italic">
                        {isCurrentHour ? t('currentHour') : t('noNotes')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      <div className="p-4">
        <h3 className="text-sm font-medium mb-3">{t('allNotesFor')} {format(selectedDate, 'MMMM d')}</h3>
        
        {notes.length > 0 ? (
          <div className="space-y-3">
            {notes.map((note) => (
              <div 
                key={note.id}
                className="p-3 rounded-lg card-shadow bg-background transition-all hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">{note.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(note.date), 'h:mm a')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                  {note.content}
                </p>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            <p>{t('noNotes')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayView;
