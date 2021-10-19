import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineClose,
} from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'

export default function BrainboardContentModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <BrainboardModalComponent
            value={value}
            {...props}
          ></BrainboardModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function BrainboardModalComponent(props) {
  const { value, isEditing } = props

  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  let count = 0

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()

  const [createdBy, setCreatedBy] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [tagToAdd, setTagToAdd] = useState()
  const [tags, setTags] = useState([])
  const [subject, setSubject] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])

  const [brainboardToEdit, setBrainboardToEdit] = useState()

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
      const selectedBrainboard = selectedSpace.digitalBrainboards.find(
        (item) => item.id === param.brainboardID
      )

      setBrainboardToEdit(selectedBrainboard)
      setTitle(selectedBrainboard.title)
      setCreatedOn(selectedBrainboard.createdOn)
      setCreatedBy(selectedBrainboard.createdBy)
      setTags(selectedBrainboard.tags || [])
      setSubject(selectedBrainboard.subject)
      setLinks(selectedBrainboard.links)
    }
  }, [
    isEditing,
    param.id,
    param.spaceKey,
    value.workspaceElements,
    param.brainboardID,
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
        <Link to={`/workspace/${param.id}/details/${param.spaceKey}/inside`}>
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
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault()
            history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (isEditing) {
            const brainBoardContent = {
              title: title,
              createdOn: createdOn,
              createdBy: createdBy,
              tags: tags,
              subject: subject,
              links: links,
            }
            value.editDigitalBrainboard(
              param.id,
              param.spaceKey,
              brainboardToEdit.id,
              brainBoardContent
            )
          }
          history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
        }}
      >
        <div className='brainboard-note-name' style={{ paddingBottom: '20px' }}>
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
        <div className='idea-basic-info' style={{ overflow: 'auto' }}>
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
              onChange={(e) => setCreatedBy(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='tags' style={{ flexShrink: '0' }}>
              Tags
            </label>
            <input
              style={{ flexShrink: '0' }}
              type='text'
              name='tags'
              id='tags'
              value={tagToAdd}
              className={tagToAdd ? '' : 'skeleton'}
              onChange={(e) => setTagToAdd(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.keyCode === 188) {
                  e.preventDefault()
                  setTags([
                    ...tags,
                    {
                      name: tagToAdd,
                      id: new Date().getTime().toString(),
                    },
                  ])
                  setTagToAdd('')
                }
              }}
            />
            <div
              className='tags-container'
              style={{
                display: 'flex',
                height: '25px',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {tags?.map((item) => {
                return (
                  <div
                    className='tag'
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      borderRadius: '5px',
                      padding: '3px 5px',
                      background: '#e5e5e5',
                    }}
                  >
                    <p style={{ fontSize: '14px' }}>{item.name}</p>
                    <AiOutlineClose
                      style={{
                        fontSize: '14px',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        let newtagsList = [...tags]
                        newtagsList = newtagsList.filter(
                          (temp) => temp.id !== item.id
                        )
                        setTags(newtagsList)
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='single-option'>
            <label htmlFor='subject'>Subject</label>
            <input
              type='text'
              name='subject'
              id='subject'
              value={subject}
              className={subject ? '' : 'skeleton'}
              onChange={(e) => setSubject(e.target.value)}
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
                      { link: linkToAdd, id: new Date().getTime().toString() },
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
              display: `${links?.length > 0 ? 'grid' : 'none'}`,
              gap: '5px',
              gridTemplateColumns: 'repeat(15,1fr)',
              marginLeft: '132px',
              maxHeight: '60px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {links?.map((item) => {
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
                    href={item.link}
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
                    onClick={(e) => {
                      e.preventDefault()

                      let tempLinkList = [...links]
                      const newLinkList = tempLinkList.filter(
                        (temp) => temp.id !== item.id
                      )
                      setLinks(newLinkList)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

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
