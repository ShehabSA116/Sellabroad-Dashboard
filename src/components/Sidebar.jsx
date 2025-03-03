import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  CalendarIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  ArrowUpTrayIcon,
  CubeIcon,
  BellIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { motion } from 'framer-motion';

const menuSections = {
  'Onboarding': {
    icon: UserGroupIcon, 
    items: [
      { 
        name: 'New Markets', 
        path: '/dashboard/markets', 
        icon: GlobeAltIcon, 
        description: 'Select your current and target markets' 
      },
      { 
        name: 'Product Information', 
        path: '/dashboard/products', 
        icon: CubeIcon, 
        description: 'Product details and compliance check' 
      },
      { 
        name: 'Demand Forecast', 
        path: '/dashboard/forecast', 
        icon: ChartBarIcon, 
        description: 'Connect store and view demand analysis' 
      },
      { 
        name: 'Upload Documents', 
        path: '/dashboard/documents', 
        icon: ArrowUpTrayIcon, 
        description: 'Business verification documents' 
      }
    ]
  },
  'Logistics': {
    icon: TruckIcon,
    items: [
      { name: 'Dashboard', path: '/logistics/dashboard', icon: ChartBarIcon },
      { name: 'Inbound Shipment', path: '/inbound', icon: TruckIcon },
      { name: '3PLs', path: '/3pl', icon: BuildingOfficeIcon }
    ]
  },
  'Market Management': {
    icon: BuildingStorefrontIcon,
    items: [
      { name: 'Strategy Dashboard', path: '/strategy/dashboard', icon: ChartBarIcon },
      { name: 'Compliance AI', path: '/strategy/compliance', icon: ShieldCheckIcon },
      { name: 'Profitability', path: '/profitability', icon: CalculatorIcon },
      { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
      { name: 'Orders', path: '/orders/dashboard', icon: ShoppingBagIcon }
    ]
  },
  'Marketing: PPC / DTC': {
    icon: ComputerDesktopIcon,
    items: [
      { name: 'Marketing Dashboard', path: '/marketing/dashboard', icon: ChartBarIcon },
      { name: 'Marketing Calendar', path: '/dashboard/calendar', icon: CalendarIcon },
      { name: 'Business DNA', path: '/strategy/business-dna', icon: BeakerIcon },
      { name: 'Marketing Platforms', path: '/strategy/platforms', icon: ComputerDesktopIcon }
    ]
  },
  'Sales Automation': {
    icon: ChartBarIcon,
    items: [
      { name: 'Automation Rules', path: '/marketing/automation', icon: ChartBarIcon },
      { name: 'User Onboarding', path: '/automation/onboarding', icon: UserGroupIcon, description: 'Account setup and brand profile' },
      { name: 'Data Analysis', path: '/automation/data', icon: ChartBarIcon, description: 'P&L parsing and metrics tracking' },
      { name: 'Forecasting', path: '/automation/forecast', icon: CalculatorIcon, description: 'Revenue and cost predictions' },
      { name: 'Marketing Calendar', path: '/automation/calendar', icon: CalendarIcon, description: 'Campaign planning and tracking' },
      { name: 'Scenario Planning', path: '/automation/scenarios', icon: BeakerIcon, description: 'Likely vs desired outcomes' },
      { name: 'Performance', path: '/automation/performance', icon: ChartBarIcon, description: 'Real-time tracking and adjustments' },
      { name: 'Reports', path: '/automation/reports', icon: ArrowUpTrayIcon, description: 'Export and analyze data' }
    ]
  },
  'Connect Sales Channels': {
    icon: GlobeAltIcon,
    items: [
      { name: 'Upload Content', path: '/upload', icon: ArrowUpTrayIcon },
      { name: 'Inventory', path: '/dashboard/inventory', icon: CubeIcon },
      { name: 'Marketplaces', path: '/marketplace', icon: BuildingStorefrontIcon },
      { name: 'DTC Websites', path: '/dtc-websites', icon: GlobeAltIcon }
    ]
  }
};

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState({});
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={toggleSidebar}>
        {!open ? (
          <AiOutlineMenu size={28} className='md:hidden ml-3 pl-1 mt-10' />
        ) : (
          <AiOutlineClose size={22} className='hidden ml-3 mt-3' />
        )}
      </button>

      <motion.div 
        className="md:block w-64 min-h-screen bg-white border-r border-gray-200 fixed md:static top-0 left-0 z-50"
        initial={{ x: isMobile ? -256 : 0 }}
        animate={{ x: isMobile ? (open ? 0 : -256) : 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: !isMobile ? 'block' : (open ? 'block' : 'none') }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-8">
            <section className='flex items-center flex-col'>
              <button onClick={toggleSidebar} className='mr-44 mb-3'>
                <AiOutlineClose size={25} className='md:hidden' />
              </button>
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                <img src="https://i.ibb.co/YkwGqLQ/Screenshot-2024-11-14-at-3-38-45-PM-removebg-preview-1.png" alt="SellAbroad.io" className="h-12" />
              </Link>
            </section>
          </div>

          <Link
            to="/"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Website
          </Link>

          <nav className="space-y-1 flex-1">
            {Object.entries(menuSections).map(([section, { icon: SectionIcon, items }]) => (
              <div key={section} className="space-y-1">
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-50 text-left"
                >
                  <div className="flex items-center flex-1">
                    <SectionIcon className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{section}</span>
                  </div>
                  <div className="flex-shrink-0 transition-transform duration-200">
                    {expandedSections[section] ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <div 
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${expandedSections[section] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="ml-4 space-y-1 py-2">
                    {items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex flex-col px-4 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {item.description && (
                          <p className="mt-1 ml-8 text-xs text-gray-500">{item.description}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <button
            className="mt-auto flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}