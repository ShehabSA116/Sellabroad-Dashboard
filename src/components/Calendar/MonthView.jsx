import React from 'react';
import KlaviyoLogo from '../icons/KlaviyoLogo';
import GoogleAdsLogo from '../icons/GoogleAdsLogo';
import ShopifyLogo from '../icons/ShopifyLogo';
import MetaLogo from '../icons/MetaLogo';
import { useNavigate } from 'react-router-dom';
import { useCalendarGrid } from './hooks/useCalendarGrid';
import { useCampaignDisplay } from './hooks/useCampaignDisplay';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarCell } from './components/CalendarCell';
import { CampaignBar } from './components/CampaignBar';
import { SuggestionCard } from './components/SuggestionCard';
import { PlatformIcons } from './components/PlatformIcons';

function MonthView({ currentDate, events, setEvents, campaigns, showSuggestions, dismissed, onDismiss }) {
  const navigate = useNavigate();
  const { calendarDays, getEventForDate } = useCalendarGrid(currentDate, events);
  const { getCampaignDisplayRange } = useCampaignDisplay();

  return (
    <div className="shadow ring-1 ring-black ring-opacity-5 overflow-x-auto">
      <div className="min-w-[1024px]">
        <table className="w-full divide-y divide-gray-300">
         
          <tbody className="divide-y divide-gray-200">
            {calendarDays.map((week, weekIdx) => (
              <tr key={weekIdx} className="divide-x divide-gray-200 relative h-32">
                {/* Day cells */}
                {week.map((day, dayIdx) => (
                  <CalendarCell 
                    key={dayIdx}
                    day={day}
                    showSuggestions={showSuggestions}
                    dismissed={dismissed}
                    onDismiss={onDismiss}
                    getEventForDate={getEventForDate}
                    navigate={navigate}
                  />
                ))}

                {/* Campaign layer */}
                <CampaignBar 
                  campaigns={campaigns}
                  week={week}
                  getCampaignDisplayRange={getCampaignDisplayRange}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthView;