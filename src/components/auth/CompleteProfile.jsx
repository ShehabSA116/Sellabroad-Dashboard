import React from 'react';
import { Link } from 'react-router-dom';
import SidePanel from '../common/SidePanel';
import Logo from '../Logo';

export default function CompleteProfile() {
  return (
    <div className="min-h-screen flex">
      {/* Hide SidePanel on mobile */}
      <div className="hidden md:block">
        <SidePanel 
          title="Complete Your Profile"
          subtitle="Fill in the details to get started"
          steps={[
            { id: 'profile', title: 'Profile', description: 'Complete your profile information' }
          ]}
          currentStep="profile"
          completedSteps={[]}
        />
      </div>

      {/* Main Content - Adjust padding for mobile */}
      <div className="flex-1 md:pl-[400px] flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-4 md:p-0">
          {/* Add Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <Logo className="h-12 w-auto" />
            </Link>
          </div>
          
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Please complete your profile
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {/* Additional instructions or information can go here */}
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="phoneNumber" className="sr-only">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  <option value="" disabled>Select your country</option>
                </select>
              </div>
              <div>
                <label htmlFor="companyName" className="sr-only">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label htmlFor="businessWebsite" className="sr-only">
                  Business Website
                </label>
                <input
                  type="url"
                  name="businessWebsite"
                  id="businessWebsite"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Business Website (e.g., https://example.com)"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-[#0049ac] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0049ac]/90 focus:outline-none focus:ring-2 focus:ring-[#0049ac] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 