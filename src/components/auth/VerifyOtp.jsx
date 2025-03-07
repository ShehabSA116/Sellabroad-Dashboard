import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput';
import authService from '../../Services/authService';
import { toast } from 'react-toastify';
export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const handleResendOtp = async () => {
  const email = localStorage.getItem('resetEmail');
  if (email) {
    try {
      setIsLoading(true);
      await authService.forgotPassword(email);
      toast.success('Check your email for the OTP code');
    } catch (err) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Get the email we stored during forgot password
      const email = localStorage.getItem('resetEmail');
      
      if (!email) {
        toast.error('No email found. Please try the forgot password process again.');
        return;
      }

      const response = await authService.verifyOtp(email, otp);
      
      // Store the reset token from the response
      if (response.token) {
        localStorage.setItem('resetToken', response.token);
        // Navigate to reset password page
        navigate('/auth/reset-password');
        toast.success('OTP verified successfully');
        localStorage.removeItem('resetEmail');
      } else {
        toast.error('No reset token received from server');
      }
    } catch (err) {
toast.error(err.response?.data?.message || 'Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-center justify-center gap-10"
    onSubmit={handleSubmit}
    >
      <OTPInput 
        length={6} 
        separator="-" 
        onChange={(newOtpArray) => setOtp(newOtpArray.join(''))} 
      />

      <button 
        onClick={handleSubmit}
        disabled={isLoading || otp.length !== 6}
        className={`w-full mt-4 bg-[#0049ac] text-white px-4 py-2 rounded-md hover:bg-[#0049ac]/90 transition-colors duration-200 ${
          (isLoading || otp.length !== 6) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>

      <button
        type="button"
        onClick={handleResendOtp}
        disabled={isLoading}
        className="text-sm text-[#0049ac] hover:text-[#0049ac]/90 hover:underline  cursor-pointer" 
      >
        Resend OTP  
      </button>
    </form>
  );
}
