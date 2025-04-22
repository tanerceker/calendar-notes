
import React, { useCallback, useState } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { CalendarMode } from '@/types/calendar';
import { format, setMonth, setYear } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Moon, 
  Sun, 
  Globe,
  ChevronsUpDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

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

  // Month array with names
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(currentDate.getFullYear(), index, 1);
    return {
      name: format(monthDate, 'MMMM', { locale: dateLocale }),
      value: index
    };
  });

  // Get an array of years (current year -10 to +10)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);

  const handleMonthSelect = (month: number) => {
    const newDate = setMonth(currentDate, month);
    setCurrentDate(newDate);
    setMonthPickerOpen(false);
  };

  const handleYearSelect = (year: string) => {
    const newDate = setYear(currentDate, parseInt(year));
    setCurrentDate(newDate);
  };

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
            
            <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost"
                  className="text-sm font-medium min-w-28 text-center flex items-center space-x-1"
                >
                  <span>{getHeaderTitle()}</span>
                  <ChevronsUpDown className="h-3.5 w-3.5 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-auto p-0 bg-card shadow-lg border rounded-md" 
                align="center" 
                sideOffset={4}
              >
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('year')}</h3>
                    <Select
                      value={currentDate.getFullYear().toString()}
                      onValueChange={handleYearSelect}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('selectYear')} />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('month')}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {months.map((month) => (
                        <Button
                          key={month.value}
                          variant={currentDate.getMonth() === month.value ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleMonthSelect(month.value)}
                          className="h-9 text-xs capitalize"
                        >
                          {month.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
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
