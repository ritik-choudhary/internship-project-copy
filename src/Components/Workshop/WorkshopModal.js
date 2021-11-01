import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FaCheckCircle, FaUpload } from 'react-icons/fa'
import { Images } from '../../assets/DefaultImage'

export default function WorkshopModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return <WorkshopModalComponent value={value} {...props} />
      }}
    </WorkspaceConsumer>
  )
}

function WorkshopModalComponent(props) {
  const { value, isEditing } = props
  const randomIndex = Math.floor(Math.random() * Images.length)

  const [workshopName, setWorkshopName] = useState('')
  const [thumbnail, setThumbnail] = useState()
  const [preview, setPreview] = useState(Images[randomIndex])

  const param = useParams()
  const history = useHistory()

  const selectedSpace = value.workspaceElements.find(
    (item) => item.id === param.spaceKey && item.workspaceID === param.id
  )
  const selectedWorkshop = selectedSpace?.workshops?.find(
    (item) => item.id === param.workshopID
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
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedWorkshop = selectedSpace?.workshops?.find(
        (item) => item.id === param.workshopID
      )
      setWorkshopName(selectedWorkshop.title)
    }
  }, [
    isEditing,
    value.workspaceElements,
    param.id,
    param.spaceKey,
    param.workshopID,
  ])

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
          Add new workshop
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
          gap: '20px',
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
            value.addNewWorkshop(param.id, param.spaceKey, {
              id: new Date().getTime().toString(),
              createdOn: `${day}/${month}/${year}`,
              title: workshopName,
              image: preview,
            })
            setWorkshopName('')
          } else {
            value.editWorkshop(param.id, param.spaceKey, param.workshopID, {
              title: workshopName,
              image: thumbnail ? preview : selectedWorkshop.image,
            })
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
            Name of the Workshop
          </label>
          <input
            autoFocus
            required
            type='text'
            name='club'
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
            value={workshopName}
            onChange={(e) => setWorkshopName(e.target.value)}
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
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                textAlign: 'center',
                padding: '5px',
              }}
            >
              <FaUpload />
              <p>Upload image</p>
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
