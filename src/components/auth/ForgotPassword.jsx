import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  return (
    <div
      title="Reset your password"
      subtitle="Enter your email address and we'll send you an OTP code to reset your password."
    >
      <form className="space-y-8 py-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
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
            Send OTP Code
          </button>
        </div>

        <div className="text-center">
          <Link
            to="/signin"
            className="text-sm font-medium text-[#0049ac] hover:text-[#0049ac]/90"
          >
            Return to sign in
          </Link>
        </div>
      </form>
    </div>
  );
} 