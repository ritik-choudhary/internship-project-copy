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
import Modal from 'react-modal'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function ResourcePage(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <ResourcePageComponent
            value={value}
            {...props}
          ></ResourcePageComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function ResourcePageComponent(props) {
  const { value, isSharing } = props
  const param = useParams()

  const workspaceName = value.workspaceList.find(
    (item) => item.id === param.id
  ).title

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)

  return (
    <>
      {isSharing ? (
        <Modal
          isOpen={true}
          style={{
            content: {
              width: '95vw',
              minHeight: '95vh',
              top: '20%',
              left: '50%',
              right: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -20%)',
              boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
              borderRadius: '10px',
              background: 'white',
              padding: '-20px',
            },
            overlay: {
              background: 'rgba(0, 0, 0, 0.31)',
            },
          }}
        >
          <ResourcePageWrapper>
            <div className='resource-content-page'>
              <div className='page-container'>
                <div className='share-content-header'>
                  <h3>thesocialcomment</h3>

                  <div className='share-right-header'>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/share`}
                    >
                      <div className='resource-content-back-btn'>
                        <RiArrowGoBackFill /> Back
                      </div>
                    </Link>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}`}
                    >
                      <div className='single-club-close-btn'>
                        <AiFillCloseCircle />
                      </div>
                    </Link>
                  </div>
                </div>
                <header className='resource-page-title-container'>
                  <div className='line'></div>
                </header>
                {resource.title === 'Tasks' ? (
                  <Tasks isSharing />
                ) : resource.title === 'Ideas' ? (
                  <Ideas isSharing />
                ) : resource.title === 'Meeting Notes' ? (
                  <MeetingNotes isSharing />
                ) : resource.title === 'Finance and Sponsorships' ? (
                  <Finance isSharing />
                ) : resource.title === 'External contacts' ? (
                  <Contacts isSharing />
                ) : null}
              </div>
            </div>
          </ResourcePageWrapper>
        </Modal>
      ) : (
        <ResourcePageWrapper>
          <div className='resource-content-page'>
            <Sidebar />
            <div className='page-container'>
              <div className='resource-content-header'>
                <Link to='/'>
                  <h3>thesocialcomment</h3>
                </Link>
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
              <header className='resource-page-title-container'>
                <div className='title'>
                  <div>
                    <Link to='/workspace'>
                      <h3
                        style={{
                          fontSize: '20px',
                          color: '#c4c4c4',
                          fontWeight: '400',
                        }}
                      >
                        {`My Workspace >`}
                        <span>&nbsp;</span>
                      </h3>
                    </Link>
                    <Link to={`/workspace/${param.id}/details`}>
                      <h3
                        style={{
                          fontSize: '20px',
                          color: '#c4c4c4',
                          fontWeight: '400',
                        }}
                      >
                        {workspaceName.length > 15
                          ? ` ${workspaceName.slice(0, 15)}... > `
                          : `${workspaceName} > `}
                        <span>&nbsp;</span>
                      </h3>
                    </Link>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}`}
                    >
                      <h3
                        style={{
                          color: '#c4c4c4',
                          fontSize: '20px',
                          fontWeight: '400',
                        }}
                      >
                        {`${space.title} > `}
                        <span>&nbsp;</span>
                      </h3>
                    </Link>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}`}
                    >
                      <h3
                        style={{
                          color: '#c4c4c4',
                          fontSize: '20px',
                          fontWeight: '400',
                        }}
                      >
                        <span>&nbsp;</span>
                        {club.title.length > 15
                          ? `${club.title.slice(0, 12)}...>`
                          : `${club.title} > `}
                        <span>&nbsp;</span>
                      </h3>
                    </Link>
                    <h3
                      className='animation-title'
                      style={{ fontSize: '20px', fontWeight: '400' }}
                    >
                      {resource.title}
                    </h3>
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
        </ResourcePageWrapper>
      )}
    </>
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
  .share-content-header {
    padding: 10px 50px 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .resource-content-header h3,
  .share-content-header h3 {
    color: white;
    margin-left: -130px;
  }
  .right-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .share-right-header {
    display: flex;
    align-items: center;
    gap: 70px;
  }
  .bell-icon {
    color: #ffca10;
  }
  .single-club-close-btn {
    color: #ffc8c8;
    font-size: 30px;
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
  .resource-page-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .resource-page-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .resource-page-title-container .title div {
    display: flex;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .animation-title {
    animation: slide-in 0.5s ease-in-out;
  }
  @keyframes slide-in {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`
