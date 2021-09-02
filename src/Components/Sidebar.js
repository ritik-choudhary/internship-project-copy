import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiTimeFive, BiTask } from 'react-icons/bi'
import { FaBars, FaBriefcase } from 'react-icons/fa'
import { BsBook, BsFillBarChartFill } from 'react-icons/bs'
import { HiNewspaper } from 'react-icons/hi'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import './Sidebar.css'

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className={`${isSidebarOpen ? 'wide-sidebar' : 'sidebar'}`}>
      <div className='user'>
        <div className='image-container'></div>
        <h3 className='username'>John Doe</h3>
      </div>
      <div className='sidebar-icons'>
        <div className='sidebar-option'>
          <div>
            <AiOutlinePlus
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Add Workspace</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <BiTimeFive
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Recents</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <FaBars
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Notes</p>
          </div>
        </div>

        <div className='sidebar-option'>
          <div>
            <BsBook
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Journal</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <FaBriefcase
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Internships</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <BsFillBarChartFill
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Insights</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <BiTask
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Task Manager</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <HiNewspaper
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Cover Letter Templates</p>
          </div>
        </div>
        <div className='sidebar-option'>
          <div>
            <RiDeleteBin5Fill
              className='sidebar-icon'
              onClick={() => setIsSidebarOpen(true)}
            />
            <p className='title icon-title'>Trash</p>
          </div>
        </div>
      </div>
    </div>
  )
}
