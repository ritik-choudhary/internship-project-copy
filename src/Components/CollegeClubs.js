import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import ClubModal from './ClubModal'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function CollegeClubs() {
  const param = useParams()
  return (
    <CollegeClubsWrapper>
      <Switch>
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
                      <div className='club-card' key={club.id}>
                        <Link
                          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${club.id}`}
                        >
                          <div className='image-container'>
                            <img src={club.image} alt='club' />
                          </div>
                        </Link>
                        <div className='card-footer'>
                          <div className='left'>
                            <h4 className='club-name'>
                              {club.title.length > 15
                                ? `${club.title.slice(0, 15)}...`
                                : club.title}
                            </h4>
                            <p>{club.createdOn}</p>
                          </div>
                          <div className='right'>
                            <div className='delete-btn'>
                              <RiDeleteBin6Line
                                onClick={(e) =>
                                  value.deleteClub(
                                    param.id,
                                    param.spaceKey,
                                    club.id
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
    padding: 10px 150px;
    padding-top: 0;
    gap: 70px;
    width: 100%;
  }
  .storage {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }
  .add-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 190px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 10px;
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
    padding: 10px 25px;
    height: 190px;
    background: #f2f4f8;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .club-card:hover {
    transform: scale(1.04);
    border: 1px solid #0063ff;
  }
  .club-card .image-container {
    height: 120px;
    width: 214.03px;
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
  .club-name {
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
  }
  .card-footer p {
    font-size: 14px;
    font-weight: 400;
    color: #c4c4c4;
  }
  .card-footer .delete-btn {
    font-size: 16px;
    color: #c4c4c4;
    cursor: pointer;
  }
  .card-footer .delete-btn:hover {
    color: #f54848;
  }
`
