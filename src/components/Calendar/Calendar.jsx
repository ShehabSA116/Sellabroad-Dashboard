import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MonthView from './MonthView';
import WeekView from './WeekView';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Calendar() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const [targetMarkets, setTargetMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [dismissed, setDismissed] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [loadingText, setLoadingText] = useState('Loading marketing calendar...');
 
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/events', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch events');

        const data = await response.json();
        
        // Transform events for both suggestions and campaigns
        const transformedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          date: new Date(event.start_date),
          description: event.description,
          type: event.type || 'Campaign',
          country: event.target_countries?.[0] || 'global',
          daysLeft: Math.ceil(
            (new Date(event.end_date) - new Date(event.start_date)) / (1000 * 60 * 60 * 24)
          ) + 1,
          isVisible: !event.Published  // Show pink card only if not published
        }));

        // Transform same data for campaigns (blue banners)
        const transformedCampaigns = data.map(event => ({
          id: event.id,
          title: event.title,
          platforms: ['meta', 'klaviyo', 'google-ads', 'shopify'],
          country: event.target_countries?.[0] || 'global',
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          isVisible: event.Published,  // Show blue banner only if published
          get totalDays() {
            return Math.ceil(
              (new Date(this.end) - new Date(this.start)) / (1000 * 60 * 60 * 24)
            ) + 1;
          }
        }));
        
        setEvents(transformedEvents);
        setCampaigns(transformedCampaigns);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchAllEvents();
  }, []);

  useEffect(() => {
    // Check URL parameters for loading state
    const params = new URLSearchParams(location.search);
    setIsLoading(params.get('loading') === 'true');
    
    // Set loading text based on whether we're creating or loading
    if (params.get('creating') === 'true') {
      setLoadingText('Creating your marketing calendar...');
    } else {
      setLoadingText('Loading marketing calendar...');
    }
  }, [location]);

  useEffect(() => {
    const fetchTargetMarkets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/workflow/target-markets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch target markets');

        const data = await response.json();
        setTargetMarkets(data.target_markets);
      } catch (error) {
        console.error('Error fetching target markets:', error);
      }
    };

    fetchTargetMarkets();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    // Set current date to today
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

  // Add filtered events and campaigns based on selected market
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

  // Add handler for dismissing
  const handleDismiss = (eventId) => {
    setDismissed([...dismissed, eventId]);
  };

  // Calculate scale and dimensions based on window width
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
                {targetMarkets.map(market => (
                  <option key={market} value={market}>{market}</option>
                ))}
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