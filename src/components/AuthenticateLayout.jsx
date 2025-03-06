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
    '/auth/signup': {
      title: "Create an account",
      subtitle: "Enter your email and password to create an account"
    },
    '/auth/signin ': {
      title: "Sign in to your account",
      subtitle: "Enter your email and password to sign in"
    },
    '/auth/forgot-password': {
      title: "Forgot your password?",
      subtitle: "Enter your email to reset your password"
    },
    '/auth/reset-password': {
      title: "Reset your password",
      subtitle: "Enter your new password to reset your password"
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