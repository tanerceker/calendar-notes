
import React, { useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { tr, enUS } from 'date-fns/locale';
import { getFormattedDate } from '@/lib/calendar-utils';
import TimePicker from '@/components/ui/time-picker/TimePicker';

interface NoteFormFieldsProps {
  title: string;
  content: string;
  date: Date;
  time: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setDate: (date: Date | undefined) => void;
  setTime: (time: string) => void;
  timePickerOpen: boolean;
  setTimePickerOpen: (open: boolean) => void;
}

const NoteFormFields: React.FC<NoteFormFieldsProps> = ({
  title,
  content,
  date,
  time,
  setTitle,
  setContent,
  setDate,
  setTime,
  timePickerOpen,
  setTimePickerOpen
}) => {
  const { t, locale } = useLanguage();
  
  const handleTimeChange = useCallback((newTime: string) => {
    setTime(newTime);
    // Time picker artık seçim sonrası kapanmayacak
  }, [setTime]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          {t('title')}
        </label>
        <Input
          id="title"
          placeholder={t('title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="focus-ring"
        />
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="content" className="text-sm font-medium">
          {t('content')}
        </label>
        <Textarea
          id="content"
          placeholder={t('content')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] focus-ring"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t('date')}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left text-sm font-normal focus-ring",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? getFormattedDate(date, locale) : <span>{t('date')}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                className="p-3 pointer-events-auto"
                locale={locale === 'tr' ? tr : enUS}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="time" className="text-sm font-medium">
            {t('time')}
          </label>
          <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left text-sm font-normal focus-ring",
                  !time && "text-muted-foreground"
                )}
              >
                <Clock className="mr-2 h-4 w-4" />
                {time || "--:--"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 pointer-events-auto" align="start">
              <TimePicker 
                value={time} 
                onChange={handleTimeChange}
              />
              <div className="mt-2 flex justify-end">
                <Button 
                  size="sm" 
                  onClick={() => setTimePickerOpen(false)}
                  variant="outline"
                >
                  {t('done')}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoteFormFields);
