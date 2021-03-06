import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import VenueDetailsModal from '../ResourceModals/VenueDetailsModal'

export default function VenueDetails(props) {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/sharevenueDetails/:venueDetailsID'>
          <VenueDetailsModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/editvenueDetails/:venueDetailsID'>
          <VenueDetailsModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/addvenueDetails'>
          <VenueDetailsModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <VenueDetailsComponent
              value={value}
              {...props}
            ></VenueDetailsComponent>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

function VenueDetailsComponent(props) {
  const param = useParams()
  const { value, isSharing } = props
  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const workshop = space.workshops.find((item) => item.id === param.workshopID)

  const resource = workshop.resources.find(
    (item) => item.id === param.resourceID
  )
  return (
    <>
      {isSharing ? (
        <VenueDetailsWrapper>
          <div className='venueDetails-page'>
            <h1 className='venueDetails-page-header'>All</h1>
            <div className='venueDetails-container'>
              {resource?.venueDetailsList?.map((item) => {
                return (
                  <div className='venueDetails-card' key={item.id}>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/sharevenueDetails/${item.id}`}
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
        </VenueDetailsWrapper>
      ) : (
        <VenueDetailsWrapper>
          <div className='venueDetails-page'>
            <h1 className='venueDetails-page-header'>All</h1>
            <div className='venueDetails-container'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/addvenueDetails`}
              >
                <div className='add-new-btn'>
                  <AiOutlinePlus />
                  <p>Add new</p>
                </div>
              </Link>
              {resource?.venueDetailsList?.map((item) => {
                return (
                  <div className='venueDetails-card' key={item.id}>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/editvenueDetails/${item.id}`}
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
                          value.deleteVenueDetails(
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
        </VenueDetailsWrapper>
      )}
    </>
  )
}

const VenueDetailsWrapper = styled.section`
  .venueDetails-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .venueDetails-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .venueDetails-container {
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
  .venueDetails-card {
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
  .venueDetails-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .venueDetails-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .venueDetails-card .delete-btn {
    color: #c4c4c4;
  }
  .venueDetails-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
