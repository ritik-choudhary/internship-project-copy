import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import { FaBell, FaShareSquare, FaDownload } from 'react-icons/fa'
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

  const workspaceName = value.workspaceList.find(
    (item) => item.id === param.id
  ).title

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const bucket = space.bucketList.find((item) => item.id === param.bucketListID)

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
            </div>
            <div className='line'></div>
          </header>
          <div className='storage'>
            {bucket?.previews?.map((item) => {
              return (
                <div className='bucket-image-card' key={item.id}>
                  <div className='image-container'>
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
  .bucket-image-card .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom, grey, black);
    border-radius: 0px;
  }
  .image-container img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
  .bucket-image-card .card-options {
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
  .bucket-image-card:hover .card-options {
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
  .bucket-image-card .card-options .delete-btn:hover {
    color: #f54848;
  }
  .bucket-image-card .card-options .share-btn:hover {
    color: #1ca806;
  }
  .bucket-image-card .card-options .download-btn:hover {
    color: #3e77f1;
  }
`
