import React, { useState } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell, FaEdit } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'
import OngoingModal from '../Components/InternshipModals/OngoingModal'
import { CgNotes } from 'react-icons/cg'
import AppliedModal from '../Components/InternshipModals/AppliedModal'
import LinksAndPdfsModal from '../Components/InternshipModals/LinksAndPdfsModal'
import InternshipTaskModal from '../Components/InternshipModals/InternshipTaskModal'
import TasksContainerModal from '../Components/InternshipModals/TasksContainerModal'
import companylogo from '../assets/companylogo.png'

export default function Internships() {
  return (
    <>
      <Switch>
        <Route path='/internships/edit/:internshipID'>
          <OngoingModal isEditing />
        </Route>
        <Route path='/internships/tasks/:internshipID'>
          <TasksContainerModal />
        </Route>
        <Route path='/internships/addtask/:internshipID'>
          <InternshipTaskModal />
        </Route>
        <Route path='/internships/docs/:internshipID'>
          <LinksAndPdfsModal />
        </Route>
        <Route path='/internships/addnewongoing'>
          <OngoingModal />
        </Route>
        <Route path='/internships/addnewapplied'>
          <AppliedModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <InternshipsComponent value={value}></InternshipsComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function InternshipsComponent(props) {
  const { value } = props
  const [isOngoing, setIsOngoing] = useState(true)
  const [isApplied, setIsApplied] = useState(false)
  const [isStatusBarOpen, setIsStatusBarOpen] = useState(false)
  return (
    <InternshipsWrapper>
      <div className='internships-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='internships-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='internships-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='internships-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Internships
                </h3>
                <a href='http://internship.thesocialcomment.com/search'>
                  <div className='new-openings-btn'>
                    <p>New Openings</p>
                    <div className='new-notification'></div>
                  </div>
                </a>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='selector'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '10px',
                cursor: 'pointer',
                borderBottom: `${
                  isOngoing ? '3px solid #468AEF' : '3px solid #e5e5e5'
                }`,
              }}
              onClick={() => {
                setIsOngoing(true)
                setIsApplied(false)
              }}
            >
              <p>Ongoing</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '10px',
                cursor: 'pointer',
                borderBottom: `${
                  isApplied ? '3px solid #468AEF' : '3px solid #e5e5e5'
                }`,
              }}
              onClick={() => {
                setIsOngoing(false)
                setIsApplied(true)
              }}
            >
              <p>Applied</p>
            </div>
          </div>
          <div className='storage'>
            {isOngoing ? (
              <Link to='/internships/addnewongoing'>
                <div className='add-new-card'>
                  <AiOutlinePlus />
                  <p>Add new internship</p>
                </div>
              </Link>
            ) : isApplied ? (
              <Link to='/internships/addnewapplied'>
                <div className='add-new-card'>
                  <AiOutlinePlus />
                  <p>Add new internship</p>
                </div>
              </Link>
            ) : null}

            {isOngoing ? (
              <>
                {value.internships.map((item) => {
                  if (item.status === 'ONGOING') {
                    const date = new Date(item.startDate)
                    return (
                      <div className='internship-card'>
                        <div className='first'>
                          <div className='top'>
                            <h1 className='title'>{item.title}</h1>
                            <Link to={`/internships/edit/${item.id}`}>
                              <div className='internship-edit-btn'>
                                <FaEdit />
                              </div>
                            </Link>
                          </div>
                          <p className='company'>{item.company}</p>
                        </div>
                        <div className='second'>
                          {item.startDate
                            ? `${date.toLocaleString('default', {
                                month: 'short',
                              })} ${date.getFullYear()} - Present`
                            : null}
                        </div>
                        <p className='third'>{item.description}</p>
                        <div className='fourth'>
                          <Link to={`/internships/docs/${item.id}`}>
                            <div className='docs'>
                              <CgNotes /> <p>Docs and other resources</p>
                            </div>
                          </Link>
                          {item?.tasks?.length > 0 ? (
                            <>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '3px',
                                  alignItems: 'center',
                                }}
                              >
                                <Link to={`/internships/tasks/${item.id}`}>
                                  <div className='open-tasks-btn'>
                                    Open Tasks
                                  </div>
                                </Link>
                                <Link to={`/internships/addtask/${item.id}`}>
                                  <div className='append-task'>
                                    <AiOutlinePlus />
                                  </div>
                                </Link>
                              </div>
                            </>
                          ) : (
                            <>
                              <Link to={`/internships/addtask/${item.id}`}>
                                <div className='add-task-btn'>Add task</div>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  }
                  return <></>
                })}
              </>
            ) : (
              <>
                {value.internships.map((item) => {
                  console.log(item)
                  if (item.status !== 'ONGOING') {
                    return (
                      <div className='internship-card pos'>
                        <section>
                          <div className='left '>
                            <h1 className='title'>{item.title}</h1>
                            <p className='company'>{item.company}</p>
                          </div>
                          <div
                            className='right'
                            onClick={() => setIsStatusBarOpen(!isStatusBarOpen)}
                          >
                            {item.status}
                          </div>
                          <div
                            className={`status-change-options ${
                              isStatusBarOpen
                                ? 'status-bar-open'
                                : 'status-bar-closed'
                            }`}
                          >
                            <p
                              className='in-review'
                              onClick={(e) => {
                                value.handleInternshipStatus(
                                  item.id,
                                  'IN REVIEW'
                                )
                                setIsStatusBarOpen(false)
                              }}
                            >
                              IN REVIEW
                            </p>
                            <p
                              className='in-touch'
                              onClick={(e) => {
                                value.handleInternshipStatus(
                                  item.id,
                                  'IN TOUCH'
                                )
                                setIsStatusBarOpen(false)
                              }}
                            >
                              IN TOUCH
                            </p>
                            <p
                              className='ongoing'
                              onClick={(e) => {
                                value.handleInternshipStatus(item.id, 'ONGOING')
                                setIsStatusBarOpen(false)
                              }}
                            >
                              ONGOING
                            </p>
                          </div>
                        </section>
                      </div>
                    )
                  }
                  return <></>
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </InternshipsWrapper>
  )
}

const InternshipsWrapper = styled.section`
  .internships-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .internships-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .internships-header {
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
  .internships-back-btn {
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
  .internships-back-btn:hover {
    transform: scale(1.05);
  }
  .internships-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .internships-title-container .title {
    padding-bottom: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .internships-title-container .title div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .new-openings-btn {
    padding: 5px 10px;
    font-size: 10px;
    background: #ffc263;
    border-radius: 5px;
    border: 1px solid #ffc263;
    position: relative;
    color: white;
  }
  .new-openings-btn div {
    position: absolute;
    background: #468aef;
    height: 6px;
    width: 6px;
    top: -3px;
    border-radius: 100%;
    right: 7px;
  }
  .new-openings-btn:hover {
    background: white;
    color: #ffc263;
    cursor: pointer;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .animation-title {
    animation: slide-in 0.3s ease-out;
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
  .selector {
    padding: 10px 150px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .storage {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 150px;
  }
  .add-new-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 56px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .internship-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0px;
  }
  .internship-card .first {
    display: flex;
    flex-direction: column;
  }
  .internship-card .first .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .internship-edit-btn {
    color: #c4c4c4;
    font-size: 20px;
    cursor: pointer;
  }
  .internship-edit-btn:hover {
    color: #3e77f1;
  }
  .internship-card .first h1 {
    font-size: 20px;
    font-weight: 400;
  }
  .internship-card .first p {
    color: #468aef;
    font-size: 14px;
  }
  .internship-card .second {
    font-size: 14px;
    color: #c4c4c4;
  }
  .internship-card .third {
    font-size: 14px;
  }
  .internship-card .fourth {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .internship-card .fourth .docs {
    display: flex;
    font-size: 12px;
    align-items: center;
    gap: 5px;
    color: #468aef;
    cursor: pointer;
  }
  .internship-card .fourth .docs:hover {
    text-decoration: underline;
  }
  .internship-card .fourth .add-task-btn {
    padding: 5px 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #468aef;
    border: 1px solid #468aef;
    border-radius: 5px;
    cursor: pointer;
  }
  .open-tasks-btn {
    padding: 5px 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #468aef;
    border: 1px solid #468aef;
    border-radius: 5px;
    cursor: pointer;
  }
  .open-tasks-btn:hover {
    background: #468aef;
    color: white;
  }
  .append-task {
    font-size: 20px;
    color: #468aef;
  }
  .internship-card .fourth .add-task-btn:hover {
    background: #468aef;
    color: white;
  }
  .internship-card .left {
    display: flex;
    flex-direction: column;
  }
  .internship-card .left .title {
    font-size: 20px;
    font-weight: 400;
  }
  .internship-card .left .company {
    font-size: 14px;
  }
  .internship-card .right {
    color: #468aef;
    font-size: 12px;
    cursor: pointer;
  }
  .internship-card section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pos {
    position: relative;
  }
  .status-change-options {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: #468aef;
    top: 50px;
    background: #f9f9f9;
    padding: 10px;

    flex-direction: column;
    gap: 5px;
  }
  .ongoing,
  .in-touch,
  .in-review {
    cursor: pointer;
  }
  .status-bar-open {
    display: flex;
  }
  .status-bar-closed {
    display: none;
  }
`
