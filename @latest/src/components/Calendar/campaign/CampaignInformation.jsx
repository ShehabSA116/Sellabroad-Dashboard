import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function CampaignInformation() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Campaign Information</h2>
      <form className="space-y-6">
        {/* Information Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
              <select
                name="assignee"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Unassigned</option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="flex items-center space-x-2 h-[38px]">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  🎯 Category
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Got a topic?</label>
            <div className="relative">
              <textarea
                name="topic"
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="absolute top-2 right-2">
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  <span>✓</span>
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Template Section */}
        <div className="border border-dashed border-purple-300 rounded-lg">
          <button
            type="button"
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Email Template</span>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <ChevronDownIcon className="w-5 h-5 transform transition-transform" />
          </button>
          <div className="p-4 border-t border-purple-300">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a template"
                className="w-full pl-10 rounded-lg border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Homepage Banner Template Section */}
        <div className="border border-dashed border-purple-300 rounded-lg">
          <button
            type="button"
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Homepage Banner Template</span>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <ChevronDownIcon className="w-5 h-5 transform transition-transform" />
          </button>
          <div className="p-4 border-t border-purple-300">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a template"
                className="w-full pl-10 rounded-lg border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Discount Section */}
        <div className="border border-dashed border-purple-300 rounded-lg">
          <button
            type="button"
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Discount</span>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <ChevronDownIcon className="w-5 h-5 transform transition-transform" />
          </button>
          <div className="p-4 border-t border-purple-300 space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  className="text-indigo-600"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  className="text-indigo-600"
                />
                <span>No</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="w-full rounded-lg border-gray-300"
              >
                <option>Order Discount</option>
                <option>Product Discount</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                >
                  <option>Code</option>
                  <option>Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <select
                  className="w-full rounded-lg border-gray-300"
                >
                  <option>Percentage</option>
                  <option>Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300"
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Section */}
        <div className="border border-dashed border-purple-300 rounded-lg">
          <button
            type="button"
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Collections</span>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <ChevronDownIcon className="w-5 h-5 transform transition-transform" />
          </button>
          <div className="p-4 border-t border-purple-300">
            <div className="text-sm mb-4">Select up to 5 collections</div>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Collections"
                className="w-full pl-10 rounded-lg border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="border border-dashed border-purple-300 rounded-lg">
          <button
            type="button"
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">Media</span>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <ChevronDownIcon className="w-5 h-5 transform transition-transform" />
          </button>
          <div className="p-4 border-t border-purple-300">
            <h3 className="text-base font-medium mb-4">Step 1: Upload Hero Image</h3>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0049ac] text-white rounded-lg hover:bg-[#0049ac]/90"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default CampaignInformation;