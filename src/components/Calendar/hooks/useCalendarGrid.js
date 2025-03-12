import { useMemo } from 'react';

export function useCalendarGrid(currentDate, events) {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
  
    const days = [];
    let week = [];
  
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      week.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }
  
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      week.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i)
      });
  
      if (week.length === 7) {
        days.push(week);
        week = [];
      }
    }
  
    // Add days from next month
    if (week.length > 0) {
      const daysNeeded = 7 - week.length;
      for (let i = 1; i <= daysNeeded; i++) {
        week.push({
          date: i,
          isCurrentMonth: false,
          fullDate: new Date(year, month + 1, i)
        });
      }
      days.push(week);
    }
  
    return days;
  };

  const getEventForDate = (date) => {
    return events.find(event => 
      event.isVisible &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const calendarDays = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  return {
    calendarDays,
    getEventForDate
  };
} 