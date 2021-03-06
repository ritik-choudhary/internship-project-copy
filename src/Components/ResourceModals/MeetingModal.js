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
import { FiMinimize } from 'react-icons/fi'

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
  const { value, isEditing, isSharing } = props
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

  const [editorHeight, setEditorHeight] = useState('150px')

  const [isFullScreen, setIsFullScreen] = useState(false)

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [type, setType] = useState()
  const [participantToAdd, setParticipantToAdd] = useState()
  const [participants, setParticipants] = useState([])
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
    if (isEditing || isSharing) {
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
    isSharing,
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
          <>
            <div style={{ display: 'flex', gap: '10px' }}>
              {isFullScreen ? (
                <FiMinimize
                  style={{
                    fontSize: '25px',
                    fontWeight: '500',
                    color: '#105eee',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setModalSpecs({
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
                    setEditorHeight('150px')
                    setIsFullScreen(false)
                  }}
                />
              ) : (
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
                    setEditorHeight('280px')
                    setIsFullScreen(true)
                  }}
                />
              )}
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`}
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
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '10px' }}>
              {isFullScreen ? (
                <FiMinimize
                  style={{
                    fontSize: '25px',
                    fontWeight: '500',
                    color: '#105eee',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setModalSpecs({
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
                    setEditorHeight('150px')
                    setIsFullScreen(false)
                  }}
                />
              ) : (
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
                    setEditorHeight('280px')
                    setIsFullScreen(true)
                  }}
                />
              )}
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
            </div>
          </>
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
            if (!isSharing) {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`
              )
            } else {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`
              )
            }
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isSharing) {
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
          } else {
            history.push(
              `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`
            )
          }
        }}
      >
        <div className='meeting-note-name' style={{ paddingBottom: '20px' }}>
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
        <div className='meeting-basic-info' style={{ overflow: 'auto' }}>
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
                if (!isSharing) setCreatedBy(e.target.value)
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
                if (!isSharing) setType(e.target.value)
              }}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='participants' style={{ flexShrink: '0' }}>
              Participants
            </label>
            <input
              type='text'
              name='participants'
              id='participants'
              value={participantToAdd}
              style={{ flexShrink: '0' }}
              className={participantToAdd ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setParticipantToAdd(e.target.value)
              }}
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
              disabled={isSharing}
              className={linkToAdd ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setLinkToAdd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (!isSharing) {
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
                  if (!isSharing) {
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
                    border: '1px solid #468AEF',
                    whiteSpace: 'nowrap',
                    borderRadius: '5px',
                    fontSize: '12px',
                    gap: '5px',
                    padding: '0 5px',
                  }}
                  key={count}
                >
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noreferrer noopener'
                    style={{
                      color: '#468AEF',
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
                      if (!isSharing) {
                        let tempLinks = [...links]
                        const newLinks = tempLinks.filter(
                          (temp) => temp.id !== item.id
                        )
                        setLinks(newLinks)
                      }
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
              disabled={isSharing}
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
                <>
                  {isSharing ? (
                    <Link
                      to={{
                        pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharemeeting/readpdf`,
                        state: { src: linkToPdf?.source },
                      }}
                      key={pdf.pdfId}
                      onClick={(e) => {
                        if (!isSharing) {
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
                          border: '1px solid #468AEF',
                          whiteSpace: 'nowrap',
                          borderRadius: '5px',
                          fontSize: '12px',
                          gap: '5px',
                          padding: '0 5px',
                        }}
                      >
                        <p
                          style={{
                            color: '#468AEF',
                            fontSize: '12px',
                            fontWeight: '400',
                            width: '80%',
                          }}
                        >
                          Pdf {pdfCount}
                        </p>
                        <AiOutlineClose
                          style={{ color: '#f54848', cursor: 'pointer' }}
                        />
                      </div>
                    </Link>
                  ) : (
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
                          border: '1px solid #468AEF',
                          whiteSpace: 'nowrap',
                          borderRadius: '5px',
                          fontSize: '12px',
                          gap: '5px',
                          padding: '0 5px',
                        }}
                      >
                        <p
                          style={{
                            color: '#468AEF',
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
                            if (!isSharing) {
                              let temppdfList = [...pdfList]
                              const newpdfList = temppdfList.filter(
                                (temp) => temp.pdfId !== pdf.pdfId
                              )
                              setPdfList(newpdfList)
                            }
                          }}
                        />
                      </div>
                    </Link>
                  )}
                </>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <p>Save</p>
            </div>
          </button>
        </div>
      </form>
    </Modal>
  )
}
