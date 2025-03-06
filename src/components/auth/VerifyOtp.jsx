import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OTPInput from './OTPInput';
import authService from '../../Services/authService';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Get the email we stored during forgot password
      const email = localStorage.getItem('resetEmail');
      
      if (!email) {
        setError('No email found. Please try the forgot password process again.');
        return;
      }

      const response = await authService.verifyOtp(email, otp);
      
      // Store the reset token from the response
      if (response.token) {
        localStorage.setItem('resetToken', response.token);
        // Navigate to reset password page
        navigate('/auth/reset-password');
      } else {
        setError('No reset token received from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      
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

      {/* Optional: Add a resend OTP button */}
      <button
        onClick={async () => {
          const email = localStorage.getItem('resetEmail');
          if (email) {
            try {
              setIsLoading(true);
              await authService.forgotPassword(email);
              setError('New OTP code sent!');
            } catch (err) {
              setError('Failed to resend OTP');
            } finally {
              setIsLoading(false);
            }
          }
        }}
        disabled={isLoading}
        className="text-sm text-[#0049ac] hover:text-[#0049ac]/90"
      >
        Resend OTP
      </button>
    </div>
  );
}
