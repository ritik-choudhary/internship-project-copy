import React, { useState } from 'react'
import { Link, useParams, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell, FaShareSquare, FaDownload } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import {
  AiOutlinePlus,
  AiOutlineRight,
  AiOutlineLeft,
  AiOutlineFullscreen,
} from 'react-icons/ai'
import MoodboardElementModal from '../Components/MoodboardElementModal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsFillGridFill } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { CgArrowsExpandUpRight } from 'react-icons/cg'
import ReadPdf from '../Components/ReadPdf'

export default function SingleMoodboard() {
  return (
    <SingleMoodboardWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insidemoodboard/:moodboardID/readpdf'>
          <ReadPdf />
        </Route>

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
              <Link to='/workspace'>
                <h3
                  style={{
                    fontSize: '20px',
                    color: '#c4c4c4',
                    fontWeight: '400',
                  }}
                >
                  {`My Workspace >`}
                  <span>&nbsp;</span>
                </h3>
              </Link>
              <Link to={`/workspace/${param.id}/details`}>
                <h3
                  style={{
                    fontSize: '20px',
                    color: '#c4c4c4',
                    fontWeight: '400',
                  }}
                >
                  {workspaceName.length > 15
                    ? ` ${workspaceName.slice(0, 15)}... > `
                    : `${workspaceName} > `}
                  <span>&nbsp;</span>
                </h3>
              </Link>
              <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
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
              </Link>
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
                <AiOutlineFullscreen
                  style={{
                    display: `${moodboard.moodboardFields ? '' : 'none'}`,
                  }}
                  onClick={() => setIsGrid(false)}
                />
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
                    {item.image ? (
                      <img src={item.image} alt='' />
                    ) : item.pdf ? (
                      <Link
                        to={{
                          pathname: `/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${param.moodboardID}/readpdf`,
                          state: { src: item.pdfPreview },
                        }}
                      >
                        <img
                          src='https://play-lh.googleusercontent.com/nufRXPpDI9XP8mPdAvOoJULuBIH_OK4YbZZVu8i_-eDPulZpgb-Xp-EmI8Z53AlXHpqX'
                          alt=''
                        />
                      </Link>
                    ) : item.video ? (
                      <ReactPlayer
                        playing={true}
                        url={item.video}
                        light={true}
                        controls={true}
                        height='120px'
                        width='163px'
                      />
                    ) : item.link ? (
                      <a
                        href={item.link}
                        target='_blank'
                        rel='noreferrer noopener'
                        className='link-option'
                      >
                        <CgArrowsExpandUpRight />
                        Open Link
                      </a>
                    ) : null}
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
              )
            })}
          </div>
        ) : (
          <div className='slider'>
            {moodboard?.moodboardFields?.map((item, index) => {
              console.log('item hehe', item)
              return (
                <div
                  className={index === current ? 'slide-active' : 'slide'}
                  key={item.id}
                >
                  {index === current && (
                    <div className='slider-field-card'>
                      <div className='slider-navigations'>
                        <div className='left-btn'>
                          <AiOutlineLeft onClick={prevSlide} />
                        </div>
                        <div className='right-btn'>
                          <AiOutlineRight onClick={nextSlide} />
                        </div>
                      </div>
                      <div className='field-image-container'>
                        {item.image ? (
                          <img src={item.image} alt='' />
                        ) : item.pdf ? (
                          <Link
                            to={{
                              pathname: `/workspace/${param.id}/details/${param.spaceKey}/insidemoodboard/${param.moodboardID}/readpdf`,
                              state: { src: item.pdfPreview },
                            }}
                          >
                            <img
                              src='https://play-lh.googleusercontent.com/nufRXPpDI9XP8mPdAvOoJULuBIH_OK4YbZZVu8i_-eDPulZpgb-Xp-EmI8Z53AlXHpqX'
                              alt=''
                            />
                          </Link>
                        ) : item.video ? (
                          <ReactPlayer
                            url={item.video}
                            light={true}
                            playing={true}
                            controls={true}
                            width='768px'
                            height='450px'
                          />
                        ) : item.link ? (
                          <a
                            href={item.link}
                            target='_blank'
                            rel='noreferrer noopener'
                            className='link-option'
                          >
                            <CgArrowsExpandUpRight />
                            Open Link
                          </a>
                        ) : null}
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
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
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
    border-radius: 6px;
    border: 1px solid #468aef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #468aef;
  }
  .animation-title {
    animation: slide-in 0.3s ease-out;
  }
  @keyframes slide-in {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  .field-card {
    display: flex;
    flex-direction: column;
    height: 140px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .slider-field-card {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 50vw;
    border-radius: 6px;
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
  .field-image-container .link-option {
    position: absolute;
    top: 45%;
    left: 16%;
    color: white;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .field-image-container:hover .link-option {
    color: #0063ff;
  }

  .slider-field-card .field-image-container .link-option {
    position: absolute;
    top: 45%;
    left: 33%;
    color: white;
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 40px;
    cursor: pointer;
  }

  .slider-field-card .field-image-container:hover .link-option {
    color: #0063ff;
  }
  .field-card .card-options,
  .slider-field-card .card-options {
    position: absolute;
    bottom: 0px;
    display: grid;
    transform: translateY(100%);
    transition: all 0.2s ease-in-out;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.31);
  }
  .field-card:hover .card-options,
  .slider-field-card:hover .card-options {
    transform: translateY(0);
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
    padding: 10px 0;
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
    z-index: 5;
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
