import React from 'react'
import { WorkspaceConsumer } from '../Context'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { Link, Switch, Route } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskModal from '../Components/TaskManagerComponents/TaskModal'
import SingleTaskInfoModal from '../Components/TaskManagerComponents/SingleTaskInfoModal'

export default function TaskManager() {
  return (
    <>
      <Switch>
        <Route path='/taskmanager/info/:taskID'>
          <SingleTaskInfoModal />
        </Route>
        <Route path='/taskmanager/addnew'>
          <TaskModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <TaskManagerComponent value={value}></TaskManagerComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function TaskManagerComponent(props) {
  const { value } = props

  const dragStart = (e) => {
    const target = e.target
    e.dataTransfer.setData('card_id', target.id)
    setTimeout(() => {
      target.style.display = 'none'
    }, 0)
  }

  const dragOver = (e) => {
    e.stopPropagation()
  }

  const drop = (e, subArray) => {
    e.preventDefault()
    const card_id = e.dataTransfer.getData('card_id')
    const card = document.getElementById(card_id)
    card.style.display = 'block'
    value.switchTask(subArray, card_id)
  }

  const dragOverContainer = (e) => {
    e.preventDefault()
  }

  return (
    <TaskManagerWrapper>
      <div className='task-manager-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='task-manager-header'>
            <h3>thesocialcomment</h3>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='task-manager-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='task-manager-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Task Manager
                </h3>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='manager-headers-container'>
            <div className='manager-headers'>
              <div className='new-tasks-header'>
                <p className='header-text'>NEW TASKS</p>
                <div className='number-container'>
                  <p>{value.taskManager[0].length}</p>
                </div>
              </div>
              <div className='todo-header'>
                <p className='header-text'>TO-DO</p>
                <div className='number-container'>
                  <p>{value.taskManager[1].length}</p>
                </div>
              </div>
              <div className='in-progress-header'>
                <p className='header-text'>IN PROGRESS</p>
                <div className='number-container'>
                  <p>{value.taskManager[2].length}</p>
                </div>
              </div>
              <div className='completed-header'>
                <p className='header-text'>COMPLETED</p>
                <div className='number-container'>
                  <p>{value.taskManager[3].length}</p>
                </div>
              </div>
            </div>
            <div className='manager-headers-line'></div>
          </div>
          <div className='storage'>
            <div className='storage-container'>
              <div
                className='new-tasks-storage'
                onDrop={(e) => drop(e, 0)}
                onDragOver={dragOverContainer}
                id='new-tasks-storage'
              >
                <Link to='/taskmanager/addnew'>
                  <div className='create-task-btn'>
                    <AiOutlinePlus />
                    <p>Create task</p>
                  </div>
                </Link>
                {value.taskManager[0].map((task) => {
                  return (
                    <Link to={`/taskmanager/info/${task.id}`}>
                      <div
                        className='task-card'
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={dragOver}
                        id={task.id}
                      >
                        <div className='status-manipulation'>
                          <input
                            type='checkbox'
                            name={task.id}
                            id={task.id}
                            checked={task.completed}
                            onChange={() =>
                              value.handleStatusTaskManager(task.id)
                            }
                            onClick={(e) => e.preventDefault()}
                          />
                          <div className='title'>{task.title}</div>
                        </div>
                        <div className='group'>
                          <p className='label'>Created by</p>
                          <h3 className='created-by'>{task.createdBy}</h3>
                        </div>
                        <div className='group'>
                          <p className='label'>Due Date</p>
                          <h3 className='due-date'>{task.dueDate}</h3>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
            <div
              className={` ${
                value.taskManager[1].length > 0 ? 'todo-storage' : 'empty-div'
              }`}
              onDrop={(e) => drop(e, 1)}
              onDragOver={dragOverContainer}
              id='todo-storage'
            >
              {value.taskManager[1].map((task) => {
                return (
                  <div
                    className='task-card'
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    id={task.id}
                  >
                    <div className='status-manipulation'>
                      <input
                        type='checkbox'
                        name={task.id}
                        id={task.id}
                        checked={task.completed}
                        onChange={() => value.handleStatusTaskManager(task.id)}
                        onClick={(e) => e.preventDefault()}
                      />
                      <div className='title'>{task.title}</div>
                    </div>
                    <div className='group'>
                      <p className='label'>Created by</p>
                      <h3 className='created-by'>{task.createdBy}</h3>
                    </div>
                    <div className='group'>
                      <p className='label'>Due Date</p>
                      <h3 className='due-date'>{task.dueDate}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className={` ${
                value.taskManager[2].length > 0
                  ? 'in-progress-storage'
                  : 'empty-div'
              }`}
              onDrop={(e) => drop(e, 2)}
              onDragOver={dragOverContainer}
              id='in-progress-storage'
            >
              {value.taskManager[2].map((task) => {
                return (
                  <div
                    className='task-card'
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    id={task.id}
                  >
                    <div className='status-manipulation'>
                      <input
                        type='checkbox'
                        name={task.id}
                        id={task.id}
                        checked={task.completed}
                        onChange={() => value.handleStatusTaskManager(task.id)}
                        onClick={(e) => e.preventDefault()}
                      />
                      <div className='title'>{task.title}</div>
                    </div>
                    <div className='group'>
                      <p className='label'>Created by</p>
                      <h3 className='created-by'>{task.createdBy}</h3>
                    </div>
                    <div className='group'>
                      <p className='label'>Due Date</p>
                      <h3 className='due-date'>{task.dueDate}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className={` ${
                value.taskManager[3].length > 0
                  ? 'completed-storage'
                  : 'empty-div'
              }`}
              onDrop={(e) => drop(e, 3)}
              onDragOver={dragOverContainer}
              id='completed-storage'
            >
              {value.taskManager[3].map((task) => {
                return (
                  <div
                    className='task-card completed'
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    id={task.id}
                  >
                    <div className='status-manipulation'>
                      <input
                        type='checkbox'
                        name={task.id}
                        id={task.id}
                        checked={task.completed}
                      />
                      <div className='title'>{task.title}</div>
                    </div>
                    <div className='group'>
                      <p className='label'>Created by</p>
                      <h3 className='created-by'>{task.createdBy}</h3>
                    </div>
                    <div className='group'>
                      <p className='label'>Due Date</p>
                      <h3 className='due-date'>{task.dueDate}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </TaskManagerWrapper>
  )
}

const TaskManagerWrapper = styled.section`
  .task-manager-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .task-manager-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .task-manager-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .task-manager-header h3 {
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
  .task-manager-back-btn {
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
  .task-manager-back-btn:hover {
    transform: scale(1.05);
  }
  .task-manager-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .task-manager-title-container .title {
    padding-bottom: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .task-manager-title-container .title div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line,
  .manager-headers-line {
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
  .manager-headers-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    padding: 10px 150px;
  }
  .manager-headers {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .completed-header,
  .in-progress-header,
  .todo-header,
  .new-tasks-header {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }
  .in-progress-header .header-text {
    color: #ffc263;
    font-size: 14px;
  }
  .todo-header .header-text {
    color: #980ff3;
    font-size: 14px;
  }
  .completed-header .header-text {
    color: #1ca806;
    font-size: 14px;
  }
  .new-tasks-header .header-text {
    color: #fb10ec;
    font-size: 14px;
  }
  .number-container {
    height: 20px;
    width: 20px;
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    background: #c8e1ff;
  }
  .storage {
    padding: 0px 150px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    align-items: flex-start;
  }
  .completed-storage,
  .in-progress-storage,
  .todo-storage,
  .new-tasks-storage {
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 10px;
    height: auto;
  }
  .empty-div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 6px;
    padding: 10px;
    height: 70vh;
  }
  .create-task-btn {
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
    font-weight: 400;
  }
  .task-card {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 1px solid #e5e5e5;
    padding: 10px;
    border-radius: 6px;
  }
  .status-manipulation {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .status-manipulation input {
    height: 15px;
    width: 15px;
  }
  .status-manipulation .title {
    color: #468aef;
    font-size: 16px;
  }
  .group {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .label {
    color: #c4c4c4;
    font-size: 10px;
  }
  .group h3 {
    font-size: 14px;
    font-weight: 400;
  }
  .created-by {
    color: black;
  }
  .due-date {
    color: #ff5c00;
  }
  .completed {
    opacity: 0.5;
  }
`
