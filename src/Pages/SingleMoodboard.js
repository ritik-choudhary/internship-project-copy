import React, { useState } from 'react'
import { Link, useParams, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell, FaShareSquare, FaDownload } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { AiOutlinePlus, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import MoodboardElementModal from '../Components/MoodboardElementModal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsFillGridFill } from 'react-icons/bs'

export default function SingleMoodboard() {
  return (
    <SingleMoodboardWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insidemoodboard/:moodboardID/addnew'>
          <MoodboardElementModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <SingleMoodboardComponent value={value}></SingleMoodboardComponent>
          )
        }}
      </WorkspaceConsumer>
    </SingleMoodboardWrapper>
  )
}

function SingleMoodboardComponent(props) {
  const { value } = props
  const param = useParams()

  const [isGrid, setIsGrid] = useState(true)
  const [current, setCurrent] = useState(0)

  const workspaceName = value.workspaceList.find(
    (item) => item.id === param.id
  ).title

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const moodboard = space.moodboards.find(
    (item) => item.id === param.moodboardID
  )
  let length = moodboard?.moodboardFields?.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  console.log(current)

  return (
    <div className='single-moodboard-page'>
      <Sidebar />
      <div className='page-container'>
        <div className='single-moodboard-header'>
          <h3>thesocialcomment</h3>
          <div className='right-header'>
            <FaBell className='bell-icon' />
            <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
              <div className='single-moodboard-back-btn'>
                <RiArrowGoBackFill /> Back
              </div>
            </Link>
          </div>
        </div>
        <header className='moodboard-title-container'>
          <div className='title'>
            <div>
              <h3
                style={{
                  fontSize: '20px',
                  color: '#c4c4c4',
                  fontWeight: '400',
                }}
              >
                {`My Workspace > ${
                  workspaceName.length > 15
                    ? ` ${workspaceName.slice(0, 15)}...`
                    : workspaceName
                } > `}
                <span>&nbsp;</span>
              </h3>
              <h3
                style={{
                  color: '#c4c4c4',
                  fontSize: '20px',
                  fontWeight: '400',
                }}
              >
                {`${space.title} > `}
                <span>&nbsp;</span>
              </h3>
              <h3
                className='animation-title'
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                {moodboard.title.length > 15
                  ? `${moodboard.title.slice(0, 50)}...`
                  : moodboard.title}
              </h3>
            </div>
            <div className='view-options'>
              <div className={isGrid ? 'grid-active' : ''}>
                <BsFillGridFill onClick={() => setIsGrid(true)} />
              </div>
              <div className={isGrid ? 'single-view' : 'single-view-active'}>
                <p onClick={() => setIsGrid(false)}>Single View</p>
              </div>
            </div>
          </div>
          <div className='line'></div>
        </header>
        {isGrid ? (
          <div className='storage'>
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${param.moodboardID}/addnew`}
            >
              <div className='add-new-card'>
                <AiOutlinePlus />
              </div>
            </Link>
            {moodboard?.moodboardFields?.map((item) => {
              return (
                <div className='field-card' key={item.id}>
                  <div className='field-image-container'>
                    <img src={item.image} alt='' />
                  </div>
                  <div className='card-options'>
                    <div className='delete-btn'>
                      <RiDeleteBin6Line
                        onClick={() =>
                          value.deleteMoodboardField(
                            param.id,
                            param.spaceKey,
                            param.moodboardID,
                            item.id
                          )
                        }
                      />
                    </div>
                    <div className='share-btn'>
                      <FaShareSquare />
                    </div>
                    <div className='download-btn'>
                      <FaDownload />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='slider'>
            {moodboard?.moodboardFields?.map((item, index) => {
              return (
                <div
                  className={index === current ? 'slide-active' : 'slide'}
                  key={item.id}
                >
                  {index === current && (
                    <div className='slider-field-card'>
                      <div className='field-image-container'>
                        <img src={item.image} alt='' />
                      </div>
                      <div className='slider-navigations'>
                        <div className='left-btn'>
                          <AiOutlineLeft onClick={prevSlide} />
                        </div>
                        <div className='right-btn'>
                          <AiOutlineRight onClick={nextSlide} />
                        </div>
                      </div>
                      <div className='card-options'>
                        <div className='delete-btn'>
                          <RiDeleteBin6Line
                            onClick={() => {
                              value.deleteMoodboardField(
                                param.id,
                                param.spaceKey,
                                param.moodboardID,
                                item.id
                              )
                              setCurrent(
                                current >= length - 1 ? current - 1 : current
                              )
                            }}
                          />
                        </div>
                        <div className='share-btn'>
                          <FaShareSquare />
                        </div>
                        <div className='download-btn'>
                          <FaDownload />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const SingleMoodboardWrapper = styled.section`
  .single-moodboard-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .single-moodboard-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .single-moodboard-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .single-moodboard-header h3 {
    color: white;
    margin-left: -130px;
  }
  .right-header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .bell-icon {
    color: #ffca10;
  }
  .single-moodboard-back-btn {
    padding: 10px 20px;
    background: #0e1f3e;
    color: white;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 5px;
    font-weight: 400;
    position: relative;
    overflow: hidden;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .single-moodboard-back-btn:hover {
    transform: scale(1.05);
  }
  .moodboard-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .moodboard-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .moodboard-title-container .title div {
    display: flex;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .single-moodboard-page .storage {
    display: grid;
    padding: 10px 150px;
    gap: 35px;
    grid-template-columns: repeat(6, 1fr);
  }
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 150px;
  }
  .single-moodboard-page .add-new-card {
    height: 140px;
    background: #f2f4f8;
    border-radius: 10px;
    border: 1px solid #468aef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #468aef;
  }
  .animation-title {
    animation: slide-in 0.5s ease-in-out;
  }
  @keyframes slide-in {
    0% {
      transform: translateX(-100%);
      z-index: -1;
    }
    100% {
      transform: translateX(0%);
      z-index: 1;
    }
  }

  .field-card {
    display: flex;
    flex-direction: column;
    height: 140px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .slider-field-card {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 50vw;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  .field-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom, grey, black);
  }
  .field-image-container img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
  .field-card .card-options,
  .slider-field-card .card-options {
    position: absolute;
    bottom: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.31);
  }
  .slider-field-card .card-options {
    bottom: 0;
  }
  .field-card .card-options .delete-btn,
  .field-card .card-options .share-btn,
  .field-card .card-options .download-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
  }
  .slider-field-card .card-options .delete-btn,
  .slider-field-card .card-options .share-btn,
  .slider-field-card .card-options .download-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
  }
  .field-card .card-options .delete-btn:hover {
    color: #f54848;
  }
  .field-card .card-options .share-btn:hover {
    color: #1ca806;
  }
  .field-card .card-options .download-btn:hover {
    color: #3e77f1;
  }
  .slider-field-card .card-options .delete-btn:hover {
    color: #f54848;
  }
  .slider-field-card .card-options .share-btn:hover {
    color: #1ca806;
  }
  .slider-field-card .card-options .download-btn:hover {
    color: #3e77f1;
  }
  .single-moodboard-page .view-options {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    gap: 10px;
    cursor: pointer;
  }
  .grid-active,
  .single-view-active {
    color: #468aef;
  }
  .single-view {
    text-decoration: underline;
  }
  .slider-navigations {
    position: absolute;
    top: 45%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 40px;
    color: white;
  }
  .slider-navigations svg {
    cursor: pointer;
  }
  .slide {
    opacity: 0;
    transition-duration: 1s ease;
  }
  .slide-active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.05);
  }
`
