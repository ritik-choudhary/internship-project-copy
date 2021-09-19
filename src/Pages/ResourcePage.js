import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import Tasks from '../Components/resourcepages/Tasks'
import Ideas from '../Components/resourcepages/Ideas'
import Finance from '../Components/resourcepages/Finance'
import MeetingNotes from '../Components/resourcepages/MeetingNotes'
import Contacts from '../Components/resourcepages/Contacts'

export default function ResourcePage() {
  return (
    <ResourcePageWrapper>
      <WorkspaceConsumer>
        {(value) => {
          return <ResourcePageComponent value={value}></ResourcePageComponent>
        }}
      </WorkspaceConsumer>
    </ResourcePageWrapper>
  )
}

function ResourcePageComponent(props) {
  const { value } = props
  const param = useParams()

  const workspaceName = value.workspaceList.find(
    (item) => item.id === param.id
  ).title

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)

  console.log(resource)

  return (
    <div className='resource-content-page'>
      <Sidebar />
      <div className='page-container'>
        <div className='resource-content-header'>
          <h3>thesocialcomment</h3>
          <div className='right-header'>
            <FaBell className='bell-icon' />
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}`}
            >
              <div className='resource-content-back-btn'>
                <RiArrowGoBackFill /> Back
              </div>
            </Link>
          </div>
        </div>
        <header className='space-title-container'>
          <div className='title'>
            <div style={{ fontSize: '20px', fontWeight: '400' }}>
              <h3 style={{ color: '#c4c4c4' }}>{`My Workspace > ${
                workspaceName.length > 15
                  ? `${workspaceName.slice(0, 15)}...`
                  : workspaceName
              } > `}</h3>
              <h3 style={{ color: '#c4c4c4' }}>{`${space.title} > `}</h3>
              <h3 style={{ color: '#c4c4c4' }}>
                {club.title.length > 15
                  ? `${club.title.slice(0, 12)}...>`
                  : `${club.title} >`}
              </h3>
              <h3>{resource.title}</h3>
            </div>
          </div>
          <div className='line'></div>
        </header>
        {resource.title === 'Tasks' ? (
          <Tasks />
        ) : resource.title === 'Ideas' ? (
          <Ideas />
        ) : resource.title === 'Meeting Notes' ? (
          <MeetingNotes />
        ) : resource.title === 'Finance and Sponsorships' ? (
          <Finance />
        ) : resource.title === 'External contacts' ? (
          <Contacts />
        ) : null}
      </div>
    </div>
  )
}

const ResourcePageWrapper = styled.section`
  .resource-content-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .resource-content-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .resource-content-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .resource-content-header h3 {
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
  .resource-content-back-btn {
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
  .resource-content-back-btn:hover {
    transform: scale(1.05);
  }
  .space-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 20px;
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
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
`
