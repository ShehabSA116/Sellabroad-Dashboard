import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeekGrid } from './hooks/useWeekGrid';
import { useCampaignDisplay } from './hooks/useCampaignDisplay';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarCell } from './components/CalendarCell';
import { CampaignBar } from './components/CampaignBar';
import { SuggestionCard } from './components/SuggestionCard';

function WeekView({ currentDate, events, setEvents, campaigns, showSuggestions, dismissed, onDismiss }) {
  const navigate = useNavigate();
  const { weekDays, getEventForDate } = useWeekGrid(currentDate, events);
  const { getCampaignDisplayRange } = useCampaignDisplay();

  return (
    <div className="shadow ring-1 ring-black ring-opacity-5 overflow-x-auto">
      <div className="min-w-[1024px]">
        <table className="w-full divide-y divide-gray-300">
          <tbody className="divide-y divide-gray-200">
            <tr className="divide-x divide-gray-200 relative h-48"> {/* Taller cells for week view */}
              {/* Day cells */}
              {weekDays.map((day, dayIdx) => (
                <CalendarCell 
                  key={dayIdx}
                  day={day}
                  showSuggestions={showSuggestions}
                  dismissed={dismissed}
                  onDismiss={onDismiss}
                  getEventForDate={getEventForDate}
                  navigate={navigate}
                  isWeekView={true} // Add prop to handle week-specific styling
                />
              ))}

              {/* Campaign layer */}
              <CampaignBar 
                campaigns={campaigns}
                week={weekDays}
                getCampaignDisplayRange={getCampaignDisplayRange}
                isWeekView={true} // Add prop to handle week-specific styling
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeekView;