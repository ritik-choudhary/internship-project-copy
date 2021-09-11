import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { useParams, Link, useHistory } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'

export default function LibraryModal(props) {
  const { favourite } = props
  const param = useParams()
  const history = useHistory()
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
          Add new space
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
              onSubmit={(e) => {
                e.preventDefault()
                if (favourite) {
                  if (bookLink) {
                    value.addBook(
                      {
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
                        id: new Date().getDate().toString(),
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
                        preview: pdfPreview,
                        id: new Date().getDate().toString(),
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
                    fontSize: '20px',
                    padding: '5px 10px',
                    outline: 'none',
                  }}
                  onChange={(e) => {
                    setBookLink(e.target.value)
                  }}
                />
              </div>
              <div>
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
                  <button
                    style={{
                      color: '#FF0000',
                      border: 'none',
                      background: 'none',
                      padding: '10px 20px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
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
          )
        }}
      </WorkspaceConsumer>
    </Modal>
  )
}
