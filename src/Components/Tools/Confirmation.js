import React from 'react'
import Modal from 'react-modal'
import { WorkspaceConsumer } from '../../Context'
import { Link, useHistory, useParams } from 'react-router-dom'

export default function Confirmation() {
  const history = useHistory()
  const param = useParams()
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
      <WorkspaceConsumer>
        {(value) => {
          return (
            <form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '22px 32px',
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 27) {
                  history.push('/trash')
                }
              }}
              onSubmit={(e) => {
                e.preventDefault()
                value.deleteRecentsPermanently(param.deleteID)
                history.push('/trash')
              }}
            >
              <p>Are you sure you want to permanently delete this?</p>
              <p style={{ color: '#c4c4c4' }}>
                You will not be able to restore again.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Link to='/recents'>
                  <div
                    style={{
                      color: '#FF0000',
                      border: 'none',
                      background: 'none',
                      padding: '10px 20px',
                      outline: 'none',
                      cursor: 'pointer',
                      fontWeight: '400',
                      fontSize: '14px',
                    }}
                  >
                    Cancel
                  </div>
                </Link>
                <button
                  type='submit'
                  style={{
                    color: 'white',
                    background: '#ff0000',
                    border: 'none',
                    outline: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Confirm
                </button>
              </div>
            </form>
          )
        }}
      </WorkspaceConsumer>
    </Modal>
  )
}
