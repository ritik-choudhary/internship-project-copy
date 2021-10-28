import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link, useParams, useHistory } from 'react-router-dom'
import { AiOutlineClose, AiOutlinePlus, AiFillCalendar } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FaCheckCircle } from 'react-icons/fa'
import DatePicker from 'react-date-picker'
import { Images } from '../assets/DefaultImage'
import moment from 'moment'

export default function HabitTrackerModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <HabitTrackerModalComponent
            value={value}
            {...props}
          ></HabitTrackerModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function HabitTrackerModalComponent(props) {
  const randomIndex = Math.floor(Math.random() * Images.length)

  const { value, isAddField } = props
  const param = useParams()
  const history = useHistory()

  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt))
    }
    return arr
  }

  const [habitImage, setHabitImage] = useState()
  const [preview, setPreview] = useState(Images[randomIndex])
  const [nameOfHabit, setNameOfHabit] = useState()
  const [fieldsList, setFieldsList] = useState([])
  const [fieldToAdd, setFieldToAdd] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [status, setStatus] = useState([])
  const [tempFieldsList, setTempFieldsList] = useState([])

  useEffect(() => {
    if (isAddField) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedHabit = selectedSpace.habits.find(
        (item) => item.id === param.habitID
      )
      setPreview(selectedHabit.image)
      setNameOfHabit(selectedHabit.title)
      setFieldsList(selectedHabit.fieldsList)
      setStartDate(selectedHabit.startDate)
      setEndDate(selectedHabit.endDate)
      setStatus(selectedHabit.status)
      setTempFieldsList([])
    }
  }, [
    param.id,
    param.spaceKey,
    param.habitID,
    value.workspaceElements,
    isAddField,
  ])

  useEffect(() => {
    if (habitImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(habitImage)
    }
  }, [habitImage])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '480px',
          top: '50%',
          left: '50%',
          right: 'auto',
          marginRight: '-50%',
          bottom: 'auto',
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
          padding: '10px 30px',
          borderBottom: '1px solid #DEDEDE',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          {isAddField ? 'Add new field' : 'Add new habit'}
        </h3>
        {isAddField ? (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insidehabit/${param.habitID}`}
          >
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
          <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
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
          padding: '15px 32px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault()
            if (isAddField) {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insidehabit/${param.habitID}`
              )
            } else {
              history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
            }
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isAddField) {
            if (fieldsList.length > 0) {
              const start = moment(startDate).format('YYYY-MM-DD')
              const end = moment(endDate).format('YYYY-MM-DD')

              var daylist = getDaysArray(new Date(start), new Date(end))
              daylist.map((v) => v.toISOString().slice(0, 10)).join('')
              let tempStatus = []
              fieldsList.forEach((item) => {
                let dateListTemp = []
                daylist.forEach((day) => {
                  const date = new Date(day)
                  dateListTemp = [
                    ...dateListTemp,
                    { date: date, completed: false },
                  ]
                })
                tempStatus = [...tempStatus, { [item.id]: dateListTemp }]
                setStatus(tempStatus)
              })
              value.addNewHabit(param.id, param.spaceKey, {
                id: new Date().getTime().toString(),
                title: nameOfHabit,
                createdOn: date,
                image: preview,
                fieldsList: fieldsList,
                startDate: startDate,
                status: tempStatus,
                endDate: endDate,
              })
              history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
            } else {
              alert('Please select atleast one task')
            }
          } else {
            const start = moment(startDate).format('YYYY-MM-DD')
            const end = moment(endDate).format('YYYY-MM-DD')

            daylist = getDaysArray(new Date(start), new Date(end))
            daylist.map((v) => v.toISOString().slice(0, 10)).join('')
            let tempStatus = [...status]
            tempFieldsList.forEach((item) => {
              let dateListTemp = []
              daylist.forEach((day) => {
                const date = new Date(day)
                dateListTemp = [
                  ...dateListTemp,
                  { date: date, completed: false },
                ]
              })
              tempStatus = [...tempStatus, { [item.id]: dateListTemp }]
              setStatus(tempStatus)
            })
            value.addNewHabitField(
              param.id,
              param.spaceKey,
              param.habitID,
              fieldsList,
              tempStatus
            )

            history.push(
              `/workspace/${param.id}/details/${param.spaceKey}/insidehabit/${param.habitID}`
            )
          }
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label
            htmlFor='created-on'
            style={{
              color: '#959595',
              fontSize: '12px',
              fontWeight: '400',
            }}
          >
            Created on
          </label>
          <p style={{ fontSize: '12px', color: '#468AEF' }}>{date}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label
            htmlFor='habit-name'
            style={{
              color: '#959595',
              fontSize: '12px',
              fontWeight: '400',
            }}
          >
            Name of the habit
          </label>
          <input
            required
            autoFocus
            type='text'
            name='habit-name'
            id='habit-name'
            maxLength='100'
            value={nameOfHabit}
            onChange={(e) => {
              if (!isAddField) setNameOfHabit(e.target.value)
            }}
            style={{
              height: '32px',
              border: '1px solid #C4C4C4',
              borderRadius: '5px',
              fontSize: '16px',
              padding: '5px 10px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label
            htmlFor='habit-image'
            style={{
              color: '#959595',
              fontSize: '12px',
              fontWeight: '400',
            }}
          >
            Upload image (optional)
          </label>
          <input
            type='file'
            name='habit-image'
            id='habit-image'
            hidden
            accept='image/*'
            disabled={isAddField}
            onChange={(e) => {
              if (!isAddField) setHabitImage(e.target.files[0])
            }}
          />
          <label htmlFor='habit-image'>
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
            {habitImage ? 'File selected' : ''}
            {habitImage ? <FaCheckCircle /> : null}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label
            htmlFor='sub-fields'
            style={{
              color: '#959595',
              fontSize: '12px',
              fontWeight: '400',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p>Add tasks</p>
            <AiOutlinePlus
              style={{ fontSize: '16px', color: '#468AEF', cursor: 'pointer' }}
              onClick={() => {
                if (fieldToAdd) {
                  setTempFieldsList([
                    ...tempFieldsList,
                    {
                      id: new Date().getTime().toString(),
                      field: fieldToAdd,
                      color:
                        '#' +
                        (0x1000000 + Math.random() * 0xffffff)
                          .toString(16)
                          .substr(1, 6),
                    },
                  ])
                  setFieldsList([
                    ...fieldsList,
                    {
                      id: new Date().getTime().toString(),
                      field: fieldToAdd,
                      color:
                        '#' +
                        (0x1000000 + Math.random() * 0xffffff)
                          .toString(16)
                          .substr(1, 6),
                    },
                  ])
                  setFieldToAdd('')
                }
              }}
            />
          </label>
          <input
            type='text'
            name='sub-fields'
            id='sub-fields'
            maxLength='100'
            value={fieldToAdd}
            onChange={(e) => setFieldToAdd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (fieldToAdd) {
                  setTempFieldsList([
                    ...tempFieldsList,
                    {
                      id: new Date().getTime().toString(),
                      field: fieldToAdd,
                      color:
                        '#' +
                        (0x1000000 + Math.random() * 0xffffff)
                          .toString(16)
                          .substr(1, 6),
                    },
                  ])
                  setFieldsList([
                    ...fieldsList,
                    {
                      id: new Date().getTime().toString(),
                      field: fieldToAdd,
                      color:
                        '#' +
                        (0x1000000 + Math.random() * 0xffffff)
                          .toString(16)
                          .substr(1, 6),
                    },
                  ])
                  setFieldToAdd('')
                }
              }
            }}
            style={{
              height: '32px',
              border: '1px solid #C4C4C4',
              borderRadius: '5px',
              fontSize: '16px',
              padding: '5px 10px',
              outline: 'none',
            }}
          />
        </div>
        <div
          style={{
            display: `${fieldsList.length > 0 ? 'flex' : 'none'}`,
            flexDirection: 'column',
            maxHeight: '60px',
            overflow: 'auto',
            overflowX: 'hidden',
            border: '1px solid #c4c4c4',
            borderRadius: '6px',
            padding: '5px',
            paddingLeft: '10px',
            paddingBottom: '10px',
          }}
        >
          {fieldsList.map((item) => {
            return (
              <div className='field-to-add'>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#468aef',
                    width: '85%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.field}
                </p>
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label
              htmlFor='habit-start-date'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              Start Date
            </label>
            <DatePicker
              required={true}
              value={startDate}
              onChange={setStartDate}
              calendarAriaLabel='Toggle calendar'
              calendarIcon={<AiFillCalendar style={{ fontSize: '16px' }} />}
              selectsStart
              disabled={isAddField}
              format='dd-MM-y'
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label
              htmlFor='habit-end-date'
              style={{
                color: '#959595',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              End Date
            </label>
            <DatePicker
              required={true}
              value={endDate}
              onChange={setEndDate}
              calendarAriaLabel='Toggle calendar'
              calendarIcon={<AiFillCalendar style={{ fontSize: '16px' }} />}
              minDate={startDate > new Date() ? startDate : new Date()}
              disabled={isAddField}
              format='dd-MM-y'
              selectsEnd
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
