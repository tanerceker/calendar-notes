
import React, { useState, useEffect, useRef } from 'react';
import { getHoursArray, getMinutesArray, parseTimeString } from '@/lib/calendar-utils';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

interface TimePickerProps {
  value: string; // "HH:mm" format
  onChange: (value: string) => void;
  minuteStep?: number;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  minuteStep = 5,
  className
}) => {
  const { t, locale } = useLanguage();
  const { hours: initialHours, minutes: initialMinutes } = parseTimeString(value);
  
  const [selectedHour, setSelectedHour] = useState<string>(initialHours);
  const [selectedMinute, setSelectedMinute] = useState<string>(initialMinutes);
  
  const hours = getHoursArray();
  const minutes = getMinutesArray(minuteStep);
  
  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);
  
  // Scroll to selected values on mount
  useEffect(() => {
    if (hourListRef.current) {
      const hourElement = hourListRef.current.querySelector(`[data-value="${selectedHour}"]`);
      if (hourElement) {
        hourListRef.current.scrollTop = (hourElement as HTMLElement).offsetTop - 80;
      }
    }
    
    if (minuteListRef.current) {
      const minuteElement = minuteListRef.current.querySelector(`[data-value="${selectedMinute}"]`);
      if (minuteElement) {
        minuteListRef.current.scrollTop = (minuteElement as HTMLElement).offsetTop - 80;
      }
    }
  }, []);
  
  // Update value when hour or minute changes
  useEffect(() => {
    onChange(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute]);
  
  // Update local state if props value changes
  useEffect(() => {
    const { hours, minutes } = parseTimeString(value);
    setSelectedHour(hours);
    setSelectedMinute(minutes);
  }, [value]);
  
  const handleHourClick = (hour: string) => {
    setSelectedHour(hour);
  };
  
  const handleMinuteClick = (minute: string) => {
    setSelectedMinute(minute);
  };
  
  return (
    <div className={cn("flex gap-2", className)}>
      <div className="flex-1 flex flex-col">
        <div className="text-xs font-medium text-muted-foreground text-center pb-1 border-b">
          {locale === 'tr' ? 'Saat' : 'Hour'}
        </div>
        <div 
          ref={hourListRef}
          className="h-[180px] overflow-y-auto scrollbar-thin flex flex-col items-stretch"
        >
          {hours.map((hour) => (
            <Button
              key={hour}
              data-value={hour}
              variant={selectedHour === hour ? "default" : "ghost"}
              className={cn(
                "my-1 rounded-md",
                selectedHour === hour ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
              onClick={() => handleHourClick(hour)}
            >
              {hour}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="text-xs font-medium text-muted-foreground text-center pb-1 border-b">
          {locale === 'tr' ? 'Dakika' : 'Minute'}
        </div>
        <div 
          ref={minuteListRef}
          className="h-[180px] overflow-y-auto scrollbar-thin flex flex-col items-stretch"
        >
          {minutes.map((minute) => (
            <Button
              key={minute}
              data-value={minute}
              variant={selectedMinute === minute ? "default" : "ghost"}
              className={cn(
                "my-1 rounded-md",
                selectedMinute === minute ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
              onClick={() => handleMinuteClick(minute)}
            >
              {minute}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
