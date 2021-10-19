import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FaUpload } from 'react-icons/fa'
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineFullscreen,
} from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import TextEditor from '../TextEditor'
import Styled from 'styled-components'

export default function MeetingNotesModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <MeetingNotesModalComponent
            value={value}
            {...props}
          ></MeetingNotesModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function MeetingNotesModalComponent(props) {
  const { value, isEditing } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  let count = 0
  let pdfCount = 0

  const param = useParams()
  const history = useHistory()

  const [modalSpecs, setModalSpecs] = useState({
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
  })

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [type, setType] = useState()
  const [participantToAdd, setParticipantToAdd] = useState()
  const [participants, setParticipants] = useState([])
  const [links, setLinks] = useState([])
  const [linkToAdd, setLinkToAdd] = useState()
  const [pdfList, setPdfList] = useState([])
  const [pdfPreview, setPdfPreview] = useState([])
  const [textNote, setTextNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])

  const [editorHeight, setEditorHeight] = useState('150px')

  const [meetingNotesToEdit, setMeetingNotesToEdit] = useState()

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
    if (isEditing) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedMeetingNotes = selectedSpace.meetingNotes.find(
        (item) => item.id === param.meetingNotesID
      )
      setMeetingNotesToEdit(selectedMeetingNotes)
      setTitle(selectedMeetingNotes.title)
      setCreatedOn(selectedMeetingNotes.createdOn)
      setCreatedBy(selectedMeetingNotes.createdBy)
      setType(selectedMeetingNotes.type)
      setParticipants(selectedMeetingNotes.participants || [])
      setLinks(selectedMeetingNotes.links)
      setPdfList(selectedMeetingNotes.pdfList)
      setTextNote(selectedMeetingNotes.note)
    }
  }, [
    isEditing,
    param.id,
    param.spaceKey,
    param.meetingNotesID,
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
        content: modalSpecs,
        overlay: {
          background: 'rgba(0, 0, 0, 0.31)',
        },
      }}
    >
      <MeetingNotesModalWrapper>
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px 30px',
          }}
        >
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
                setEditorHeight('260px')
              }}
            />
            <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
              <AiFillCloseCircle
                style={{
                  fontSize: '30px',
                  color: '#FFC8C8',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </div>
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
              history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
            }
          }}
          onSubmit={(e) => {
            e.preventDefault()
            if (isEditing) {
              const meetingNotes = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                type: type,
                participants: participants,
                pdfList: pdfList,
                links: links,
                note: textNote,
              }
              value.editMeetingNotes(
                param.id,
                param.spaceKey,
                meetingNotesToEdit.id,
                meetingNotes
              )
            } else {
              const meetingNotes = {
                id: new Date().getTime().toString(),
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                type: type,
                participants: participants,
                pdfList: pdfList,
                links: links,
                note: textNote,
              }
              value.addNewMeetingNotes(param.id, param.spaceKey, meetingNotes)
            }
            history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
          }}
        >
          <div className='meeting-notes-name' style={{ paddingBottom: '20px' }}>
            <input
              autoFocus
              required
              type='text'
              name='name'
              id='name'
              maxLength='100'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              placeholder='Untitled Meeting Notes'
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
          <div className='meeting-notes-basic-info'>
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
                  setCreatedBy(e.target.value)
                }}
              />
            </div>
            <div className='single-option'>
              <label htmlFor='type'>Type</label>
              <input
                type='text'
                name='type'
                id='type'
                maxLength='100'
                value={type}
                className={type ? '' : 'skeleton'}
                onChange={(e) => {
                  setType(e.target.value)
                }}
              />
            </div>
            <div className='single-option'>
              <label htmlFor='participants'>Participants</label>
              <input
                type='text'
                name='participants'
                id='participants'
                value={participantToAdd}
                className={participantToAdd ? '' : 'skeleton'}
                onChange={(e) => setParticipantToAdd(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.keyCode === 188) {
                    e.preventDefault()
                    setParticipants([
                      ...participants,
                      {
                        name: participantToAdd,
                        id: new Date().getTime().toString(),
                      },
                    ])
                    setParticipantToAdd('')
                  }
                }}
              />
              <div className='participants-container'>
                {participants?.map((item) => {
                  return (
                    <div className='participant-tag' key={item.id}>
                      <p>{item.name}</p>
                      <AiOutlineClose
                        onClick={(e) => {
                          let newparticipantsList = [...participants]
                          newparticipantsList = newparticipantsList.filter(
                            (temp) => temp.id !== item.id
                          )
                          setParticipants(newparticipantsList)
                        }}
                      />
                    </div>
                  )
                })}
              </div>
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                      setLinks([
                        ...links,
                        {
                          link: linkToAdd,
                          id: new Date().getTime().toString(),
                        },
                      ])
                      setLinkToAdd('')
                    }
                  }
                }}
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
                    if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                      setLinks([
                        ...links,
                        {
                          link: linkToAdd,
                          id: new Date().getTime().toString(),
                        },
                      ])
                      setLinkToAdd('')
                    }
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
                overflow: 'auto',
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
                      padding: '0 5px',
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
                        width: '80%',
                      }}
                    >
                      Link {count}
                    </a>
                    <AiOutlineClose
                      style={{ color: '#f54848', cursor: 'pointer' }}
                      onClick={() => {
                        let tempLinks = [...links]
                        const newLinks = tempLinks.filter(
                          (temp) => temp.id !== item.id
                        )
                        setLinks(newLinks)
                      }}
                    />
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
                overflow: 'auto',
                overflowX: 'hidden',
                marginLeft: '132px',
                gap: '5px',
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
                      pathname: `/workspace/${param.id}/details/${param.spaceKey}/addmeetingnotes/readpdf`,
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
                        padding: '0 5px',
                      }}
                    >
                      <p
                        style={{
                          color: 'black',
                          fontSize: '12px',
                          fontWeight: '400',
                          width: '80%',
                        }}
                      >
                        Pdf {pdfCount}
                      </p>
                      <AiOutlineClose
                        style={{ color: '#f54848', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.preventDefault()

                          let temppdfList = [...pdfList]
                          const newpdfList = temppdfList.filter(
                            (temp) => temp.pdfId !== pdf.pdfId
                          )
                          setPdfList(newpdfList)
                        }}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          <TextEditor
            textNote={textNote}
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
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <p>Save</p>
              </div>
            </button>
          </div>
        </form>
      </MeetingNotesModalWrapper>
    </Modal>
  )
}

const MeetingNotesModalWrapper = Styled.section`
.meeting-notes-name{
    font-size: 20px;
    font-weight: 600;
}
.meeting-notes-basic-info{
    display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px 15px 15px;
  border: none;
  overflow:auto;
}
.meeting-notes-basic-info .single-option{
    display: flex;
  gap: 30px;
}
.meeting-notes-basic-info .single-option label {
    width: 100px;
  color: #c4c4c4;
  font-size: 16px;
  flex-shrink:0;
}
.meeting-notes-basic-info .single-option input {
    border: none;
  outline: none;
  width: 200px;
  height: 20px;
  font-size: 16px;
  flex-shrink:0;
}
.meeting-notes-basic-info .single-option .skeleton{
    background: #e4e4e4;
  border-radius: 2px;
}
.meeting-notes-basic-info .participants-container {
    display: flex;
    height: 25px;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  
  .meeting-notes-basic-info .participant-tag {
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    padding: 3px 5px;
    background: #e5e5e5;
  }
  .participant-tag p {
    font-size: 14px;
  }
  .participant-tag svg {
    font-size: 14px;
    color: red;
    cursor: pointer;
  }
`
