import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function CalendarNavigation({ 
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday
}) {
  const formatMonthYear = (date) => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onToday}
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
      >
        Today
      </button>

      <div className="flex items-center space-x-2">
        <button
          onClick={onPrevious}
          className="p-2 text-gray-400 hover:text-gray-500"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
          {formatMonthYear(currentDate)}
        </span>
        <button
          onClick={onNext}
          className="p-2 text-gray-400 hover:text-gray-500"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 