import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MonthView from './MonthView';
import WeekView from './WeekView';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToPreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
  };

  const goToNextWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatMonthYear = (date) => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
  };

  // Calculate scale and dimensions based on window width
  const scale = windowWidth < 768 ? 0.7 : 1;
  const scaledDimensions = {
    transform: `scale(${scale})`,
    width: windowWidth < 768 ? '143%' : '100%',
    height: windowWidth < 768 ? '143%' : '100%'
  };

  return (
    <div className="h-full bg-white">
      <div className="origin-top-left md:transform-none" style={scaledDimensions}>
        <header className="flex flex-col space-y-4 border-b border-gray-200 py-4 px-3 md:px-6">
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <h1 className="text-lg font-semibold text-gray-900">Calendar</h1>
            
            {/* Market selector and suggestions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <select 
                value={selectedMarket}
                onChange={handleMarketChange}
                className="w-full sm:w-auto text-sm rounded-lg border border-gray-200 px-2 pr-6 py-1 text-gray-500 hover:text-gray-700 text-center"
              >
                <option value="" disabled>Select Country</option>
                <option value="all">All Markets</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
              </select>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-500">✨</span>
                  <button 
                    onClick={toggleSuggestions}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Suggestions
                  </button>
                </div>
              </div>
            </div>

            {/* View toggle */}
            <div className="flex items-center rounded-lg border border-gray-200 p-1 self-start md:self-center">
              <button
                onClick={() => setView('Week')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                  view === 'Week'
                    ? 'bg-[#0049ac] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('Month')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                  view === 'Month'
                    ? 'bg-[#0049ac] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Bottom row - Navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Today
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={view === 'Month' ? goToPreviousMonth : goToPreviousWeek}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                {formatMonthYear(currentDate)}
              </span>
              <button
                onClick={view === 'Month' ? goToNextMonth : goToNextWeek}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[1024px]">
            {view === 'Month' ? (
              <MonthView 
                currentDate={currentDate}
                showSuggestions={showSuggestions}
                scale={scale}
              />
            ) : (
              <WeekView
                currentDate={currentDate}
                showSuggestions={showSuggestions}
                scale={scale}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;