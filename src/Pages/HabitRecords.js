import React from 'react'
import { Link, useParams, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import moment from 'moment'
import HabitTrackerModal from '../Components/HabitTrackerModal'

export default function SingleMoodboard() {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insidehabit/:habitID/addfield'>
          <HabitTrackerModal isAddField />
        </Route>
      </Switch>

      <WorkspaceConsumer>
        {(value) => {
          return <HabitRecordsComponent value={value}></HabitRecordsComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

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

  console.log(habit.status)

  const start = moment(habit.startDate).format('YYYY-MM-DD')
  const end = moment(habit.endDate).format('YYYY-MM-DD')

  const startTemp = new Date(start)
  const endTemp = new Date(end)

  const headingDateString = `${startTemp.toLocaleString('default', {
    weekday: 'short',
  })}, ${startTemp.getDate()}/${
    startTemp.getMonth() + 1
  } - ${endTemp.toLocaleString('default', {
    weekday: 'short',
  })}, ${endTemp.getDate()}/${endTemp.getMonth() + 1}`

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

  let totalCompleted = 0
  habit.status.map((item) => {
    return Object.keys(item).map((key) => {
      return item[key].map((singleDate) => {
        if (singleDate.completed) {
          return totalCompleted++
        }
        return <></>
      })
    })
  })

  const percentage = (
    (totalCompleted / (habit.fieldsList.length * daylist.length)) *
    100
  ).toFixed(2)

  return (
    <HabitRecordsWrapper dynamicWidth={percentage}>
      <div className='single-habit-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='single-habit-header'>
            <Link to='/'>
              <h3>thesocialcomment</h3>
            </Link>
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
                <Link to='/workspace'>
                  <h3
                    style={{
                      fontSize: '20px',
                      color: '#c4c4c4',
                      fontWeight: '400',
                    }}
                  >
                    {`My Workspace >`}
                    <span>&nbsp;</span>
                  </h3>
                </Link>
                <Link to={`/workspace/${param.id}/details`}>
                  <h3
                    style={{
                      fontSize: '20px',
                      color: '#c4c4c4',
                      fontWeight: '400',
                    }}
                  >
                    {workspaceName.length > 15
                      ? ` ${workspaceName.slice(0, 15)}... > `
                      : `${workspaceName} > `}
                    <span>&nbsp;</span>
                  </h3>
                </Link>
                <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
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
                </Link>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  {habit.title.length > 15
                    ? `${habit.title.slice(0, 50)}...`
                    : habit.title}
                </h3>
              </div>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insidehabit/${param.habitID}/addfield`}
              >
                <button className='add-field-btn'>Add Field</button>
              </Link>
            </div>
            <div className='line'></div>
          </header>
          <section className='habit-intro'>
            <h1 className='greeting'>Hey there, Hailey</h1>
            <div className='status'>
              <h3 className='time-period'>{headingDateString}</h3>
              <div className='status-bar'>
                <p>{percentage}% achieved</p>
              </div>
            </div>
          </section>
          <div className='storage-container'>
            <div className='storage'>
              <div className='row' style={{ display: 'flex' }}>
                <div className='date-col'>
                  Created on
                  <p style={{ color: '#C4C4C4', fontSize: '12px' }}>
                    {habit.createdOn}
                  </p>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${daylist.length},70px)`,
                    gap: '5px',
                    justifyContent: 'center',
                  }}
                >
                  {daylist.map((day) => {
                    const date = new Date(day)
                    let stringDay = `${date.toLocaleString('default', {
                      weekday: 'short',
                    })}`
                    return <div className='dynamic-col'>{stringDay}</div>
                  })}
                </div>
              </div>
              {habit.fieldsList.map((field) => {
                let completedCount = 0
                return (
                  <>
                    <div className='row' style={{ display: 'flex' }}>
                      <div className='col-1'>
                        <div
                          className='color'
                          style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '100%',
                            backgroundColor: `${field.color}`,
                          }}
                        ></div>
                        <p>{field.field}</p>
                      </div>
                      {habit.status.map((item) => {
                        if (Object.keys(item)[0] !== field.id) {
                          return <></>
                        }
                        return Object.keys(item).map((singleEntry) => {
                          return (
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${
                                  daylist.length + 1
                                },70px)`,
                                gap: '5px',
                                justifyContent: 'center',
                              }}
                            >
                              {item[singleEntry].map((singleDate) => {
                                if (singleDate.completed === true) {
                                  totalCompleted++

                                  return (
                                    <div
                                      onClick={() =>
                                        value.handleStatusOfHabit(
                                          param.id,
                                          param.spaceKey,
                                          param.habitID,
                                          singleDate,
                                          singleEntry
                                        )
                                      }
                                      className='sec-dynamic-col'
                                      style={{
                                        background: `${
                                          singleDate.completed
                                            ? field.color
                                            : '#e4e4e4'
                                        }`,
                                      }}
                                    ></div>
                                  )
                                } else {
                                  return (
                                    <div
                                      onClick={() =>
                                        value.handleStatusOfHabit(
                                          param.id,
                                          param.spaceKey,
                                          param.habitID,
                                          singleDate,
                                          singleEntry
                                        )
                                      }
                                      className='sec-dynamic-col'
                                      style={{
                                        background: `${
                                          singleDate.completed
                                            ? field.color
                                            : '#e4e4e4'
                                        }`,
                                      }}
                                    ></div>
                                  )
                                }
                              })}
                              {item[singleEntry].map((singleDate) => {
                                if (singleDate.completed === true) {
                                  completedCount++
                                }
                                return <></>
                              })}
                              <div className='single-habit-status'>
                                {completedCount}/{item[singleEntry].length}
                              </div>
                            </div>
                          )
                        })
                      })}
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </HabitRecordsWrapper>
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
  .add-field-btn {
    padding: 5px 10px 5px 10px;
    border-radius: 6px;
    background: #468aef;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .add-field-btn:hover {
    background: white;
    color: #468aef;
    border: 1px solid #468aef;
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
  .habit-intro {
    padding: 0px 150px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .greeting {
    font-size: 20px;
    font-weight: 400;
  }
  .status {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .time-period {
    font-weight: 400;
    font-size: 16px;
  }
  .status-bar {
    width: 100%;
    height: 20px;
    border: 1px solid #c4c4c4;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    position: relative;
    overflow: hidden;
  }
  .status-bar p {
    z-index: 0;
  }
  .status-bar::after {
    content: '';
    background: #468aef;
    position: absolute;
    width: ${(props) => props.dynamicWidth}%;
    height: 100%;
    left: 0px;
    border-radius: 20px;
    z-index: -1;
  }
  .single-habit-page .storage {
    display: grid;
    gap: 5px;
  }
  .date-col {
    padding: 10px;
    width: 150px;
    font-size: 14px;
    font-weight: 600;
    height: 50px;
  }

  .dynamic-col {
    margin: auto;
    color: #c4c4c4;
    font-size: 14px;
    font-weight: 600;
    height: 30px;
  }
  .col-1 {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 150px;
    font-size: 14px;
    font-weight: 600;
    height: 40px;
  }

  .sec-dynamic-col {
    height: 30px;
    width: 30px;
    margin: 0px auto;
    border-radius: 5px;
    cursor: pointer;
  }
  .storage-container {
    padding: 0px 0px 10px 0px;
    margin: 0px 150px;
    overflow: auto;
  }
  .single-habit-status {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c4c4c4;
  }
`
