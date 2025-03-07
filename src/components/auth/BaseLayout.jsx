// BaseLayout.jsx (to be created)
import { Link } from 'react-router-dom';
import Logo from '../icons/Logo';
import SidePanel from '../icons/SidePanel';

export default function BaseLayout({ 
  children, 
  sidePanelTitle, 
  sidePanelSubtitle,
  showLogo = true
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Hide SidePanel on mobile with hidden md:block */}
      <div className="hidden md:block">
        <SidePanel 
          title={sidePanelTitle || "Join our platform"}
          subtitle={sidePanelSubtitle || "Create an account to access powerful tools for expanding into the Middle East market!"}
        />
      </div>

      {/* Main Content - adjust padding for mobile */}
      <div className="flex-1 md:pl-[400px]">
        <div className="max-w-7xl mx-auto p-8">
          {showLogo && (
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="flex justify-center">
                <Link to="/">
                  <Logo className="h-20 w-auto" />
                </Link>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}