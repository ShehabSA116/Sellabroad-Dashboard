import { useState } from 'react';

function CampaignSchedule() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Schedule Campaign</h2>
      
      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">✉️</span>
            <div>
              <h3 className="font-medium">Email Campaign</h3>
              <p className="text-sm text-gray-500">Schedule email sequence</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0049ac]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">🎯</span>
            <div>
              <h3 className="font-medium">Ad Campaign</h3>
              <p className="text-sm text-gray-500">Schedule ad campaigns</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0049ac]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">🌐</span>
            <div>
              <h3 className="font-medium">Website Updates</h3>
              <p className="text-sm text-gray-500">Schedule website changes</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0049ac]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">📱</span>
            <div>
              <h3 className="font-medium">Social Media</h3>
              <p className="text-sm text-gray-500">Schedule social media posts</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0049ac]"></div>
          </label>
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
          Next
        </button>
      </div>
    </div>
  );
}

export default CampaignSchedule;