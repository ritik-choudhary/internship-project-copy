import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { useParams, Link, useHistory } from 'react-router-dom'

export default function WorkspaceModal(props) {
  const { isEditing } = props
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaceThumbnail, setWorkspaceThumbnail] = useState()
  const [imageAddress, setImageAddress] = useState()

  const param = useParams()
  const history = useHistory()

  useEffect(() => {
    if (workspaceThumbnail) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageAddress(reader.result)
      }
      reader.readAsDataURL(workspaceThumbnail)
    } else {
      setImageAddress(null)
    }
  }, [workspaceThumbnail])

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
          Add new workspace
        </h3>
        <Link to='/workspace'>
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
              onSubmit={(e) => {
                e.preventDefault()
                if (workspaceName) {
                  if (!isEditing) {
                    value.addNewWorkspace({
                      id: new Date().getDate().toString(),
                      title: workspaceName,
                      image: imageAddress,
                    })
                    setWorkspaceName('')
                    // setNewWorkspaceModal(false)
                  }
                  if (isEditing) {
                    value.editWorkspace(
                      Number(param.id),
                      workspaceName,
                      imageAddress
                    )
                  }
                  history.push('/workspace/')
                }
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
                  Name of the workspace
                </label>
                <input
                  type='text'
                  name='workspace'
                  id='name'
                  style={{
                    borderRadius: '5px',
                    height: '32px',
                    outline: 'none',
                    border: '1px solid #C4C4C4',
                    fontSize: '20px',
                    padding: '3px 8px',
                  }}
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
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
                  Thumbnail image
                </label>

                <input
                  type='file'
                  name='workspace'
                  id='thumbnail'
                  accept='image/*'
                  hidden
                  onChange={(e) => setWorkspaceThumbnail(e.target.files[0])}
                />
                <label for='thumbnail'>
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
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Link to='/workspace'>
                  <button
                    style={{
                      color: '#FF0000',
                      border: 'none',
                      background: 'none',
                      padding: '10px 20px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    //   onClick={() => setNewWorkspaceModal(false)}
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
