import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import TextEditor from './TextEditor'
import Styled from 'styled-components'

export default function JournalEntryModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <JournalEntryModalComponent
            value={value}
          ></JournalEntryModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function JournalEntryModalComponent(props) {
  const { value } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  const param = useParams()
  const history = useHistory()

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

  useEffect(() => {
    const selectedJournal = value.journal.find(
      (item) => item.id === param.journalID
    )
    setJournalToEdit(selectedJournal)
    setTitle(selectedJournal.title)
    setCreatedOn(selectedJournal.createdOn)
    setCreatedBy(selectedJournal.createdBy)
    setTextNote(selectedJournal?.note)
  }, [param.journalID, value.journal])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '1000px',
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
      <JournalModalWrapper>
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '12px 30px',
          }}
        >
          <Link to={`/journal`}>
            <AiFillCloseCircle
              style={{
                fontSize: '30px',
                color: '#FFC8C8',
                cursor: 'pointer',
              }}
            />
          </Link>
        </header>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 30px 30px',
          }}
          onSubmit={(e) => {
            e.preventDefault()
            const journal = {
              title: title,
              createdOn: createdOn,
              createdBy: createdBy,
              note: textNote,
            }
            value.editJournal(journalToEdit.id, journal)
            history.push(`/journal`)
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
                value={createdBy}
                className={createdBy ? '' : 'skeleton'}
                onChange={(e) => {
                  setCreatedBy(e.target.value)
                }}
              />
            </div>
          </div>
          <TextEditor textNote={textNote} setTextNote={setTextNote} />
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
