import React, { useState } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { Link, useHistory } from 'react-router-dom'

export default function AppliedModal() {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return <AppliedModalComponent value={value}></AppliedModalComponent>
      }}
    </WorkspaceConsumer>
  )
}

function AppliedModalComponent(props) {
  const { value } = props
  const history = useHistory()

  const [title, setTitle] = useState()
  const [company, setCompany] = useState()
  const [status, setStatus] = useState()

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
          Add new internship
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
        onSubmit={(e) => {
          e.preventDefault()
          if (status) {
            value.addNewAppliedInternship({
              id: new Date().getTime().toString(),
              title: title,
              company: company,
              status: status,
            })
            history.push('/internships')
          } else {
            alert('Please select status')
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
            type='text'
            name='title'
            id='title'
            autoFocus
            required
            maxLength='40'
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
            htmlFor='company'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Company
          </label>
          <input
            type='text'
            name='company'
            id='company'
            maxLength='30'
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '12px',
              padding: '3px 8px',
            }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Select status</option>
            <option value='IN REVIEW'>IN REVIEW</option>
            <option value='IN TOUCH'>IN TOUCH</option>
            <option value='ONGOING'>ONGOING</option>
          </select>
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
