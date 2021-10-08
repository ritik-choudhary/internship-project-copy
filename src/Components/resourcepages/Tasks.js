import React from 'react'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import TasksModal from '../ResourceModals/TasksModal'
import TaskPdfModal from '../ResourceModals/TaskPdfModal'

export default function Tasks(props) {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/sharetask/readpdf'>
          <TaskPdfModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addtask/readpdf'>
          <TaskPdfModal />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/sharetask/:taskID'>
          <TasksModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/edittask/:taskID'>
          <TasksModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addtask'>
          <TasksModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <TasksComponent value={value} {...props}></TasksComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function TasksComponent(props) {
  const { value, isSharing } = props
  const param = useParams()

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)

  return (
    <>
      {isSharing ? (
        <TasksPageWrapper>
          <div className='tasks-page'>
            <h1 className='tasks-header'>{resource.createdOn}</h1>
            <div className='tasks-container'>
              {resource?.tasks?.map((item) => {
                let count = 0
                let pdfCount = 0
                return (
                  <div
                    className={
                      item.completed
                        ? 'task-completed-bg single-task'
                        : 'single-task'
                    }
                    key={item.id}
                  >
                    <div className='top'>
                      <div className='left'>
                        <input
                          type='checkbox'
                          name={item.title}
                          id={item.id}
                          checked={item.completed}
                        />
                        <label
                          htmlFor={item.id}
                          className={item.completed ? 'task-completed' : ''}
                        >
                          {item.title > 15
                            ? `${item.title.slice(0, 12)}...`
                            : item.title}
                        </label>
                      </div>
                      <div className='right'>
                        <Link
                          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharetask/${item.id}`}
                        >
                          <FiEdit className='edit-btn' />
                        </Link>
                        <RiDeleteBin6Line className='delete-btn' />
                      </div>
                    </div>
                    <div className='middle'>
                      <p className='created-on'>Created on: {item.createdOn}</p>
                      <p className='due-date'>
                        {item.dueDate ? `Due: ${item.dueDate}` : null}
                      </p>
                    </div>
                    <div className='bottom'>
                      <p className='description'>
                        {item?.description.length > 600
                          ? `${item.description.slice(0, 600)}...`
                          : item.description}
                      </p>
                      <div className='links-container'>
                        {item.links.map((link) => {
                          count++
                          if (count > 3) {
                            return <></>
                          }
                          return (
                            <div className='link' key={count}>
                              <a
                                href={link}
                                target='_blank'
                                rel='noreferrer noopener'
                                style={{
                                  color: 'black',
                                  fontSize: '12px',
                                  fontWeight: '400',
                                  width: '80%',
                                }}
                              >
                                Link {count}
                              </a>
                              <AiOutlineClose style={{ color: '#f54848' }} />
                            </div>
                          )
                        })}
                        {item.links.length > 3 ? (
                          <div className='see-more-btn'>
                            <Link
                              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharetask/${item.id}`}
                            >
                              See more
                            </Link>
                          </div>
                        ) : null}
                      </div>
                      <div className='pdf-container'>
                        {item.pdfList.map((pdf) => {
                          pdfCount++
                          if (pdfCount > 3) {
                            return <></>
                          }
                          const linkToPdf = item.pdfPreview.find(
                            (item) => item.previewId === pdf.pdfId
                          )
                          return (
                            <Link
                              to={{
                                pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharetask/readpdf`,
                                state: { src: linkToPdf?.source },
                              }}
                              key={pdf.pdfId}
                            >
                              <div className='pdf'>
                                <p style={{ width: '80%' }}>Pdf {pdfCount}</p>
                                <AiOutlineClose style={{ color: '#f54848' }} />
                              </div>
                            </Link>
                          )
                        })}
                        {item.pdfList.length > 3 ? (
                          <div className='see-more-btn'>
                            <Link
                              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharetask/${item.id}`}
                            >
                              See more
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TasksPageWrapper>
      ) : (
        <TasksPageWrapper>
          <div className='tasks-page'>
            <h1 className='tasks-header'>{resource.createdOn}</h1>
            <div className='tasks-container'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addtask`}
              >
                <div className='add-new-btn'>
                  <AiOutlinePlus />
                  <p>Add new task</p>
                </div>
              </Link>
              {resource?.tasks?.map((item) => {
                let count = 0
                let pdfCount = 0
                return (
                  <div
                    className={
                      item.completed
                        ? 'task-completed-bg single-task'
                        : 'single-task'
                    }
                    key={item.id}
                  >
                    <div className='top'>
                      <div className='left'>
                        <input
                          type='checkbox'
                          name={item.title}
                          id={item.id}
                          checked={item.completed}
                          onChange={(e) =>
                            value.taskManipulation(
                              param.id,
                              param.spaceKey,
                              param.clubID,
                              param.resourceID,
                              item.id
                            )
                          }
                        />
                        <label
                          htmlFor={item.id}
                          className={item.completed ? 'task-completed' : ''}
                        >
                          {item.title > 15
                            ? `${item.title.slice(0, 12)}...`
                            : item.title}
                        </label>
                      </div>
                      <div className='right'>
                        <Link
                          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/edittask/${item.id}`}
                        >
                          <FiEdit className='edit-btn' />
                        </Link>
                        <RiDeleteBin6Line
                          className='delete-btn'
                          onClick={(e) =>
                            value.deleteTask(
                              param.id,
                              param.spaceKey,
                              param.clubID,
                              param.resourceID,
                              item.id
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className='middle'>
                      <p className='created-on'>Created on: {item.createdOn}</p>
                      <p className='due-date'>
                        {item.dueDate ? `Due: ${item.dueDate}` : null}
                      </p>
                    </div>
                    <div className='bottom'>
                      <p className='description'>
                        {item?.description.length > 600
                          ? `${item.description.slice(0, 600)}...`
                          : item.description}
                      </p>
                      <div className='links-container'>
                        {item.links.map((link) => {
                          count++
                          if (count > 3) {
                            return <></>
                          }
                          return (
                            <div className='link' key={count}>
                              <a
                                href={link}
                                target='_blank'
                                rel='noreferrer noopener'
                                style={{
                                  color: 'black',
                                  fontSize: '12px',
                                  fontWeight: '400',
                                  width: '80%',
                                }}
                              >
                                Link {count}
                              </a>
                              <AiOutlineClose style={{ color: '#f54848' }} />
                            </div>
                          )
                        })}
                        {item.links.length > 3 ? (
                          <div className='see-more-btn'>
                            <Link
                              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/edittask/${item.id}`}
                            >
                              See more
                            </Link>
                          </div>
                        ) : null}
                      </div>
                      <div className='pdf-container'>
                        {item.pdfList.map((pdf) => {
                          pdfCount++
                          if (pdfCount > 3) {
                            return <></>
                          }
                          const linkToPdf = item.pdfPreview.find(
                            (item) => item.previewId === pdf.pdfId
                          )
                          return (
                            <Link
                              to={{
                                pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addtask/readpdf`,
                                state: { src: linkToPdf?.source },
                              }}
                              key={pdf.pdfId}
                            >
                              <div className='pdf'>
                                <p style={{ width: '80%' }}>Pdf {pdfCount}</p>
                                <AiOutlineClose style={{ color: '#f54848' }} />
                              </div>
                            </Link>
                          )
                        })}
                        {item.pdfList.length > 3 ? (
                          <div className='see-more-btn'>
                            <Link
                              to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/edittask/${item.id}`}
                            >
                              See more
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TasksPageWrapper>
      )}
    </>
  )
}

const TasksPageWrapper = styled.section`
  .tasks-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .tasks-header {
    font-size: 20px;
    font-weight: 600;
    color: #468aef;
  }
  .tasks-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .add-new-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 56px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .single-task {
    padding: 10px 0px;
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    border-bottom: 1px solid #e5e5e5;
  }
  .single-task .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .single-task .top .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .single-task .top .left input {
    height: 20px;
    width: 20px;
  }
  .single-task .top .left label {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }
  .single-task .top .right {
    display: flex;
    gap: 10px;
    color: #c4c4c4;
  }
  .single-task .top .right a {
    font-size: 16px;
    color: #c4c4c4;
  }
  .single-task .top .right .edit-btn:hover {
    cursor: pointer;
    color: #3e77f1;
  }
  .single-task .top .right .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
  .checkbox input {
    height: 20px;
    width: 20px;
  }
  .single-task .middle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding-left: 30px;
  }
  .single-task .middle .created-on {
    color: #c4c4c4;
  }
  .single-task .middle .due-date {
    color: #ff5c00;
  }
  .single-task .bottom {
    padding-left: 30px;
  }
  .single-task .bottom .description {
    padding-bottom: 10px;
  }
  .task-completed {
    text-decoration: line-through;
  }
  .task-completed-bg {
    opacity: 0.5;
  }
  .links-container,
  .pdf-container {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    padding-bottom: 5px;
  }
  .single-task .link,
  .single-task .pdf {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    height: 20px;
    background: #c8e1ff;
    border-radius: 5px;
    font-size: 12px;
    gap: 5px;
    padding: 0 5px;
    color: black;
    font-weight: 400;
  }
  .single-task .link:hover,
  .single-task .pdf:hover {
    transform: scale(1.05);
  }
  .see-more-btn a {
    text-decoration: underline;
    font-weight: 400;
    font-size: 12px;
  }
`
