import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../../Services/authService';
import { toast } from 'react-toastify';
import InputField from '../../ui/InputField';
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      localStorage.setItem('resetEmail', email);
      navigate('/auth/verify-otp');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
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
      
        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required={true}
          value={email}
          onChange={handleChange}
          disabled={isLoading}
        />

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