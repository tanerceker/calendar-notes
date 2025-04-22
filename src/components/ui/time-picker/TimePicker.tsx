
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import TimePickerColumn from './TimePickerColumn';
import { useTimePicker } from './useTimePicker';

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
  const { locale } = useLanguage();
  const { 
    hours, 
    minutes, 
    selectedHour, 
    selectedMinute, 
    handleHourClick, 
    handleMinuteClick 
  } = useTimePicker(value, minuteStep, onChange);
  
  const hourTitle = locale === 'tr' ? 'Saat' : 'Hour';
  const minuteTitle = locale === 'tr' ? 'Dakika' : 'Minute';

  return (
    <div className={cn("flex gap-4 p-2", className)}>
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
