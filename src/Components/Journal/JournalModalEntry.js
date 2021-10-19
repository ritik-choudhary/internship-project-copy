import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineFullscreen } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import TextEditor from '../TextEditor'
import Styled from 'styled-components'

export default function JournalEntryModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <JournalEntryModalComponent
            value={value}
            {...props}
          ></JournalEntryModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function JournalEntryModalComponent(props) {
  const { value, isNotes } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const param = useParams()
  const history = useHistory()

  const [modalSpecs, setModalSpecs] = useState({
    width: '1199px',
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -25%)',
    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
    borderRadius: '10px',
    background: 'white',
    padding: '-20px',
  })

  const [editorHeight, setEditorHeight] = useState('150px')

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [textNote, setTextNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])

  const [journalToEdit, setJournalToEdit] = useState()
  const [notesToEdit, setNotesToEdit] = useState()

  useEffect(() => {
    if (!isNotes) {
      const selectedJournal = value.journal.find(
        (item) => item.id === param.journalID
      )
      setJournalToEdit(selectedJournal)
      setTitle(selectedJournal.title)
      setCreatedOn(selectedJournal.createdOn)
      setCreatedBy(selectedJournal.createdBy)
      setTextNote(selectedJournal?.note)
    } else {
      const selectedNotes = value.notes.find(
        (item) => item.id === param.notesID
      )
      setNotesToEdit(selectedNotes)
      setTitle(selectedNotes.title)
      setCreatedOn(selectedNotes.createdOn)
      setCreatedBy(selectedNotes.createdBy)
      setTextNote(selectedNotes?.note)
    }
  }, [isNotes, param.notesID, param.journalID, value.journal, value.notes])

  return (
    <Modal
      isOpen={true}
      style={{
        content: modalSpecs,
        overlay: {
          background: 'rgba(0, 0, 0, 0.31)',
        },
      }}
    >
      <JournalModalWrapper>
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px 30px',
          }}
        >
          {isNotes ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <AiOutlineFullscreen
                style={{
                  fontSize: '25px',
                  fontWeight: '500',
                  color: '#105eee',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setModalSpecs({
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '0',
                    transform: 'translate(0,0)',
                    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
                    borderRadius: '0px',
                    background: 'white',
                    padding: '-20px',
                  })
                  setEditorHeight('380px')
                }}
              />
              <Link to={`/notes`}>
                <AiFillCloseCircle
                  style={{
                    fontSize: '30px',
                    color: '#FFC8C8',
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <AiOutlineFullscreen
                style={{
                  fontSize: '25px',
                  fontWeight: '500',
                  color: '#105eee',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setModalSpecs({
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '0',
                    transform: 'translate(0,0)',
                    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
                    borderRadius: '0px',
                    background: 'white',
                    padding: '-20px',
                  })
                  setEditorHeight('380px')
                }}
              />
              <Link to={`/journal`}>
                <AiFillCloseCircle
                  style={{
                    fontSize: '30px',
                    color: '#FFC8C8',
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </div>
          )}
        </header>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 30px 30px',
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 27) {
              e.preventDefault()
              if (!isNotes) {
                history.push('/journal')
              } else {
                history.push('/notes')
              }
            }
          }}
          onSubmit={(e) => {
            e.preventDefault()
            if (!isNotes) {
              const journal = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                note: textNote,
              }
              value.editJournal(journalToEdit.id, journal)
              history.push(`/journal`)
            } else {
              const notes = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                note: textNote,
              }
              value.editNotes(notesToEdit.id, notes)
              history.push(`/notes`)
            }
          }}
        >
          <div className='journal-name' style={{ paddingBottom: '20px' }}>
            <input
              autoFocus
              required
              type='text'
              name='name'
              id='name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Untitled Meeting Notes'
              style={{
                width: '400px',
                border: 'none',
                outline: 'none',
                fontSize: '20px',
                fontWeight: '600',
                letterSpacing: '1px',
              }}
            />
          </div>
          <div className='journal-basic-info'>
            <div className='single-option'>
              <label htmlFor='created-on'>Created on</label>
              <p style={{ fontSize: '14px', color: '#468AEF' }}>{createdOn}</p>
            </div>
            <div className='single-option'>
              <label htmlFor='created-by'>Created by</label>
              <input
                type='text'
                name='created-by'
                id='created-by'
                maxLength='100'
                value={createdBy}
                className={createdBy ? '' : 'skeleton'}
                onChange={(e) => {
                  setCreatedBy(e.target.value)
                }}
              />
            </div>
          </div>
          <TextEditor
            textNote={textNote}
            setTextNote={setTextNote}
            height={editorHeight}
          />
          <div
            className='save-btn'
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
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
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <p>Save</p>
              </div>
            </button>
          </div>
        </form>
      </JournalModalWrapper>
    </Modal>
  )
}

const JournalModalWrapper = Styled.section`
.journal-name{
    font-size: 20px;
    font-weight: 600;
}
.journal-basic-info{
    display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 10px 15px 15px;
  border: none;
}
.journal-basic-info .single-option{
    display: flex;
  gap: 30px;
}
.journal-basic-info .single-option label {
    width: 100px;
  color: #c4c4c4;
  font-size: 16px;
}
.journal-basic-info .single-option input {
    border: none;
  outline: none;
  width: 200px;
  height: 20px;
  font-size: 16px;
}
.journal-basic-info .single-option .skeleton{
    background: #e4e4e4;
  border-radius: 2px;
}
`
