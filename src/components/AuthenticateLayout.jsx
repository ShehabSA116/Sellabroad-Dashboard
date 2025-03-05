import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AuthLayout from './auth/AuthLayout'

function AuthenticateLayout() {
  const location = useLocation();
  
  const authProps = {
    '/auth/verify-otp': {
      title: "Verify your OTP",
      subtitle: "Enter the OTP sent to your email address"
    },
   
  }[location.pathname] || {};

  return (
    <AuthLayout title={authProps.title} subtitle={authProps.subtitle}>
      <main>
        <Outlet context={authProps} />
      </main>
    </AuthLayout>
  )
}

export default AuthenticateLayout