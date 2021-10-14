import React from 'react'
import Modal from 'react-modal'
import { WorkspaceConsumer } from '../../Context'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'

export default function TasksContainerModal() {
  return (
    <>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <TasksContainerModalComponent
              value={value}
            ></TasksContainerModalComponent>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

function TasksContainerModalComponent(props) {
  const { value } = props
  const param = useParams()

  const selectedInternship = value.internships.find(
    (item) => item.id === param.internshipID
  )

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '520px',
          maxHeight: '70vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
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
      <TasksContainerModalWrapper>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 30px',
            borderBottom: '1px solid #DEDEDE',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#468AEF',
            }}
          >
            Tasks
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to={`/internships/addtask/${selectedInternship.id}`}>
              <div className='add-task-btn'>Add task</div>
            </Link>
            <Link to='/internships'>
              <AiOutlineClose
                style={{
                  fontSize: '20px',
                  color: '#C4C4C4',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </div>
        </header>
        <section
          style={{
            padding: '22px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          {selectedInternship?.tasks?.length > 0 ? (
            <>
              <div className='tasks-container'>
                {selectedInternship.tasks.map((task) => {
                  return (
                    <div
                      className={
                        task.completed
                          ? 'task-completed-bg single-task'
                          : 'single-task'
                      }
                    >
                      <div className='task-handling'>
                        <div>
                          <input
                            type='checkbox'
                            name={task.id}
                            id={task.id}
                            checked={task.completed}
                            onChange={(e) =>
                              value.internshipTaskManipulation(
                                selectedInternship.id,
                                task.id
                              )
                            }
                          />
                          <label
                            htmlFor={task.id}
                            className={task.completed ? 'task-completed' : ''}
                          >
                            {task.title}
                          </label>
                        </div>
                        <p className='due-date'>{`Due: ${task.dueDate}`}</p>
                      </div>
                      <div className='description'>{task.description}</div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : null}
        </section>
      </TasksContainerModalWrapper>
    </Modal>
  )
}

const TasksContainerModalWrapper = styled.section`
  .tasks-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .single-task {
    display: flex;
    flex-direction: column;
  }
  .single-task .task-handling {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .single-task .task-handling div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .single-task .task-handling div input {
    height: 15px;
    width: 15px;
  }
  .single-task .task-handling div label {
    font-size: 14px;
  }
  .single-task .task-handling .due-date {
    font-size: 12px;
    color: #ff5c00;
  }
  .single-task .description {
    padding-left: 26px;
    font-size: 12px;
    color: #c4c4c4;
  }
  .task-completed {
    text-decoration: line-through;
  }
  .task-completed-bg {
    opacity: 0.5;
  }
  .add-task-btn {
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
  .add-task-btn:hover {
    background: #468aef;
    color: white;
  }
`
