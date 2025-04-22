
import React, { useState, useEffect } from 'react';
import { getHoursArray, getMinutesArray, parseTimeString } from '@/lib/calendar-utils';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import TimePickerColumn from './TimePickerColumn';

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
  
  // Scroll to selected values on mount
  useEffect(() => {
    setTimeout(() => {
      const hourElement = document.querySelector(`[data-hour="${selectedHour}"]`);
      const minuteElement = document.querySelector(`[data-minute="${selectedMinute}"]`);
      
      if (hourElement) {
        hourElement.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
      
      if (minuteElement) {
        minuteElement.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }, 100);
  }, [selectedHour, selectedMinute]);
  
  // Update value when hour or minute changes
  useEffect(() => {
    onChange(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute, onChange]);
  
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
  
  const hourTitle = locale === 'tr' ? 'Saat' : 'Hour';
  const minuteTitle = locale === 'tr' ? 'Dakika' : 'Minute';

  return (
    <div className={cn("flex gap-2", className)}>
      <TimePickerColumn
        title={hourTitle}
        items={hours}
        selectedItem={selectedHour}
        onItemClick={handleHourClick}
        dataAttrKey="hour"
      />
      
      <TimePickerColumn
        title={minuteTitle}
        items={minutes}
        selectedItem={selectedMinute}
        onItemClick={handleMinuteClick}
        dataAttrKey="minute"
      />
    </div>
  );
};

export default React.memo(TimePicker);
