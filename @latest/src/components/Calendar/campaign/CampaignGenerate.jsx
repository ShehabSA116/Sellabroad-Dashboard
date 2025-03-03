import React from 'react';

function CampaignGenerate() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Content suggestions (click to select)</h2>
      
      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-lg border-2 cursor-pointer transition-colors border-gray-200 hover:border-gray-300">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-medium">Highlight top early Black Friday deals and how to maximize savings.</h3>
          </div>
          <p className="text-sm text-gray-600 ml-7">Create a comprehensive guide showcasing the best early deals and tips for smart shopping.</p>
        </div>

        <div className="p-4 rounded-lg border-2 cursor-pointer transition-colors border-gray-200 hover:border-gray-300">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-medium">Create a countdown calendar with daily tips on shopping smart for early Black Friday.</h3>
          </div>
          <p className="text-sm text-gray-600 ml-7">Build anticipation with daily content leading up to the big event.</p>
        </div>

        <div className="p-4 rounded-lg border-2 cursor-pointer transition-colors border-gray-200 hover:border-gray-300">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="font-medium">Feature exclusive interviews with retail experts on trends for early Black Friday shopping.</h3>
          </div>
          <p className="text-sm text-gray-600 ml-7">Add credibility and expert insights to your campaign.</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="text-[#0049ac] hover:text-[#0049ac]/90 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Generate new suggestions
        </button>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Back
          </button>
          <button className="px-4 py-2 bg-[#0049ac] text-white rounded-lg hover:bg-[#0049ac]/90">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampaignGenerate;