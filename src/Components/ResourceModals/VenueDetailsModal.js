import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import TextEditor from '../TextEditor'

export default function TopicInformtaionModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <VenueDetailsModalComponent
            value={value}
            {...props}
          ></VenueDetailsModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function VenueDetailsModalComponent(props) {
  const { value, isEditing, isSharing } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [textNote, setTextNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])

  const [venueDetailsToEdit, setVenueDetailsToEdit] = useState()

  useEffect(() => {
    if (isEditing || isSharing) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedWorkshop = selectedSpace.workshops.find(
        (item) => item.id === param.workshopID
      )
      const selectedResource = selectedWorkshop.resources.find(
        (item) => item.id === param.resourceID
      )
      const selectedVenueDetails = selectedResource.venueDetailsList.find(
        (item) => item.id === param.venueDetailsID
      )
      setVenueDetailsToEdit(selectedVenueDetails)
      setTitle(selectedVenueDetails.title)
      setCreatedOn(selectedVenueDetails.createdOn)
      setCreatedBy(selectedVenueDetails.createdBy)
      setTextNote(selectedVenueDetails.note)
    }
  }, [
    isEditing,
    isSharing,
    param.id,
    param.spaceKey,
    param.workshopID,
    param.resourceID,
    param.venueDetailsID,
    value.workspaceElements,
  ])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '1000px',
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
          justifyContent: 'flex-end',
          padding: '12px 30px',
        }}
      >
        {isSharing ? (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/share`}
          >
            <AiFillCloseCircle
              style={{
                fontSize: '30px',
                color: '#FFC8C8',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}`}
          >
            <AiFillCloseCircle
              style={{
                fontSize: '30px',
                color: '#FFC8C8',
                cursor: 'pointer',
              }}
            />
          </Link>
        )}
      </header>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 30px 30px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isSharing) {
            if (isEditing) {
              const venueDetails = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                note: textNote,
              }
              value.editVenueDetails(
                param.id,
                param.spaceKey,
                param.workshopID,
                param.resourceID,
                venueDetailsToEdit.id,
                venueDetails
              )
            } else {
              const venueDetails = {
                id: new Date().getTime().toString(),
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                note: textNote,
              }
              value.addNewVenueDetails(
                param.id,
                param.spaceKey,
                param.workshopID,
                param.resourceID,
                venueDetails
              )
            }
            history.push(
              `/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}`
            )
          } else {
            history.push(
              `/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/share`
            )
          }
        }}
      >
        <div className='venueDetails-name' style={{ paddingBottom: '20px' }}>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            value={title}
            onChange={(e) => {
              if (!isSharing) setTitle(e.target.value)
            }}
            placeholder='Untitled Meeting Document'
            style={{
              width: '400px',
              border: 'none',
              outline: 'none',
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '1px',
            }}
          />
        </div>
        <div className='meeting-basic-info'>
          <div className='single-option'>
            <label htmlFor='created-on'>Created on</label>
            <p style={{ fontSize: '14px', color: '#468AEF' }}>{createdOn}</p>
          </div>
          <div className='single-option'>
            <label htmlFor='created-by'>Created by</label>
            <input
              type='text'
              name='created-by'
              id='created-by'
              value={createdBy}
              className={createdBy ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) {
                  setCreatedBy(e.target.value)
                }
              }}
            />
          </div>
        </div>
        <TextEditor
          textNote={textNote}
          isSharing={isSharing ? true : false}
          setTextNote={setTextNote}
        />
        <div
          className='save-btn'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <p>Save</p>
            </div>
          </button>
        </div>
      </form>
    </Modal>
  )
}
