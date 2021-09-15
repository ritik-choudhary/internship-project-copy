import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link, useParams, useHistory } from 'react-router-dom'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FaCheckCircle, FaUpload } from 'react-icons/fa'

export default function SubjectModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <SubjectModalComponent
            value={value}
            {...props}
          ></SubjectModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function SubjectModalComponent(props) {
  const { isEditing, value } = props

  const [selectedSubject, setSelectedSubject] = useState()

  const param = useParams()
  const history = useHistory()
  const [courseName, setCourseName] = useState()
  const [courseCode, setCourseCode] = useState()
  const [teacher, setTeacher] = useState()
  const [pdfList, setPdfList] = useState([])
  const [linkList, setLinkList] = useState([])

  const [linkToAdd, setLinkToAdd] = useState()

  const [pdfPreview, setPdfPreview] = useState([])

  const [timetableList, setTimetableList] = useState([
    { Monday: false, startTime: null, endTime: null },
    { Tuesday: false, startTime: null, endTime: null },
    { Wednesday: false, startTime: null, endTime: null },
    { Thursday: false, startTime: null, endTime: null },
    { Friday: false, startTime: null, endTime: null },
    { Saturday: false, startTime: null, endTime: null },
  ])

  const changeTimeTableDay = (day, index) => {
    const oldTimeTable = [...timetableList]
    const dayObject = { ...oldTimeTable[index] }
    dayObject[day] = !dayObject[day]
    oldTimeTable[index] = dayObject
    setTimetableList(oldTimeTable)
  }

  const changeTimeTableStartTime = (day, startTime, index) => {
    const oldTimeTable = [...timetableList]
    const dayObject = { ...oldTimeTable[index] }
    const dayValue = dayObject[day]
    if (dayValue) {
      dayObject.startTime = startTime
      oldTimeTable[index] = dayObject
    }
    setTimetableList(oldTimeTable)
  }
  const changeTimeTableEndTime = (day, endTime, index) => {
    const oldTimeTable = [...timetableList]
    const dayObject = { ...oldTimeTable[index] }
    const dayValue = dayObject[day]
    if (dayValue) {
      dayObject.endTime = endTime
      oldTimeTable[index] = dayObject
    }
    setTimetableList(oldTimeTable)
  }

  useEffect(() => {
    if (isEditing) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const editSelectedSubject = selectedSpace.subjects.find(
        (item) => item.subjectID === param.subjectID
      )

      setSelectedSubject(editSelectedSubject)
      setCourseName(editSelectedSubject.name)
      setCourseCode(editSelectedSubject.code)
      setTeacher(editSelectedSubject.teacher)
      setLinkList(editSelectedSubject.linklist)
      setPdfList(editSelectedSubject.pdflist)
      setTimetableList(editSelectedSubject.timetable)
    }
  })

  useEffect(() => {
    if (pdfList) {
      pdfList.forEach((pdf) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPdfPreview([...pdfPreview, reader.result])
        }
        reader.readAsDataURL(pdf)
      })
    } else {
      setPdfPreview(null)
    }
  }, [pdfList])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '570px',
          minHeight: '95vh',
          top: '20%',
          left: '50%',
          right: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -20%)',
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
          Add new subject
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
          padding: '15px 32px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '35px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (isEditing) {
            value.editSubject(param.id, param.spaceKey, {
              subjectID: selectedSubject?.subjectID,
              name: courseName,
              code: courseCode,
              teacher: teacher,
              pdflist: pdfList,
              pdfPreviews: pdfPreview,
              linklist: linkList,
              timetable: timetableList,
            })
          } else {
            value.addNewSubject(param.id, param.spaceKey, {
              subjectID: new Date().getTime().toString(),
              name: courseName,
              code: courseCode,
              teacher: teacher,
              pdflist: pdfList,
              pdfPreviews: pdfPreview,
              linklist: linkList,
              timetable: timetableList,
            })
          }
          history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
        }}
      >
        <div
          className='upper-form'
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <label
              htmlFor='course-name'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              Course name
            </label>
            <input
              autoFocus
              type='text'
              name='course-name'
              id='course-name'
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value)
              }}
              style={{
                height: '32px',
                border: '1px solid #C4C4C4',
                borderRadius: '5px',
                fontSize: '20px',
                padding: '5px 10px',
                outline: 'none',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <label
              htmlFor='course-code'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              Course code
            </label>
            <input
              type='text'
              name='course-code'
              id='course-code'
              value={courseCode}
              onChange={(e) => {
                setCourseCode(e.target.value)
              }}
              style={{
                height: '32px',
                border: '1px solid #C4C4C4',
                borderRadius: '5px',
                fontSize: '20px',
                padding: '5px 10px',
                outline: 'none',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <label
              htmlFor='teacher'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              Teacher/Guide
            </label>
            <input
              type='text'
              name='teacher'
              id='teacher'
              value={teacher}
              onChange={(e) => {
                setTeacher(e.target.value)
              }}
              style={{
                height: '32px',
                border: '1px solid #C4C4C4',
                borderRadius: '5px',
                fontSize: '20px',
                padding: '5px 10px',
                outline: 'none',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <label
              htmlFor='pdf-upload'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p>Upload pdf</p>
                <AiOutlinePlus
                  style={{
                    color: '#468AEF',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: '700',
                  }}
                />
              </div>
            </label>
            <input
              type='file'
              name='pdf-upload'
              id='pdf-upload'
              hidden
              accept='.pdf'
              onChange={(e) => {
                setPdfList([...pdfList, e.target.files[0]])
              }}
            />
            <label htmlFor='pdf-upload'>
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
                  Upload pdf
                </div>
              </div>
            </label>
            <div
              style={{
                color: 'green',
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                gap: '10px',
              }}
            >
              {pdfList.length > 0 ? 'File selected' : ''}
              {pdfList.length > 0 ? <FaCheckCircle /> : null}
            </div>
            <div
              className='pdf-container'
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100px',
                fontSize: '14px',
                overflow: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {pdfList.map((pdf) => {
                return <div className='pdf-file'>{pdf.name}</div>
              })}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            <label
              htmlFor='link'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '500',
              }}
            ></label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p>Add link to other resources</p>
              <AiOutlinePlus
                style={{
                  color: '#468AEF',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '700',
                }}
                onClick={() => {
                  setLinkList([...linkList, linkToAdd])
                  setLinkToAdd('')
                }}
              />
            </div>
            <input
              type='url'
              name='link'
              id='link'
              style={{
                height: '32px',
                border: '1px solid #C4C4C4',
                borderRadius: '5px',
                fontSize: '20px',
                padding: '5px 10px',
                outline: 'none',
              }}
              value={linkToAdd}
              onChange={(e) => {
                setLinkToAdd(e.target.value)
              }}
            />
            <div
              className='links-container'
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100px',
                fontSize: '14px',
                overflow: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {linkList.map((link) => {
                return (
                  <a href={link} target='_blank' rel='noreferrer noopener'>
                    {link?.slice(8, 50)}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        <div
          className='lower-form'
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <label
            style={{
              color: '#959595',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            Weekly schedule
          </label>
          <div
            className='time-table'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              className='time-table-heading'
              style={{ display: 'flex', gap: '200px' }}
            >
              <h3>Day</h3>
              <h3>Timings</h3>
            </div>
            <div
              className='single-day'
              style={{ display: 'flex', gap: '88px' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  width: '150px',
                  alignItems: 'center',
                }}
              >
                <input
                  type='checkbox'
                  name='monday'
                  id='monday'
                  value='Monday'
                  checked={timetableList[0].Monday}
                  onChange={(e) => {
                    changeTimeTableDay('Monday', 0)
                  }}
                />
                <label
                  htmlFor='monday'
                  style={{
                    color: '#959595',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Monday
                </label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  width: '240px',
                  alignItems: 'center',
                }}
              >
                <input
                  type='time'
                  name='monday-start-time'
                  id='monday-start-time'
                  value={timetableList[0].startTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableStartTime('Monday', e.target.value, 0)
                  }}
                />
                <p style={{ color: '#959595' }}>to</p>
                <input
                  type='time'
                  name='monday-end-time'
                  id='monday-end-time'
                  value={timetableList[0].endTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableEndTime('Monday', e.target.value, 0)
                  }}
                />
              </div>
            </div>
            <div
              className='single-day'
              style={{ display: 'flex', gap: '88px' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  width: '150px',
                }}
              >
                <input
                  type='checkbox'
                  name='tuesday'
                  id='tuesday'
                  value='Tuesday'
                  checked={timetableList[1].Tuesday}
                  onChange={(e) => {
                    changeTimeTableDay('Tuesday', 1)
                  }}
                />
                <label
                  htmlFor='tuesday'
                  style={{
                    color: '#959595',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Tuesday
                </label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '240px',
                }}
              >
                <input
                  type='time'
                  name='tuesday-start-time'
                  id='tuesday-start-time'
                  value={timetableList[1].startTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableStartTime('Tuesday', e.target.value, 1)
                  }}
                />
                <p style={{ color: '#959595' }}>to</p>
                <input
                  type='time'
                  name='tuesday-end-time'
                  id='tuesday-end-time'
                  value={timetableList[1].endTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableEndTime('Tuesday', e.target.value, 1)
                  }}
                />
              </div>
            </div>
            <div
              className='single-day'
              style={{ display: 'flex', gap: '88px' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  width: '150px',
                }}
              >
                <input
                  type='checkbox'
                  name='wednesday'
                  id='wednesday'
                  value='Wednesday'
                  checked={timetableList[2].Wednesday}
                  onChange={(e) => {
                    changeTimeTableDay('Wednesday', 2)
                  }}
                />
                <label
                  htmlFor='wednesday'
                  style={{
                    color: '#959595',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Wednesday
                </label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '240px',
                }}
              >
                <input
                  type='time'
                  name='wednesday-start-time'
                  id='wednesday-start-time'
                  value={timetableList[2].startTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableStartTime('Wednesday', e.target.value, 2)
                  }}
                />
                <p style={{ color: '#959595' }}>to</p>
                <input
                  type='time'
                  name='wednesday-end-time'
                  id='wednesday-end-time'
                  value={timetableList[2].endTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableEndTime('Wednesday', e.target.value, 2)
                  }}
                />
              </div>
            </div>
            <div
              className='single-day'
              style={{ display: 'flex', gap: '88px' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  width: '150px',
                }}
              >
                <input
                  type='checkbox'
                  name='thursday'
                  id='thursday'
                  value='Thursday'
                  checked={timetableList[3].Thursday}
                  onChange={(e) => {
                    changeTimeTableDay('Thursday', 3)
                  }}
                />
                <label
                  htmlFor='thursday'
                  style={{
                    color: '#959595',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Thursday
                </label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '240px',
                }}
              >
                <input
                  type='time'
                  name='thursday-start-time'
                  id='thursday-start-time'
                  value={timetableList[3].startTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableStartTime('Thursday', e.target.value, 3)
                  }}
                />
                <p style={{ color: '#959595' }}>to</p>
                <input
                  type='time'
                  name='thursday-end-time'
                  id='thursday-end-time'
                  value={timetableList[3].endTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableEndTime('Thursday', e.target.value, 3)
                  }}
                />
              </div>
            </div>
            <div
              className='single-day'
              style={{ display: 'flex', gap: '88px' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  width: '150px',
                }}
              >
                <input
                  type='checkbox'
                  name='friday'
                  id='friday'
                  value='Friday'
                  checked={timetableList[4].Friday}
                  onChange={(e) => {
                    changeTimeTableDay('Friday', 4)
                  }}
                />
                <label
                  htmlFor='friday'
                  style={{
                    color: '#959595',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Friday
                </label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '240px',
                }}
              >
                <input
                  type='time'
                  name='friday-start-time'
                  id='friday-start-time'
                  value={timetableList[4].startTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableStartTime('Friday', e.target.value, 4)
                  }}
                />
                <p style={{ color: '#959595' }}>to</p>
                <input
                  type='time'
                  name='friday-end-time'
                  id='friday-end-time'
                  value={timetableList[4].endTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableEndTime('Friday', e.target.value, 4)
                  }}
                />
              </div>
            </div>
            <div
              className='single-day'
              style={{ display: 'flex', gap: '88px' }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  width: '150px',
                }}
              >
                <input
                  type='checkbox'
                  name='saturday'
                  id='saturday'
                  value='Saturday'
                  checked={timetableList[5].Saturday}
                  onChange={(e) => {
                    changeTimeTableDay('Saturday', 5)
                  }}
                />
                <label
                  htmlFor='saturday'
                  style={{
                    color: '#959595',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Saturday
                </label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '240px',
                }}
              >
                <input
                  type='time'
                  name='saturday-start-time'
                  id='saturday-start-time'
                  value={timetableList[5].startTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableStartTime('Saturday', e.target.value, 5)
                  }}
                />
                <p style={{ color: '#959595' }}>to</p>
                <input
                  type='time'
                  name='saturday-end-time'
                  id='saturday-end-time'
                  value={timetableList[5].endTime}
                  style={{
                    height: '30px',
                    width: '90px',
                    border: '1px solid #C4C4C4',
                    padding: '3px 5px',
                  }}
                  onChange={(e) => {
                    changeTimeTableEndTime('Saturday', e.target.value, 5)
                  }}
                />
              </div>
            </div>
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
