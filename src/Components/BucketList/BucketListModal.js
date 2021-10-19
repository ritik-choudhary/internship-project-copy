import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { FaUpload } from 'react-icons/fa'

export default function BucketListModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <BucketListModalComponent
            value={value}
            {...props}
          ></BucketListModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function BucketListModalComponent(props) {
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const { isEditing, value } = props
  const param = useParams()
  const history = useHistory()

  const [selectedBucket, setSelectedBucket] = useState()
  const [bucketTitle, setBucketTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [type, setType] = useState()
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])

  useEffect(() => {
    if (isEditing) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedBucketList = selectedSpace.bucketList.find(
        (item) => item.id === param.bucketListID
      )
      setSelectedBucket(selectedBucketList)
      setBucketTitle(selectedBucketList.title)
      setCreatedOn(selectedBucketList.createdOn)
      setType(selectedBucketList.type)
      setPreviews(selectedBucketList.previews)
      setImages(selectedBucketList.images)
    }
  }, [
    isEditing,
    param.id,
    param.spaceKey,
    param.bucketListID,
    value.workspaceElements,
  ])

  useEffect(() => {
    if (images) {
      setPreviews([])
      images.forEach((image) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviews((previews) => [
            ...previews,
            { previewId: image.imageId, source: reader.result },
          ])
        }
        reader.readAsDataURL(image.imageFile)
      })
    } else {
      setPreviews([])
    }
  }, [images])

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
          Add new item
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
        encType='multipart/form-data'
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
          if (isEditing) {
            value.editBucketList(param.id, param.spaceKey, param.bucketListID, {
              id: selectedBucket.id,
              title: bucketTitle,
              createdOn: createdOn,
              type: type,
              images: images,
              previews: previews,
            })
          } else {
            const bucketToAdd = {
              id: new Date().getTime().toString(),
              title: bucketTitle,
              createdOn: createdOn,
              type: type,
              images: images,
              previews: previews,
            }
            value.addBucketList(param.id, param.spaceKey, bucketToAdd)
          }
          history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <label
            htmlFor='created-on'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Created on
          </label>
          <p style={{ fontSize: '12px', color: '#468AEF' }}>{date}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
            autoFocus
            required
            type='text'
            name='title'
            id='title'
            maxLength='100'
            value={bucketTitle}
            onChange={(e) => setBucketTitle(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label
            htmlFor='type'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Type
          </label>
          <input
            type='text'
            name='type'
            id='type'
            maxLength='100'
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label
            htmlFor='image'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Upload Image
          </label>
          <input
            type='file'
            name='image'
            id='image'
            hidden
            multiple
            accept='image/*'
            onChange={(e) => {
              let tempImages = images
              for (let i = 0; i < e.target.files.length; i++) {
                tempImages = [
                  ...tempImages,
                  {
                    imageId: new Date().getTime().toString() + i,
                    imageFile: e.target.files[i],
                  },
                ]
              }
              setImages(tempImages)
            }}
          />
          <label htmlFor='image'>
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
                Upload Image
              </div>
            </div>
          </label>
          <div
            className='pdf-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {images.map((image) => {
              //   const linkToimage = previews.find(
              //     (item) => item.previewId === image.imageId
              //   )
              return (
                <>
                  <div className='image-file' style={{ fontSize: '12px' }}>
                    {image.imageFile.name.length > 15
                      ? `${image.imageFile.name.slice(0, 15)}...`
                      : image.imageFile.name}
                  </div>
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
    </Modal>
  )
}
