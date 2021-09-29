import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link, useParams, useHistory } from 'react-router-dom'
import { AiOutlineClose, AiOutlinePlus, AiFillCalendar } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FaCheckCircle } from 'react-icons/fa'
import DatePicker from 'react-date-picker'
import { Images } from '../assets/DefaultImage'

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

  const { value } = props
  const param = useParams()
  const history = useHistory()

  // const disablePastDate = () => {
  //   const today = new Date()
  //   const dd = String(today.getDate() + 1).padStart(2, '0')
  //   const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  //   const yyyy = today.getFullYear()
  //   return yyyy + '-' + mm + '-' + dd
  // }

  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  // const [createdOn, setCreatedOn] = useState(date)
  const [habitImage, setHabitImage] = useState()
  const [preview, setPreview] = useState(Images[randomIndex])
  const [nameOfHabit, setNameOfHabit] = useState()
  const [fieldsList, setFieldsList] = useState([])
  const [fieldToAdd, setFieldToAdd] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  // const [status, setStatus] = useState([])

  useEffect(() => {
    if (habitImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(habitImage)
    }
  }, [habitImage])

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     const start = moment(startDate).format('YYYY-MM-DD')
  //     const end = moment(endDate).format('YYYY-MM-DD')

  //     var getDaysArray = function (start, end) {
  //       for (
  //         var arr = [], dt = new Date(start);
  //         dt <= end;
  //         dt.setDate(dt.getDate() + 1)
  //       ) {
  //         arr.push(new Date(dt))
  //       }
  //       return arr
  //     }

  //     var daylist = getDaysArray(new Date(start), new Date(end))
  //     daylist.map((v) => v.toISOString().slice(0, 10)).join('')

  //     fieldsList.map((field) => {
  //       daylist.map((singleDate) => {
  //         setStatus([...status, { field: { singleDate: false } }])
  //       })
  //     })
  //   }
  // }, [startDate, endDate, fieldsList])

  // console.log(status)

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
          Add new habit
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
          gap: '20px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          value.addNewHabit(param.id, param.spaceKey, {
            id: new Date().getTime().toString(),
            title: nameOfHabit,
            createdOn: date,
            image: preview,
            fieldsList: fieldsList,
            startDate: startDate,
            endDate: endDate,
          })
          history.push(`/workspace/${param.id}/details/${param.spaceKey}`)
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
            value={nameOfHabit}
            onChange={(e) => setNameOfHabit(e.target.value)}
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
            Upload image
          </label>
          <input
            type='file'
            name='habit-image'
            id='habit-image'
            hidden
            accept='image/*'
            onChange={(e) => setHabitImage(e.target.files[0])}
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
                  setFieldsList([...fieldsList, fieldToAdd])
                  setFieldToAdd('')
                }
              }}
            />
          </label>
          <input
            type='text'
            name='sub-fields'
            id='sub-fields'
            value={fieldToAdd}
            onChange={(e) => setFieldToAdd(e.target.value)}
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
          }}
        >
          {fieldsList.map((item) => {
            return (
              <div className='field-to-add'>
                <p style={{ fontSize: '12px' }}>{item}</p>
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
            {/* <input
              required
              type='date'
              name='habit-start-date'
              id='habit-start-date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                height: '32px',
                border: '1px solid #C4C4C4',
                borderRadius: '5px',
                fontSize: '16px',
                padding: '5px 10px',
                outline: 'none',
              }}
            /> */}
            <DatePicker
              required={true}
              value={startDate}
              onChange={setStartDate}
              calendarAriaLabel='Toggle calendar'
              calendarIcon={<AiFillCalendar style={{ fontSize: '16px' }} />}
              selectsStart
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
            {/* <input
              required
              type='date'
              name='habit-end-date'
              id='habit-end-date'
              value={endDate}
              min={disablePastDate()}
              onChange={(e) => {
                setEndDate(e.target.value)
              }}
              style={{
                height: '32px',
                border: '1px solid #C4C4C4',
                borderRadius: '5px',
                fontSize: '16px',
                padding: '5px 10px',
                outline: 'none',
              }}
            /> */}
            <DatePicker
              required={true}
              value={endDate}
              onChange={setEndDate}
              calendarAriaLabel='Toggle calendar'
              calendarIcon={<AiFillCalendar style={{ fontSize: '16px' }} />}
              minDate={startDate}
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
