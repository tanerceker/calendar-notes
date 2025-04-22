
import React, { useCallback } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { CalendarMode } from '@/types/calendar';
import { format, setMonth } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Moon, 
  Sun, 
  Globe,
  CalendarDays
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        // Remove the "Hafta" word and just display the date
        return format(currentDate, 'MMMM d, yyyy', { locale: dateLocale });
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy', { locale: dateLocale });
      default:
        return '';
    }
  }, [calendarMode, currentDate, dateLocale]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);

  const handleMonthChange = useCallback((monthIndex: string) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(parseInt(monthIndex, 10));
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  const months = useCallback(() => {
    const monthsArray = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), i, 1);
      monthsArray.push({
        value: i.toString(),
        label: format(date, 'MMMM', { locale: dateLocale })
      });
    }
    return monthsArray;
  }, [currentDate, dateLocale]);

  const currentMonthIndex = currentDate.getMonth().toString();

  return (
    <header className="flex items-center justify-between p-2 glass-effect sticky top-0 z-10 animate-in fade-in">
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
            
            {calendarMode === 'month' ? (
              <div className="flex items-center space-x-1">
                <Select value={currentMonthIndex} onValueChange={handleMonthChange}>
                  <SelectTrigger className="w-[130px] h-8 text-sm border-none focus-visible:ring-0 font-medium">
                    <SelectValue>
                      {format(currentDate, 'MMMM', { locale: dateLocale })}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {months().map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm font-medium">
                  {format(currentDate, 'yyyy', { locale: dateLocale })}
                </span>
              </div>
            ) : (
              <span className="text-sm font-medium mx-2 min-w-28 text-center">
                {getHeaderTitle()}
              </span>
            )}
            
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
