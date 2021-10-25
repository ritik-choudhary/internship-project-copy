import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
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
  return (
    <div className='tiles'>
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
        <div className='button-container'>
          <Link to='/workspace' className='workspace-link'>
            <button className='add-workspace-btn'>
              <AiOutlinePlus /> Add Workspace
            </button>
          </Link>
        </div>
      </div>
      <div className='bottom-tiles'>
        <div className='left-tile'>
          <div className='left-top'>
            <div className='todo-list-tile tile-hover'>
              <div className='background-image'>
                <img src={todo} alt='' />
              </div>

              <div className='tile-content'>
                <h2 className='title'>To-do List</h2>
                <div className='animation-tiles'>
                  <div className='tile-1'>
                    <div className='single-option'>
                      <input
                        type='checkbox'
                        name='complete-wireframing'
                        id='complete-wireframing'
                      />
                      <label htmlFor='complete-wireframing'>
                        Complete Wirefr...
                      </label>
                    </div>
                    <div className='single-option'>
                      <input
                        type='checkbox'
                        name='prototyping'
                        id='prototyping'
                      />
                      <label htmlFor='prototyping'>Prototyping</label>
                    </div>
                    <div className='single-option'>
                      <input type='checkbox' name='animation' id='animation' />
                      <label htmlFor='animation'>Animation</label>
                    </div>
                  </div>
                  <div className='tile-2'>
                    <div className='single-option'>
                      <input
                        type='checkbox'
                        name='complete-wireframing'
                        id='complete-wireframing'
                      />
                      <label htmlFor='complete-wireframing'>
                        Complete Wirefr...
                      </label>
                    </div>
                    <div className='single-option'>
                      <input
                        type='checkbox'
                        name='prototyping'
                        id='prototyping'
                      />
                      <label htmlFor='prototyping'>Prototyping</label>
                    </div>
                    <div className='single-option'>
                      <input type='checkbox' name='animation' id='animation' />
                      <label htmlFor='animation'>Animation</label>
                    </div>
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
                    <div className='tile-1'>
                      <h4>95</h4>
                      <p>Posts this month</p>
                      <h4>780</h4>
                      <p>Views this month</p>
                    </div>
                    <div className='tile-2'>
                      <h4>100</h4>
                      <p>New Recruitments</p>
                      <h4>300</h4>
                      <p>Reviews</p>
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
                        <div className='animation-tiles'>
                          <div className='tile-1'>
                            {value.notes.map((item) => {
                              count++
                              if (count < 3) {
                                return <p className='note'>{item.title}</p>
                              }
                              return <></>
                            })}
                          </div>
                          <div className='tile-2'>
                            {value.notes.map((item) => {
                              count2++
                              if (count2 < 6 && count2 > 2) {
                                return <p className='note'>{item.title}</p>
                              }
                              return <></>
                            })}
                          </div>
                        </div>
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
                        <div className='animation-tiles'>
                          <div className='tile-1'>
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
                      )
                    }}
                  </WorkspaceConsumer>
                </div>
              </div>
            </Link>
          </div>
          <div className='right-bottom'>
            <Link to='/taskmanager' className='taskmanager-link'>
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
                        <div className='animation-tiles'>
                          <div className='tile-1'>
                            {newTaskManager.map((item) => {
                              count++
                              if (count < 3) return <p>{item.title}</p>
                              else return <></>
                            })}
                          </div>
                          {newTaskManager.length > 3 ? (
                            <div className='tile-2'>
                              {newTaskManager.map((item) => {
                                count2++
                                if (count2 < 6 && count2 > 2)
                                  return <p>{item.title}</p>
                                else return <></>
                              })}
                            </div>
                          ) : null}
                        </div>
                      )
                    }}
                  </WorkspaceConsumer>
                </div>
              </div>
            </Link>
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
          </div>
        </div>
      </div>
    </div>
  )
}
