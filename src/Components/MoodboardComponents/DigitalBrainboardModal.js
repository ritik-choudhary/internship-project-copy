import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { Images } from '../../assets/DefaultImage'

export default function DigitalBrainboardModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return <DigitalBrainboardModalComponent value={value} {...props} />
      }}
    </WorkspaceConsumer>
  )
}

function DigitalBrainboardModalComponent(props) {
  const { value, isEditing } = props
  const randomIndex = Math.floor(Math.random() * Images.length)

  const [digitalBrainboardName, setDigitalBrainboardName] = useState('')
  const [thumbnail, setThumbnail] = useState()
  const [preview, setPreview] = useState(Images[randomIndex])

  const param = useParams()
  const history = useHistory()

  const selectedSpace = value.workspaceElements.find(
    (item) => item.id === param.spaceKey && item.workspaceID === param.id
  )

  const selectedDigitalBrainboard = selectedSpace?.digitalBrainboards?.find(
    (item) => item.id === param.brainboardID
  )

  useEffect(() => {
    if (thumbnail) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(thumbnail)
    }
  }, [thumbnail])

  useEffect(() => {
    if (isEditing) {
      setDigitalBrainboardName(selectedDigitalBrainboard.title)
    }
  }, [isEditing])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '520px',
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
          {isEditing ? 'Edit Digital Brainboard' : 'Add new Digital Brainboard'}
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
            history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()

          const date = new Date()
          const day = date.getDate()
          const month = date.getMonth() + 1
          const year = date.getFullYear()

          if (!isEditing) {
            value.addNewDigitalBrainboard(param.id, param.spaceKey, {
              id: new Date().getTime().toString(),
              createdOn: `${day}/${month}/${year}`,
              title: digitalBrainboardName,
              image: preview,
              createdBy: '',
              tags: '',
              subject: '',
              links: [],
            })
            setDigitalBrainboardName('')
          } else {
            value.editBasicsDigitalBrainboard(
              param.id,
              param.spaceKey,
              param.brainboardID,
              {
                title: digitalBrainboardName,
                image: thumbnail ? preview : selectedDigitalBrainboard.image,
              }
            )
          }

          history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='name'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Name of the Digital Brainboard
          </label>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            maxLength='100'
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={digitalBrainboardName}
            onChange={(e) => setDigitalBrainboardName(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            name='club'
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
