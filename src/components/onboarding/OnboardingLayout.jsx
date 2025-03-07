import React from 'react';
import SidePanel from '../icons/SidePanel';
import { Steps } from 'antd';
import NewMarkets from './NewMarkets';
import DemandForecast from './DemandForecast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function OnboardingLayout() {
  const stepInfo = [
    { id: 'markets', title: 'Markets', description: 'Select your current and target markets' },
    { id: 'forecast', title: 'Demand Forecast', description: 'Estimate market demand' }
  ];

  const stepComponents = {
    markets: NewMarkets,
    forecast: DemandForecast
  };

  // Track current and preview steps
  const [currentStep, setCurrentStep] = useState('markets');
  const [previewStep, setPreviewStep] = useState(null);

  // Handle step transitions
  const handleNext = () => {
    const currentIndex = stepInfo.findIndex(step => step.id === currentStep);
    const nextStep = stepInfo[currentIndex + 1]?.id;
    
    
    if (nextStep) {
      setCurrentStep(nextStep);
      setPreviewStep(null);
    }
  };

  const handlePrevious = () => {
    const currentIndex = stepInfo.findIndex(step => step.id === currentStep);
    setCurrentStep(stepInfo[currentIndex - 1].id);
    setPreviewStep(null);
  };

  // Determine which components to render
  const renderStepComponents = () => {
    const components = [
      <div key={currentStep} className="animate-slide-left">
        {React.createElement(stepComponents[currentStep], {
          onNext: handleNext,
          onPrevious: handlePrevious,
          isFirstStep: currentStep === 'markets',
          isLastStep: currentStep === 'forecast'
        })}
      </div>
    ];

    if (previewStep) {
      components.push(
        <div key={previewStep} className="mt-8 opacity-50">
          <h2 className="text-xl font-semibold mb-4">Preview of next step:</h2>
          {React.createElement(stepComponents[previewStep], {
            isPreview: true
          })}
        </div>
      );
    }

    return components;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Hide on mobile */}
        <div className="hidden md:block md:fixed md:left-0 md:w-[400px]">
          <SidePanel 
            title="Ready to expand?"
            subtitle="Answer these questions to easily expand your market to the Middle East!"
          />
        </div>

        {/* Main Content - Adjust margin for mobile */}
        <div className="flex-1 md:ml-[400px]">
          {/* Floating Header Section with Steps */}
          <header className="sticky top-4 w-full flex justify-center z-30">
            <div className="bg-white rounded-xl shadow-lg px-8 py-4">
              <Steps
                current={stepInfo.findIndex(step => step.id === currentStep)}
                items={stepInfo.map(step => ({ title: step.title }))}
              />
            </div>
          </header>

          {/* Content Section */}
          <main className="max-w-7xl mx-auto p-8 mt-12">
            {renderStepComponents()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLayout; 