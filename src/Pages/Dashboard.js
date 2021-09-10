import React from 'react'
import Header from '../Components/Header'
import Tiles from '../Components/Tiles'
import Sidebar from '../Components/Sidebar'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard-content'>
        <Header />
        <Tiles />
      </div>
    </div>
  )
}