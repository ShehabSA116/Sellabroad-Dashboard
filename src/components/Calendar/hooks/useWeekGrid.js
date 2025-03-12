import { useMemo } from 'react';

export function useWeekGrid(currentDate, events) {
  const getWeekDays = (date) => {
    const week = [];
    const current = new Date(date);
    
    // Get the start of the week (Sunday)
    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - current.getDay());
    
    // Generate array of 7 days starting from Sunday
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      
      week.push({
        date: day.getDate(),
        isCurrentMonth: day.getMonth() === current.getMonth(),
        fullDate: new Date(day),
        isCurrentWeek: true // All days in week view are part of current week
      });
    }
    
    return week;
  };

  const getEventForDate = (date) => {
    return events.find(event => 
      event.isVisible &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  return {
    weekDays,
    getEventForDate
  };
} 