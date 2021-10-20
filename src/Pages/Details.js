import React from 'react'
import { WorkspaceConsumer } from '../Context'
import { AiOutlinePlus } from 'react-icons/ai'
import Sidebar from '../Components/Sidebar'
import { RiArrowGoBackFill } from 'react-icons/ri'
import styled from 'styled-components'
import { useParams, Route, Link, Switch } from 'react-router-dom'
import SpaceModal from '../Components/Space/SpaceModal'
import SpaceUploadModal from '../Components/Space/SpaceUploadModal'
import SpaceContent from './SpaceContent'
import { FaBell } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function Details() {
  return (
    <>
      <WorkspaceContentWrapper>
        <Switch>
          <Route path='/workspace/:id/details/createspace/imageupload'>
            <SpaceUploadModal />
            <DetailPageComponent />
          </Route>
          <Route path='/workspace/:id/details/createspace'>
            <SpaceModal />
            <DetailPageComponent />
          </Route>
          <Route
            path='/workspace/:id/details/:spaceKey'
            component={SpaceContent}
          />
          <Route path='/workspace/:id/details'>
            <DetailPageComponent />
          </Route>
        </Switch>
      </WorkspaceContentWrapper>
    </>
  )
}

const DetailPageComponent = () => {
  const defaultImage =
    'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'
  const param = useParams()
  return (
    <div className='details-page'>
      <Sidebar />
      <div className='page-container'>
        <div className='details-header'>
          <Link to='/'>
            <h3>thesocialcomment</h3>
          </Link>
          <div className='right-header'>
            <FaBell className='bell-icon' />
            <Link to='/workspace'>
              <div className='details-back-btn'>
                <RiArrowGoBackFill /> Back
              </div>
            </Link>
          </div>
        </div>
        <header className='workspace-title-container'>
          <div className='title'>
            <WorkspaceConsumer>
              {(value) => {
                const subtitle = value.detailWorkspace.title
                return (
                  <div>
                    <Link to={'/workspace'}>
                      <h3
                        style={{
                          fontSize: '20px',
                          fontWeight: '400',
                          color: '#c4c4c4',
                        }}
                      >
                        {'My Workspaces > '}

                        <span>&nbsp;</span>
                      </h3>
                    </Link>

                    <h3
                      className='animation-title'
                      style={{ fontSize: '20px', fontWeight: '400' }}
                    >
                      {subtitle.length > 15
                        ? `${subtitle.slice(0, 70)}...`
                        : subtitle}
                    </h3>
                  </div>
                )
              }}
            </WorkspaceConsumer>
          </div>
          <div className='line'></div>
        </header>
        <div className='grid-workspace-container'>
          <Link to={`/workspace/${param.id}/details/createspace`}>
            <div
              className='grid-card add-new-card'
              style={{
                border: '1px solid #468AEF',
                gap: '10px',
              }}
            >
              <AiOutlinePlus
                style={{
                  fontSize: '50px',
                  color: '#C4C4C4',
                }}
              />
              <p
                style={{
                  color: '#468AEF',
                  fontSize: '16px',
                  fontWeight: '400',
                }}
              >
                Add New
              </p>
            </div>
          </Link>
          <WorkspaceConsumer>
            {(value) => {
              const displayItemList = value.workspaceElements.filter(
                (item) => item.workspaceID === param.id
              )
              return displayItemList.map((item) => {
                let num = 0
                let alt = ''

                if (item?.altName) {
                  alt = item.altName
                } else {
                  num = item.version
                }

                const printable = num ? true : false
                const isAlt = alt ? true : false
                return (
                  <div key={item.id}>
                    <Link to={`/workspace/${param.id}/details/${item.id}`}>
                      <div
                        className='grid-card'
                        onClick={(e) => value.handleDetailSpace(item.id)}
                      >
                        <div className='card-image-container'>
                          <img src={item.image || defaultImage} alt='' />
                        </div>
                        <div className='card-details'>
                          <p className='space-title'>
                            {item.title}
                            {isAlt
                              ? `(${item.altName})`
                              : num > 1
                              ? `(${num})`
                              : null}
                            {/* {printable
                              ? isAlt
                                ? ` (${item.altName})`
                                : `(${num})`
                              : ''} */}
                          </p>

                          <div className='space-delete-btn'>
                            <RiDeleteBin6Line
                              onClick={(e) => {
                                e.preventDefault()
                                value.deleteSpace(item.id)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }}
          </WorkspaceConsumer>
        </div>
      </div>
    </div>
  )
}

const WorkspaceContentWrapper = styled.section`
  .details-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    background: #f8fafb;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .details-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .details-header h3 {
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
  .details-back-btn {
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
  .details-back-btn:hover {
    transform: scale(1.05);
  }
  .workspace-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 10px;
  }
  .workspace-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 400;
  }
  .workspace-title-container .title div {
    display: flex;
  }

  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }

  .grid-workspace-container {
    width: 100%;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 35px;
  }
  .grid-workspace-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }

  .grid-card {
    height: 140px;
    background: #f2f4f8;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    color: black;
  }
  .add-new-card {
    gap: 40px;
    box-shadow: none !important;
  }
  .card-image-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, grey, black);
  }
  .card-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
  .card-details {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
  }
  .space-title {
    width: 100px;
    font-size: 14px;
    font-weight: 400;
    color: white;
    padding-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .space-delete-btn {
    color: white;
    font-size: 14px;
  }
  .space-delete-btn:hover {
    color: #f54848;
    cursor: pointer;
  }
  .grid-card:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .animation-title {
    animation: slide-in 0.5s ease-in-out;
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
`
