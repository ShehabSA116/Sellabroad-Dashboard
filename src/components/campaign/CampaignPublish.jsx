function CampaignPublish() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Ready to Publish</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-medium mb-4">Campaign Summary</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500">Title:</span>
            <p className="font-medium">Campaign Title</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Duration:</span>
            <p className="font-medium">
              Start Date - End Date
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Selected Channels:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-3 py-1 bg-[#0049ac]/10 text-[#0049ac] rounded-full text-sm">
                Channel 1
              </span>
              <span className="px-3 py-1 bg-[#0049ac]/10 text-[#0049ac] rounded-full text-sm">
                Channel 2
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
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
  );
}

export default CampaignPublish;