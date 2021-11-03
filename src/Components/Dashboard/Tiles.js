import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineClose, AiOutlineUp } from 'react-icons/ai'
import './Tiles.css'
import todo from '../../assets/todo.jpg'
import performance from '../../assets/performance.jpg'
import wallet from '../../assets/wallet.jpg'
import taskManager from '../../assets/task-manager.jpg'
import jobs from '../../assets/jobs2.jpg'
import guidance from '../../assets/guidance.jpg'
import { Link } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'

export default function Tiles() {
  const [maximize, setMaximize] = useState(true)
  return (
    <div className='tiles'>
      {maximize ? (
        <div className='add-workspace-tile'>
          <div className='tile-text'>
            <p>
              Studying in college or doing internships?
              <br /> Don’t worry, we got you.
              <br />
              Add workspaces to manage multiple tasks
              <br /> from one place.
            </p>
          </div>
          <div>
            <div className='minimize-btn' onClick={() => setMaximize(false)}>
              <AiOutlineClose />
            </div>
            <div className='button-container'>
              <Link to='/workspace' className='workspace-link'>
                <button className='add-workspace-btn'>
                  <AiOutlinePlus /> Add Workspace
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='minimized-container'>
          <div className='maximize-btn' onClick={() => setMaximize(true)}>
            <AiOutlineUp />
          </div>
          <div className='button-container'>
            <Link to='/workspace' className='workspace-link'>
              <button className='add-workspace-btn'>
                <AiOutlinePlus /> Add Workspace
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className='bottom-tiles'>
        <div className='left-tile'>
          <div className='left-top'>
            <div className='recents-tile tile-hover'>
              <div className='background-image'>
                <img src={todo} alt='' />
              </div>

              <div className='tile-content'>
                <h2 className='title'>Recents</h2>
                <div className='animation-tiles'>
                  <div className='animation-tile-1 tile-1'>
                    <p>College Clubs</p>
                    <p>Moodboard</p>
                    <p>Task Manager</p>
                  </div>
                  <div className='tile-2'>
                    <p>Docs</p>
                    <p>Habit Tracker</p>
                    <p>Library</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to='/insights' className='insights-link'>
              <div className='performance-tile tile-hover'>
                <div className='background-image'>
                  <img src={performance} alt='performance' />
                </div>
                <div className='tile-content'>
                  <h2 className='title'>Performance</h2>
                  <div className='animation-tiles'>
                    <div className='animation-tile-1 tile-1'>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 7fr',
                          gap: '15px',
                        }}
                      >
                        <h4 style={{ fontSize: '25px' }}>17</h4>
                        <p>Login Days</p>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 7fr',
                          gap: '15px',
                        }}
                      >
                        <h4 style={{ fontSize: '25px' }}>9</h4>
                        <p>Activity Days</p>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 7fr',
                          gap: '15px',
                        }}
                      >
                        <h4 style={{ fontSize: '25px' }}>7</h4>
                        <p>Post Days</p>
                      </div>
                    </div>
                    <div className='tile-2'>
                      <h4>49</h4>
                      <p>Posts last month</p>
                      <h4>980</h4>
                      <p>Views last month</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className='left-bottom'>
            <Link to='/notes'>
              <div className='career-tile tile-hover'>
                <div className='background-image'>
                  <img src={guidance} alt='career-guidance' />
                </div>
                <div className='tile-content'>
                  <h3 className='title'>Notes</h3>
                  <WorkspaceConsumer>
                    {(value) => {
                      let count = -1
                      let count2 = -1
                      return (
                        <>
                          {value.notes.length > 0 ? (
                            value.notes.length > 3 ? (
                              <div className='animation-tiles'>
                                <div className='animation-tile-1 tile-1'>
                                  {value.notes.map((item) => {
                                    count++
                                    if (count < 3) {
                                      return (
                                        <p className='note'>{item.title}</p>
                                      )
                                    }
                                    return <></>
                                  })}
                                </div>
                                <div className='tile-2'>
                                  {value.notes.map((item) => {
                                    count2++
                                    if (count2 < 6 && count2 > 2) {
                                      return (
                                        <p className='note'>{item.title}</p>
                                      )
                                    }
                                    return <></>
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className='animation-tiles'>
                                <div className='animation-tile-1 tile-1'>
                                  {value.notes.map((item) => {
                                    count++
                                    if (count < 3) {
                                      return (
                                        <p className='note'>{item.title}</p>
                                      )
                                    }
                                    return <></>
                                  })}
                                </div>
                                <div className='tile-2'>
                                  <p>Add New Notes</p>
                                </div>
                              </div>
                            )
                          ) : (
                            <div className='animation-tiles'>
                              <div className='tile-1'>Add Notes</div>
                            </div>
                          )}
                        </>
                      )
                    }}
                  </WorkspaceConsumer>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className='right-tile'>
          <div className='right-top'>
            <Link to='/internships'>
              <div className='jobs-tile tile-hover'>
                <div className='background-image'>
                  <img src={jobs} alt='jobs' />
                </div>
                <div className='tile-content'>
                  <h2 className='title'>Jobs and Internships</h2>
                  <WorkspaceConsumer>
                    {(value) => {
                      let count = -1
                      let count2 = -1
                      return (
                        <>
                          {value.internships.length > 0 ? (
                            value.internships.length > 2 ? (
                              <div className='animation-tiles'>
                                <div className='animation-tile-1 tile-1'>
                                  {value.internships.map((item) => {
                                    count++
                                    if (count < 2)
                                      return (
                                        <>
                                          <div className='single-option'>
                                            <div className='job'>
                                              <h3>{item.title}</h3>
                                              <p>{item.company}</p>
                                            </div>
                                          </div>
                                          {count > 0 ? null : (
                                            <div className='line'></div>
                                          )}
                                        </>
                                      )
                                    return <></>
                                  })}
                                </div>
                                <div className='tile-2'>
                                  {value.internships.map((item) => {
                                    count2++
                                    if (count2 < 4 && count2 > 1)
                                      return (
                                        <>
                                          <div className='single-option'>
                                            <div className='job'>
                                              <h3>{item.title}</h3>
                                              <p>{item.company}</p>
                                            </div>
                                          </div>
                                          {count2 > 2 ? null : (
                                            <div className='line'></div>
                                          )}
                                        </>
                                      )
                                    return <></>
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className='animation-tiles'>
                                <div className='animation-tile-1 tile-1'>
                                  {value.internships.map((item) => {
                                    count++
                                    if (count < 2)
                                      return (
                                        <>
                                          <div className='single-option'>
                                            <div className='job'>
                                              <h3>{item.title}</h3>
                                              <p>{item.company}</p>
                                            </div>
                                          </div>
                                          {count > 0 ? null : (
                                            <div className='line'></div>
                                          )}
                                        </>
                                      )
                                    return <></>
                                  })}
                                </div>
                                <div className='tile-2'>
                                  <p>Add New Internships</p>
                                </div>
                              </div>
                            )
                          ) : (
                            <div className='animation-tiles'>
                              <div className='tile-1'>Add Internships</div>
                            </div>
                          )}
                        </>
                      )
                    }}
                  </WorkspaceConsumer>
                </div>
              </div>
            </Link>
          </div>
          <div className='right-bottom'>
            <Link to='/taskmanager'>
              <div className='task-manager-tile tile-hover'>
                <div className='background-image'>
                  <img src={taskManager} alt='Task Manager' />
                </div>
                <div className='tile-content'>
                  <h3 className='title'>Task Manager</h3>
                  <WorkspaceConsumer>
                    {(value) => {
                      const newTaskManager = [
                        ...value.taskManager[0],
                        ...value.taskManager[1],
                        ...value.taskManager[2],
                      ]
                      let count = -1
                      let count2 = -1
                      return (
                        <>
                          {newTaskManager.length > 0 ? (
                            newTaskManager.length > 3 ? (
                              <div className='animation-tiles'>
                                <div className='animation-tile-1 tile-1'>
                                  {newTaskManager.map((item) => {
                                    count++
                                    if (count < 3) return <p>{item.title}</p>
                                    else return <></>
                                  })}
                                </div>
                                <div className='tile-2'>
                                  {newTaskManager.map((item) => {
                                    count2++
                                    if (count2 < 6 && count2 > 2)
                                      return <p>{item.title}</p>
                                    else return <></>
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className='animation-tiles'>
                                <div className='animation-tile-1 tile-1'>
                                  {newTaskManager.map((item) => {
                                    count++
                                    if (count < 3) return <p>{item.title}</p>
                                    else return <></>
                                  })}
                                </div>
                                <div className='tile-2'>
                                  <p>Add New Task</p>
                                </div>
                              </div>
                            )
                          ) : (
                            <div className='animation-tiles'>
                              <div className='tile-1'>
                                <p>Add Task</p>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    }}
                  </WorkspaceConsumer>
                </div>
              </div>
            </Link>
            <Link to='/wallet'>
              <div className='wallet-tile tile-hover'>
                <div className='background-image'>
                  <img src={wallet} alt='Wallet' />
                </div>
                <div className='tile-content'>
                  <h3 className='title'>Wallet</h3>
                  <p>Account Balance</p>
                  <h1>RS 7500</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
