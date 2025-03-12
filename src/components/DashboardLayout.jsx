import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-0">
        <div className="p-6 max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout