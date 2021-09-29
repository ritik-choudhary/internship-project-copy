import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import moment from 'moment'

export default function SingleMoodboard() {
  return (
    <HabitRecordsWrapper>
      <WorkspaceConsumer>
        {(value) => {
          return <HabitRecordsComponent value={value}></HabitRecordsComponent>
        }}
      </WorkspaceConsumer>
    </HabitRecordsWrapper>
  )
}

// function getDifferenceInDays(date1, date2) {
//   const diffInMs = Math.abs(date2 - date1)
//   return diffInMs / (1000 * 60 * 60 * 24)
// }

function HabitRecordsComponent(props) {
  const { value } = props
  const param = useParams()

  const workspaceName = value.workspaceList.find(
    (item) => item.id === param.id
  ).title

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const habit = space.habits.find((item) => item.id === param.habitID)

  //   const days = getDifferenceInDays(habit.startDate, habit.endDate)
  //   console.log('days', days)

  const start = moment(habit.startDate).format('YYYY-MM-DD')
  const end = moment(habit.endDate).format('YYYY-MM-DD')

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

  var daylist = getDaysArray(new Date(start), new Date(end))
  daylist.map((v) => v.toISOString().slice(0, 10)).join('')

  return (
    <div className='single-habit-page'>
      <Sidebar />
      <div className='page-container'>
        <div className='single-habit-header'>
          <h3>thesocialcomment</h3>
          <div className='right-header'>
            <FaBell className='bell-icon' />
            <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
              <div className='single-habit-back-btn'>
                <RiArrowGoBackFill /> Back
              </div>
            </Link>
          </div>
        </div>
        <header className='habit-title-container'>
          <div className='title'>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  color: '#c4c4c4',
                  fontWeight: '400',
                }}
              >
                {`My Workspace > ${
                  workspaceName.length > 15
                    ? ` ${workspaceName.slice(0, 15)}...`
                    : workspaceName
                } > `}
                <span>&nbsp;</span>
              </h3>
              <h3
                style={{
                  color: '#c4c4c4',
                  fontSize: '20px',
                  fontWeight: '400',
                }}
              >
                {`${space.title} > `}
                <span>&nbsp;</span>
              </h3>
              <h3
                className='animation-title'
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                {habit.title.length > 15
                  ? `${habit.title.slice(0, 50)}...`
                  : habit.title}
              </h3>
            </div>
          </div>
          <div className='line'></div>
        </header>
        <div className='storage-container'>
          <div className='storage'>
            <div
              className='row'
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${
                  habit.fieldsList.length + 2
                },200px)`,
              }}
            >
              <div className='date-col'>Date</div>
              <div className='habit-title-col'>
                <p>{habit.title}</p>
                <p style={{ color: '#C4C4C4', fontSize: '12px' }}>
                  {habit.createdOn}
                </p>
              </div>

              {habit.fieldsList.map((field) => {
                return (
                  <div className='dynamic-col'>
                    {field.length > 10 ? `${field.slice(0, 10)}...` : field}
                  </div>
                )
              })}
            </div>
            {daylist.map((item) => {
              const date = new Date(item)
              let stringDate = `${date.getDate()} ${date.toLocaleString(
                'default',
                { month: 'short' }
              )}, ${date.getFullYear()}`
              return (
                <div
                  className='row'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${
                      habit.fieldsList.length + 2
                    },200px)`,
                  }}
                >
                  <div className='col-1'>{stringDate}</div>
                  <div className='col-2'>
                    <input type='checkbox' name='' id='' />
                  </div>
                  {habit.fieldsList.map((field) => {
                    return (
                      <div className='sec-dynamic-col'>
                        <input type='checkbox' name='' id='' />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const HabitRecordsWrapper = styled.section`
  .single-habit-page {
    font-family: 'Open Sans', sans-serif;
    height: 100vh;
    display: flex;
    overflow-x: hidden;
  }
  .single-habit-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .single-habit-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .single-habit-header h3 {
    color: white;
    margin-left: -130px;
  }
  .right-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .bell-icon {
    color: #ffca10;
  }
  .single-habit-back-btn {
    padding: 10px 20px;
    background: #0e1f3e;
    color: white;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 5px;
    font-weight: 400;
    position: relative;
    overflow: hidden;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .single-habit-back-btn:hover {
    transform: scale(1.05);
  }
  .habit-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .habit-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .habit-title-container .title div {
    display: flex;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .animation-title {
    animation: slide-in 0.5s ease-in-out;
  }
  @keyframes slide-in {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  .single-habit-page .storage {
    display: grid;
  }
  .date-col {
    background: #f2f4f8;
    padding: 20px;
    border-radius: 6px 0px 0px 6px;
    border-right: 1px solid #c4c4c4;
    font-size: 14px;
    font-weight: 600;
  }
  .habit-title-col {
    background: #f2f4f8;
    padding: 20px;
    border-right: 1px solid #c4c4c4;
    font-size: 14px;
    font-weight: 600;
  }
  .dynamic-col {
    background: #f2f4f8;
    padding: 20px;
    border-right: 1px solid #c4c4c4;
    font-size: 14px;
    font-weight: 600;
  }
  .col-1 {
    padding: 20px;
    border-right: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;
    font-size: 14px;
    font-weight: 600;
  }
  .col-2 {
    padding: 20px;
    border-right: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;
  }
  .col-2 input {
    height: 20px;
    width: 20px;
  }
  .sec-dynamic-col {
    padding: 20px;
    border-right: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;
  }
  .sec-dynamic-col input {
    height: 20px;
    width: 20px;
  }
  .storage-container {
    padding: 10px 0px;
    margin: 0px 150px;
    overflow: auto;
  }
`
