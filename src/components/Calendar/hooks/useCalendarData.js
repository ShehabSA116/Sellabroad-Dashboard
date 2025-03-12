import { useState, useEffect } from 'react';

export function useCalendarData() {
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [targetMarkets, setTargetMarkets] = useState(['United States', 'Canada', 'United Kingdom', 'UAE', 'Saudi Arabia']); // Default markets

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
          isVisible: !event.Published
        }));

        // Transform same data for campaigns
        const transformedCampaigns = data.map(event => ({
          id: event.id,
          title: event.title,
          platforms: ['meta', 'klaviyo', 'google-ads', 'shopify'],
          country: event.target_countries?.[0] || 'global',
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          isVisible: event.Published,
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
        if (data.target_markets && data.target_markets.length > 0) {
          setTargetMarkets(data.target_markets);
        }
      } catch (error) {
        console.error('Error fetching target markets:', error);
        // Keep using default markets if there's an error
      }
    };

    fetchAllEvents();
    fetchTargetMarkets();
  }, []);

  return {
    events,
    setEvents,
    campaigns,
    targetMarkets
  };
} 