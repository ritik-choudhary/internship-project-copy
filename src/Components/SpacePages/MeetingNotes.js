import React from 'react'
import { WorkspaceConsumer } from '../../Context'
import styled from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import MeetingNotesModal from '../MeetingNotesComponents/MeetingNotesModal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import MeetingPdfModal from '../MeetingNotesComponents/MeetingPdfModal'

export default function MeetingNotes() {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/addmeetingnotes/readpdf'>
          <MeetingPdfModal />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/editmeetingnotes/:meetingNotesID'>
          <MeetingNotesModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addmeetingnotes'>
          <MeetingNotesModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <MeetingNotesComponent value={value}></MeetingNotesComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function MeetingNotesComponent(props) {
  const { value } = props
  const param = useParams()

  const selectedSpace = value.workspaceElements.find(
    (item) => item.id === param.spaceKey
  )

  return (
    <MeetingNotesWrapper>
      <div className='meeting-notes-page'>
        <h3>All</h3>
        <div className='storage'>
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/addmeetingnotes`}
          >
            <div className='add-new'>
              <AiOutlinePlus />
              <p>Add new</p>
            </div>
          </Link>
          {selectedSpace?.meetingNotes?.map((item) => {
            return (
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/editmeetingnotes/${item.id}`}
              >
                <div className='meeting-notes-card'>
                  <div className='top'>
                    <p className='title'>{item.title}</p>
                  </div>
                  <div className='bottom'>
                    <p className='created-on'>{item.createdOn}</p>
                    <div className='delete-btn'>
                      <RiDeleteBin6Line
                        onClick={(e) => {
                          e.preventDefault()
                          value.deleteMeetingNotes(
                            param.id,
                            param.spaceKey,
                            item.id
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </MeetingNotesWrapper>
  )
}

const MeetingNotesWrapper = styled.section`
  .meeting-notes-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    padding-top: 0;
    width: 100%;
  }
  .meeting-notes-page h3 {
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
  }
  .add-new {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 56px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 5px;
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
  .meeting-notes-card {
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    height: 100%;
    background: #f2f4f8;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .meeting-notes-card:hover {
    transform: translateY(-3px);
  }
  .meeting-notes-card .title {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }
  .meeting-notes-card .bottom {
    display: flex;
    justify-content: space-between;
  }
  .meeting-notes-card .created-on {
    color: #c4c4c4;
  }
  .meeting-notes-card .bottom .delete-btn {
    color: #c4c4c4;
    font-size: 16px;
  }
  .meeting-notes-card .bottom .delete-btn:hover {
    color: #f54848;
    cursor: pointer;
  }
`
