import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'

export default function ContactModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <ContactModalComponent
            value={value}
            {...props}
          ></ContactModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function ContactModalComponent(props) {
  const { value, isEditing, isSharing } = props

  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  let count = 0

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [personName, setPersonName] = useState()
  const [personNamesList, setPersonNamesList] = useState([])
  const [company, setCompany] = useState()
  const [personalDetails, setPersonalDetails] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])

  const [contactToEdit, setContactToEdit] = useState()

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
      const selectedContact = selectedResource.contacts.find(
        (item) => item.id === param.contactID
      )
      setContactToEdit(selectedContact)
      setTitle(selectedContact.title)
      setCreatedOn(selectedContact.createdOn)
      setCreatedBy(selectedContact.createdBy)
      setPersonName(selectedContact.personName)
      setCompany(selectedContact.company)
      setPersonalDetails(selectedContact.personalDetails)
      setLinks(selectedContact.links)
    }
  }, [
    isSharing,
    isEditing,
    param.id,
    param.spaceKey,
    param.clubID,
    param.resourceID,
    param.contactID,
    value.workspaceElements,
  ])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '512px',
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
          padding: '12px',
        }}
      >
        {isSharing ? (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`}
          >
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#c4c4c4',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
          >
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#c4c4c4',
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
          padding: '0 30px 30px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isSharing) {
            if (isEditing) {
              const contact = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                personNamesList: personNamesList,
                company: company,
                personalDetails: personalDetails,
                links: links,
              }
              value.editContact(
                param.id,
                param.spaceKey,
                param.clubID,
                param.resourceID,
                contactToEdit.id,
                contact
              )
            } else {
              const contact = {
                id: new Date().getTime().toString(),
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                personNamesList: personNamesList,
                company: company,
                personalDetails: personalDetails,
                links: links,
              }
              value.addNewContact(
                param.id,
                param.spaceKey,
                param.clubID,
                param.resourceID,
                contact
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
        <div className='contact-note-name' style={{ paddingBottom: '20px' }}>
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
            placeholder='Untitled Contact Document'
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
        <div className='contact-basic-info'>
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
            <label htmlFor='person-name'>Person Name</label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                justifyContent: 'flex-end',
              }}
            >
              <input
                type='text'
                name='person-name'
                id='person-name'
                maxLength='30'
                value={personName}
                disabled={isSharing}
                className={personName ? '' : 'skeleton'}
                onChange={(e) => {
                  setPersonName(e.target.value)
                }}
              />

              <div className='add-sponsor-btn'>
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
                    marginLeft: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    if (!isSharing) {
                      if (personName) {
                        setPersonNamesList([
                          ...personNamesList,
                          {
                            person: personName,
                            id: new Date().getTime().toString(),
                          },
                        ])
                        setPersonName('')
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className='person-names-list'
            style={{
              display: `${personNamesList.length > 0 ? 'grid' : 'none'}`,
              gridTemplateColumns: '1fr',
              width: '52%',
              gap: '3px',
              borderRadius: '3px',
              maxHeight: '60px',
              overflow: 'auto',
              overflowX: 'hidden',
              padding: '3px 10px',
              marginLeft: '170px',
              marginRight: '10px',
            }}
          >
            {personNamesList.map((item) => {
              return (
                <div
                  className='single-person'
                  style={{
                    display: 'flex',
                    gap: '3px',
                    alignItems: 'center',
                    height: '20px',
                    border: '1px solid #468aef',
                    borderRadius: '5px',
                    fontSize: '12px',
                    padding: '3px',
                    color: '#468aef',
                  }}
                >
                  <p style={{ width: '90%' }}>
                    {item.person.length > 20
                      ? `${item.slice(0, 20)}...`
                      : item.person}
                  </p>
                  <AiOutlineClose
                    style={{ cursor: 'pointer', color: '#ff0000' }}
                    onClick={() => {
                      let tempPersonList = [...personNamesList]
                      const newPersonList = tempPersonList.filter(
                        (temp) => temp.id !== item.id
                      )
                      setPersonNamesList(newPersonList)
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div className='single-option'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              value={company}
              className={company ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setCompany(e.target.value)
              }}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='personalDetails'>Personal details</label>
            <input
              type='text'
              name='personalDetails'
              id='personalDetails'
              value={personalDetails}
              className={personalDetails ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setPersonalDetails(e.target.value)
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
              display: `${links.length > 0 ? 'grid' : 'none'}`,
              gap: '3px',
              gridTemplateColumns: 'repeat(3,1fr)',
              marginLeft: '179px',
              width: '50%',
              maxHeight: '40px',
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
