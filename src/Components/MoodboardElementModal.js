import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link, useParams, useHistory } from 'react-router-dom'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FaCheckCircle, FaUpload } from 'react-icons/fa'

export default function MoodboardElementModal() {
  const param = useParams()
  const history = useHistory()

  const [image, setImage] = useState()
  const [imagePreview, setImagePreview] = useState()
  const [pdfList, setPdfList] = useState([])
  const [pdfPreview, setPdfPreview] = useState([])
  const [linksList, setLinksList] = useState([])
  const [linkToAdd, setLinkToAdd] = useState()
  const [video, setVideo] = useState()

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(image)
    } else {
      setImagePreview(null)
    }
  }, [image])

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
          width: '430px',
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
            fontWeight: '400',
          }}
        >
          Add new
        </h3>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${param.moodboardID}`}
        >
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
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '22px 32px',
              }}
              onSubmit={(e) => {
                e.preventDefault()
                const moodboardField = {
                  id: new Date().getTime().toString(),
                  image: imagePreview,
                  pdfList: pdfList,
                  pdfPreview: pdfPreview,
                  links: linksList,
                  video: video,
                }
                value.addMoodboardField(
                  param.id,
                  param.spaceKey,
                  param.moodboardID,
                  moodboardField
                )
                history.push(
                  `/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${param.moodboardID}`
                )
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor='image'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    marginBottom: '5px',
                  }}
                >
                  Upload image
                </label>
                <input
                  type='file'
                  name='club'
                  id='image'
                  accept='image/*'
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor='image'>
                  <span
                    className='custom-image-upload-btn'
                    style={{
                      background: 'none',
                      borderRadius: '5px',
                      border: '1px dashed #468AEF',
                      color: '#468AEF',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      outline: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <FaUpload />
                    <p>Upload</p>
                  </span>
                </label>
                <div
                  style={{
                    color: 'green',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    gap: '10px',
                  }}
                >
                  {image ? 'File selected' : ''}
                  {image ? <FaCheckCircle /> : null}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor='pdf'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    marginBottom: '5px',
                  }}
                >
                  Upload pdf
                </label>
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
                      Upload
                    </div>
                  </div>
                </label>
                <div
                  style={{
                    color: 'green',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    gap: '10px',
                  }}
                >
                  {pdfList.length > 1
                    ? 'File added'
                    : pdfList.length > 0
                    ? 'File selected'
                    : null}
                  {pdfList.length > 0 ? <FaCheckCircle /> : null}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor='link'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <p>Add link to other resources</p>
                    <AiOutlinePlus
                      style={{
                        color: '#468AEF',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: '700',
                      }}
                      onClick={() => {
                        setLinksList([...linksList, linkToAdd])
                        setLinkToAdd('')
                      }}
                    />
                  </div>
                </label>
                <input
                  type='url'
                  name='link'
                  id='link'
                  style={{
                    height: '32px',
                    border: '1px solid #C4C4C4',
                    borderRadius: '5px',
                    fontSize: '16px',
                    padding: '5px 10px',
                    outline: 'none',
                  }}
                  value={linkToAdd}
                  onChange={(e) => {
                    setLinkToAdd(e.target.value)
                  }}
                />
                <div
                  className='links-container'
                  style={{
                    display: `${linksList.length > 0 ? 'flex' : 'none'}`,
                    flexDirection: 'column',
                    maxHeight: '100px',
                    fontSize: '14px',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                  }}
                >
                  {linksList.map((link, index) => {
                    return (
                      <a
                        href={link}
                        target='_blank'
                        rel='noreferrer noopener'
                        key={index}
                      >
                        {link?.slice(8, 25)}
                      </a>
                    )
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                  htmlFor='video'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Upload video
                </label>
                <input
                  type='file'
                  name='video'
                  id='video'
                  hidden
                  accept='video/*'
                  onChange={(e) => setVideo(e.target.files[0])}
                />
                <label htmlFor='video'>
                  <span
                    className='custom-video-upload-btn'
                    style={{
                      background: 'none',
                      borderRadius: '5px',
                      border: '1px dashed #468AEF',
                      color: '#468AEF',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      outline: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    <FaUpload />
                    <p>Upload</p>
                  </span>
                </label>
                <div
                  style={{
                    color: 'green',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    gap: '10px',
                  }}
                >
                  {video ? 'File selected' : ''}
                  {video ? <FaCheckCircle /> : null}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  marginTop: '20px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Link
                  to={`/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${param.moodboardID}`}
                >
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
