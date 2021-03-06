import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiTimeFive, BiTask } from 'react-icons/bi'
import { FaBars, FaBriefcase } from 'react-icons/fa'
import { BsBook, BsFillBarChartFill } from 'react-icons/bs'
import { HiNewspaper } from 'react-icons/hi'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import { CSSTransition } from 'react-transition-group'
import { HiDocumentAdd } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Profile from '../assets/profile.jpeg'
import './Sidebar.css'

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div
      className={`sidebar-animation ${
        isSidebarOpen ? 'wide-sidebar ' : 'sidebar'
      }`}
    >
      <div
        className={` ${
          isSidebarOpen
            ? 'close-sidebar-btn'
            : 'close-sidebar-btn hide-close-sidebar-btn'
        }`}
      >
        <AiOutlineClose onClick={() => setIsSidebarOpen(false)} />
      </div>
      <div className='user'>
        <div className='image-container' onClick={() => setIsSidebarOpen(true)}>
          <img src={Profile} alt='profile' />
        </div>
        <h3 className='username'>John Doe</h3>
      </div>
      <div className='sidebar-icons'>
        <Link to='/workspace' className='sidebar-icon-link'>
          <Option
            Icon={AiOutlinePlus}
            title={'Workspaces'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/recents' className='sidebar-icon-link'>
          <Option
            Icon={BiTimeFive}
            title={'Recents'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/notes' className='sidebar-icon-link'>
          <Option
            Icon={FaBars}
            title={'Notes'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/journal' className='sidebar-icon-link'>
          <Option
            Icon={BsBook}
            title={'Journal'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/internships' className='sidebar-icon-link'>
          <Option
            Icon={FaBriefcase}
            title={'Internships'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/insights' className='sidebar-icon-link'>
          <Option
            Icon={BsFillBarChartFill}
            title={'Insights'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/taskmanager' className='sidebar-icon-link'>
          <Option
            Icon={BiTask}
            title={'Task Manager'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/coverlettertemplates' className='sidebar-icon-link'>
          <Option
            Icon={HiNewspaper}
            title={'Cover Letter Templates'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/documentshelf' className='sidebar-icon-link'>
          <Option
            Icon={HiDocumentAdd}
            title={'Document Shelf'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
        <Link to='/trash' className='sidebar-icon-link'>
          <Option
            Icon={RiDeleteBin5Fill}
            title={'Trash'}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </Link>
      </div>
      <div className='back-to-profile-icon'>
        <Option
          Icon={RiArrowGoBackFill}
          title={'Back to Profile'}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  )
}

const Option = (props) => {
  const [isHovering, setIsHovering] = useState(false)
  const onMouseOver = () => {
    if (!isHovering) setIsHovering(true)
  }

  const onMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className='sidebar-option'
    >
      <div>
        <props.Icon
          className='sidebar-icon'
          onClick={() => props.setIsSidebarOpen(true)}
        />
        <CSSTransition
          in={isHovering || props.isSidebarOpen}
          classNames='title'
          unmountOnExit
          timeout={100}
        >
          <p className='title icon-title'>{props.title}</p>
        </CSSTransition>
        <CSSTransition
          in={isHovering || props.isSidebarOpen}
          classNames='title'
          unmountOnExit
          timeout={100}
        >
          <span className='icon-before'></span>
        </CSSTransition>
      </div>
    </div>
  )
}
