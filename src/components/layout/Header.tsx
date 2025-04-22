
import React from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { Button } from '@/components/ui/button';
import { CalendarMode } from '@/types/calendar';
import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onAddNote: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNote }) => {
  const { 
    currentDate, 
    calendarMode, 
    setCalendarMode, 
    nextPeriod, 
    prevPeriod 
  } = useCalendar();

  const viewOptions: { label: string; value: CalendarMode }[] = [
    { label: 'Month', value: 'month' },
    { label: 'Week', value: 'week' },
    { label: 'Day', value: 'day' },
  ];

  const getHeaderTitle = (): string => {
    switch (calendarMode) {
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        return `Week of ${format(currentDate, 'MMMM d, yyyy')}`;
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
      default:
        return '';
    }
  };

  return (
    <header className="flex items-center justify-between p-4 glass-effect sticky top-0 z-10 animate-in fade-in">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold text-balance">Calendar Notes</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPeriod}
            aria-label="Previous"
            className="focus-ring h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium mx-2 min-w-28 text-center">
            {getHeaderTitle()}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPeriod}
            aria-label="Next"
            className="focus-ring h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          {viewOptions.map((option) => (
            <Button
              key={option.value}
              variant={calendarMode === option.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCalendarMode(option.value)}
              className="text-xs focus-ring px-3"
            >
              {option.label}
            </Button>
          ))}
        </div>
        
        <Button
          variant="default"
          size="sm"
          onClick={onAddNote}
          className="focus-ring"
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Note</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
