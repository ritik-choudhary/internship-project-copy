import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ItineraryModal from '../ResourceModals/ItineraryModal'

export default function Itinerary() {
  return (
    <ItineraryWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/edititinerary/:itineraryID'>
          <ItineraryModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/additinerary'>
          <ItineraryModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <ItineraryComponent value={value}></ItineraryComponent>
        }}
      </WorkspaceConsumer>
    </ItineraryWrapper>
  )
}

function ItineraryComponent(props) {
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
    <div className='itinerary-page'>
      <h1 className='itinerary-page-header'>All</h1>
      <div className='itinerary-container'>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/additinerary`}
        >
          <div className='add-new-btn'>
            <AiOutlinePlus />
            <p>Add new</p>
          </div>
        </Link>
        {resource?.itineraryList?.map((item) => {
          return (
            <div className='itinerary-card' key={item.id}>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/edititinerary/${item.id}`}
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
                    value.deleteItinerary(
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

const ItineraryWrapper = styled.section`
  .itinerary-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .itinerary-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .itinerary-container {
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
  .itinerary-card {
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
  .itinerary-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .itinerary-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .itinerary-card .delete-btn {
    color: #c4c4c4;
  }
  .itinerary-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
