import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import WorkshopModal from '../Workshop/WorkshopModal'
import { FaEdit } from 'react-icons/fa'

export default function Workshop() {
  return (
    <WorkshopWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/edit/:workshopID'>
          <WorkshopModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addworkshop'>
          <WorkshopModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <WorkshopComponent value={value} />
        }}
      </WorkspaceConsumer>
    </WorkshopWrapper>
  )
}

function WorkshopComponent(props) {
  const { value } = props
  const param = useParams()

  const defaultImage =
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'

  const selectedSpace = value.workspaceElements.find(
    (item) => item.id === param.spaceKey
  )

  return (
    <div className='workshop-page'>
      <div className='storage'>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/addworkshop`}
        >
          <div className='add-new'>
            <AiOutlinePlus />
            <p>Add new Workshop</p>
          </div>
        </Link>
        {selectedSpace?.workshops?.map((workshop) => {
          return (
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${workshop.id}`}
            >
              <div className='workshop-card'>
                <div className='image-container'>
                  <img src={workshop.image || defaultImage} alt='workshop' />
                </div>

                <div className='card-footer'>
                  <div className='left'>
                    <h4 className='workshop-name'>
                      {workshop.title.length > 10
                        ? `${workshop.title.slice(0, 10)}...`
                        : workshop.title}
                    </h4>

                    <p style={{ fontSize: '10px', color: '#468AEF' }}>
                      {workshop.createdOn}
                    </p>
                  </div>
                  <div className='right'>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/edit/${workshop.id}`}
                    >
                      <div className='edit-btn'>
                        <FaEdit />
                      </div>
                    </Link>
                    <div className='delete-btn'>
                      <RiDeleteBin6Line
                        onClick={(e) => {
                          e.preventDefault()
                          value.deleteWorkshop(
                            param.id,
                            param.spaceKey,
                            workshop.id
                          )
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

const WorkshopWrapper = styled.section`
  .workshop-page {
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
  .workshop-card {
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
  .workshop-card:hover {
    transform: scale(1.04);
    border: 1px solid #0063ff;
  }
  .workshop-card .image-container {
    height: 80px;
    width: 100%;
    border-radius: 5px;
  }
  .workshop-card .image-container img {
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
  .card-footer .right {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .workshop-name {
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
  .card-footer .delete-btn,
  .card-footer .edit-btn {
    font-size: 16px;
    color: #c4c4c4;
    cursor: pointer;
  }
  .card-footer .delete-btn:hover {
    color: #f54848;
  }
  .card-footer .edit-btn:hover {
    color: #468aef;
  }
`
