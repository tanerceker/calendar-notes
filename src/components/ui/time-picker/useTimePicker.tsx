
import { useState, useEffect, useCallback } from 'react';
import { getHoursArray, getMinutesArray, parseTimeString } from '@/lib/calendar-utils';

export const useTimePicker = (initialValue: string, minuteStep: number = 5) => {
  const { hours: initialHours, minutes: initialMinutes } = parseTimeString(initialValue);
  
  const [selectedHour, setSelectedHour] = useState<string>(initialHours);
  const [selectedMinute, setSelectedMinute] = useState<string>(initialMinutes);
  
  const hours = getHoursArray();
  const minutes = getMinutesArray(minuteStep);
  
  // Update local state if props value changes
  useEffect(() => {
    const { hours, minutes } = parseTimeString(initialValue);
    setSelectedHour(hours);
    setSelectedMinute(minutes);
  }, [initialValue]);
  
  // Scroll to selected values on mount with a safe timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const hourElement = document.querySelector(`[data-hour="${selectedHour}"]`);
        const minuteElement = document.querySelector(`[data-minute="${selectedMinute}"]`);
        
        if (hourElement) {
          hourElement.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
        
        if (minuteElement) {
          minuteElement.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
      } catch (err) {
        console.error("Error scrolling time picker into view:", err);
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [selectedHour, selectedMinute]);
  
  const handleHourClick = useCallback((hour: string) => {
    setSelectedHour(hour);
  }, []);
  
  const handleMinuteClick = useCallback((minute: string) => {
    setSelectedMinute(minute);
  }, []);
  
  return {
    hours,
    minutes,
    selectedHour,
    selectedMinute,
    handleHourClick,
    handleMinuteClick
  };
};
