import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function SidePanel({ title, subtitle }) {
  return (
    <div className="w-[400px] bg-[#0049ac] text-white p-8 flex flex-col fixed h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {title || "Ready to expand?"}
        </h1>
        <p className="text-lg text-center text-white/90 mb-12">
          {subtitle || "Answer these questions to easily expand your market to the Middle East!"}
        </p>
        
        {/* Placeholder for slideshow - you can replace this later */}
        <div className="w-full aspect-video bg-white/10 rounded-xl mb-8">
          {/* Slideshow will go here */}
          <div className="h-full flex items-center justify-center text-white/50">
            Slideshow Placeholder
          </div>
        </div>
      </div>

      <button
        className="mt-auto flex items-center justify-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
} 
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function SidePanel({ title, subtitle, steps, currentStep, completedSteps }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Check if we're on an auth page
  const isAuthPage = location.pathname.includes('/auth') || 
                    location.pathname.includes('/signin') || 
                    location.pathname.includes('/signup');

  return (
    <div className="w-[400px] bg-[#0049ac] text-white p-8 flex flex-col fixed h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {title || "Ready to expand?"}
        </h1>
        <p className="text-lg text-center text-white/90 mb-12">
          {subtitle || "Answer these questions to easily expand your market to the Middle East!"}
        </p>
        
        {/* Placeholder for slideshow - you can replace this later */}
        <div className="w-full aspect-video bg-white/10 rounded-xl mb-8">
          {/* Slideshow will go here */}
          <div className="h-full flex items-center justify-center text-white/50">
            Slideshow Placeholder
          </div>
        </div>
      </div>

      {/* Sign Out Button - Only show if not on auth pages */}
      {!isAuthPage && (
        <button
          onClick={handleSignOut}
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      )}
    </div>
  );
} 