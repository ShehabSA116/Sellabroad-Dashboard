import React, { useState, useRef } from 'react';

export default function OTPInput({ length = 6, separator = '-', onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const updateOtp = (newOtp) => {
    setOtp(newOtp);
    if (onChange) {
      onChange(newOtp);
    }
  };

  const handleChange = (e, idx) => {
    const value = e.target.value;
    // Only allow digits (adjust as needed)
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    updateOtp(newOtp);
    if (value && idx < length - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {otp.map((digit, idx) => (
        <React.Fragment key={idx}>
          <input
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputRefs.current[idx] = el)}
            className="w-12 h-12 border border-gray-300 text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={1}
          />
          {idx < length - 1 && <span className="text-xl">{separator}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}


