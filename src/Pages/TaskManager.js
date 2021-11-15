import React, { useState } from 'react'
import { WorkspaceConsumer } from '../Context'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { Link, Switch, Route } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskModal from '../Components/TaskManagerComponents/TaskModal'
import SingleTaskInfoModal from '../Components/TaskManagerComponents/SingleTaskInfoModal'
import { FiEdit } from 'react-icons/fi'
import companylogo from '../assets/companylogo.png'

export default function TaskManager() {
  return (
    <>
      <Switch>
        <Route path='/taskmanager/edit/:taskID'>
          <TaskModal isEditing />
        </Route>
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
    e.stopPropagation()
    const card_id = e.dataTransfer.getData('card_id')
    const card = document.getElementById(card_id)
    card.style.display = 'block'
    value.switchTask(subArray, card_id)
  }

  const dragOverContainer = (e) => {
    e.preventDefault()
  }

  const currentDate = new Date()
  const [taskFolder, setTaskFolder] = useState('Task Manager')

  // const [taskManagerTodoCount, setTaskManageTodorCount] = useState(0)
  // const [collegeClubsCount, setCollegeClubsCount] = useState(0)
  // const [todoListCount, setTodoListCount] = useState(0)
  // const [internshipsCount, setInternshipsCount] = useState(0)

  // useEffect(() => {
  //   const tempTaskManager = [
  //     ...value.taskManager[0],
  //     ...value.taskManager[1],
  //     ...value.taskManager[2],
  //     ...value.taskManager[3],
  //   ]
  //   tempTaskManager.map((item) => {
  //     if (item.parent === 'Task Manager') {
  //       setTaskManagerCount(taskManagerCount + 1)
  //     }
  //     if (item.parent === 'College Clubs') {
  //       setCollegeClubsCount(collegeClubsCount + 1)
  //     }
  //     if (item.parent === 'Internships') {
  //       setInternshipsCount(internshipsCount + 1)
  //     }
  //     if (item.parent === 'Todo List') {
  //       setTodoListCount(todoListCount + 1)
  //     }
  //   })
  // }, [taskFolder])

  return (
    <TaskManagerWrapper>
      <div className='task-manager-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='task-manager-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
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
              <div className='selector'>
                <select
                  name='task-parent'
                  id='task-parent'
                  value={taskFolder}
                  onChange={(e) => setTaskFolder(e.target.value)}
                >
                  <option value='Task Manager'>Task Manager</option>
                  <option value='Internships'>Internships Tasks</option>
                  <option value='College Clubs'>College Clubs Tasks</option>
                  <option value='Todo List'>Todo List Tasks</option>
                </select>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='manager-headers-container'>
            <div
              className='manager-headers'
              style={{
                gridTemplateColumns: `${
                  taskFolder === 'Task Manager'
                    ? 'repeat(4, 1fr)'
                    : 'repeat(3,1fr)'
                }`,
              }}
            >
              {taskFolder === 'Task Manager' ? (
                <div className='new-tasks-header'>
                  <p className='header-text'>NEW TASKS</p>
                  <div className='number-container'>
                    <p>{value.taskManager[0].length}</p>
                  </div>
                </div>
              ) : null}

              <div className='todo-header'>
                <p className='header-text'>TO-DO</p>
                <div className='number-container'>
                  <p>
                    {
                      value.taskManager[1].filter(
                        (item) => item.parent === taskFolder
                      ).length
                    }
                  </p>
                </div>
              </div>
              <div className='in-progress-header'>
                <p className='header-text'>IN PROGRESS</p>
                <div className='number-container'>
                  <p>
                    {
                      value.taskManager[2].filter(
                        (item) => item.parent === taskFolder
                      ).length
                    }
                  </p>
                </div>
              </div>
              <div className='completed-header'>
                <p className='header-text'>COMPLETED</p>
                <div className='number-container'>
                  <p>
                    {
                      value.taskManager[3].filter(
                        (item) => item.parent === taskFolder
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className='manager-headers-line'></div>
          </div>
          <div
            className='storage'
            style={{
              gridTemplateColumns: `${
                taskFolder === 'Task Manager'
                  ? 'repeat(4, 1fr)'
                  : 'repeat(3,1fr)'
              }`,
            }}
          >
            {taskFolder === 'Task Manager' ? (
              <div
                className='new-tasks-storage-container'
                onDrop={(e) => drop(e, 0)}
                onDragOver={dragOverContainer}
                id='new-tasks-storage'
              >
                <div className='new-tasks-storage'>
                  <Link to='/taskmanager/addnew'>
                    <div className='create-task-btn'>
                      <AiOutlinePlus />
                      <p>Create task</p>
                    </div>
                  </Link>
                  {value.taskManager[0].map((task) => {
                    const date = new Date(task.dueDate)
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
                            <p className='label'>
                              Due Date {date < currentDate ? '(late)' : null}
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <h3
                                className='due-date'
                                style={{
                                  color: `${
                                    date < currentDate ? '#ff0000' : '#76e51c'
                                  }`,
                                }}
                              >
                                {task.dueDate}
                              </h3>
                              <Link to={`/taskmanager/edit/${task.id}`}>
                                <div className='task-edit-btn'>
                                  <FiEdit />
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <p className='drag-and-drop-msg'>
                  Drag and <br /> drop here
                </p>
              </div>
            ) : null}

            <div
              className='todo-storage-container'
              onDrop={(e) => drop(e, 1)}
              onDragOver={dragOverContainer}
              id='todo-storage'
            >
              <div
                className={` ${
                  value.taskManager[1].filter(
                    (item) => item.parent === taskFolder
                  ).length > 0
                    ? 'todo-storage'
                    : 'empty-div'
                }`}
              >
                {value.taskManager[1].map((task) => {
                  const date = new Date(task.dueDate)
                  if (
                    taskFolder === 'Internships' &&
                    task.parent !== 'Internships'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'College Clubs' &&
                    task.parent !== 'College Clubs'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'Todo List' &&
                    task.parent !== 'Todo List'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'Task Manager' &&
                    task.parent !== 'Task Manager'
                  ) {
                    return <></>
                  }

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
                          <p className='label'>
                            Due Date {date < currentDate ? '(late)' : null}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <h3
                              className='due-date'
                              style={{
                                color: `${
                                  date < currentDate ? '#ff0000' : '#76e51c'
                                }`,
                              }}
                            >
                              {task.dueDate}
                            </h3>
                            <Link to={`/taskmanager/edit/${task.id}`}>
                              <div className='task-edit-btn'>
                                <FiEdit />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <p className='drag-and-drop-msg'>
                Drag and <br /> drop here
              </p>
            </div>
            <div
              className='in-progress-storage-container'
              onDrop={(e) => drop(e, 2)}
              onDragOver={dragOverContainer}
              id='in-progress-storage'
            >
              <div
                className={` ${
                  value.taskManager[2].filter(
                    (item) => item.parent === taskFolder
                  ).length > 0
                    ? 'in-progress-storage'
                    : 'empty-div'
                }`}
              >
                {value.taskManager[2].map((task) => {
                  const date = new Date(task.dueDate)
                  if (
                    taskFolder === 'Internships' &&
                    task.parent !== 'Internships'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'College Clubs' &&
                    task.parent !== 'College Clubs'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'Todo List' &&
                    task.parent !== 'Todo List'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'Task Manager' &&
                    task.parent !== 'Task Manager'
                  ) {
                    return <></>
                  }
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
                          <p className='label'>
                            Due Date {date < currentDate ? '(late)' : null}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <h3
                              className='due-date'
                              style={{
                                color: `${
                                  date < currentDate ? '#ff0000' : '#76e51c'
                                }`,
                              }}
                            >
                              {task.dueDate}
                            </h3>
                            <Link to={`/taskmanager/edit/${task.id}`}>
                              <div className='task-edit-btn'>
                                <FiEdit />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <p className='drag-and-drop-msg'>
                Drag and <br /> drop here
              </p>
            </div>
            <div
              className='completed-storage-container'
              onDrop={(e) => drop(e, 3)}
              onDragOver={dragOverContainer}
              id='completed-storage'
            >
              <div
                className={` ${
                  value.taskManager[3].filter(
                    (item) => item.parent === taskFolder
                  ).length > 0
                    ? 'completed-storage'
                    : 'empty-div'
                }`}
              >
                {value.taskManager[3].map((task) => {
                  const date = new Date(task.dueDate)

                  if (
                    taskFolder === 'Internships' &&
                    task.parent !== 'Internships'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'College Clubs' &&
                    task.parent !== 'College Clubs'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'Todo List' &&
                    task.parent !== 'Todo List'
                  ) {
                    return <></>
                  }
                  if (
                    taskFolder === 'Task Manager' &&
                    task.parent !== 'Task Manager'
                  ) {
                    return <></>
                  }
                  return (
                    <Link to={`/taskmanager/info/${task.id}`}>
                      <div
                        className='task-card completed'
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
                          <p className='label'>
                            Due Date {date < currentDate ? '(late)' : null}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <h3
                              className='due-date'
                              style={{
                                color: `${
                                  date < currentDate ? '#ff0000' : '#76e51c'
                                }`,
                              }}
                            >
                              {task.dueDate}
                            </h3>
                            <Link to={`/taskmanager/edit/${task.id}`}>
                              <div className='task-edit-btn'>
                                <FiEdit />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <p className='drag-and-drop-msg'>
                Drag and <br /> drop here
              </p>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .selector select {
    width: 150px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    outline: none;
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
    color: #468aef;
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
    border-radius: 5px;
  }
  .storage {
    padding: 0px 150px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
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
  }
  .completed-storage-container,
  .in-progress-storage-container,
  .todo-storage-container,
  .new-tasks-storage-container {
    box-shadow: 2px 2px 5px rgb(0 0 0 / 10%);
    border-radius: 6px;
    padding: 5px;
    min-height: 70vh;
  }
  .empty-div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 6px;
    padding: 10px;
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
    text-overflow: ellipsis;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
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
    color: #ff0000;
  }
  .completed {
    opacity: 0.5;
  }
  .drag-and-drop-msg {
    font-size: 18px;
    color: #468aef;
    opacity: 0.3;
    text-align: center;
    padding: 20px;
    height: 110px;
  }
  .task-edit-btn {
    color: #c4c4c4;
    cursor: pointer;
  }
  .task-edit-btn:hover {
    color: #468aef;
  }
`
