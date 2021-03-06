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

export default function IdeaModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <IdeaModalComponent value={value} {...props}></IdeaModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function IdeaModalComponent(props) {
  const { value, isEditing, isSharing } = props

  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  let count = 0
  let docCount = 0

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
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [docsList, setDocsList] = useState([])
  const [docsPreview, setDocsPreview] = useState([])

  const [ideaToEdit, setIdeaToEdit] = useState()

  const [textNote, setTextNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])

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
      const selectedIdea = selectedResource.ideas.find(
        (item) => item.id === param.ideaID
      )
      setIdeaToEdit(selectedIdea)
      setTitle(selectedIdea.title)
      setCreatedOn(selectedIdea.createdOn)
      setCreatedBy(selectedIdea.createdBy)
      setType(selectedIdea.type)
      setLinks(selectedIdea.links)
      setDocsList(selectedIdea.docsList)
      setTextNote(selectedIdea.note)
    }
  }, [
    isSharing,
    isEditing,
    param.id,
    param.spaceKey,
    param.clubID,
    param.resourceID,
    param.ideaID,
    value.workspaceElements,
  ])

  useEffect(() => {
    if (docsList) {
      setDocsPreview([])
      docsList.forEach((doc) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setDocsPreview((docsPreview) => [
            ...docsPreview,
            { previewId: doc.docId, source: reader.result },
          ])
        }
        reader.readAsDataURL(doc.docFile)
      })
    } else {
      setDocsPreview([])
    }
  }, [docsList])

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
        ) : (
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
        )}
      </header>
      <form
        encType='multipart/form-data'
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
              const idea = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                type: type,
                links: links,
                docsList: docsList,
                note: textNote,
              }
              value.editIdea(
                param.id,
                param.spaceKey,
                param.clubID,
                param.resourceID,
                ideaToEdit.id,

                idea
              )
            } else {
              const idea = {
                id: new Date().getTime().toString(),
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                type: type,
                links: links,
                docsList: docsList,
                note: textNote,
              }
              value.addNewIdea(
                param.id,
                param.spaceKey,
                param.clubID,
                param.resourceID,
                idea
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
        <div className='idea-note-name' style={{ paddingBottom: '20px' }}>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            maxLength='100'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Untitled Idea Document'
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
        <div className='idea-basic-info'>
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
                onClick={() => {
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
                    href={item}
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
            <label htmlFor='doc'>Doc</label>
            <input
              type='file'
              name='doc'
              id='doc'
              hidden
              multiple
              disabled={isSharing}
              accept='.docx,.pdf'
              onChange={(e) => {
                let tempDocs = docsList
                for (let i = 0; i < e.target.files.length; i++) {
                  tempDocs = [
                    ...tempDocs,
                    {
                      docId: new Date().getTime().toString() + i,
                      docFile: e.target.files[i],
                    },
                  ]
                }
                setDocsList(tempDocs)
              }}
            />
            <label htmlFor='doc'>
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
                  Upload Doc
                </div>
              </div>
            </label>
          </div>
          <div
            className='doc-container'
            style={{
              display: `${docsList.length > 0 ? 'flex' : 'none'}`,
              gap: '5px',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              marginLeft: '132px',
            }}
          >
            {docsList.map((doc) => {
              const linkToDoc = docsPreview.find(
                (item) => item.previewId === doc.docId
              )
              docCount++
              const type =
                doc.docFile.name.split('.')[
                  doc.docFile.name.split('.').length - 1
                ]
              return (
                <>
                  {isSharing ? (
                    <Link
                      to={{
                        pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/shareidea/readpdf`,
                        state: { src: linkToDoc?.source, fileType: type },
                      }}
                      key={doc.docId}
                      onClick={(e) => {
                        if (!isEditing && !isSharing) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <div
                        className='doc-file'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '5px',
                          alignItems: 'center',
                          width: '60px',
                          height: '20px',
                          border: '1px solid #468AEF',
                          whiteSpace: 'nowrap',
                          borderRadius: '5px',
                          fontSize: '12px',
                          padding: '0 5px',
                        }}
                      >
                        <p
                          style={{
                            color: '#468AEF',
                            width: '70%',
                            fontWeight: '400',
                          }}
                        >
                          Doc {docCount}
                        </p>
                        <AiOutlineClose
                          style={{ color: '#f54848', fontSize: '12px' }}
                        />
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addidea/readpdf`,
                        state: { src: linkToDoc?.source, fileType: type },
                      }}
                      key={doc.docId}
                      onClick={(e) => {
                        if (!isEditing) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <div
                        className='doc-file'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '5px',
                          alignItems: 'center',
                          // width: '70px',
                          height: '20px',
                          border: '1px solid #468AEF',
                          whiteSpace: 'nowrap',
                          borderRadius: '5px',
                          fontSize: '12px',
                          padding: '0 5px',
                        }}
                      >
                        <p
                          style={{
                            color: '#468AEF',
                            width: '70%',
                            fontWeight: '400',
                          }}
                        >
                          Doc {docCount}
                        </p>
                        <AiOutlineClose
                          style={{
                            color: '#f54848',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                          onClick={(e) => {
                            e.preventDefault()
                            if (!isSharing) {
                              let tempdocList = [...docsList]
                              const newdocList = tempdocList.filter(
                                (temp) => temp.docId !== doc.docId
                              )
                              setDocsList(newdocList)
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
