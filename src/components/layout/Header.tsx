
import React, { useCallback } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { CalendarMode } from '@/types/calendar';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Moon, 
  Sun, 
  Globe 
} from 'lucide-react';
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
    prevPeriod,
    setCurrentDate 
  } = useCalendar();
  
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const dateLocale = locale === 'tr' ? tr : enUS;

  const viewOptions: { label: string; value: CalendarMode }[] = [
    { label: t('month'), value: 'month' },
    { label: t('week'), value: 'week' },
    { label: t('day'), value: 'day' },
  ];

  const getHeaderTitle = useCallback((): string => {
    switch (calendarMode) {
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: dateLocale });
      case 'week':
        return `${t('weekOf')} ${format(currentDate, 'MMMM d, yyyy', { locale: dateLocale })}`;
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy', { locale: dateLocale });
      default:
        return '';
    }
  }, [calendarMode, currentDate, dateLocale, t]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);

  return (
    <header className="flex items-center justify-between p-4 glass-effect sticky top-0 z-10 animate-in fade-in">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold text-balance">{t('calendarNotes')}</h1>
      </div>
      
      <div className="flex flex-1 justify-center">
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
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-xs focus-ring px-3"
          >
            {t('today')}
          </Button>
          
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
            <span>{t('addNote')}</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="focus-ring h-8 w-8">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLocale('tr')}>
              🇹🇷 {t('turkish')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLocale('en')}>
              🇬🇧 {t('english')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="focus-ring h-8 w-8"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
