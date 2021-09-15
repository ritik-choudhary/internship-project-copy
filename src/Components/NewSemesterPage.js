import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import SubjectModal from './SubjectModal'
import { WorkspaceConsumer } from '../Context'
import { CgArrowsExpandUpRight } from 'react-icons/cg'

export default function NewSemesterPage() {
  const param = useParams()
  return (
    <NewSemesterPageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/editsubject/:subjectID'>
          <SubjectModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addsubject'>
          <SubjectModal />
        </Route>
      </Switch>
      <div className='semester-page'>
        <div className='top'>
          <h3 className='my-subjects'>My Subjects</h3>
          <div className='storage'>
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/addsubject`}
            >
              <div className='add-new'>
                <AiOutlinePlus />
                <p>Add new</p>
              </div>
            </Link>
            <WorkspaceConsumer>
              {(value) => {
                const displayItems = value.workspaceElements.filter(
                  (item) =>
                    item.id === param.spaceKey && item.workspaceID === param.id
                )
                // console.log(displayItems)
                return displayItems.map((item) => {
                  if (item.subjects) {
                    return item.subjects.map((singleSubject) => {
                      //   console.log('singelsubject', singleSubject)
                      return (
                        <div className='subject-card'>
                          <div className='card-header'>
                            <div className='header-left'>
                              <p className='subject-code'>
                                {singleSubject.code}
                              </p>
                              <h4 className='subject-name'>
                                {singleSubject.name}
                              </h4>
                            </div>
                            <div className='header-right'>
                              <Link
                                to={`/workspace/${param.id}/details/${param.spaceKey}/editsubject/${singleSubject.subjectID}`}
                              >
                                <CgArrowsExpandUpRight
                                  style={{ color: '#468aef' }}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className='card-content'>
                            {singleSubject.timetable.map((day) => {
                              if (day.Monday) {
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Monday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }
                              if (day.Tuesday) {
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Tuesday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }
                              if (day.Wednesday) {
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Wednesday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }
                              if (day.Thursday) {
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Thursday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }
                              if (day.Friday) {
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Friday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }
                              if (day.Saturday) {
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Saturday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }
                              return <></>
                            })}
                          </div>
                        </div>
                      )
                    })
                  }
                })
              }}
            </WorkspaceConsumer>
          </div>
        </div>
      </div>
    </NewSemesterPageWrapper>
  )
}

const NewSemesterPageWrapper = styled.section`
  .semester-page {
    display: flex;
    flex-direction: column;
    padding: 10px 150px;
    padding-top: 0;
    gap: 70px;
    width: 100%;
  }
  .top {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .my-subjects {
    font-size: 20px;
    font-weight: 600;
  }
  .add-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 190px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .add-new svg {
    font-size: 36px;
  }
  .add-new:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .storage {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
  }
  .subject-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px 25px;
    height: 190px;
    background: #f2f4f8;
    border-radius: 10px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .subject-code {
    font-size: 12px;
    color: #468aef;
    font-weight: 400;
  }
  .subject-name {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }
  .header-right {
    font-size: 20px;
    cursor: pointer;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .single-day {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .day {
    height: 22px;
    width: 120px;
    font-size: 14px;
    font-weight: 600;
    background: #fff;
    text-align: center;
    border-radius: 3px;
  }
  .timing {
    font-size: 12px;
    white-space: nowrap;
  }
`
