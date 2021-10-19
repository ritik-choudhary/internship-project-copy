import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineFullscreen } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import TextEditor from '../TextEditor'

export default function CommitteeModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <CommitteeModalComponent
            value={value}
            {...props}
          ></CommitteeModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function CommitteeModalComponent(props) {
  const { value, isEditing, isSharing } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const param = useParams()
  const history = useHistory()

  const [modalSpecs, setModalSpecs] = useState({
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
  })

  const [editorHeight, setEditorHeight] = useState('150px')

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [textNote, setTextNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])

  const [committeeToEdit, setCommitteeToEdit] = useState()

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
      const selectedCommittee = selectedResource.committeeList.find(
        (item) => item.id === param.committeeID
      )
      setCommitteeToEdit(selectedCommittee)
      setTitle(selectedCommittee.title)
      setCreatedOn(selectedCommittee.createdOn)
      setCreatedBy(selectedCommittee.createdBy)
      setTextNote(selectedCommittee.note)
    }
  }, [
    isEditing,
    isSharing,
    param.id,
    param.spaceKey,
    param.workshopID,
    param.resourceID,
    param.committeeID,
    value.workspaceElements,
  ])

  return (
    <Modal
      isOpen={true}
      style={{
        content: modalSpecs,
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <AiOutlineFullscreen
              style={{
                fontSize: '25px',
                fontWeight: '500',
                color: '#105eee',
                cursor: 'pointer',
              }}
              onClick={() => {
                setModalSpecs({
                  width: '100%',
                  height: '100%',
                  top: '0',
                  left: '0',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '0',
                  transform: 'translate(0,0)',
                  boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
                  borderRadius: '0px',
                  background: 'white',
                  padding: '-20px',
                })
                setEditorHeight('380px')
              }}
            />
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
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <AiOutlineFullscreen
              style={{
                fontSize: '25px',
                fontWeight: '500',
                color: '#105eee',
                cursor: 'pointer',
              }}
              onClick={() => {
                setModalSpecs({
                  width: '100%',
                  height: '100%',
                  top: '0',
                  left: '0',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '0',
                  transform: 'translate(0,0)',
                  boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
                  borderRadius: '0px',
                  background: 'white',
                  padding: '-20px',
                })
                setEditorHeight('380px')
              }}
            />
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
          </div>
        )}
      </header>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 30px 30px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault()
            if (!isSharing) {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}`
              )
            } else {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/share`
              )
            }
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isSharing) {
            if (isEditing) {
              const committee = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                note: textNote,
              }
              value.editCommittee(
                param.id,
                param.spaceKey,
                param.workshopID,
                param.resourceID,
                committeeToEdit.id,
                committee
              )
            } else {
              const committee = {
                id: new Date().getTime().toString(),
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                note: textNote,
              }
              value.addNewCommittee(
                param.id,
                param.spaceKey,
                param.workshopID,
                param.resourceID,
                committee
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
        <div className='committee-name' style={{ paddingBottom: '20px' }}>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            maxLength='100'
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
              maxLength='100'
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
          height={editorHeight}
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
