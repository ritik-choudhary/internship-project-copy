import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import CommitteeModal from '../ResourceModals/CommitteeModal'

export default function Committee() {
  return (
    <CommitteeWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/editcommittee/:committeeID'>
          <CommitteeModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/addcommittee'>
          <CommitteeModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <CommitteeComponent value={value}></CommitteeComponent>
        }}
      </WorkspaceConsumer>
    </CommitteeWrapper>
  )
}

function CommitteeComponent(props) {
  const param = useParams()
  const { value } = props
  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const workshop = space.workshops.find((item) => item.id === param.workshopID)

  const resource = workshop.resources.find(
    (item) => item.id === param.resourceID
  )
  return (
    <div className='committee-page'>
      <h1 className='committee-page-header'>All</h1>
      <div className='committee-container'>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/addcommittee`}
        >
          <div className='add-new-btn'>
            <AiOutlinePlus />
            <p>Add new</p>
          </div>
        </Link>
        {resource?.committeeList?.map((item) => {
          return (
            <div className='committee-card' key={item.id}>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/editcommittee/${item.id}`}
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
                <RiDeleteBin6Line
                  onClick={() =>
                    value.deleteCommittee(
                      param.id,
                      param.spaceKey,
                      param.workshopID,
                      param.resourceID,
                      item.id
                    )
                  }
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const CommitteeWrapper = styled.section`
  .committee-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .committee-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .committee-container {
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
  .committee-card {
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
  .committee-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .committee-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .committee-card .delete-btn {
    color: #c4c4c4;
  }
  .committee-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
