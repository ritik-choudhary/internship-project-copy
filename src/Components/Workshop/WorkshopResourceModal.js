import React, { useState } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'

export default function WorkshopResourceModal() {
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
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}`}
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
          const selectedWorkspace = value.workspaceElements.find(
            (item) =>
              item.id === param.spaceKey && item.workspaceID === param.id
          )
          const selectedWorkshop = selectedWorkspace.workshops.find(
            (item) => item.id === param.workshopID
          )
          return (
            <form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                padding: '22px 32px',
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 27) {
                  e.preventDefault()
                  history.push(
                    `/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}`
                  )
                }
              }}
              onSubmit={(e) => {
                e.preventDefault()
                if (
                  selectedWorkshop?.resources?.find(
                    (item) => item.title === newResource.name
                  )
                ) {
                  let count = 0
                  selectedWorkshop.resources.forEach((item) =>
                    item.title === newResource.name ? count++ : null
                  )
                  const resourceID = new Date().getTime().toString()
                  const date = new Date()
                  const day = date.getDate()
                  const month = date.toLocaleString('default', {
                    month: 'short',
                  })
                  const year = date.getFullYear()
                  const resource = {
                    createdOn: `${
                      day < 10 ? `0${day}` : day
                    } ${month}, ${year}`,
                    id: resourceID,
                    title: newResource.name,
                    version: count + 1,
                  }
                  value.addNewWorkshopResource(
                    param.id,
                    param.spaceKey,
                    param.workshopID,
                    resource
                  )
                } else {
                  const resourceID = new Date().getTime().toString()
                  const date = new Date()
                  const day = date.getDate()
                  const month = date.toLocaleString('default', {
                    month: 'short',
                  })
                  const year = date.getFullYear()
                  const resource = {
                    createdOn: `${
                      day < 10 ? `0${day}` : day
                    } ${month}, ${year}`,
                    id: resourceID,
                    title: newResource.name,
                    version: 1,
                  }
                  value.addNewWorkshopResource(
                    param.id,
                    param.spaceKey,
                    param.workshopID,
                    resource
                  )
                }
                history.push(
                  `/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}`
                )
              }}
            >
              <div className='single-resource-option'>
                <label htmlFor='topic information'>Topic Information</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='topic information'
                  value='Topic Information'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='participants list'>Participants List</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='participants list'
                  value='Participants List'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='list-of-activities'>List of Activities</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='list-of-activities'
                  value='List of Activities'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='itinerary'>Itinerary</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='itinerary'
                  value='Itinerary'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='organising-committee-details'>
                  Organising Committee Details
                </label>
                <input
                  type='radio'
                  name='new-resource'
                  id='organising-committee-details'
                  value='Organising Committee Details'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='venue-details'>Venue Details</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='venue-details'
                  value='Venue Details'
                  onChange={handleChange}
                />
              </div>
              <div className='single-resource-option'>
                <label htmlFor='other-option'>Other Option</label>
                <input
                  type='radio'
                  name='new-resource'
                  id='other-option'
                  value='Other Option'
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
                  to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}`}
                >
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
