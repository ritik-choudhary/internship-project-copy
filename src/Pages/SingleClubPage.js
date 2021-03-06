import React, { useState, useEffect } from 'react'
import { Link, useParams, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell, FaShareSquare } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import ResourceModal from '../Components/Club/ResourceModal'
import { BiTask } from 'react-icons/bi'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { CgNotes } from 'react-icons/cg'
import { FaMoneyCheck, FaPhone } from 'react-icons/fa'
import companylogo from '../assets/companylogo.png'

export default function SingleClubPage() {
  return (
    <SingleClubPageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/addresource'>
          <ResourceModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <SingleClubPageComponent value={value}></SingleClubPageComponent>
          )
        }}
      </WorkspaceConsumer>
    </SingleClubPageWrapper>
  )
}

function SingleClubPageComponent(props) {
  const { value } = props
  const param = useParams()

  const [createdBy, setCreatedBy] = useState()
  const [memberToAdd, setMemberToAdd] = useState('')
  const [members, setMembers] = useState([])
  const [mission, setMission] = useState()

  const workspaceName = value.workspaceList.find(
    (item) => item.id === param.id
  ).title

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  useEffect(() => {
    if (club) {
      setCreatedBy(club?.basicInfo?.createdBy)
      setMembers(club?.basicInfo?.members || [])
      setMission(club?.basicInfo?.mission)
    }
  }, [club])

  return (
    <div className='single-club-page'>
      <Sidebar />
      <div className='page-container'>
        <div className='single-club-header'>
          <Link to='/'>
            <div className='logo-container'>
              <img src={companylogo} alt='logo' />
            </div>
          </Link>
          <div className='right-header'>
            <FaBell className='bell-icon' />
            <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
              <div className='single-club-back-btn'>
                <RiArrowGoBackFill /> Back
              </div>
            </Link>
          </div>
        </div>
        <header className='club-title-container'>
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
              <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
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
              <h3
                className='animation-title'
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                {club.title.length > 15
                  ? `${club.title.slice(0, 50)}...`
                  : club.title}
              </h3>
            </div>
          </div>
          <div className='line'></div>
        </header>

        <div className='single-club-details'>
          <div className='info'>
            <div className='heading'>
              <h1>
                {club.title.length > 15
                  ? `${club.title.slice(0, 30)}...`
                  : club.title}
              </h1>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/share`}
              >
                <div className='share-btn'>
                  <FaShareSquare />
                  <div className='hover-msg'>
                    <p
                      style={{
                        color: 'black',
                        fontWeight: '400',
                        fontSize: '12px',
                      }}
                    >
                      Share
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className='basic-info'>
              <form>
                <div className='field'>
                  <label htmlFor='created-on'>Created on</label>
                  <input
                    type='text'
                    name='created-on'
                    id='created-on'
                    value={club.createdOn}
                  />
                </div>
                <div className='field'>
                  <label htmlFor='created-by'>Created by</label>
                  <input
                    type='text'
                    name='created-by'
                    id='created-by'
                    maxLength='100'
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    onBlur={(e) => {
                      e.preventDefault()
                      value.handleClubInfo(
                        param.id,
                        param.spaceKey,
                        param.clubID,
                        {
                          createdBy: createdBy,
                          members: members,
                          mission: mission,
                        }
                      )
                    }}
                  />
                </div>
                <div className='field'>
                  <label htmlFor='members' style={{ flexShrink: '0' }}>
                    Members
                  </label>
                  <input
                    type='text'
                    name='members'
                    id='members'
                    style={{ width: '318px', fontSize: '10px' }}
                    placeholder='Use comma or press enter after every member'
                    value={memberToAdd}
                    onChange={(e) => setMemberToAdd(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.keyCode === 188) {
                        e.preventDefault()
                        setMembers([
                          ...members,
                          {
                            name: memberToAdd,
                            id: new Date().getTime().toString(),
                          },
                        ])
                        setMemberToAdd('')
                      }
                    }}
                    onBlur={(e) => {
                      e.preventDefault()
                      value.handleClubInfo(
                        param.id,
                        param.spaceKey,
                        param.clubID,
                        {
                          createdBy: createdBy,
                          members: members,
                          mission: mission,
                        }
                      )
                    }}
                  />
                  <div className='members-container'>
                    {members?.map((item) => {
                      return (
                        <div className='member-tag' key={item.id}>
                          <p>{item.name}</p>
                          <AiOutlineClose
                            onClick={(e) => {
                              let newMembersList = [...members]
                              newMembersList = newMembersList.filter(
                                (temp) => temp.id !== item.id
                              )
                              setMembers(newMembersList)
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='field'>
                  <label htmlFor='mission'>Mission</label>
                  <input
                    type='text'
                    name='mission'
                    id='mission'
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    maxLength='100'
                    onBlur={(e) => {
                      e.preventDefault()
                      value.handleClubInfo(
                        param.id,
                        param.spaceKey,
                        param.clubID,
                        {
                          createdBy: createdBy,
                          members: members,
                          mission: mission,
                        }
                      )
                    }}
                    style={{ width: '800px' }}
                  />
                </div>
              </form>
            </div>
          </div>
          <section className='resources'>
            <h1 className='heading'>Resources</h1>
            <div className='resources-container'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/addresource`}
              >
                <div className='resource-card add-new-resource'>
                  <AiOutlinePlus />
                  <p>Add new resource</p>
                </div>
              </Link>
              {club?.resources?.map((item) => {
                return (
                  <Link
                    to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${item.id}`}
                  >
                    <div className='resource-card'>
                      {item.title === 'Tasks' ? (
                        <BiTask />
                      ) : item.title === 'Ideas' ? (
                        <HiOutlineLightBulb />
                      ) : item.title === 'Meeting Notes' ? (
                        <CgNotes />
                      ) : item.title === 'Finance and Sponsorships' ? (
                        <FaMoneyCheck />
                      ) : item.title === 'External contacts' ? (
                        <FaPhone />
                      ) : null}
                      <p>
                        {item.title}
                        {item.version > 1 ? `(${item.version})` : null}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const SingleClubPageWrapper = styled.section`
  .single-club-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .single-club-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .single-club-header {
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
  .single-club-back-btn {
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
  .single-club-back-btn:hover {
    transform: scale(1.05);
  }
  .club-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .club-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .club-title-container .title div {
    display: flex;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .single-club-details {
    padding: 0px 150px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .single-club-details .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .single-club-details .info .heading {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-size: 20px;
    color: #468aef;
  }
  .info h1 {
    font-size: 20px;
    color: #468aef;
    font-weight: 400;
  }
  .basic-info {
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    padding: 15px 15px;
    overflow: auto;
  }
  .basic-info form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .basic-info form div {
    display: flex;
    gap: 30px;
  }
  .basic-info form div label {
    color: #c4c4c4;
    font-size: 16px;
    font-weight: 400;
    width: 100px;
  }
  .basic-info form div input {
    border: none;
    font-size: 14px;
    font-weight: 400;
    outline: none;
  }
  .basic-info form div input:hover {
    border-bottom: 1px solid #468aef;
  }
  .basic-info form .members-container {
    display: flex;
    height: 25px;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .basic-info form .member-tag {
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    padding: 3px 5px;
    background: #e5e5e5;
  }
  .member-tag p {
    font-size: 14px;
  }
  .member-tag svg {
    font-size: 14px;
    color: red;
    cursor: pointer;
  }
  .resources {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .resources .heading {
    font-size: 20px;
    font-weight: 400;
  }
  .resources-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .resource-card {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    font-weight: 400;
    color: #468aef;
    padding: 20px 20px;
    background: #f2f4f8;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .resource-card p {
    white-space: nowrap;
  }
  .resource-card svg {
    font-size: 20px;
  }
  .resource-card:hover {
    transform: scale(1.04);
    border: 1px solid #468aef;
  }
  .add-new-resource {
    border: 1px solid #468aef;
    box-shadow: none;
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

  .share-btn {
    position: relative;
  }

  .share-btn:hover .hover-msg {
    opacity: 1;
  }

  .hover-msg {
    position: absolute;
    top: -16px;
    left: -10px;
    opacity: 0;
  }
`
