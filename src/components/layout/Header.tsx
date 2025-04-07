
import React, { useCallback } from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Calendar, Plus } from 'lucide-react';
import HeaderDatePicker from './HeaderDatePicker';
import HeaderViewToggle from './HeaderViewToggle';
import HeaderControls from './HeaderControls';
import HeaderNavigation from './HeaderNavigation';

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
  
  const { locale, t } = useLanguage();
  const dateLocale = locale === 'tr' ? tr : enUS;

  const getHeaderTitle = useCallback((): string => {
    switch (calendarMode) {
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: dateLocale });
      case 'week':
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

  return (
    <header className="flex items-center justify-between p-2 glass-effect sticky top-0 z-10 animate-in fade-in">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-semibold text-balance">{t('calendarNotes')}</h1>
      </div>
      
      <div className="flex flex-1 justify-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <HeaderNavigation 
              prevPeriod={prevPeriod}
              nextPeriod={nextPeriod}
              goToToday={goToToday}
            />
            
            <HeaderDatePicker 
              currentDate={currentDate}
              calendarMode={calendarMode}
              getHeaderTitle={getHeaderTitle}
            />
          </div>
          
          <HeaderViewToggle 
            calendarMode={calendarMode}
            setCalendarMode={setCalendarMode}
          />
          
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
      
      <HeaderControls />
    </header>
  );
};

export default Header;
