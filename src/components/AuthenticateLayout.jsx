import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AuthLayout from './auth/BaseLayout'

function AuthenticateLayout() {
  

  return (
    <AuthLayout>
      <main>
        <Outlet  />
      </main>
    </AuthLayout>
  )
}

export default AuthenticateLayout