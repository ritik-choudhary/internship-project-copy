import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import MoodboardModal from '../MoodboardModal'
import DigitalBrainboardModal from '../DigitalBrainboardModal'

export default function Moodboards() {
  const defaultImage =
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'
  const param = useParams()
  return (
    <MoodboardsWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/addmoodboard'>
          <MoodboardModal />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/adddigitalbrainboard'>
          <DigitalBrainboardModal />
        </Route>
      </Switch>
      <div className='moodboards-page'>
        <div className='storage'>
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/addmoodboard`}
          >
            <div className='add-new'>
              <AiOutlinePlus />
              <p>Add new moodboard</p>
            </div>
          </Link>
          <WorkspaceConsumer>
            {(value) => {
              const displayItems = value.workspaceElements.filter(
                (item) =>
                  item.id === param.spaceKey && item.workspaceID === param.id
              )
              return displayItems.map((item) => {
                if (item.moodboards) {
                  return item.moodboards.map((moodboard) => {
                    return (
                      <Link
                        to={`/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${moodboard.id}`}
                      >
                        <div className='moodboard-card' key={moodboard.id}>
                          <div className='image-container'>
                            <img
                              src={moodboard.image || defaultImage}
                              alt='moodboard'
                            />
                          </div>

                          <div className='card-footer'>
                            <div className='left'>
                              <h4 className='moodboard-name'>
                                {moodboard.title.length > 10
                                  ? `${moodboard.title.slice(0, 10)}...`
                                  : moodboard.title}
                              </h4>
                              <p style={{ fontSize: '10px', color: '#468AEF' }}>
                                {moodboard.createdOn}
                              </p>
                            </div>
                            <div className='right'>
                              <div className='delete-btn'>
                                <RiDeleteBin6Line
                                  onClick={(e) => {
                                    e.preventDefault()
                                    value.deleteMoodboard(
                                      param.id,
                                      param.spaceKey,
                                      moodboard.id
                                    )
                                  }}
                                />
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
        <section className='digital-brainboard-storage'>
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/adddigitalbrainboard`}
          >
            <div className='add-new'>
              <AiOutlinePlus />
              <p>Add new digital brainboard</p>
            </div>
          </Link>
          <WorkspaceConsumer>
            {(value) => {
              const displayItems = value.workspaceElements.filter(
                (item) =>
                  item.id === param.spaceKey && item.workspaceID === param.id
              )
              return displayItems.map((item) => {
                if (item.digitalBrainboards) {
                  return item.digitalBrainboards.map((digitalBrainboard) => {
                    return (
                      <Link
                        to={`/workspace/${param.id}/details/${param.spaceKey}/insidedigitalBrainboard/${digitalBrainboard.id}`}
                      >
                        <div
                          className='digitalBrainboard-card'
                          key={digitalBrainboard.id}
                        >
                          <div className='image-container'>
                            <img
                              src={digitalBrainboard.image || defaultImage}
                              alt='digital brainboard'
                            />
                          </div>

                          <div className='card-footer'>
                            <div className='left'>
                              <h4 className='digitalBrainboard-name'>
                                {digitalBrainboard.title.length > 10
                                  ? `${digitalBrainboard.title.slice(0, 10)}...`
                                  : digitalBrainboard.title}
                              </h4>
                              <p style={{ fontSize: '10px', color: '#468AEF' }}>
                                {digitalBrainboard.createdOn}
                              </p>
                            </div>
                            <div className='right'>
                              <div className='delete-btn'>
                                <RiDeleteBin6Line
                                  onClick={(e) => {
                                    e.preventDefault()
                                    value.deleteDigitalBrainboard(
                                      param.id,
                                      param.spaceKey,
                                      digitalBrainboard.id
                                    )
                                  }}
                                />
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
        </section>
      </div>
    </MoodboardsWrapper>
  )
}

const MoodboardsWrapper = styled.section`
  .moodboards-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 70px;
    width: 100%;
  }
  .storage,
  .digital-brainboard-storage {
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
  .moodboard-card,
  .digitalBrainboard-card {
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
  .moodboard-card:hover,
  .digitalBrainboard-card:hover {
    transform: scale(1.04);
    border: 1px solid #0063ff;
  }
  .moodboard-card .image-container,
  .digitalBrainboard-card .image-container {
    height: 80px;
    width: 100%;
    border-radius: 5px;
  }
  .moodboard-card .image-container img,
  .digitalBrainboard-card .image-container img {
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
  .moodboard-name,
  .digitalBrainboard-name {
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
  .card-footer .delete-btn {
    font-size: 16px;
    color: #c4c4c4;
    cursor: pointer;
  }
  .card-footer .delete-btn:hover {
    color: #f54848;
  }
`
