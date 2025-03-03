import WorldMap from './WorldMap';

function NewMarkets({ onNext, onPrevious }) {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
          New Markets
        </h1>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Current Markets
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <WorldMap
              selectedMarkets={[]}
              onMarketSelect={() => {}}
              currentMarkets={[]}
              targetMarkets={[]}
              isSelectingCurrent={true}
            />
          </div>

          {/* Current Markets Container */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Current Markets</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0049ac] text-white">
                United States
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0049ac] text-white">
                Canada
              </span>
            </div>
          </div>

          {/* Target Markets Container */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Target Expansion Markets</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#00ac4a] text-white">
                United Kingdom
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#00ac4a] text-white">
                Germany
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed position confirm button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          className="px-6 py-3 rounded-lg shadow-lg bg-[#0049ac] text-white hover:bg-[#0049ac]/90 hover:shadow-xl"
        >
          Confirm Current Markets
        </button>
      </div>
    </>
  );
}

export default NewMarkets;