import { useCallback } from 'react';

export function useCampaignDisplay() {
  const getCampaignDisplayRange = useCallback((campaign, weekStartDate) => {
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
  }, []);

  return {
    getCampaignDisplayRange
  };
} 