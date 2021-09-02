import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import './Tiles.css'
import todo from '../assets/todo.jpg'
import performance from '../assets/performance.jpg'
import wallet from '../assets/wallet.jpg'
import taskManager from '../assets/task-manager.jpg'
import jobs from '../assets/jobs.jpg'
import guidance from '../assets/guidance.jpg'

export default function Tiles() {
  return (
    <div className='tiles'>
      <div className='add-workspace-tile'>
        <div className='tile-text'>
          <p>
            Studying in college or doing internships? Don’t worry, we got you.
            Add workspaces to manage multiple tasks from one place.
          </p>
        </div>
        <div className='button-container'>
          <button className='add-workspace-btn'>
            <AiOutlinePlus /> Add Workspace
          </button>
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
                        Complete Wireframing
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
                        Complete Wireframing
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
                    <h1>100</h1>
                    <p>New Recruitments</p>
                    <h1>300</h1>
                    <p>Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='left-bottom'>
            <div className='career-tile tile-hover'>
              <div className='background-image'>
                <img src={guidance} alt='career-guidance' />
              </div>
              <div className='tile-content'>
                <h3 className='title'>Career Guidance</h3>
              </div>
            </div>
          </div>
        </div>

        <div className='right-tile'>
          <div className='right-top'>
            <div className='jobs-tile tile-hover'>
              <div className='background-image'>
                <img src={jobs} alt='jobs' />
              </div>
              <div className='tile-content'>
                <h2 className='title'>Jobs and Internships</h2>
                <div className='animation-tiles'>
                  <div className='tile-1'>
                    <div className='single-option'>
                      <div className='job'>
                        <h3>UX Designer</h3>
                        <p>Apple</p>
                      </div>
                      <a href='/'>Apply</a>
                    </div>
                    <div className='line'></div>
                    <div className='single-option'>
                      <div className='job'>
                        <h3>Product Designer</h3>
                        <p>Google</p>
                      </div>
                      <a href='/'>Apply</a>
                    </div>
                  </div>
                  <div className='tile-2'>
                    <div className='single-option'>
                      <div className='job'>
                        <h3>UX Designer</h3>
                        <p>Apple</p>
                      </div>
                      <a href='/'>Apply</a>
                    </div>
                    <div className='line'></div>
                    <div className='single-option'>
                      <div className='job'>
                        <h3>Product Designer</h3>
                        <p>Google</p>
                      </div>
                      <a href='/'>Apply</a>
                    </div>
                  </div>
                </div>
              </div>
              <a href='/' className='see-all'>
                See all Openings
              </a>
            </div>
          </div>
          <div className='right-bottom'>
            <div className='task-manager-tile tile-hover'>
              <div className='background-image'>
                <img src={taskManager} alt='Task Manager' />
              </div>
              <div className='tile-content'>
                <h3 className='title'>Task Manager</h3>
                <div className='animation-tiles'>
                  <div className='tile-1'>
                    <p>Due Today</p>
                    <p>Website Design</p>
                    <p>App Prototyping</p>
                  </div>
                  <div className='tile-2'>
                    <p>Due Today</p>
                    <p>Website Design</p>
                    <p>App Prototyping</p>
                  </div>
                </div>
              </div>
            </div>
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
