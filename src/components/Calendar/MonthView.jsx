import React from 'react';
import KlaviyoLogo from '../icons/KlaviyoLogo';
import GoogleAdsLogo from '../icons/GoogleAdsLogo';
import ShopifyLogo from '../icons/ShopifyLogo';
import MetaLogo from '../icons/MetaLogo';
import { useNavigate } from 'react-router-dom';

function MonthView({ currentDate, events = [], setEvents, campaigns = [], showSuggestions, dismissed, onDismiss }) {
  const navigate = useNavigate();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

  const getCampaignDisplayRange = (campaign, weekStartDate) => {
    const campaignStart = new Date(campaign.start);
    campaignStart.setHours(0, 0, 0, 0);
    
    const campaignEnd = new Date(campaign.end);
    campaignEnd.setHours(0, 0, 0, 0);
    
    const weekStart = new Date(weekStartDate);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(0, 0, 0, 0);

    if (campaignStart > weekEnd || campaignEnd < weekStart) {
      return null;
    }

    const startDay = campaignStart >= weekStart && campaignStart <= weekEnd 
      ? campaignStart.getDay() 
      : 0;

    const endDay = campaignEnd <= weekEnd ? campaignEnd.getDay() : 6;
    const daysToSpan = endDay - startDay + 1;

    return {
      startDay,
      daysToSpan,
      continues: campaignEnd > weekEnd
    };
  };

  const renderCampaign = (campaign, daysToSpan) => {
    return (
      <div 
        className={`bg-[#0049ac] text-white rounded-lg flex items-center justify-center ${
          daysToSpan === 1 ? 'w-32 lg:w-48 group relative' : 'w-[calc(100%-4px)]'  // Increased from w-24 to w-32
        }`}
      >
        <div className="flex items-center justify-center w-full min-w-0 px-1">
          <span className="text-xs font-medium truncate">{campaign.title}</span>
          {campaign.platforms && renderPlatformIcons(campaign.platforms)}
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

  const calendarDays = getDaysInMonth(currentDate);

  // Get events for a specific date
  const getEventForDate = (date) => {
    return events.find(event => 
      event.isVisible &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()  // Add year comparison
    );
  };

  const renderPlatformIcons = (platforms) => {
    return (
      <div className="flex space-x-1">
        {platforms.map((platform) => {
          switch (platform) {
            case 'klaviyo':
              return <KlaviyoLogo key="klaviyo" className="h-2.5 w-2.5 text-white" />;
            case 'meta':
              return <MetaLogo key="meta" className="h-2.5 w-2.5 text-white" />;
            case 'shopify':
              return <ShopifyLogo key="shopify" className="h-2.5 w-2.5 text-white" />;
            case 'google-ads':
              return <GoogleAdsLogo key="google-ads" className="h-2.5 w-2.5 text-white" />;
            default:
              return null;
          }
        })}
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
        <h4 className="text-gray-800 text-sm font-medium mb-1">{event.description}</h4>
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
                    end_date: event.date,
                    type: event.type  // We're passing type but it might not exist in event
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



  return (
    <div className="shadow ring-1 ring-black ring-opacity-5 overflow-x-auto">
      <div className="min-w-[1024px]">
        <table className="w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day} className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900 w-[calc(100%/7)]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {calendarDays.map((week, weekIdx) => (
              <tr key={weekIdx} className="divide-x divide-gray-200 relative h-32">
                {/* Day cells */}
                {week.map((day, dayIdx) => {
                  const today = new Date();
                  const isToday = day.fullDate.getDate() === today.getDate() &&
                                 day.fullDate.getMonth() === today.getMonth() &&
                                 day.fullDate.getFullYear() === today.getFullYear();

                  return (
                    <td
                      key={dayIdx}
                      className={`relative p-2 ${
                        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                      } align-top w-[calc(100%/7)]`}
                    >
                      <div className="flex flex-col h-full">
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
                        
                        {/* Space for campaigns */}
                        <div className="h-20" />

                        {/* Events */}
                        {day.isCurrentMonth && showSuggestions && (
                          <div className="mt-1 px-1">
                            {(() => {
                              const event = getEventForDate(day.fullDate);
                              return event ? (
                                !dismissed.includes(event.id) && (
                                <div className="scale-90 origin-top">
                                  {renderSuggestion(event)}
                                </div>
                                )
                              ) : null;
                            })()}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}

                {/* Campaign layer */}
                <div className="absolute top-0 left-0 right-0 h-0 overflow-visible pointer-events-none">
                  <div className="relative h-0">
                    <div className="absolute top-8 left-0 right-0 grid grid-cols-7 gap-0 z-10 pointer-events-auto">
                      {campaigns.filter(campaign => campaign.isVisible).map((campaign) => {
                        const range = getCampaignDisplayRange(campaign, week[0].fullDate);
                        if (!range) return null;
                        
                        return (
                          <div 
                            key={campaign.id}
                            className={`relative flex justify-center items-center ${
                              range.daysToSpan === 1 ? 'px-1' : 'px-0.5'
                            }`}
                            style={{ 
                              gridColumn: `${range.startDay + 1} / span ${range.daysToSpan}`,
                              marginLeft: range.daysToSpan > 1 && range.startDay === 0 ? '2px' : '0',
                              marginRight: range.daysToSpan > 1 && range.startDay + range.daysToSpan === 7 ? '2px' : '0'
                            }}
                          >
                            {renderCampaign(campaign, range.daysToSpan)}
                            {range.continues && (
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1">
                                <span className="text-[#0049ac] text-xl">→</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthView;