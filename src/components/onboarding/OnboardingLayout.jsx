import { Steps } from 'antd';
import SidePanel from '../icons/SidePanel';
import NewMarkets from './NewMarkets';
import DemandForecast from './DemandForecast';

function OnboardingLayout() {
  const stepInfo = [
    { id: 'markets', title: 'Markets', description: 'Select your current and target markets' },
    { id: 'forecast', title: 'Demand Forecast', description: 'Estimate market demand' }
  ];

  const stepComponents = {
    markets: NewMarkets,
    forecast: DemandForecast
  };

  const CurrentStepComponent = stepComponents['markets'] || (() => <p>Step not found</p>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Hide on mobile */}
        <div className="hidden md:block md:fixed md:left-0 md:w-[400px]">
          <SidePanel 
            title="Ready to expand?"
            subtitle="Answer these questions to easily expand your market to the Middle East!"
            steps={stepInfo}
            currentStep="markets"
            completedSteps={[]}
          />
        </div>

        {/* Main Content - Adjust margin for mobile */}
        <div className="flex-1 md:ml-[400px]">
          {/* Floating Header Section with Steps */}
          <header className="sticky top-4 w-full flex justify-center z-30">
            <div className="bg-white rounded-xl shadow-lg px-8 py-4">
              <Steps
                current={0}
                items={[
                  { title: 'Markets' },
                  { title: 'Forecast' }
                ]}
              />
            </div>
          </header>

          {/* Content Section */}
          <main className="max-w-7xl mx-auto p-8 mt-12">
            <div className="animate-slide-left">
              <CurrentStepComponent 
                onNext={() => {}}
                onPrevious={() => {}}
                isFirstStep={true}
                isLastStep={false}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLayout; 