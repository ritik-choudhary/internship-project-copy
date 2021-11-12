import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import DocsInput from '../Tools/DocsInput'

export default function OngoingModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <OngoingModalComponent
            value={value}
            {...props}
          ></OngoingModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function OngoingModalComponent(props) {
  const { value, isEditing } = props
  const history = useHistory()
  const param = useParams()

  const defaultDate = new Date().toISOString().substring(0, 10)

  const [title, setTitle] = useState()
  const [company, setCompany] = useState()
  const [startDate, setStartDate] = useState(defaultDate)
  const [description, setDescription] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [docsList, setDocsList] = useState([])
  const [docPreview, setDocPreview] = useState([])
  const [completed, setCompleted] = useState(false)

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
      const selectedInternship = value.internships.find(
        (item) => item.id === param.internshipID
      )
      setTitle(selectedInternship?.title)
      setCompany(selectedInternship?.company)
      setStartDate(selectedInternship?.startDate)
      setDescription(selectedInternship?.description)
      setLinks(selectedInternship?.links || [])
      setDocsList(selectedInternship?.docsList || [])
      setCompleted(selectedInternship?.completed)
    }
  }, [isEditing, param.internshipID, value.internships])

  useEffect(() => {
    if (docsList) {
      setDocPreview([])
      docsList.forEach((doc) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setDocPreview((docPreview) => [
            ...docPreview,
            { previewId: doc.docId, source: reader.result },
          ])
        }
        reader.readAsDataURL(doc.docFile)
      })
    } else {
      setDocPreview([])
    }
  }, [docsList])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '450px',
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
          Add new internship
        </h3>
        <Link to='/internships'>
          <AiOutlineClose
            style={{
              fontSize: '20px',
              color: '#C4C4C4',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>
      <form
        encType='multipart/form-data'
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '22px 32px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault()
            history.push('/internships')
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isEditing) {
            value.addNewOngoingInternship({
              id: new Date().getTime().toString(),
              title: title,
              company: company,
              startDate: startDate,
              description: description,
              links: links,
              docPreview: docPreview,
              docsList: docsList,
              completed: completed,
            })
          } else {
            const selectedInternship = value.internships.find(
              (item) => item.id === param.internshipID
            )
            value.editOngoingInternship({
              id: selectedInternship.id,
              title: title,
              company: company,
              startDate: startDate,
              description: description,
              links: links,
              docPreview: docPreview,
              docsList: docsList,
              completed: completed,
            })
          }
          history.push('/internships')
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='title'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            maxLength='100'
            autoFocus
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='company'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Company
          </label>
          <input
            type='text'
            name='company'
            id='company'
            maxLength='30'
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='start-date'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Start Date
          </label>
          <input
            type='date'
            name='start-date'
            id='start-date'
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='description'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Description
          </label>

          <textarea
            id='description'
            name='description'
            rows='4'
            cols='50'
            maxLength='500'
            style={{
              borderRadius: '5px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '12px',
              padding: '3px 8px',
              fontFamily: 'Open Sans',
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='links'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>Add Links</p>
            <AiOutlinePlus
              style={{
                fontSize: '16px',
                color: '#0063FF',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                  setLinks([...links, linkToAdd])
                  setLinkToAdd('')
                }
              }}
            />
          </label>
          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <input
              type='url'
              name='links'
              id='links'
              style={{
                width: '100%',
                borderRadius: '5px',
                height: '32px',
                outline: 'none',
                border: '1px solid #C4C4C4',
                fontSize: '16px',
                padding: '3px 8px',
              }}
              value={linkToAdd}
              onChange={(e) => {
                setLinkToAdd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                    setLinks([...links, linkToAdd])
                    setLinkToAdd('')
                  }
                }
              }}
            />
            <div className='link-add-btn'></div>
          </div>
          <div
            className='links-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {links?.map((item) => {
              return (
                <a
                  style={{ fontSize: '12px' }}
                  href={item}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {item.length > 40 ? `${item.slice(0, 60)}...` : item}
                </a>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DocsInput setDocsList={setDocsList} docsList={docsList} />

          <div
            className='doc-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {docsList?.map((doc) => {
              const linkToDoc = docPreview.find(
                (item) => item.previewId === doc.docId
              )

              const type =
                doc.docFile.name.split('.')[
                  doc.docFile.name.split('.').length - 1
                ]

              return (
                <>
                  <Link
                    to={{
                      pathname: `/internships/addnewongoing/readdoc`,
                      state: {
                        src: linkToDoc?.source,
                        fileType: type,
                      },
                    }}
                    key={doc.docId}
                  >
                    <div className='doc-file' style={{ fontSize: '12px' }}>
                      {doc.docFile.name.length > 50
                        ? `${doc.docFile.name.slice(0, 50)}...`
                        : doc.docFile.name}
                    </div>
                  </Link>
                </>
              )
            })}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Link to='/internships'>
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
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
