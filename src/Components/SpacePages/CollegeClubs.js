import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import ClubModal from '../Club/ClubModal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'

export default function CollegeClubs() {
  const defaultImage =
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'
  const param = useParams()

  return (
    <CollegeClubsWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/editclub/:clubID'>
          <ClubModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addclub'>
          <ClubModal />
        </Route>
      </Switch>
      <div className='clubs-page'>
        <div className='storage'>
          <Link to={`/workspace/${param.id}/details/${param.spaceKey}/addclub`}>
            <div className='add-new'>
              <AiOutlinePlus />
              <p>Add new club</p>
            </div>
          </Link>
          <WorkspaceConsumer>
            {(value) => {
              const displayItems = value.workspaceElements.filter(
                (item) =>
                  item.id === param.spaceKey && item.workspaceID === param.id
              )
              return displayItems.map((item) => {
                if (item.clubs) {
                  return item.clubs.map((club) => {
                    return (
                      <Link
                        to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${club.id}`}
                      >
                        <div className='club-card' key={club.id}>
                          <div className='image-container'>
                            <img src={club.image || defaultImage} alt='club' />
                          </div>

                          <div className='card-footer'>
                            <div className='left'>
                              <div className='animation-title-container'>
                                <h4
                                  className={`${
                                    club.title.length > 12
                                      ? 'club-name animation-title'
                                      : 'club-name'
                                  }`}
                                >
                                  {club.title}{' '}
                                  {club.title.length > 12 ? club.title : null}
                                </h4>
                              </div>

                              <p style={{ fontSize: '10px', color: '#468AEF' }}>
                                {club.createdOn}
                              </p>
                            </div>
                            <div className='right'>
                              <Link
                                to={`/workspace/${param.id}/details/${param.spaceKey}/editclub/${club.id}`}
                              >
                                <div className='edit-btn'>
                                  <FaEdit />
                                  <div className='hover-msg'>
                                    <p
                                      style={{
                                        color: 'black',
                                        fontWeight: '400',
                                        fontSize: '14px',
                                      }}
                                    >
                                      Edit
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              <div className='delete-btn'>
                                <RiDeleteBin6Line
                                  onClick={(e) => {
                                    e.preventDefault()
                                    value.deleteClub(
                                      param.id,
                                      param.spaceKey,
                                      club.id
                                    )
                                  }}
                                />
                                <div className='hover-msg'>
                                  <p
                                    style={{
                                      color: 'black',
                                      fontWeight: '400',
                                      fontSize: '14px',
                                    }}
                                  >
                                    Delete
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
                return (
                  <React.Fragment
                    key={Math.floor(Math.random() * 100000)}
                  ></React.Fragment>
                )
              })
            }}
          </WorkspaceConsumer>
        </div>
      </div>
    </CollegeClubsWrapper>
  )
}

const CollegeClubsWrapper = styled.section`
  .clubs-page {
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

    border-radius: 6px;
  }
  .add-new svg {
    font-size: 36px;
  }
  .add-new:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .club-card {
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
  .club-card:hover {
    transform: scale(1.04);
    border: 1px solid #0063ff;
  }
  .club-card .image-container {
    height: 70px;
    width: 100%;
    border-radius: 5px;
  }
  .club-card .image-container img {
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
  .club-name {
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
  .animation-title-container {
    width: 90px;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  .animation-title-container .animation-title {
    animation: text-float 10s linear infinite;
  }

  @keyframes text-float {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-51%);
    }
  }

  .edit-btn,
  .delete-btn {
    position: relative;
  }

  .delete-btn:hover .hover-msg {
    opacity: 1;
  }

  .edit-btn:hover .hover-msg {
    opacity: 1;
  }

  .hover-msg {
    position: absolute;
    top: -16px;
    left: -4px;
    opacity: 0;
  }

  .delete-btn .hover-msg {
    left: -10px;
  }
`
