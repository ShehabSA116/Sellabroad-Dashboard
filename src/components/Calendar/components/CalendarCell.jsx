import React from 'react';
import { SuggestionCard } from './SuggestionCard';

export function CalendarCell({ 
  day, 
  showSuggestions, 
  dismissed, 
  onDismiss, 
  getEventForDate, 
  navigate,
  isWeekView = false // New prop for week view
}) {
  const today = new Date();
  const isToday = day.fullDate.getDate() === today.getDate() &&
                  day.fullDate.getMonth() === today.getMonth() &&
                  day.fullDate.getFullYear() === today.getFullYear();

  return (
    <td
      className={`relative p-2 ${
        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
      } align-top w-[calc(100%/7)]`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex flex-col ${isWeekView ? 'mb-4' : ''}`}>
          {isWeekView && (
            <span className="text-xs text-gray-500 mb-1">
              {day.fullDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          )}
          <time
            dateTime={day.fullDate.toISOString()}
            className={`ml-1 flex h-6 w-6 items-center justify-center rounded-full text-sm ${
              isToday
                ? 'bg-[#0049ac] text-white'
                : day.isCurrentMonth
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            {day.date}
          </time>
        </div>
        
        {/* Space for campaigns */}
        <div className={isWeekView ? "h-32" : "h-20"} /> {/* More space in week view */}

        {/* Events */}
        {(day.isCurrentMonth || isWeekView) && showSuggestions && (
          <div className="mt-1 px-1">
            {(() => {
              const event = getEventForDate(day.fullDate);
              return event ? (
                !dismissed.includes(event.id) && (
                <div className="scale-90 origin-top">
                  <SuggestionCard 
                    event={event} 
                    onDismiss={onDismiss}
                    navigate={navigate}
                  />
                </div>
                )
              ) : null;
            })()}
          </div>
        )}
      </div>
    </td>
  );
} 