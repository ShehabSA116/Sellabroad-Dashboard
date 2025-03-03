import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CampaignInformation from './CampaignInformation';
import CampaignGenerate from './CampaignGenerate';
import CampaignSchedule from './CampaignSchedule';
import CampaignPublish from './CampaignPublish';

const steps = [
  { number: 1, label: 'Information' },
  { number: 2, label: 'Generate' },
  { number: 3, label: 'Schedule' },
  { number: 4, label: 'Publish' }
];

function CampaignSetup({ onClose }) {
  const currentStep = 1; // Static value for UI demonstration

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center space-x-2">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep === step.number
                          ? 'bg-[#0049ac] text-white'
                          : currentStep > step.number
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {currentStep > step.number ? '✓' : step.number}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{step.label}</span>
                      {step.number < steps.length && (
                        <div className="w-12 h-px bg-gray-200 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 relative">
              {currentStep === 1 && <CampaignInformation onNext={() => {}} showBack={false} />}
              {currentStep === 2 && <CampaignGenerate onNext={() => {}} onBack={() => {}} campaignData={{}} />}
              {currentStep === 3 && <CampaignSchedule onNext={() => {}} onBack={() => {}} campaignData={{}} />}
              {currentStep === 4 && <CampaignPublish campaignData={{}} onBack={() => {}} onClose={onClose} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignSetup;