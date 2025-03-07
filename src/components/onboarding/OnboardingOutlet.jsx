import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Steps } from 'antd';
import SidePanel from '../icons/SidePanel';

export default function OnboardingOutlet() {
  const location = useLocation();
  
  // Define your steps
  const stepInfo = [
    { id: 'markets', title: 'Markets', description: 'Select your current and target markets', path: '/onboarding/markets' },
    { id: 'forecast', title: 'Demand Forecast', description: 'Estimate market demand', path: '/onboarding/forecast' },
    { id: 'documents', title: 'Upload Documents', description: 'Upload required documents', path: '/onboarding/documents' }
  ];

  // Determine current step based on the current route
  const currentPath = location.pathname;
  const currentStepIndex = stepInfo.findIndex(step => currentPath.includes(step.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Hide on mobile */}
        <div className="hidden md:block md:fixed md:left-0 md:w-[400px]">
          <SidePanel 
            title="Join our platform"
            subtitle="Create an account to access powerful tools for expanding into the Middle East market!"
          />
        </div>

        {/* Main Content - Adjust margin for mobile */}
        <div className="flex-1 md:ml-[400px]">
          {/* Floating Header Section with Steps */}
          <header className="sticky top-4 w-full flex justify-center z-30">
            <div className="bg-white rounded-xl shadow-lg px-8 py-4">
              <Steps
                current={currentStepIndex !== -1 ? currentStepIndex : 0}
                items={stepInfo.map(step => ({ title: step.title }))}
              />
            </div>
          </header>

          {/* Content Section */}
          <main className="max-w-7xl mx-auto p-8 mt-12">
            <Outlet context={{ stepInfo, currentStepIndex }} />
          </main>
        </div>
      </div>
    </div>
  );
}
