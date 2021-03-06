import React from 'react'
import { WorkspaceConsumer } from '../Context'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import LibraryPage from '../Components/SpacePages/LibraryPage'
import NewSemester from '../Components/SpacePages/NewSemesterPage'
import CollegeClubs from '../Components/SpacePages/CollegeClubs'
import Moodboards from '../Components/SpacePages/Moodboards'
import { FaBell } from 'react-icons/fa'
import HabitTracker from '../Components/SpacePages/HabitTracker'
import Workshop from '../Components/SpacePages/Workshop'
import TodoList from '../Components/SpacePages/TodoList'
import BucketList from '../Components/SpacePages/BucketList'
import Docs from '../Components/SpacePages/Docs'
import MeetingNotes from '../Components/SpacePages/MeetingNotes'
import companylogo from '../assets/companylogo.png'

export default function SpaceContent() {
  const param = useParams()
  return (
    <>
      <SpaceContentWrapper>
        <div className='space-content-page'>
          <Sidebar />
          <div className='page-container'>
            <div className='space-content-header'>
              <Link to='/'>
                <div className='logo-container'>
                  <img src={companylogo} alt='logo' />
                </div>
              </Link>
              <div className='right-header'>
                <FaBell className='bell-icon' />
                <Link to={`/workspace/${param.id}/details`}>
                  <div className='space-content-back-btn'>
                    <RiArrowGoBackFill /> Back
                  </div>
                </Link>
              </div>
            </div>
            <header className='space-title-container'>
              <div className='title'>
                <WorkspaceConsumer>
                  {(value) => {
                    const subheading = value.detailSpace.title
                    const heading = value.workspaceList.find(
                      (item) => item.id === value.detailSpace.workspaceID
                    ).title
                    return (
                      <div>
                        <Link to='/workspace'>
                          <h3
                            style={{
                              fontSize: '20px',
                              fontWeight: '400',
                              color: '#c4c4c4',
                            }}
                          >
                            {'My Workspaces > '}
                            <span>&nbsp;</span>
                          </h3>
                        </Link>
                        <Link to={`/workspace/${param.id}/details`}>
                          <h3
                            style={{
                              fontSize: '20px',
                              fontWeight: '400',
                              color: '#c4c4c4',
                            }}
                          >
                            {heading.length > 15
                              ? `${heading.slice(0, 15)}...>`
                              : `${heading} > `}
                            <span>&nbsp;</span>
                          </h3>
                        </Link>
                        <h3
                          className='animation-title'
                          style={{ fontSize: '20px', fontWeight: '400' }}
                        >
                          {subheading} <span>&nbsp;</span>
                          <span>
                            {value.detailSpace.altName
                              ? `(${value.detailSpace.altName})`
                              : value.detailSpace.version > 1
                              ? `(${value.detailSpace.version})`
                              : null}
                          </span>
                        </h3>
                      </div>
                    )
                  }}
                </WorkspaceConsumer>
              </div>
              <div className='line'></div>
            </header>
            <WorkspaceConsumer>
              {(value) => {
                const page = value.detailSpace.title
                if (page === 'Library') {
                  return <LibraryPage />
                }
                if (page === 'New Semester') {
                  return <NewSemester />
                }
                if (page === 'College Clubs') {
                  return <CollegeClubs />
                }
                if (page === 'Moodboards') {
                  return <Moodboards />
                }
                if (page === 'Habit Tracker') {
                  return <HabitTracker />
                }
                if (page === 'Workshop') {
                  return <Workshop />
                }
                if (page === 'To-do List') {
                  return <TodoList />
                }
                if (page === 'Bucket List') {
                  return <BucketList />
                }
                if (page === 'Docs') {
                  return <Docs />
                }
                if (page === 'Meeting Notes') {
                  return <MeetingNotes />
                }
              }}
            </WorkspaceConsumer>
          </div>
        </div>
      </SpaceContentWrapper>
    </>
  )
}

const SpaceContentWrapper = styled.section`
  .space-content-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .space-content-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .space-content-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .logo-container {
    width: 180px;
    height: 25px;
    margin-left: -130px;
  }
  .logo-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .right-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .bell-icon {
    color: #ffca10;
  }
  .space-content-back-btn {
    padding: 10px 20px;
    background: #0e1f3e;
    color: white;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 5px;
    font-weight: 400;
    position: relative;
    overflow: hidden;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .space-content-back-btn:hover {
    transform: scale(1.05);
  }
  .space-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 10px;
  }
  .space-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .space-title-container .title div {
    display: flex;
  }
  .animation-title {
    animation: slide-in 0.5s ease-in-out;
  }
  @keyframes slide-in {
    0% {
      transform: translateX(-100%);
      z-index: -1;
    }
    100% {
      transform: translateX(0%);
      z-index: 1;
    }
  }
`
