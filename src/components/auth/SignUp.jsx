import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import GoogleButton from "react-google-button";

export default function SignUp() {
  return (
    <div
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-[#0049ac] hover:text-[#0049ac]/90">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <div className="mt-1">
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              required
              placeholder="+971501234567"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="company_name"
              id="company_name"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="business_website" className="block text-sm font-medium text-gray-700">
            Business Website
          </label>
          <div className="mt-1">
            <input
              type="url"
              name="business_website"
              id="business_website"
              required
              placeholder="https://example.com"
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="mt-1">
            <select
              id="country"
              name="country"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            >
              <option value="">Select a country</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0049ac] focus:outline-none focus:ring-[#0049ac] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-[#0049ac] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#0049ac]/90 focus:outline-none focus:ring-2 focus:ring-[#0049ac] focus:ring-offset-2"
          >
            Create account
          </button>
        </div>
        <div className='flex justify-center'>
          <GoogleButton />
        </div>
      </form>
    </div>
  );
} 