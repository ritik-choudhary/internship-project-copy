import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import { FaBell, FaShareSquare, FaDownload } from 'react-icons/fa'
import {
  AiOutlineRight,
  AiOutlineLeft,
  AiOutlineFullscreen,
} from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../../Components/Sidebar'
import styled from 'styled-components'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function BucketListContent() {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <BucketListContentComponent
            value={value}
          ></BucketListContentComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function BucketListContentComponent(props) {
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

  const bucket = space.bucketList.find((item) => item.id === param.bucketListID)

  let length = bucket?.previews?.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  return (
    <BucketListContentWrapper>
      <div className='bucket-content-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='bucket-content-header'>
            <Link to='/'>
              <h3>thesocialcomment</h3>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
                <div className='bucket-content-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='bucket-title-container'>
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
                  {bucket.title.length > 15
                    ? `${bucket.title.slice(0, 50)}...`
                    : bucket.title}
                </h3>
              </div>
              <div className='view-options'>
                <div className={isGrid ? 'grid-active' : ''}>
                  <BsFillGridFill onClick={() => setIsGrid(true)} />
                </div>
                <div className={isGrid ? 'single-view' : 'single-view-active'}>
                  <AiOutlineFullscreen onClick={() => setIsGrid(false)} />
                </div>
              </div>
            </div>
            <div className='line'></div>
          </header>
          {isGrid ? (
            <div className='storage'>
              {bucket?.previews?.map((item) => {
                return (
                  <div className='bucket-image-card' key={item.id}>
                    <div className='bucket-image-container'>
                      <img src={item.source} alt='' />
                    </div>
                    <div className='card-options'>
                      <div className='delete-btn'>
                        <RiDeleteBin6Line
                          onClick={() => {
                            value.deleteBucketImage(
                              param.id,
                              param.spaceKey,
                              param.bucketListID,
                              item.previewId
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
              {bucket?.previews?.map((item, index) => {
                return (
                  <div
                    className={index === current ? 'slide-active' : 'slide'}
                    key={item.id}
                  >
                    {index === current && (
                      <div className='slider-card'>
                        <div className='slider-navigations'>
                          <div className='left-btn'>
                            <AiOutlineLeft onClick={prevSlide} />
                          </div>
                          <div className='right-btn'>
                            <AiOutlineRight onClick={nextSlide} />
                          </div>
                        </div>
                        <div className='bucket-image-container'>
                          <img src={item.source} alt='' />
                        </div>
                        <div className='card-options'>
                          <div
                            className='delete-btn'
                            onClick={() => {
                              value.deleteBucketImage(
                                param.id,
                                param.spaceKey,
                                param.bucketListID,
                                item.previewId
                              )
                              setCurrent(
                                current >= length - 1 ? current - 1 : current
                              )
                            }}
                          >
                            <RiDeleteBin6Line />
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
    </BucketListContentWrapper>
  )
}

const BucketListContentWrapper = styled.section`
  .bucket-content-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .bucket-content-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bucket-content-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .bucket-content-header h3 {
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
  .bucket-content-back-btn {
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
  .bucket-content-back-btn:hover {
    transform: scale(1.05);
  }
  .bucket-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .bucket-title-container .title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
  }
  .bucket-title-container .title div {
    display: flex;
  }
  .view-options {
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
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .bucket-content-page .storage {
    display: grid;
    padding: 10px 150px;
    gap: 35px;
    grid-template-columns: repeat(6, 1fr);
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
  .bucket-image-card {
    display: flex;
    flex-direction: column;
    height: 140px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .slider-card {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 50vw;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }
  .bucket-image-container,
  .slider .slider-card .bucket-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom, grey, black);
    border-radius: 0px;
  }
  .bucket-image-container img,
  .slider .slider-card .bucket-image-container img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
  .bucket-image-card .card-options,
  .slider .slider-card .card-options {
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
  .bucket-image-card:hover .card-options,
  .slider .slider-card:hover .card-options {
    transform: translateY(0);
  }
  .bucket-image-card .card-options .delete-btn,
  .bucket-image-card .card-options .share-btn,
  .bucket-image-card .card-options .download-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
  }
  .slider-card .card-options .delete-btn,
  .slider-card .card-options .share-btn,
  .slider-card .card-options .download-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
  }
  .bucket-image-card .card-options .delete-btn:hover {
    color: #f54848;
  }
  .bucket-image-card .card-options .share-btn:hover {
    color: #1ca806;
  }
  .bucket-image-card .card-options .download-btn:hover {
    color: #3e77f1;
  }
  .slider-card .card-options .delete-btn:hover {
    color: #f54848;
  }
  .slider-card .card-options .share-btn:hover {
    color: #1ca806;
  }
  .slider-card .card-options .download-btn:hover {
    color: #3e77f1;
  }
  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 150px;
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
