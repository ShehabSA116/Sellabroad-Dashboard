import React from 'react';

function KlaviyoLogo({ className = "h-6" }) {
  return (
    <svg 
      viewBox="0 0 150 150" 
      className={className}
      fill="currentColor"
    >
      <path d="M148.76,124.01H3.24V26.63H148.76l-30.55,48.69,30.55,48.69Z"/>
    </svg>
  );
}

export default KlaviyoLogo;