import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


function DemandForecast({ onNext, onPrevious, isFirstStep, isLastStep }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [connectedStore, setConnectedStore] = useState('');
  const [shopifyStore, setShopifyStore] = useState('');
  const [summary, setSummary] = useState({
    total_projected_revenue: 150000,
    contribution_margin_rate: 0.35,
    total_marketing_spend: 50000,
    aov: 150,
    target_roas: 2.5
  });
  const [markets, setMarkets] = useState([
    {
      country: 'United States',
      projected_sales: 100000,
      marketing: {
        roas_target: 2.5,
        monthly_spend: 20000
      }
    },
    {
      country: 'Canada',
      projected_sales: 30000,
      marketing: {
        roas_target: 2.5,
        monthly_spend: 6000
      }
    },
    {
      country: 'United Kingdom',
      projected_sales: 20000,
      marketing: {
        roas_target: 2.5,
        monthly_spend: 4000
      }
    }
  ]);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleShopifyConnect = (e) => {
    e.preventDefault();
    setConnectedStore('example-store.myshopify.com');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl text-center font-bold text-gray-900 mb-4">Demand Forecast</h1>
      <p className="text-center text-gray-600 mb-8">Connect your store to calculate your demand forecast</p>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0049ac] mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching your forecast data...</p>
        </div>
      ) : (
        <>
          {!connectedStore ? (
            // Show Shopify connection form if no store is connected
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <svg 
                  className="h-6 w-6 text-[#96bf48]" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M21.9 4.7l-1.9-.2s-.2-.2-.2-.3c-.2-.4-.4-.9-.8-1.3-.7-.8-1.7-1-2.5-.9h-.1L15 2.3c-.4-.9-1-1.7-2.2-1.7-.1 0-.2 0-.3.1L12 .9l-.5-.2c-.1 0-.2-.1-.3-.1-1.2 0-1.8.8-2.2 1.7l-1.4-.3h-.1c-.8-.1-1.8.1-2.5.9-.3.4-.6.9-.8 1.3 0 .1-.1.2-.2.3L2.1 4.7c-.5.1-.9.3-1.2.7-.3.4-.4.8-.3 1.3l3.1 19.4c.1.4.4.8.8.9.1 0 .2.1.3.1.3 0 .6-.1.8-.3l5.6-2.6c.2.1.4.1.6.1s.4 0 .6-.1l5.6 2.6c.2.2.5.3.8.3.1 0 .2 0 .3-.1.4-.2.7-.5.8-.9l3.1-19.4c.1-.5 0-.9-.3-1.3-.3-.4-.7-.6-1.2-.7-1.3z"/>
                </svg>
                <h2 className="text-xl font-semibold">Connect Shopify Store</h2>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="shopify_store" className="block text-sm font-medium text-gray-700 mb-1">
                    Shopify Store Name
                  </label>
                  <input
                    type="text"
                    id="shopify_store"
                    placeholder="yourstore"
                    value={shopifyStore}
                    onChange={(e) => setShopifyStore(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter your store name without .myshopify.com
                  </p>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleShopifyConnect}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#96bf48] hover:bg-[#85ab3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#96bf48]"
                  >
                    Connect Store
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Show connected store banner and metrics if store is connected
            <>
              {/* Connected Store Banner */}
              <div className="inline-flex bg-white rounded-xl p-4 shadow-sm mb-8">
                <div className="flex items-center space-x-2">
                  <svg 
                    className="h-6 w-6 text-[#96bf48]" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M21.9 4.7l-1.9-.2s-.2-.2-.2-.3c-.2-.4-.4-.9-.8-1.3-.7-.8-1.7-1-2.5-.9h-.1L15 2.3c-.4-.9-1-1.7-2.2-1.7-.1 0-.2 0-.3.1L12 .9l-.5-.2c-.1 0-.2-.1-.3-.1-1.2 0-1.8.8-2.2 1.7l-1.4-.3h-.1c-.8-.1-1.8.1-2.5.9-.3.4-.6.9-.8 1.3 0 .1-.1.2-.2.3L2.1 4.7c-.5.1-.9.3-1.2.7-.3.4-.4.8-.3 1.3l3.1 19.4c.1.4.4.8.8.9.1 0 .2.1.3.1.3 0 .6-.1.8-.3l5.6-2.6c.2.1.4.1.6.1s.4 0 .6-.1l5.6 2.6c.2.2.5.3.8.3.1 0 .2 0 .3-.1.4-.2.7-.5.8-.9l3.1-19.4c.1-.5 0-.9-.3-1.3-.3-.4-.7-.6-1.2-.7-1.3z"/>
                  </svg>
                  <div className="bg-green-50 px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-700">Connected</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {connectedStore.replace('.myshopify.com', '')}
                  </span>
                </div>
              </div>

              {/* Key Metrics Overview */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Total Sales */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Total Sales</div>
                    <div className="text-lg font-semibold text-[#0049ac]">
                      ${(summary?.total_projected_revenue || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Contribution Margin */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Contribution Margin</div>
                    <div className="text-lg font-semibold text-[#0049ac]">
                      {summary?.contribution_margin_rate ? 
                        `${(summary.contribution_margin_rate * 100).toFixed(1)}%` : 
                        'Calculating...'}
                    </div>
                  </div>

                  {/* Marketing Spend */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Marketing Spend</div>
                    <div className="text-lg font-semibold text-[#0049ac]">
                      ${(summary?.total_marketing_spend || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Average Order Value */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Average Order Value</div>
                    <div className="text-lg font-semibold text-[#0049ac]">
                      ${(summary?.aov || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Marketing ROAS */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Target ROAS</div>
                    <div className="text-lg font-semibold text-[#0049ac]">
                      {summary?.target_roas || 2.5}x
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue by Country Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-6">Revenue by Country</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {markets.map(market => (
                    <div key={market.country} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-500">{market.country}</div>
                        <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          ROAS {market.marketing?.roas_target || 2.5}x
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-gray-500">Projected Revenue</div>
                          <div className="text-lg font-semibold text-[#0049ac]">
                            ${(market.projected_sales || 0).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Monthly Marketing Budget</div>
                          <div className="text-lg font-semibold text-[#0049ac]">
                            ${(market.marketing?.monthly_spend || 0).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onPrevious}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back to Markets
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-3 bg-[#0049ac] text-white rounded-lg hover:bg-[#0049ac]/90 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Setup
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DemandForecast;