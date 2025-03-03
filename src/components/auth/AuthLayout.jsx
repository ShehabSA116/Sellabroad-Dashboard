import { Link } from 'react-router-dom';
import Logo from '../icons/Logo';
import SidePanel from '../icons/SidePanel';

export default function AuthLayout({ children, title, subtitle }) {
  const brandImages = [
    '../icons/brands/atc.webp',
    '../icons/brands/beautypillow.png',
    '../icons/brands/blanco.png',
    '../icons/brands/magnum.png',
    '../icons/brands/novimed.png',
    '../icons/brands/nydirect.jpg',
    '../icons/brands/opontia.png',
    '../icons/brands/saje.png',
    '../icons/brands/saxx.png',
    '../icons/brands/silverjeans.png',
    '../icons/brands/suetables.png',
    '../icons/brands/wellca.png'
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Hide SidePanel on mobile with hidden md:block */}
      <div className="hidden md:block">
        <SidePanel 
          title="Join our platform"
          subtitle="Create an account to access powerful tools for expanding into the Middle East market!"
        />
      </div>

      {/* Main Content - adjust padding for mobile */}
      <div className="flex-1 md:pl-[400px]">
        <div className="max-w-7xl mx-auto p-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <Link to="/">
                <Logo className="h-12 w-auto" />
              </Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-center text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 