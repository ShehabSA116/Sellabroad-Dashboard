import KlaviyoLogo from '../icons/KlaviyoLogo';
import GoogleAdsLogo from '../icons/GoogleAdsLogo';
import ShopifyLogo from '../icons/ShopifyLogo';
import MetaLogo from '../icons/MetaLogo';

function Campaign() {
  return (
    <div>
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-orange-600">🎯</span>
          <h2 className="text-lg font-medium">High Priority</h2>
          <span className="ml-auto text-gray-600">5 days</span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-xl font-semibold">Campaign: Early Black Friday</h3>
          <div className="flex space-x-2 ml-4">
            <KlaviyoLogo className="h-5 w-5" />
            <MetaLogo className="h-5 w-5" />
            <ShopifyLogo className="h-5 w-5" />
            <GoogleAdsLogo className="h-5 w-5" />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Explanation</h4>
          <p className="text-gray-600">
            Early Black Friday is the perfect opportunity to boost your sales as shoppers prepare for holiday deals! Capture their attention and convert interest into immediate purchases with irresistible discounts and offers, creating a rush of excitement that can...
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h4 className="text-lg font-medium mb-2">Content Idea</h4>
          <p className="text-gray-600">
            Launch an exclusive preview sale: 'Unlock Early Black Friday Deals Now!'
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Includes:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                <ShopifyLogo className="h-4 w-4 mr-1" />
                Website (1)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                <GoogleAdsLogo className="h-4 w-4 mr-1" />
                Ads (2)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                <KlaviyoLogo className="h-4 w-4 mr-1" />
                Emails (4)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                <MetaLogo className="h-4 w-4 mr-1" />
                Social (1)
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              Dismiss
            </button>
            <button className="px-4 py-2 bg-[#0049ac] text-white rounded-lg hover:bg-[#0049ac]/90">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campaign;