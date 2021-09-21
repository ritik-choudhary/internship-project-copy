import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FaCheckSquare } from 'react-icons/fa'
import { AiFillCloseCircle, AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import TextEditor from '../TextEditor'

export default function MeetingModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <MeetingModalComponent
            value={value}
            {...props}
          ></MeetingModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function MeetingModalComponent(props) {
  const { value, isEditing } = props

  let count = 0

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState()
  const [createdBy, setCreatedBy] = useState()
  const [type, setType] = useState()
  const [participants, setParticipants] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [textNote, setTextNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])

  const [meetingToEdit, setMeetingToEdit] = useState()

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
      const selectedMeeting = selectedResource.meetings.find(
        (item) => item.id === param.meetingID
      )
      setMeetingToEdit(selectedMeeting)
      setTitle(selectedMeeting.title)
      setCreatedOn(selectedMeeting.createdOn)
      setCreatedBy(selectedMeeting.createdBy)
      setType(selectedMeeting.type)
      setParticipants(selectedMeeting.participants)
      setLinks(selectedMeeting.links)
      setTextNote(selectedMeeting.note)
    }
  }, [
    isEditing,
    param.id,
    param.spaceKey,
    param.clubID,
    param.resourceID,
    param.meetingID,
    value.workspaceElements,
  ])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '1199px',
          top: '25%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -25%)',
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
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
        >
          <AiFillCloseCircle
            style={{
              fontSize: '30px',
              color: '#FFC8C8',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 30px 30px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (isEditing) {
            const meeting = {
              title: title,
              createdOn: createdOn,
              createdBy: createdBy,
              type: type,
              participants: participants,
              links: links,
              note: textNote,
            }
            value.editMeeting(
              param.id,
              param.spaceKey,
              param.clubID,
              param.resourceID,
              meetingToEdit.id,
              meeting
            )
          } else {
            const meeting = {
              id: new Date().getTime().toString(),
              title: title,
              createdOn: createdOn,
              createdBy: createdBy,
              type: type,
              participants: participants,
              links: links,
              note: textNote,
            }
            value.addNewMeeting(
              param.id,
              param.spaceKey,
              param.clubID,
              param.resourceID,
              meeting
            )
          }
          history.push(
            `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`
          )
        }}
      >
        <div className='meeting-note-name' style={{ paddingBottom: '20px' }}>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            <input
              type='date'
              name='created-on'
              id='created-on'
              value={createdOn}
              onChange={(e) => setCreatedOn(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='created-by'>Created by</label>
            <input
              type='text'
              name='created-by'
              id='created-by'
              value={createdBy}
              className={createdBy ? '' : 'skeleton'}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='type'>Type</label>
            <input
              type='text'
              name='type'
              id='type'
              value={type}
              className={type ? '' : 'skeleton'}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='participants'>Participants</label>
            <input
              type='text'
              name='participants'
              id='participants'
              value={participants}
              className={participants ? '' : 'skeleton'}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='link'>Link</label>

            <input
              type='url'
              name='link'
              id='link'
              value={linkToAdd}
              className={linkToAdd ? '' : 'skeleton'}
              onChange={(e) => setLinkToAdd(e.target.value)}
            />
            <div className='add-link-btn'>
              <AiOutlinePlus
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #468aef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px',
                  color: '#468aef',
                  marginLeft: '-20px',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  setLinks([...links, linkToAdd])
                  setLinkToAdd('')
                }}
              />
            </div>
          </div>
          <div
            className='links-container'
            style={{
              display: 'grid',
              gap: '5px',
              gridTemplateColumns: 'repeat(5,1fr)',
            }}
          >
            {links.map((item) => {
              count++
              return (
                <div
                  className='link'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60px',
                    height: '20px',
                    background: '#C8E1FF',
                  }}
                  key={count}
                >
                  <a
                    href={item}
                    target='_blank'
                    rel='noreferrer noopener'
                    style={{ color: 'black' }}
                  >
                    Link {count}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        <TextEditor textNote={textNote} setTextNote={setTextNote} />
        <div
          className='save-btn'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <button
            type='submit'
            style={{
              color: 'white',
              background: '#1CA806',
              border: 'none',
              outline: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaCheckSquare />
              <p>Save and go</p>
            </div>
          </button>
        </div>
      </form>
    </Modal>
  )
}
