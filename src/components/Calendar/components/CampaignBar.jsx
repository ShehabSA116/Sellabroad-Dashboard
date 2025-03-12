import React from 'react';
import { PlatformIcons } from './PlatformIcons';

export function CampaignBar({ campaigns, week, getCampaignDisplayRange, isWeekView = false }) {
  const renderCampaign = (campaign, daysToSpan) => {
    return (
      <div 
        className={`bg-[#0049ac] text-white rounded-lg flex items-center justify-center ${
          daysToSpan === 1 
            ? 'w-32 lg:w-40 group relative' 
            : isWeekView 
              ? 'w-[calc(98%-4px)]' // Wider in week view
              : 'w-[calc(95%-4px)]'
        }`}
      >
        <div className={`flex items-center justify-center w-full min-w-0 ${isWeekView ? 'py-2' : ''} px-1`}>
          <span className={`${isWeekView ? 'text-sm' : 'text-xs'} font-medium truncate`}>
            {campaign.title}
          </span>
          {campaign.platforms && (
            <div className={isWeekView ? 'ml-2' : 'ml-1'}>
              <PlatformIcons 
                platforms={campaign.platforms} 
                size={isWeekView ? 3.5 : 2.5} // Larger icons in week view
              />
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

  return (
    <div className={`absolute top-0 left-0 right-0 h-0 overflow-visible pointer-events-none ${
      isWeekView ? 'mt-12' : ''
    }`}>
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
  );
} 