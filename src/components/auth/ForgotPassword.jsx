import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../Services/authService';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      // Store email in localStorage for the OTP verification
      localStorage.setItem('resetEmail', email);
      // Navigate to verify-otp page
      navigate('/auth/verify-otp');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      title="Reset your password"
      subtitle="Enter your email address and we'll send you an OTP code to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-8 py-6">
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              value={email}
              onChange={handleChange}
              disabled={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP Code'}
          </button>
        </div>      

        <div className="text-center">
          <Link
            to="/auth/signin"
            className="text-sm font-medium text-[#0049ac] hover:text-[#0049ac]/90"
          >
            Return to sign in
          </Link>
        </div>
      </form>
    </div>
  );
} 