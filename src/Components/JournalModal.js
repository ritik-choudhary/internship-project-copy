import React, { useState } from 'react'
import Modal from 'react-modal'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'

export default function JournalModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <JournalModalComponent
            value={value}
            {...props}
          ></JournalModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function JournalModalComponent(props) {
  const { value, isNotes } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const [title, setTitle] = useState()

  const history = useHistory()
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
          {isNotes ? 'Add new notes' : 'Add new Entry'}
        </h3>
        {isNotes ? (
          <Link to='/notes'>
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
          <Link to='/journal'>
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        )}
      </header>
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
          if (!isNotes) {
            value.addNewJournal({
              id: new Date().getTime().toString(),
              createdOn: date,
              title: title,
              createdBy: '',
              note: [
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ],
            })
            history.push('/journal')
          } else {
            value.addNewNotes({
              id: new Date().getTime().toString(),
              createdOn: date,
              title: title,
              createdBy: '',
              note: [
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ],
            })
            history.push('/notes')
          }
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='journal-title'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            {isNotes ? 'Title of the notes' : 'Title of the entry'}
          </label>
          <input
            type='text'
            name='journal-title'
            id='journal-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {isNotes ? (
            <Link to='/notes'>
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
          ) : (
            <Link to='/journal'>
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
          )}

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
