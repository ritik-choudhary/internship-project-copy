import React, { useState } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { Link, useHistory, useParams } from 'react-router-dom'

export default function InternshipTaskModal() {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <InternshipTaskModalComponent
            value={value}
          ></InternshipTaskModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function InternshipTaskModalComponent(props) {
  const param = useParams()
  const { value } = props
  const history = useHistory()

  const defaultDate = new Date().toISOString().substring(0, 10)

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [dueDate, setDueDate] = useState(defaultDate)
  const [status, setStatus] = useState('To-do')

  const disablePastDate = () => {
    const today = new Date()
    const dd = String(today.getDate() + 1).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return dd + '-' + mm + '-' + yyyy
  }

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '450px',
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
        <Link to='/internships'>
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
          gap: '10px',
          padding: '22px 32px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault()
            history.push('/internships')
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()

          value.addNewInternshipTask(param.internshipID, {
            id: new Date().getTime().toString(),
            title: title,
            description: description,
            dueDate: dueDate,
            completed: status === 'Completed' ? true : false,
            status: status,
          })
          history.push('/internships')
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
            type='text'
            name='title'
            id='title'
            autoFocus
            required
            maxLength='100'
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='dueDate'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Due Date
          </label>
          <input
            type='date'
            name='dueDate'
            id='dueDate'
            min={disablePastDate()}
            format='dd-MM-yyyy'
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            <option value='To-do'>To-do</option>
            <option value='In-Progress'>In-Progress</option>
            <option value='Completed'>Completed</option>
          </select>
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
            name='description'
            id='description'
            cols='30'
            rows='6'
            maxLength='250'
            style={{
              borderRadius: '5px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <Link to='/internships'>
            <div
              style={{
                color: '#FF0000',
                border: 'none',
                background: 'none',
                padding: '10px 20px',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '400',
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
