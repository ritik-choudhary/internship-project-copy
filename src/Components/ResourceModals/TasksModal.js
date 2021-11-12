import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { AiOutlinePlus } from 'react-icons/ai'
import DocsInput from '../Tools/DocsInput'

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
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const { isEditing, value, isTodo, isSharing } = props
  const param = useParams()
  const history = useHistory()

  const defaultDate = new Date().toISOString().substring(0, 10)

  const [selectedTask, setSelectedTask] = useState()
  const [taskTitle, setTaskTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [duedate, setDuedate] = useState(defaultDate)
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [docsList, setDocsList] = useState([])
  const [docPreview, setDocPreview] = useState([])
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState()

  const disablePastDate = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  function isValidHttpUrl(string) {
    let url

    try {
      url = new URL(string)
    } catch (_) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  useEffect(() => {
    if (!isTodo) {
      if (isEditing || isSharing) {
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
        setLinks(selectedTask.links)
        setDocsList(selectedTask.docsList)
        setDescription(selectedTask.description)
        setStatus(selectedTask.status)
      }
    } else {
      if (isEditing || isSharing) {
        const selectedSpace = value.workspaceElements.find(
          (item) => item.id === param.spaceKey && item.workspaceID === param.id
        )
        const selectedTodo = selectedSpace.todoList.find(
          (item) => item.id === param.todoID
        )
        setSelectedTask(selectedTodo)
        setTaskTitle(selectedTodo.title)
        setCreatedOn(selectedTodo.createdOn)
        setDuedate(selectedTodo.dueDate)
        setLinks(selectedTodo.links)
        setDocsList(selectedTodo.docsList)
        setDescription(selectedTodo.description)
        setStatus(selectedTodo.status)
      }
    }
  }, [
    isEditing,
    isSharing,
    isTodo,
    param.clubID,
    param.id,
    param.resourceID,
    param.spaceKey,
    param.taskID,
    param.todoID,
    value.workspaceElements,
  ])

  useEffect(() => {
    if (docsList) {
      setDocPreview([])
      docsList.forEach((doc) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setDocPreview((docPreview) => [
            ...docPreview,
            { previewId: doc.docId, source: reader.result },
          ])
        }
        reader.readAsDataURL(doc.docFile)
      })
    } else {
      setDocPreview([])
    }
  }, [docsList])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '520px',
          minHeight: '90vh',
          overflowY: 'auto',
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
          {isSharing ? 'Task Details' : 'Add new task'}
        </h3>
        {isTodo ? (
          <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : isSharing ? (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`}
          >
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
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
        )}
      </header>

      <form
        encType='multipart/form-data'
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '22px 32px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            if (!isTodo) {
              if (!isSharing) {
                history.push(
                  `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`
                )
              } else {
                history.push(
                  `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`
                )
              }
            } else {
              history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
            }
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isTodo) {
            if (isSharing)
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`
              )
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
                  links: links,
                  docsList: docsList,
                  docPreview: docPreview,
                  description: description,
                  completed: status === 'Completed' ? true : false,
                  status: status,
                }
              )
            } else {
              const taskToAdd = {
                id: new Date().getTime().toString(),
                title: taskTitle,
                createdOn: createdOn,
                dueDate: duedate,
                links: links,
                docsList: docsList,
                docPreview: docPreview,
                description: description,
                completed: status === 'Completed' ? true : false,
                status: status,
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
          } else {
            if (isEditing) {
              value.editTodo(param.id, param.spaceKey, param.todoID, {
                id: selectedTask.id,
                title: taskTitle,
                createdOn: createdOn,
                dueDate: duedate,
                links: links,
                docsList: docsList,
                docPreview: docPreview,
                description: description,
                completed: status === 'Completed' ? true : false,
                status: status,
              })
            } else {
              const taskToAdd = {
                id: new Date().getTime().toString(),
                title: taskTitle,
                createdOn: createdOn,
                dueDate: duedate,
                links: links,
                docsList: docsList,
                docPreview: docPreview,
                description: description,
                completed: status === 'Completed' ? true : false,
                status: status,
              }
              value.addTodo(param.id, param.spaceKey, taskToAdd)
            }
            history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
          }
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
            maxLength='100'
            value={taskTitle}
            onChange={(e) => {
              if (!isSharing) setTaskTitle(e.target.value)
            }}
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
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          <p style={{ fontSize: '14px', color: '#468AEF' }}>{date}</p>
        </div> */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='due-date'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Due date
          </label>
          <input
            type='date'
            name='due-date'
            id='due-date'
            min={disablePastDate()}
            format='dd-MM-yyyy'
            value={duedate}
            onChange={(e) => {
              if (!isSharing) setDuedate(e.target.value)
            }}
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
            htmlFor='status'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Status
          </label>
          <select
            name='status'
            id='status'
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Select Status</option>
            <option value='To-do'>To-do</option>
            <option value='In-Progress'>In-Progress</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='links'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>Add Links</p>
            <AiOutlinePlus
              style={{
                fontSize: '16px',
                color: '#0063FF',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (!isSharing) {
                  if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                    setLinks([
                      ...links,
                      {
                        link: linkToAdd,
                        id: new Date().getTime().toString(),
                      },
                    ])
                    setLinkToAdd('')
                  }
                }
              }}
            />
          </label>
          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <input
              type='url'
              name='links'
              id='links'
              style={{
                width: '100%',
                borderRadius: '5px',
                height: '32px',
                outline: 'none',
                border: '1px solid #C4C4C4',
                fontSize: '16px',
                padding: '3px 8px',
              }}
              value={linkToAdd}
              onChange={(e) => {
                if (!isSharing) setLinkToAdd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (!isSharing) {
                    if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                      setLinks([
                        ...links,
                        {
                          link: linkToAdd,
                          id: new Date().getTime().toString(),
                        },
                      ])
                      setLinkToAdd('')
                    }
                  }
                }
              }}
            />
            <div className='link-add-btn'></div>
          </div>
          <div
            className='links-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {links?.map((item) => {
              return (
                <a
                  style={{ fontSize: '12px' }}
                  href={item.link}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {item.length > 40
                    ? `${item.link.slice(0, 60)}...`
                    : item.link}
                </a>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DocsInput setDocsList={setDocsList} docsList={docsList} />

          <div
            className='doc-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {docsList.map((doc) => {
              const linkTodoc = docPreview.find(
                (item) => item.previewId === doc.docId
              )
              const type =
                doc.docFile.name.split('.')[
                  doc.docFile.name.split('.').length - 1
                ]
              return (
                <>
                  {isTodo ? (
                    <Link
                      to={{
                        pathname: `/workspace/${param.id}/details/${param.spaceKey}/addtodo/readdoc`,
                        state: {
                          src: linkTodoc?.source,
                          fileType: type,
                        },
                      }}
                      key={doc.docId}
                      onClick={(e) => {
                        if (!isEditing) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <div className='doc-file' style={{ fontSize: '12px' }}>
                        {doc.docFile.name.length > 15
                          ? `${doc.docFile.name.slice(0, 15)}...`
                          : doc.docFile.name}
                      </div>
                    </Link>
                  ) : isSharing ? (
                    <Link
                      to={{
                        pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/sharetask/readdoc`,
                        state: {
                          src: linkTodoc?.source,
                          fileType: type,
                        },
                      }}
                      key={doc.docId}
                      onClick={(e) => {
                        if (!isEditing) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <div className='doc-file' style={{ fontSize: '12px' }}>
                        {doc.docFile.name.length > 15
                          ? `${doc.docFile.name.slice(0, 15)}...`
                          : doc.docFile.name}
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addtask/readdoc`,
                        state: {
                          src: linkTodoc?.source,
                          fileType:
                            doc.docFile.name.split('.')[
                              doc.docFile.name.split('.').length - 1
                            ],
                        },
                      }}
                      key={doc.docId}
                      onClick={(e) => {
                        if (!isEditing) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <div className='doc-file' style={{ fontSize: '12px' }}>
                        {doc.docFile.name.length > 15
                          ? `${doc.docFile.name.slice(0, 15)}...`
                          : doc.docFile.name}
                      </div>
                    </Link>
                  )}
                </>
              )
            })}
          </div>
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
          <textarea
            type='text'
            name='description'
            id='description'
            fontFamily='Open Sans, sans-serif'
            value={description}
            onChange={(e) => {
              if (!isSharing) setDescription(e.target.value)
            }}
            style={{
              borderRadius: '5px',
              height: '100px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '12px',
              padding: '5px 5px',
              fontFamily: 'Open Sans',
              maxWidth: '100%',
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
          {isTodo ? (
            <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
              <div
                style={{
                  color: '#FF0000',
                  border: 'none',
                  background: 'none',
                  padding: '10px 20px',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '400',
                }}
              >
                Cancel
              </div>
            </Link>
          ) : isSharing ? (
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`}
            >
              <div
                style={{
                  color: '#FF0000',
                  border: 'none',
                  background: 'none',
                  padding: '10px 20px',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '400',
                }}
              >
                Cancel
              </div>
            </Link>
          ) : (
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
            >
              <div
                style={{
                  color: '#FF0000',
                  border: 'none',
                  background: 'none',
                  padding: '10px 20px',
                  outline: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '400',
                }}
              >
                Cancel
              </div>
            </Link>
          )}

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
