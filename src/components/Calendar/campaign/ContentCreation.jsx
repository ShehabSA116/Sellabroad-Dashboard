import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhotoIcon, 
  HomeIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { MetaLogo, GoogleAdsLogo } from '../../icons';
import HomepageBannerModal from '../../modals/HomepageBannerModal';
import GoogleAdsModal from '../../modals/GoogleAdsModal';
import EmailBuilderModal from '../../modals/EmailBuilderModal';
import FacebookAdsModal from '../../modals/FacebookAdsModal';
import EmailModal from '../../modals/EmailModal';
import SocialPostModal from '../../modals/SocialPostModal';

function ContentCreation({ onNext, onBack }) {
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showGoogleAdsModal, setShowGoogleAdsModal] = useState(false);
  const [showFacebookAdsModal, setShowFacebookAdsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSocialPostModal, setShowSocialPostModal] = useState(false);

  const contentItems = [
    {
      type: 'Pre-Announcement Email',
      emailType: 'pre-announcement',
      title: 'Thanksgiving Deals You\'ll Love!',
      date: 'November 21',
      icon: EnvelopeIcon,
      status: 'to-do'
    },
    {
      type: 'Social Post',
      title: 'Still savoring the Thanksgiving vibes? It\'s not too late to add some festive flavor! Enjoy 25% OFF on orders over $1 with code 25OFF.',
      date: 'November 22',
      icon: PhotoIcon,
      status: 'in-progress'
    },
    {
      type: 'Announcement Email',
      emailType: 'announcement',
      title: 'Thanksgiving Deals: Save 25% Today!',
      date: 'November 23',
      icon: EnvelopeIcon,
      status: 'completed'
    },
    {
      type: 'Facebook Ads',
      title: 'Thanksgiving Treats!',
      date: 'November 23 → November 24',
      icon: MetaLogo,
      status: 'scheduled'
    },
    {
      type: 'Google Ads',
      title: 'Thanksgiving Deals 25%',
      date: 'November 23 → November 24',
      icon: GoogleAdsLogo,
      status: 'published'
    },
    {
      type: 'Homepage Banner',
      title: 'Thanksgiving Sale',
      date: 'November 23',
      icon: HomeIcon,
      status: 'to-do'
    },
    {
      type: 'Reminder Email',
      emailType: 'reminder',
      title: 'Last Chance: 25% Off Ends Tonight!',
      date: 'November 25',
      icon: ClockIcon,
      status: 'to-do'
    },
    {
      type: 'Last Chance Email',
      emailType: 'last-chance',
      title: 'Final Hours: 25% Off Thanksgiving!',
      date: 'November 29',
      icon: ClockIcon,
      status: 'to-do'
    }
  ];

  const handleViewContent = (item) => {
    if (item.type === 'Homepage Banner') {
      setShowBannerModal(true);
    } else if (item.type === 'Google Ads') {
      setShowGoogleAdsModal(true);
    } else if (item.type === 'Facebook Ads') {
      setShowFacebookAdsModal(true);
    } else if (item.emailType) {
      setShowEmailModal(true);
      setCurrentEmailItem(item);
    } else if (item.type === 'Social Post') {
      setShowSocialPostModal(true);
    }
  };
  
  const [currentEmailItem, setCurrentEmailItem] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'to-do': 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'published': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Great Work - Now Let's Work On Your Content!</h2>
        <p className="mt-2 text-gray-600">
          Here is an overview of what's been generated and a suggestion for the order in which you should publish it.
        </p>
      </div>

      <div className="space-y-4">
        {contentItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <item.icon className="h-6 w-6 text-gray-500" />
              <div>
                <h3 className="font-medium">{item.type}</h3>
                <p className="text-sm text-gray-500">{item.title}</p>
                <button
                  onClick={() => handleViewContent(item)}
                  className="text-indigo-600 text-sm hover:text-indigo-900 mt-1"
                >
                  View Content
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{item.date}</span>
              <select
                value={item.status}
                onChange={(e) => {
                  const newItems = [...contentItems];
                  newItems[index].status = e.target.value;
                  setContentItems(newItems);
                }}
                className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${getStatusColor(item.status)}`}
              >
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-[#0049ac] text-white rounded-lg hover:bg-[#0049ac]/90"
        >
          Next
        </button>
      </div>

      <HomepageBannerModal 
        isOpen={showBannerModal}
        onClose={() => setShowBannerModal(false)}
      />

      <GoogleAdsModal
        isOpen={showGoogleAdsModal}
        onClose={() => setShowGoogleAdsModal(false)}
      />

      <FacebookAdsModal
        isOpen={showFacebookAdsModal}
        onClose={() => setShowFacebookAdsModal(false)}
      />

      {currentEmailItem?.emailType === 'pre-announcement' ? (
        <EmailBuilderModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
        />
      ) : currentEmailItem && <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />}

      <SocialPostModal
        isOpen={showSocialPostModal}
        onClose={() => setShowSocialPostModal(false)}
      />
    </div>
  );
}

export default ContentCreation;