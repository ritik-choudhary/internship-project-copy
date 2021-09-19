import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'

export default function TasksModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <TaskModalComponent value={value} {...props}></TaskModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function TaskModalComponent(props) {
  const { isEditing, value } = props
  const param = useParams()
  const history = useHistory()

  const [selectedTask, setSelectedTask] = useState()
  const [taskTitle, setTaskTitle] = useState()
  const [createdOn, setCreatedOn] = useState()
  const [duedate, setDuedate] = useState()
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isEditing) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedClub = selectedSpace.clubs.find(
        (item) => item.id === param.clubID
      )
      const selectedResource = selectedClub.resources.find(
        (item) => item.id === param.resourceID
      )
      const selectedTask = selectedResource.tasks.find(
        (item) => item.id === param.taskID
      )
      setSelectedTask(selectedTask)
      setTaskTitle(selectedTask.title)
      setCreatedOn(selectedTask.createdOn)
      setDuedate(selectedTask.dueDate)
      setDescription(selectedTask.description)
    }
  }, [
    isEditing,
    param.clubID,
    param.id,
    param.resourceID,
    param.spaceKey,
    param.taskID,
    value.workspaceElements,
  ])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '520px',
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
          }}
        >
          Add new task
        </h3>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
        >
          <AiOutlineClose
            style={{
              fontSize: '20px',
              color: '#C4C4C4',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>

      <form
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: '22px 32px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (isEditing) {
            value.editTask(
              param.id,
              param.spaceKey,
              param.clubID,
              param.resourceID,
              param.taskID,
              {
                id: selectedTask.id,
                title: taskTitle,
                createdOn: createdOn,
                dueDate: duedate,
                description: description,
                completed: false,
              }
            )
          } else {
            const taskToAdd = {
              id: new Date().getTime().toString(),
              title: taskTitle,
              createdOn: createdOn,
              dueDate: duedate,
              description: description,
              completed: false,
            }
            value.addTask(
              param.id,
              param.spaceKey,
              param.clubID,
              param.resourceID,
              taskToAdd
            )
          }
          history.push(
            `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`
          )
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='title'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Title
          </label>
          <input
            autoFocus
            required
            type='text'
            name='title'
            id='title'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='created-on'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Created on
          </label>
          <input
            required
            type='date'
            name='created-on'
            id='created-on'
            value={createdOn}
            onChange={(e) => setCreatedOn(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='due-date'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Due date (optional)
          </label>
          <input
            type='date'
            name='due-date'
            id='due-date'
            value={duedate}
            onChange={(e) => setDuedate(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='description'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Description (optional)
          </label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '100px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
          >
            <button
              style={{
                color: '#FF0000',
                border: 'none',
                background: 'none',
                padding: '10px 20px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </Link>
          <button
            type='submit'
            style={{
              color: 'white',
              background: '#0063FF',
              border: 'none',
              outline: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
