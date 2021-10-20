import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import { FaCheckCircle } from 'react-icons/fa'
import { Images } from '../../assets/DefaultImage'

export default function SpaceUploadModal() {
  const randomIndex = Math.floor(Math.random() * Images.length)

  const param = useParams()
  const location = useLocation()
  const history = useHistory()
  const [thumbnail, setThumbnail] = useState()
  const [preview, setPreview] = useState(Images[randomIndex])
  const [altName, setAltName] = useState()

  useEffect(() => {
    if (thumbnail) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(thumbnail)
    }
  }, [thumbnail])

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
        <Link to={`/workspace/${param.id}/details/createspace`}>
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
                gap: '30px',
                padding: '22px 32px',
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 27) {
                  e.preventDefault()
                  history.push(`/workspace/${param.id}/details/createspace`)
                }
              }}
              onSubmit={(e) => {
                e.preventDefault()

                let newSpaceObject = { ...location.state.space }
                if (altName) {
                  newSpaceObject.altName = altName
                }
                value.addNewSpace({ ...newSpaceObject, image: preview })
                history.push(`/workspace/${param.id}/details`)
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <p
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  Name of the new space
                </p>
                <div
                  style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: '500' }}>
                    {location.state.space.title}{' '}
                    {location.state.space.version > 1
                      ? `(${location.state.space.version})`
                      : null}
                  </h4>

                  <p style={{ color: '#c4c4c4', fontSize: '40px' }}>/</p>

                  <input
                    type='text'
                    name='alternative-name'
                    id='alt-name'
                    value={altName}
                    onChange={(e) => setAltName(e.target.value)}
                    style={{
                      borderRadius: '6px',
                      outline: 'none',
                      border: '1px solid #c4c4c4',
                      fontSize: '15px',
                      padding: '0px 5px',
                      height: '25px',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <label
                  htmlFor='thumbnail'
                  style={{
                    color: '#959595',
                    fontSize: '12px',
                    marginBottom: '5px',
                  }}
                >
                  Thumbnail image (optional)
                </label>

                <input
                  type='file'
                  name='workspace'
                  id='thumbnail'
                  accept='image/*'
                  hidden
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                <label htmlFor='thumbnail'>
                  <span
                    className='custom-thumbnail-btn'
                    style={{
                      background: 'none',
                      borderRadius: '5px',
                      border: '1px dashed #468AEF',

                      color: '#468AEF',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      outline: 'none',
                      display: 'block',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    Upload image
                  </span>
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
                  {thumbnail ? 'File selected' : ''}
                  {thumbnail ? <FaCheckCircle /> : null}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={`/workspace/${param.id}/details/createspace`}>
                  <div
                    style={{
                      color: '#FF0000',
                      border: 'none',
                      background: 'none',
                      padding: '10px 20px',
                      outline: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
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
          )
        }}
      </WorkspaceConsumer>
    </Modal>
  )
}
