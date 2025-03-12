import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MonthView from './MonthView';
import WeekView from './WeekView';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarNavigation } from './components/CalendarNavigation';
import { useCalendarData } from './hooks/useCalendarData';

function Calendar() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [dismissed, setDismissed] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loadingText, setLoadingText] = useState('Loading marketing calendar...');

  // Use the custom hook for data fetching
  const { events, setEvents, campaigns, targetMarkets } = useCalendarData();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle loading state from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsLoading(params.get('loading') === 'true');
    setLoadingText(params.get('creating') === 'true' 
      ? 'Creating your marketing calendar...'
      : 'Loading marketing calendar...'
    );
  }, [location]);

  // Navigation handlers
  const navigationHandlers = {
    goToPreviousMonth: () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    },
    goToNextMonth: () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    },
    goToPreviousWeek: () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    },
    goToNextWeek: () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    },
    goToToday: () => {
      setCurrentDate(new Date());
    }
  };

  // Filter handlers
  const filteredEvents = events.filter(event => 
    selectedMarket === '' || 
    selectedMarket === 'all' || 
    event.country === selectedMarket
  );

  const filteredCampaigns = campaigns.filter(campaign => 
    selectedMarket === '' || 
    selectedMarket === 'all' || 
    campaign.country === selectedMarket
  );

  // Event handlers
  const handleDismiss = (eventId) => {
    setDismissed([...dismissed, eventId]);
  };

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
  };

  // Calculate scale for responsive design
  const scale = windowWidth < 768 ? 0.7 : 1;
  const scaledDimensions = {
    transform: `scale(${scale})`,
    width: windowWidth < 768 ? '143%' : '100%',
    height: windowWidth < 768 ? '143%' : '100%'
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className="origin-top-left md:transform-none" style={scaledDimensions}>
        <header className="flex flex-col space-y-4 border-b border-gray-200 py-4 px-3 md:px-6">
          <CalendarHeader 
            selectedMarket={selectedMarket}
            onMarketChange={handleMarketChange}
            targetMarkets={targetMarkets}
            showSuggestions={showSuggestions}
            onToggleSuggestions={() => setShowSuggestions(!showSuggestions)}
            view={view}
            onViewChange={setView}
          />

          <CalendarNavigation 
            currentDate={currentDate}
            view={view}
            onPrevious={view === 'Month' ? navigationHandlers.goToPreviousMonth : navigationHandlers.goToPreviousWeek}
            onNext={view === 'Month' ? navigationHandlers.goToNextMonth : navigationHandlers.goToNextWeek}
            onToday={navigationHandlers.goToToday}
          />
        </header>

        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[1024px]">
            {view === 'Month' ? (
              <MonthView 
                currentDate={currentDate}
                events={filteredEvents}
                setEvents={setEvents}
                campaigns={filteredCampaigns}
                showSuggestions={showSuggestions}
                dismissed={dismissed}
                onDismiss={handleDismiss}
                scale={scale}
              />
            ) : (
              <WeekView
                currentDate={currentDate}
                events={filteredEvents}
                setEvents={setEvents}
                campaigns={filteredCampaigns}
                showSuggestions={showSuggestions}
                dismissed={dismissed}
                onDismiss={handleDismiss}
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