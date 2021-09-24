import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FaUpload } from 'react-icons/fa'
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineClose,
} from 'react-icons/ai'
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
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  let count = 0
  let pdfCount = 0

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [type, setType] = useState()
  const [participants, setParticipants] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [pdfList, setPdfList] = useState([])
  const [pdfPreview, setPdfPreview] = useState([])
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
      setPdfList(selectedMeeting.pdfList)
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
              pdfList: pdfList,

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
              pdfList: pdfList,
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
              display: `${links.length > 0 ? 'grid' : 'none'}`,
              gap: '5px',
              gridTemplateColumns: 'repeat(15,1fr)',
              marginLeft: '132px',
              maxHeight: '60px',
              overflow: 'scroll',
              overflowX: 'hidden',
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
                    borderRadius: '5px',
                    fontSize: '12px',
                    gap: '5px',
                  }}
                  key={count}
                >
                  <a
                    href={item}
                    target='_blank'
                    rel='noreferrer noopener'
                    style={{
                      color: 'black',
                      fontSize: '12px',
                      fontWeight: '400',
                    }}
                  >
                    Link {count}
                  </a>
                  <AiOutlineClose style={{ color: '#f54848' }} />
                </div>
              )
            })}
          </div>
          <div className='single-option'>
            <label htmlFor='pdf'>Pdf</label>
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
          </div>
          <div
            className='pdf-container'
            style={{
              display: `${pdfList.length > 0 ? 'grid' : 'none'}`,
              gridTemplateColumns: 'repeat(15,1fr)',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'scroll',
              overflowX: 'hidden',
              marginLeft: '132px',
            }}
          >
            {pdfList.map((pdf) => {
              const linkToPdf = pdfPreview.find(
                (item) => item.previewId === pdf.pdfId
              )
              pdfCount++
              return (
                <Link
                  to={{
                    pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addmeeting/readpdf`,
                    state: { src: linkToPdf?.source },
                  }}
                  key={pdf.pdfId}
                  onClick={(e) => {
                    if (!isEditing) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div
                    className='pdf-file'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '60px',
                      height: '20px',
                      background: '#C8E1FF',
                      borderRadius: '5px',
                      fontSize: '12px',
                      gap: '5px',
                    }}
                  >
                    <p
                      style={{
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: '400',
                      }}
                    >
                      Pdf {pdfCount}
                    </p>
                    <AiOutlineClose style={{ color: '#f54848' }} />
                  </div>
                </Link>
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
