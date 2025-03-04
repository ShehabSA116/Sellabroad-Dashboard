import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import OTPInput from './OTPInput';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const { title, subtitle } = useOutletContext();

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="text-2xl font-bold text-center text-gray-900">{title}</h2>
      <p className="text-center text-sm text-gray-600">{subtitle}</p>
      <OTPInput 
        length={6} 
        separator="-" 
        onChange={(newOtpArray) => setOtp(newOtpArray.join(''))} 
      />
      <button className="w-full mt-4 bg-[#0049ac] text-white px-4 py-2 rounded-md hover:opacity-80 transition-colors duration-200">
        Verify OTP
      </button>
    </div>
  );
}
