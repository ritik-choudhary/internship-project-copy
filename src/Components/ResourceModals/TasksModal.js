import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'

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

  const { isEditing, value } = props
  const param = useParams()
  const history = useHistory()

  const [selectedTask, setSelectedTask] = useState()
  const [taskTitle, setTaskTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [duedate, setDuedate] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [pdfList, setPdfList] = useState([])
  const [pdfPreview, setPdfPreview] = useState([])
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
      setLinks(selectedTask.links)
      setPdfList(selectedTask.pdfList)
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

  useEffect(() => {
    if (pdfList) {
      setPdfPreview([])
      pdfList.forEach((pdf) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPdfPreview((pdfPreview) => [
            ...pdfPreview,
            { previewId: pdf.pdfId, source: reader.result },
          ])
        }
        reader.readAsDataURL(pdf.pdfFile)
      })
    } else {
      setPdfPreview([])
    }
  }, [pdfList])

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
          gap: '20px',
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
                links: links,
                pdfList: pdfList,
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
              links: links,
              pdfList: pdfList,
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
          <p style={{ fontSize: '14px', color: '#468AEF' }}>{date}</p>
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
                setLinks([...links, linkToAdd])
                setLinkToAdd('')
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
              onChange={(e) => setLinkToAdd(e.target.value)}
            />
            <div className='link-add-btn'></div>
          </div>
          <div
            className='links-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {links?.map((item) => {
              return (
                <a style={{ fontSize: '12px' }} href={item}>
                  {item.length > 40 ? `${item.slice(0, 60)}...` : item}
                </a>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='pdf'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p>Upload pdf</p>
              <AiOutlinePlus
                style={{
                  color: '#468AEF',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              />
            </div>
          </label>
          <input
            type='file'
            name='pdf'
            id='pdf'
            hidden
            accept='.pdf'
            onChange={(e) => {
              setPdfList([
                ...pdfList,
                {
                  pdfId: new Date().getTime().toString(),
                  pdfFile: e.target.files[0],
                },
              ])
            }}
          />
          <label htmlFor='pdf'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '5px',
                border: '1px dashed #468AEF',
                height: '32px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#468AEF',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                <FaUpload />
                Upload pdf
              </div>
            </div>
          </label>

          <div
            className='pdf-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {pdfList.map((pdf) => {
              const linkToPdf = pdfPreview.find(
                (item) => item.previewId === pdf.pdfId
              )
              return (
                <Link
                  to={{
                    pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addtask/readpdf`,
                    state: { src: linkToPdf?.source },
                  }}
                  key={pdf.pdfId}
                  onClick={(e) => {
                    if (!isEditing) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className='pdf-file' style={{ fontSize: '12px' }}>
                    {pdf.pdfFile.name.length > 15
                      ? `${pdf.pdfFile.name.slice(0, 15)}...`
                      : pdf.pdfFile.name}
                  </div>
                </Link>
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
            onChange={(e) => setDescription(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '100px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '12px',
              padding: '5px 5px',
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
