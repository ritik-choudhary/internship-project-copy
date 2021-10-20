import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { AiOutlinePlus } from 'react-icons/ai'
import DocsInput from '../Tools/DocsInput'

export default function TasksModal() {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return <TaskModalComponent value={value}></TaskModalComponent>
      }}
    </WorkspaceConsumer>
  )
}

function TaskModalComponent(props) {
  const { value } = props
  const history = useHistory()

  const defaultDate = new Date().toISOString().substring(0, 10)

  const [taskTitle, setTaskTitle] = useState()
  const [createdBy, setCreatedBy] = useState()
  const [duedate, setDuedate] = useState(defaultDate)
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [docsList, setDocsList] = useState([])
  const [docPreview, setDocPreview] = useState([])
  const [description, setDescription] = useState('')

  const disablePastDate = () => {
    const today = new Date()
    const dd = String(today.getDate() + 1).padStart(2, '0')
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
          Create Task
        </h3>

        <Link to='/taskmanager'>
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
            e.preventDefault()
            history.push(`/taskmanager`)
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          let tempDueDate = new Date(duedate)
          tempDueDate = `${tempDueDate.getDate()}-${
            tempDueDate.getMonth() + 1
          }-${tempDueDate.getFullYear()}`
          const taskToAdd = {
            id: new Date().getTime().toString(),
            title: taskTitle,
            createdBy: createdBy,
            dueDate: tempDueDate,
            links: links,
            docsList: docsList,
            docPreview: docPreview,
            description: description,
            completed: false,
          }
          value.createTask(taskToAdd)

          history.push(`/taskmanager`)
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
            maxLength='30'
            type='text'
            name='title'
            id='title'
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value)
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
            htmlFor='created-by'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Created by
          </label>
          <input
            type='text'
            name='created-by'
            id='created-by'
            maxLength='20'
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
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
            min={disablePastDate()}
            format='dd-MM-yyyy'
            value={duedate}
            onChange={(e) => {
              setDuedate(e.target.value)
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
                if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                  setLinks([...links, linkToAdd])
                  setLinkToAdd('')
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
                setLinkToAdd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                    setLinks([...links, linkToAdd])
                    setLinkToAdd('')
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
                  href={item}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {item.length > 40 ? `${item.slice(0, 60)}...` : item}
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
              return (
                <div
                  className='doc-file'
                  style={{
                    fontSize: '12px',
                  }}
                >
                  {doc.docFile.name.length > 60
                    ? `${doc.docFile.name.slice(0, 60)}...`
                    : doc.docFile.name}
                </div>
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
            Description
          </label>
          <textarea
            type='text'
            name='description'
            id='description'
            fontFamily='Open Sans, sans-serif'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            style={{
              borderRadius: '5px',
              height: '80px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '12px',
              padding: '5px 5px',
              fontFamily: 'Open Sans',
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
          <Link to={`/taskmanager`}>
            <div
              style={{
                color: '#FF0000',
                border: 'none',
                background: 'none',
                padding: '10px 20px',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: '400',
                fontSize: '14px',
              }}
            >
              Cancel
            </div>
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
