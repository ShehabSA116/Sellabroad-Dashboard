import React from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function CalendarHeader({ 
  selectedMarket = '',
  onMarketChange = () => {},
  targetMarkets = [],
  showSuggestions = false,
  onToggleSuggestions = () => {},
  view = 'Month',
  onViewChange = () => {}
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      {/* Market selector and suggestions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <select 
          value={selectedMarket}
          onChange={onMarketChange}
          className="w-full sm:w-auto text-sm rounded-lg border border-gray-200 px-2 pr-6 py-1 text-gray-500 hover:text-gray-700 text-center"
        >
          <option value="" disabled>Select Country</option>
          <option value="all">All Markets</option>
          {targetMarkets?.map(market => (
            <option key={market} value={market}>{market}</option>
          ))}
        </select>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500">✨</span>
            <button 
              onClick={onToggleSuggestions}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Suggestions
            </button>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex items-center rounded-lg border border-gray-200 p-1 self-start sm:self-center">
        <button
          onClick={() => onViewChange('Week')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md ${
            view === 'Week'
              ? 'bg-[#0049ac] text-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange('Month')}
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
  );
} 