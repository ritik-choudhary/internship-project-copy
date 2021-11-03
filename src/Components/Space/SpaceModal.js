import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, useParams, useHistory } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import lib from '../../assets/png/lib.png'
import docs from '../../assets/png/docs.png'
import sem from '../../assets/png/sem.png'
import club from '../../assets/png/club.png'
import mood from '../../assets/png/mood.png'
import meeting from '../../assets/png/meeting.png'
import workshop from '../../assets/png/workshop.png'
import todo from '../../assets/png/todo.png'
import habit from '../../assets/png/habit.png'
import bucket from '../../assets/png/bucket.png'

export default function SpaceModal() {
  const param = useParams()
  const history = useHistory()
  const [newSpace, setNewSpace] = useState()

  let space

  const [showMsg, setShowMsg] = useState(false)

  useEffect(() => {
    if (showMsg) {
      const timer = setTimeout(() => {
        setShowMsg(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showMsg])

  const handleChange = (e) => {
    const { value } = e.target
    setNewSpace({ name: value })
  }
  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '893px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          background: '#f8fafb',
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
        <Link to={`/workspace/${param.id}/details`}>
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
          const workspaceId = value.workspaceList.find(
            (item) => item.id === param.id
          ).id
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
                  history.push(`/workspace/${param.id}/details`)
                }
              }}
              onSubmit={(e) => {
                e.preventDefault()
                if (newSpace) {
                  const isExisting = value.workspaceElements.find(
                    (item) =>
                      item.title === newSpace.name &&
                      item.workspaceID === param.id
                  )
                    ? true
                    : false

                  if (isExisting) {
                    let count = 0
                    value.workspaceElements.forEach((item) =>
                      item.title === newSpace.name &&
                      item.workspaceID === param.id
                        ? count++
                        : null
                    )
                    space = {
                      workspaceID: workspaceId,
                      id: new Date().getTime().toString(),
                      title: newSpace.name,
                      version: count + 1,
                    }
                  } else {
                    space = {
                      workspaceID: workspaceId,
                      id: new Date().getTime().toString(),
                      title: newSpace.name,
                      version: 1,
                    }
                  }

                  history.push({
                    pathname: `/workspace/${param.id}/details/createspace/imageupload`,
                    state: { space: space },
                  })
                } else {
                  setShowMsg(true)
                }
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'grid',
                  gridTemplateRows: 'repeat(5,1fr)',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: '10px',
                  gridColumnGap: '60px',
                }}
              >
                <div className='single-input'>
                  <label
                    htmlFor='library'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={lib} alt='' />
                    <p>Library</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='library'
                    value='Library'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='new-semester'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={sem} alt='' />
                    <p>New Semester</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='new-semester'
                    value='New Semester'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='college-clubs'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={club} alt='' />
                    <p>College Clubs</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='college-clubs'
                    value='College Clubs'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='moodboards'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={mood} alt='' />
                    <p>Moodboards</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='moodboards'
                    value='Moodboards'
                    onChange={handleChange}
                  />
                </div>

                <div className='single-input'>
                  <label
                    htmlFor='docs'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={docs} alt='' />
                    <p>Docs</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='docs'
                    value='Docs'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='meeting-notes'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={meeting} alt='' />
                    <p>Meeting Notes</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='meeting-notes'
                    value='Meeting Notes'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='workshop'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={workshop} alt='' />
                    <p>Workshop</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='workshop'
                    value='Workshop'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='todo-list'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={todo} alt='' />
                    <p>To-do List</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='todo-list'
                    value='To-do List'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='bucket-list'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={bucket} alt='' />
                    <p>Bucket List</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='bucket-list'
                    value='Bucket List'
                    onChange={handleChange}
                  />
                </div>
                <div className='single-input'>
                  <label
                    htmlFor='habit-tracker'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img src={habit} alt='' />
                    <p>Habit Tracker</p>
                  </label>
                  <input
                    type='radio'
                    name='new-space'
                    id='habit-tracker'
                    value='Habit Tracker'
                    onChange={handleChange}
                  />
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
                {showMsg ? (
                  <p style={{ fontSize: '14px', color: '#ff0000' }}>
                    Please select an option
                  </p>
                ) : null}

                <Link to={`/workspace/${param.id}/details`}>
                  <div
                    style={{
                      color: '#FF0000',
                      border: 'none',
                      background: 'none',
                      padding: '10px 20px',
                      outline: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
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
                  Next
                </button>
              </div>
            </form>
          )
        }}
      </WorkspaceConsumer>
    </Modal>
  )
}
