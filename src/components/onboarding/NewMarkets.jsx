import { useState } from 'react';
import WorldMap from './WorldMap';
import { toast } from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';

function NewMarkets() {
  const navigate = useNavigate();
  const { stepInfo, currentStepIndex } = useOutletContext() || { stepInfo: [], currentStepIndex: 0 };
  
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [existingMarkets, setExistingMarkets] = useState([]);
  const [isSelectingCurrent, setIsSelectingCurrent] = useState(true);
  const handleMarketToggle = (marketName) => {
    if (isSelectingCurrent) {
      setExistingMarkets(prev => 
        prev.includes(marketName)
          ? prev.filter(name => name !== marketName)
          : [...prev, marketName]
      );
    } else {
      if (!existingMarkets.includes(marketName)) {
        setSelectedMarkets(prev => 
          prev.includes(marketName)
            ? prev.filter(name => name !== marketName)
            : [...prev, marketName]
        );
      }
    }
  };

  const handleCurrentMarketsConfirm = () => {
    if (existingMarkets.length === 0) {
      toast.error('Please select at least one current market');
      return;
    }
    setIsSelectingCurrent(false);
    toast.success('Current markets confirmed! Now select your target expansion markets.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedMarkets.length === 0 || existingMarkets.length === 0) {
      toast.error('Please select both current and target markets');
      return;
    }

    try {
      localStorage.setItem('from', existingMarkets);
      localStorage.setItem('to', selectedMarkets);
      toast.success('Markets saved successfully');
      
      // Navigate to the next step using the stepInfo from context
      if (currentStepIndex < stepInfo.length - 1) {
        navigate(stepInfo[currentStepIndex + 1].path);
      }
    } catch (error) {
      console.error('Failed to save markets:', error);
      toast.error(error.response?.data?.error || 'Failed to save markets');
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
          New Markets
        </h1>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {isSelectingCurrent ? 'Select Current Markets' : 'Select Target Expansion Markets'}
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <WorldMap
              selectedMarkets={isSelectingCurrent ? existingMarkets : selectedMarkets}
              onMarketSelect={handleMarketToggle}
              currentMarkets={existingMarkets}
              targetMarkets={selectedMarkets}
              isSelectingCurrent={isSelectingCurrent}
            />
          </div>

          {/* Current Markets Container */}
          {existingMarkets.length > 0 && (
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Current Markets</h2>
              <div className="flex flex-wrap gap-2">
                {existingMarkets.map(marketName => (
                  <span
                    key={marketName}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0049ac] text-white"
                  >
                    {marketName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Target Markets Container */}
          {selectedMarkets.length > 0 && (
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Target Expansion Markets</h2>
              <div className="flex flex-wrap gap-2">
                {selectedMarkets.map(marketName => (
                  <span
                    key={marketName}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#00ac4a] text-white"
                  >
                    {marketName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed position confirm button */}
      <div className="fixed bottom-8 right-8 z-50">
        {isSelectingCurrent ? (
          <button
            className="px-6 py-3 rounded-lg shadow-lg bg-[#0049ac] text-white hover:bg-[#0049ac]/90 hover:shadow-xl"
            onClick={handleCurrentMarketsConfirm}
          >
            Confirm Current Markets
          </button>
        ) : (
          <button
            className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-200 
              ${selectedMarkets.length > 0 
                ? 'bg-[#0049ac] text-white hover:bg-[#0049ac]/90 hover:shadow-xl' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            onClick={handleSubmit}
            disabled={selectedMarkets.length === 0}
          >
            Confirm Target Markets
          </button>
        )}
      </div>
    </>
  );
}

export default NewMarkets;