import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { FaCheckCircle } from 'react-icons/fa'
import { useParams, Link, useHistory } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'

export default function LibraryModal(props) {
  const { favourite } = props
  const param = useParams()
  const history = useHistory()

  const [name, setName] = useState()
  const [bookLink, setBookLink] = useState()
  const [pdf, setPdf] = useState()
  const [pdfPreview, setPdfPreview] = useState()

  useEffect(() => {
    if (pdf) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPdfPreview(reader.result)
      }
      reader.readAsDataURL(pdf)
    } else {
      setPdfPreview(null)
    }
  }, [pdf])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '519px',
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
          Add new book
        </h3>
        <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
          <AiOutlineClose
            style={{
              fontSize: '20px',
              color: '#C4C4C4',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <form
              style={{
                padding: '20px 32px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 27) {
                  e.preventDefault()
                  history.push(
                    `/workspace/${param.id}/details/${param.spaceKey}`
                  )
                }
              }}
              onSubmit={(e) => {
                e.preventDefault()
                if (favourite) {
                  if (bookLink) {
                    value.addBook(
                      {
                        title: name,
                        favourite: true,
                        link: bookLink,
                        id: new Date().getTime().toString(),
                      },
                      param.id,
                      param.spaceKey
                    )
                  }
                  if (pdf) {
                    value.addBook(
                      {
                        favourite: true,
                        title: name,
                        pdf: pdf,
                        preview: pdfPreview,
                        id: new Date().getTime().toString(),
                      },
                      param.id,
                      param.spaceKey
                    )
                  }
                  history.push(
                    `/workspace/${param.id}/details/${param.spaceKey}`
                  )
                } else {
                  if (bookLink) {
                    value.addBook(
                      {
                        favourite: false,
                        link: bookLink,
                        title: name,
                        id: new Date().getTime().toString(),
                      },
                      param.id,
                      param.spaceKey
                    )
                  }
                  if (pdf) {
                    value.addBook(
                      {
                        favourite: false,
                        pdf: pdf,
                        title: name,
                        preview: pdfPreview,
                        id: new Date().getTime().toString(),
                      },
                      param.id,
                      param.spaceKey
                    )
                  }
                  history.push(
                    `/workspace/${param.id}/details/${param.spaceKey}`
                  )
                }
              }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
              >
                <label
                  htmlFor='name'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Name of Book (optional)
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    height: '32px',
                    border: '1px solid #C4C4C4',
                    borderRadius: '5px',
                    fontSize: '16px',
                    padding: '5px 10px',
                    outline: 'none',
                  }}
                />
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
              >
                <label
                  htmlFor='book-link'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Embed ebook link
                </label>
                <input
                  type='url'
                  name='book-link'
                  id='book-link'
                  value={bookLink}
                  style={{
                    height: '32px',
                    border: '1px solid #C4C4C4',
                    borderRadius: '5px',
                    fontSize: '16px',
                    padding: '5px 10px',
                    outline: 'none',
                  }}
                  onChange={(e) => {
                    setBookLink(e.target.value)
                  }}
                  disabled={pdf ? true : false}
                />
              </div>
              <p
                style={{
                  textAlign: 'center',
                  margin: '-10px 0px',
                  color: '#468AEF',
                }}
              >
                OR
              </p>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
              >
                <label
                  htmlFor='upload-pdf'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Upload pdf
                </label>
                <input
                  type='file'
                  name='upload-pdf'
                  id='upload-pdf'
                  accept='.pdf'
                  hidden
                  onChange={(e) => setPdf(e.target.files[0])}
                  disabled={bookLink ? true : false}
                />
                <label htmlFor='upload-pdf'>
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
                    <p
                      style={{
                        color: '#468AEF',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      Upload pdf
                    </p>
                  </div>
                </label>
                <div
                  style={{
                    color: 'green',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    gap: '10px',
                  }}
                >
                  {pdf ? 'File selected' : ''}
                  {pdf ? <FaCheckCircle /> : null}
                </div>
                <p
                  style={{
                    color: 'black',
                    fontWeight: '400',
                    fontSize: '12px',
                  }}
                >
                  {pdf?.name}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
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
                  disabled={!bookLink && !pdf ? true : false}
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
          )
        }}
      </WorkspaceConsumer>
    </Modal>
  )
}
