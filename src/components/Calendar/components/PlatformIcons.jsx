import React from 'react';
import KlaviyoLogo from '../../icons/KlaviyoLogo';
import GoogleAdsLogo from '../../icons/GoogleAdsLogo';
import ShopifyLogo from '../../icons/ShopifyLogo';
import MetaLogo from '../../icons/MetaLogo';

export function PlatformIcons({ platforms, size = 2.5 }) {
  // Use specific classes based on size prop
  const getIconClass = () => {
    if (size === 3.5) return 'h-3.5 w-3.5 text-white';
    return 'h-2.5 w-2.5 text-white';
  };

  return (
    <div className="flex space-x-1">
      {platforms.map((platform) => {
        switch (platform) {
          case 'klaviyo':
            return <KlaviyoLogo key="klaviyo" className={getIconClass()} />;
          case 'meta':
            return <MetaLogo key="meta" className={getIconClass()} />;
          case 'shopify':
            return <ShopifyLogo key="shopify" className={getIconClass()} />;
          case 'google-ads':
            return <GoogleAdsLogo key="google-ads" className={getIconClass()} />;
          default:
            return null;
        }
      })}
    </div>
  );
} 