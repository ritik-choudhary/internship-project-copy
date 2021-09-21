import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import MeetingModal from '../ResourceModals/MeetingModal'

export default function MeetingNotes() {
  return (
    <MeetingNotesWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/editmeeting/:meetingID'>
          <MeetingModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addmeeting'>
          <MeetingModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <MeetingNotesComponent value={value}></MeetingNotesComponent>
        }}
      </WorkspaceConsumer>
    </MeetingNotesWrapper>
  )
}

function MeetingNotesComponent(props) {
  const param = useParams()
  const { value } = props
  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)
  return (
    <div className='meeting-page'>
      <h1 className='meeting-page-header'>All</h1>
      <div className='meeting-container'>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addmeeting`}
        >
          <div className='add-new-btn'>
            <AiOutlinePlus />
            <p>Add new</p>
          </div>
        </Link>
        {resource?.meetings?.map((item) => {
          return (
            <div className='meeting-card' key={item.id}>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/editmeeting/${item.id}`}
              >
                <div className='card-info'>
                  <h4 className='title'>
                    {item.title.length > 12
                      ? `${item.title.slice(0, 12)}...`
                      : item.title}
                  </h4>
                  <p className='created-on'>{item.createdOn}</p>
                </div>
              </Link>
              <div className='delete-btn'>
                <RiDeleteBin6Line />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MeetingNotesWrapper = styled.section`
  .meeting-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .meeting-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .meeting-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
    border-radius: 10px;
  }
  .meeting-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    height: 56px;
    background: #f2f4f8;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .card-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .meeting-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .meeting-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .meeting-card .delete-btn {
    color: #c4c4c4;
  }
  .meeting-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
