import React from 'react'
import { WorkspaceConsumer } from '../Context'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import LibraryPage from '../Components/LibraryPage'
import NewSemester from '../Components/NewSemesterPage'
import { FaBell } from 'react-icons/fa'

export default function SpaceContent() {
  const param = useParams()
  return (
    <>
      <SpaceContentWrapper>
        <div className='space-content-page'>
          <Sidebar />
          <div className='page-container'>
            <div className='space-content-header'>
              <h3>thesocialcomment</h3>
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
                      <div style={{ fontSize: '20px', fontWeight: '400' }}>
                        <h3
                          style={{ color: '#c4c4c4' }}
                        >{`My Workspace > ${heading} > `}</h3>
                        <h3> {subheading}</h3>
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
  .space-content-header h3 {
    color: white;
    margin-left: -130px;
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
`
