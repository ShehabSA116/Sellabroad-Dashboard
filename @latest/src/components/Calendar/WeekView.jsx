import React from 'react';
import KlaviyoLogo from '../icons/KlaviyoLogo';
import GoogleAdsLogo from '../icons/GoogleAdsLogo';
import ShopifyLogo from '../icons/ShopifyLogo';
import MetaLogo from '../icons/MetaLogo';
import { useNavigate } from 'react-router-dom';

function WeekView({ currentDate, events, setEvents, campaigns, showSuggestions, dismissed, onDismiss }) {
  const navigate = useNavigate();

  const getWeekDays = (date) => {
    const week = [];
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Helper to check if a date is the start of a campaign
  const isCampaignStart = (date, campaign) => {
    const campaignStart = new Date(campaign.start);
    return date.getDate() === campaignStart.getDate() && 
           date.getMonth() === campaignStart.getMonth();
  };

  // Get campaigns that start on a specific date
  const getCampaignStartsForDate = (date) => {
    return campaigns.filter(campaign => isCampaignStart(date, campaign));
  };

  // Calculate how many days the campaign continues in the current week
  const getCampaignDaysInWeek = (startDate, campaign) => {
    const campaignEnd = new Date(campaign.end);
    const weekEnd = new Date(startDate);
    weekEnd.setDate(startDate.getDate() + (6 - startDate.getDay()));
    
    const endDate = campaignEnd < weekEnd ? campaignEnd : weekEnd;
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Check if campaign continues beyond this week
    const continuesBeyondWeek = campaignEnd > weekEnd;
    
    return {
      days: diffDays,
      continues: continuesBeyondWeek
    };
  };

  // Update to get both starting and ongoing campaigns
  const getCampaignsForWeek = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Get Sunday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Get Saturday

    return campaigns.filter(campaign => {
      const campaignStart = new Date(campaign.start);
      const campaignEnd = new Date(campaign.end);
      
      // Campaign starts before or during this week AND ends after or during this week
      return (campaignStart <= weekEnd && campaignEnd >= weekStart);
    });
  };

  // Calculate the display span for a campaign within the current week
  const getCampaignDisplayRange = (campaign, weekStartDate) => {
    const campaignStart = new Date(campaign.start);
    const campaignEnd = new Date(campaign.end);
    const weekEnd = new Date(weekStartDate);
    weekEnd.setDate(weekStartDate.getDate() + 6);

    // If campaign starts after week end or ends before week start, don't show it
    if (campaignStart > weekEnd || campaignEnd < weekStartDate) {
      return null;
    }

    // For the first week, use the actual start day
    // For subsequent weeks, check if the campaign started in a previous week
    const isFirstWeek = campaignStart >= weekStartDate && campaignStart <= weekEnd;
    const startDay = isFirstWeek ? campaignStart.getDay() : 0;

    // If campaign ends this week, use its end day, otherwise end at last visible day
    const endDay = campaignEnd <= weekEnd ? campaignEnd.getDay() : 6;

    const daysToSpan = endDay - startDay + 1;

    return {
      startDay,
      daysToSpan,
      continues: campaignEnd > weekEnd
    };
  };

  const weekDays = getWeekDays(currentDate);
  const weekStartDate = new Date(weekDays[0]);
  const activeCampaigns = getCampaignsForWeek(currentDate);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get events for a specific date
  const getEventForDate = (date) => {
    return events.find(event => 
      event.isVisible &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const renderPlatformIcons = (platforms) => {
    return (
      <div className="flex space-x-1">
        {platforms.map((platform) => {
          switch (platform) {
            case 'klaviyo':
              return <KlaviyoLogo key="klaviyo" className="h-4 w-4 text-white" />;
            case 'meta':
              return <MetaLogo key="meta" className="h-4 w-4 text-white" />;
            case 'shopify':
              return <ShopifyLogo key="shopify" className="h-4 w-4 text-white" />;
            case 'google-ads':
              return <GoogleAdsLogo key="google-ads" className="h-4 w-4 text-white" />;
            default:
              return null;
          }
        })}
      </div>
    );
  };

  const renderCampaign = (campaign, daysToSpan) => {
    return (
      <div 
        className={`bg-[#0049ac] text-white rounded-lg p-0.5 md:p-1 flex items-center justify-center ${
          daysToSpan === 1 ? 'group relative' : ''
        }`}
        style={{ 
          gridColumn: `span ${daysToSpan}`,
          minWidth: 0
        }}
      >
        <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
          <span className="text-xs md:text-sm font-medium truncate">{campaign.title}</span>
          {campaign.platforms && (
            <div className="hidden md:flex">
              {renderPlatformIcons(campaign.platforms)}
            </div>
          )}
        </div>

        {/* Tooltip */}
        {daysToSpan === 1 && (
          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50">
            {campaign.title}
          </div>
        )}
      </div>
    );
  };

  const renderSuggestion = (event) => {
    const handleDismiss = () => {
      onDismiss(event.id);
    };

    return (
      <div className="border border-dashed border-purple-300 rounded-lg p-2 bg-purple-50/50 mb-2">
        <div className="flex items-center space-x-1 text-purple-600 text-sm mb-2 justify-center">
          <span>✨</span>
          <span> Suggestion</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-gray-600">🎯 {event.title}</span>
        </div>
        <h4 className="text-gray-800 font-medium text-sm mb-1">{event.description}</h4>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <span className="mr-2">📅 {event.daysLeft} day{event.daysLeft > 1 ? 's' : ''}</span>
        </div>
        <div className="flex flex-col items-center space-y-2 mt-2">
          <section className="flex flex-col space-y-2 w-full border p-2 ">
            <button
              onClick={() => navigate('/strategy/campaign/new', { 
                state: { 
                  event: {
                    id: event.id,
                    title: event.title,
                    start_date: event.date,
                    end_date: new Date(event.date.getTime() + (event.daysLeft - 1) * 24 * 60 * 60 * 1000),
                    type: event.type,
                    description: event.description
                  }
                } 
              })}
              className="w-full py-2 border border-purple-300 rounded-md text-purple-600 text-sm font-medium hover:bg-purple-50"
            >
              Generate 
            </button>
            <button
              onClick={handleDismiss}
              className="w-full py-2 text-purple-600 text-sm font-medium hover:text-opacity-80"
            >
              Dismiss
            </button>
          </section>
        </div>
      </div>
    );
  };

  const renderEvent = (event) => {
    if (event.type === 'suggestion' && !showSuggestions) {
      return null;
    }

    if (event.type === 'suggestion') {
      return renderSuggestion(event);
    }

    return (
      <div
        key={event.title}
        className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm mb-2 ${
          event.type === 'campaign'
            ? 'bg-[#0049ac] text-white'
            : 'bg-white border border-gray-200 text-gray-700'
        }`}
      >
        {event.platform && (
          <div className="flex items-center space-x-1">
            {event.platform === 'klaviyo' && <KlaviyoLogo className="h-4 w-4" />}
            {event.platform === 'meta' && <MetaLogo className="h-4 w-4" />}
            {event.platform === 'shopify' && <ShopifyLogo className="h-4 w-4" />}
            {event.platform === 'google-ads' && <GoogleAdsLogo className="h-4 w-4" />}
          </div>
        )}
        {event.platforms && renderPlatformIcons(event.platforms)}
        <span className="flex-1 truncate">{event.title}</span>
      </div>
    );
  };

  // Function to filter events based on your criteria
  const getRelevantEvents = () => {
    return events.filter(event => {
      // Example condition: filter for events of type 'HOLIDAY_PROMOTION'
      return event.type === 'HOLIDAY_PROMOTION';
    });
  };

  const relevantEvents = getRelevantEvents();

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto">
        {/* Adjust minimum width for mobile */}
        <div className="min-w-[320px] md:min-w-[768px] lg:min-w-[1024px]">
          {/* Days header - Make text smaller on mobile */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {days.map((day, index) => {
              const today = new Date();
              const isToday = weekDays[index].getDate() === today.getDate() &&
                             weekDays[index].getMonth() === today.getMonth() &&
                             weekDays[index].getFullYear() === today.getFullYear();
              
              return (
                <div
                  key={day}
                  className={`p-2 md:p-4 text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2 ${
                    isToday ? 'text-[#0049ac]' : 'text-gray-900'
                  }`}
                >
                  {/* Show only first letter on mobile */}
                  <span className="hidden md:inline">{day}</span>
                  <span className="md:hidden">{day.charAt(0)}</span>
                  <span className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-[#0049ac] text-white' : ''
                  }`}>
                    {weekDays[index].getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 flex-1 relative">
            {/* Campaign layer - Adjust spacing for mobile */}
            <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 grid grid-cols-7 gap-2 md:gap-4 z-10">
              {activeCampaigns.filter(campaign => campaign.isVisible).map((campaign) => {
                const range = getCampaignDisplayRange(campaign, weekStartDate);
                if (!range) return null;
                
                return (
                  <div 
                    key={campaign.id}
                    className="relative"
                    style={{ 
                      gridColumn: `${range.startDay + 1} / span ${range.daysToSpan}`
                    }}
                  >
                    {renderCampaign(campaign, range.daysToSpan)}
                    {range.continues && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 md:-mr-2">
                        <span className="text-[#0049ac] text-base md:text-xl">→</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Day cells - Adjust height and padding for mobile */}
            {weekDays.map((date) => {
              const event = getEventForDate(date);
              
              return (
                <div
                  key={date.toISOString()}
                  className="min-h-[150px] md:min-h-[200px] p-2 md:p-4 border-r border-b border-gray-200 last:border-r-0"
                >
                  {/* Space for campaigns */}
                  <div className="h-12 md:h-20" />
                  
                  {/* Events */}
                  {event && showSuggestions && !dismissed.includes(event.id) && (
                    <div className="w-full">
                      {renderSuggestion(event)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekView;