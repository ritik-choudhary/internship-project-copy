import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import SubjectModal from '../NewsemesterComponents/SubjectModal'
import { WorkspaceConsumer } from '../../Context'
import SubjectPdfModal from '../NewsemesterComponents/SubjectPdfModal'

export default function NewSemesterPage() {
  const param = useParams()
  return (
    <NewSemesterPageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/editsubject/:subjectID/readsubjectdoc'>
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
                <AiOutlinePlus style={{ fontWeight: '400' }} />
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
                              <h4 className='subject-name'>
                                {singleSubject.name}
                              </h4>
                              <p className='subject-code'>
                                {singleSubject.code}
                              </p>
                            </div>
                          </div>
                          <div className='card-content'>
                            <div className='timetable'>
                              {singleSubject.timetable.map((day) => {
                                if (day.Monday) {
                                  count++
                                  return (
                                    <div className='single-day'>
                                      <p
                                        className='day'
                                        style={{ background: '#ffd2d9' }}
                                      >
                                        Monday
                                      </p>
                                      <p className='timing'>
                                        {day.startTime}-{day.endTime}
                                      </p>
                                    </div>
                                  )
                                } else if (day.Tuesday) {
                                  count++
                                  return (
                                    <div className='single-day'>
                                      <p
                                        className='day'
                                        style={{ background: '#81e8e8' }}
                                      >
                                        Tuesday
                                      </p>
                                      <p className='timing'>
                                        {day.startTime}-{day.endTime}
                                      </p>
                                    </div>
                                  )
                                } else if (day.Wednesday) {
                                  count++
                                  return (
                                    <div className='single-day'>
                                      <p
                                        className='day'
                                        style={{ background: '#ffd487' }}
                                      >
                                        Wednesday
                                      </p>
                                      <p className='timing'>
                                        {day.startTime}-{day.endTime}
                                      </p>
                                    </div>
                                  )
                                } else if (day.Thursday && count < 3) {
                                  count++
                                  return (
                                    <div className='single-day'>
                                      <p
                                        className='day'
                                        style={{ background: '#8af3f3' }}
                                      >
                                        Thursday
                                      </p>
                                      <p className='timing'>
                                        {day.startTime}-{day.endTime}
                                      </p>
                                    </div>
                                  )
                                } else if (day.Friday && count < 3) {
                                  count++
                                  return (
                                    <div className='single-day'>
                                      <p
                                        className='day'
                                        style={{ background: '#f3cc68' }}
                                      >
                                        Friday
                                      </p>
                                      <p className='timing'>
                                        {day.startTime}-{day.endTime}
                                      </p>
                                    </div>
                                  )
                                } else if (day.Saturday && count < 3) {
                                  count++
                                  return (
                                    <div className='single-day'>
                                      <p
                                        className='day'
                                        style={{ background: '#97ec97' }}
                                      >
                                        Saturday
                                      </p>
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
                            </div>

                            <Link
                              to={`/workspace/${param.id}/details/${param.spaceKey}/editsubject/${singleSubject.subjectID}`}
                            >
                              <div className='see-more-option'>
                                <p
                                  style={{
                                    color: '#468aef',
                                    fontSize: '12px',
                                  }}
                                >
                                  see more
                                </p>
                              </div>
                            </Link>
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
    gap: 10px;
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
    overflow: hidden;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .header-left {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .subject-code {
    font-size: 10px;
    color: #468aef;
    font-weight: 400;
  }
  .subject-name {
    font-size: 12px;
    font-weight: 400;
    text-transform: capitalize;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .timetable {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
    border-radius: 3px;
    color: white;
  }
  .timing {
    font-size: 11px;
    white-space: nowrap;
  }
  .see-more-option {
    display: flex;
    justify-content: center;
    background: #d8e2f7;
    margin: 0px -10px -10px -10px;
    padding: 5px 0px;
    cursor: pointer;
  }
  .see-more-option:hover {
    text-decoration: underline;
  }
`
