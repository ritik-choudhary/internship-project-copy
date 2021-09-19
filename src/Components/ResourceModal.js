import React, { useState } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'

export default function ResourceModal() {
  const param = useParams()
  const history = useHistory()

  const [newResource, setNewResource] = useState()

  const handleChange = (e) => {
    const { value } = e.target
    setNewResource({ name: value })
  }

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '443px',
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
          Add new resource
        </h3>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}`}
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
      <WorkspaceConsumer>
        {(value) => {
          return (
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
                const resourceID = new Date().getTime().toString()
                const date = new Date()
                const day = date.getDate()
                const month = date.toLocaleString('default', { month: 'short' })
                const year = date.getFullYear()
                const resource = {
                  createdOn: `${day < 10 ? `0${day}` : day} ${month}, ${year}`,
                  id: resourceID,
                  title: newResource.name,
                }
                value.addNewResource(
                  param.id,
                  param.spaceKey,
                  param.clubID,
                  resource
                )
                history.push(
                  `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}`
                )
              }}
            >
              <div className='single-resource-option'>
                <label htmlFor='tasks'>Tasks</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='tasks'
                  value='Tasks'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='ideas'>Ideas</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='ideas'
                  value='Ideas'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='meeting-notes'>Meeting Notes</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='meeting-notes'
                  value='Meeting Notes'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='finance-and-sponsorships'>
                  Finance and Sponsorships
                </label>
                <input
                  type='radio'
                  name='new-resource'
                  id='finance-and-sponsorships'
                  value='Finance and Sponsorships'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='external-contacts'>External contacts</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='external-contacts'
                  value='External contacts'
                  onChange={handleChange}
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
                  to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}`}
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
                  Add
                </button>
              </div>
            </form>
          )
        }}
      </WorkspaceConsumer>
    </Modal>
  )
}
