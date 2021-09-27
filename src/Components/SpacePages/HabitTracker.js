import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import HabitTrackerModal from '../HabitTrackerModal'

export default function HabitTracker() {
  return (
    <HabitTrackerWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/addhabittracker'>
          <HabitTrackerModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <HabitTrackerComponent value={value} />
        }}
      </WorkspaceConsumer>
    </HabitTrackerWrapper>
  )
}

function HabitTrackerComponent(props) {
  const { value } = props
  const param = useParams()

  const defaultImage =
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'

  const selectedSpace = value.workspaceElements.find(
    (item) => item.id === param.spaceKey
  )

  return (
    <div className='habit-tracker-page'>
      <div className='storage'>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/addhabittracker`}
        >
          <div className='add-new'>
            <AiOutlinePlus />
            <p>Add new Habit</p>
          </div>
        </Link>
        {selectedSpace?.habits?.map((habit) => {
          return (
            <div className='habit-card'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insidehabit/${habit.id}`}
              >
                <div className='image-container'>
                  <img src={habit.image || defaultImage} alt='habit' />
                </div>
              </Link>
              <div className='card-footer'>
                <div className='left'>
                  <Link
                    to={`/workspace/${param.id}/details/${param.spaceKey}/insidehabit/${habit.id}`}
                  >
                    <h4 className='habit-name'>
                      {habit.title.length > 10
                        ? `${habit.title.slice(0, 10)}...`
                        : habit.title}
                    </h4>
                  </Link>
                  <p style={{ fontSize: '10px', color: '#468AEF' }}>
                    {habit.createdOn}
                  </p>
                </div>
                <div className='right'>
                  <div className='delete-btn'>
                    <RiDeleteBin6Line
                      onClick={(e) =>
                        value.deleteHabit(param.id, param.spaceKey, habit.id)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const HabitTrackerWrapper = styled.section`
  .habit-tracker-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 70px;
    width: 100%;
  }
  .storage {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 35px;
    min-height: 30vh;
  }
  .add-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 140px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .add-new p {
    text-align: center;
    font-size: 13px;
    font-weight: 400;
  }
  .add-new svg {
    font-size: 30px;
    font-weight: 400;
  }
  .add-new:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .habit-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 10px;
    height: 140px;
    background: #f2f4f8;
    border-radius: 6px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .habit-card:hover {
    transform: scale(1.04);
    border: 1px solid #0063ff;
  }
  .habit-card .image-container {
    height: 80px;
    width: 100%;
    border-radius: 5px;
  }
  .habit-card .image-container img {
    object-fit: cover;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-footer .left {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .habit-name {
    font-size: 14px;
    font-weight: 400;
    color: #8d8a8a;
    text-transform: capitalize;
  }
  .card-footer p {
    font-size: 14px;
    font-weight: 400;
    color: #c4c4c4;
  }
  .card-footer .delete-btn {
    font-size: 16px;
    color: #c4c4c4;
    cursor: pointer;
  }
  .card-footer .delete-btn:hover {
    color: #f54848;
  }
`
