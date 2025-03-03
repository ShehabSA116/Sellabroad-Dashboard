import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className='flex'>
        <Sidebar />
        <main className='flex'>
        <Outlet />
        </main>
    </div>
  )
}

export default DashboardLayout