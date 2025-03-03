import { useNavigate } from 'react-router-dom';
import CampaignInformation from './CampaignInformation';
import ContentCreation from './ContentCreation';
import CampaignSchedule from './CampaignSchedule';

function CampaignWizard() {
  const navigate = useNavigate();
  const currentStep = 1;
  const campaignData = {
    information: {
      title: 'Sample Campaign',
      startDate: '2024-03-20',
      endDate: '2024-03-25'
    },
    schedule: {
      facebook: true,
      instagram: true,
      twitter: false
    }
  };

  const steps = [
    { number: 1, label: 'Information' },
    { number: 2, label: 'Content' },
    { number: 3, label: 'Schedule' },
    { number: 4, label: 'Publish' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate('/strategy/calendar')} className="text-gray-500 hover:text-gray-700">
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

        <div className="p-6">
          {currentStep === 1 && <CampaignInformation />}
          {currentStep === 2 && <ContentCreation />}
          {currentStep === 3 && <CampaignSchedule />}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Campaign Summary</h2>
                <p className="mt-2 text-gray-600">Review your campaign details before publishing</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Title:</span>
                    <p className="font-medium">{campaignData.information.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Duration:</span>
                    <p className="font-medium">
                      {new Date(campaignData.information.startDate).toLocaleDateString()} - {new Date(campaignData.information.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Selected Channels:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.entries(campaignData.schedule).map(([channel, isEnabled]) => (
                        isEnabled && (
                          <span key={channel} className="px-3 py-1 bg-[#0049ac]/10 text-[#0049ac] rounded-full text-sm">
                            {channel.charAt(0).toUpperCase() + channel.slice(1)}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 bg-[#0049ac] text-white rounded-lg hover:bg-[#0049ac]/90"
                >
                  Publish Campaign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignWizard;