import React from 'react'
import { WorkspaceConsumer } from '../Context'
import { AiOutlinePlus } from 'react-icons/ai'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import styled from 'styled-components'
import { useParams, Route, Link, Switch } from 'react-router-dom'
import SpaceModal from '../Components/SpaceModal'
import SpaceUploadModal from '../Components/SpaceUploadModal'
import SpaceContent from './SpaceContent'

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
  const param = useParams()
  return (
    <div className='details-page'>
      <Sidebar />
      <div className='page-container'>
        <Header />
        <header className='workspace-title-container'>
          <div className='title'>
            <WorkspaceConsumer>
              {(value) => {
                const subtitle = value.detailWorkspace.title
                return (
                  <div style={{ fontSize: '25px', fontWeight: '500' }}>
                    <h3 style={{ color: '#c4c4c4' }}>{'My Workspaces > '}</h3>
                    <h3> {subtitle}</h3>
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
                  fontWeight: '500',
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
                if (item.version > 1) {
                  num = item.version
                }
                const printable = num ? true : false
                return (
                  <>
                    <Link to={`/workspace/${param.id}/details/${item.id}`}>
                      <div
                        className='grid-card'
                        onClick={(e) => value.handleDetailSpace(item.id)}
                        key={item.id}
                      >
                        <div className='card-image-container'>
                          <img src={item.image} alt='' />
                        </div>
                        <p className='space-title'>
                          {item.title}
                          {printable ? ` (${num})` : ''}
                        </p>
                      </div>
                    </Link>
                  </>
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
    font-family: 'IBM Plex Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .workspace-title-container {
    display: flex;
    flex-direction: column;

    padding: 20px 100px;
    padding-top: 0;
  }
  .workspace-title-container .title {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
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
    padding: 0px 100px;
    gap: 35px;
  }
  .grid-workspace-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-card {
    height: 212px;
    background: #f2f4f8;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
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
  }
  .card-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .space-title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 16px;
    font-weight: 500;
  }

  .grid-card:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
`
