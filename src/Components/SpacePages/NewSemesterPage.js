import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import SubjectModal from '../SubjectModal'
import { WorkspaceConsumer } from '../../Context'
import { CgArrowsExpandUpRight } from 'react-icons/cg'
import SubjectPdfModal from '../SubjectPdfModal'

export default function NewSemesterPage() {
  const param = useParams()
  return (
    <NewSemesterPageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/editsubject/:subjectID/readsubjectpdf'>
          <SubjectPdfModal />
        </Route>
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
                return displayItems.map((item) => {
                  if (item.subjects) {
                    return item.subjects.map((singleSubject) => {
                      let count = 0
                      return (
                        <div
                          className='subject-card'
                          key={singleSubject.subjectID}
                        >
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
                                count++
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Monday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              } else if (day.Tuesday) {
                                count++
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Tuesday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              } else if (day.Wednesday) {
                                count++
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Wednesday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              } else if (day.Thursday && count < 3) {
                                count++
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Thursday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              } else if (day.Friday && count < 3) {
                                count++
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Friday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              } else if (day.Saturday && count < 3) {
                                count++
                                return (
                                  <div className='single-day'>
                                    <p className='day'>Saturday</p>
                                    <p className='timing'>
                                      {day.startTime}-{day.endTime}
                                    </p>
                                  </div>
                                )
                              }

                              return (
                                <React.Fragment
                                  key={Math.floor(Math.random() * 100000)}
                                ></React.Fragment>
                              )
                            })}
                            <div className='see-more-option'>
                              {count >= 3 ? (
                                <Link
                                  to={`/workspace/${param.id}/details/${param.spaceKey}/editsubject/${singleSubject.subjectID}`}
                                >
                                  <p
                                    style={{
                                      color: '#468aef',
                                      fontSize: '12px',
                                    }}
                                  >
                                    see more
                                  </p>
                                </Link>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  return <div key={Math.floor(Math.random() * 100000)}></div>
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
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 70px;
    width: 100%;
    margin-top: -10px;
  }
  .top {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .my-subjects {
    font-size: 20px;
    font-weight: 400;
  }
  .add-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 143px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    border-radius: 6px;
    font-weight: 400;
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
    grid-template-columns: repeat(6, 1fr);
    gap: 35px;
  }
  .subject-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px 10px;
    height: 143px;
    background: #f2f4f8;
    border-radius: 6px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    flex-direction: column;
  }
  .subject-code {
    font-size: 10px;
    color: #468aef;
    font-weight: 400;
  }
  .subject-name {
    font-size: 12px;
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
    justify-content: space-between;
  }
  .day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    width: 70px;
    font-size: 12px;
    font-weight: 400;
    background: #fff;
    border-radius: 3px;
    color: #9cc4e8;
  }
  .timing {
    font-size: 12px;
    white-space: nowrap;
  }
  .see-more-option {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
`
