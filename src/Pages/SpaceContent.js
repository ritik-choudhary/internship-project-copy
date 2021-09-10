import React from 'react'
import { WorkspaceConsumer } from '../Context'

import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import styled from 'styled-components'
// import { useParams } from 'react-router-dom'
import LibraryPage from '../Components/LibraryPage'

export default function SpaceContent() {
  // const param = useParams()
  return (
    <>
      <SpaceContentWrapper>
        <div className='space-content-page'>
          <Sidebar />
          <div className='page-container'>
            <Header />
            <header className='space-title-container'>
              <div className='title'>
                <WorkspaceConsumer>
                  {(value) => {
                    const subheading = value.detailSpace.title
                    const heading = value.workspaceList.find(
                      (item) => item.id === value.detailSpace.workspaceID
                    ).title
                    return (
                      <div style={{ fontSize: '25px', fontWeight: '500' }}>
                        <h3
                          style={{ color: '#c4c4c4' }}
                        >{`My Workspace > ${heading} > `}</h3>
                        <h3> {subheading}</h3>
                      </div>
                    )
                  }}
                </WorkspaceConsumer>
              </div>
              <div className='line'></div>
            </header>
            <WorkspaceConsumer>
              {(value) => {
                const page = value.detailSpace.title
                console.log(page)
                if (page === 'Library') {
                  return <LibraryPage />
                }
              }}
            </WorkspaceConsumer>
          </div>
        </div>
      </SpaceContentWrapper>
    </>
  )
}

const SpaceContentWrapper = styled.section`
  .space-content-page {
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
  .space-title-container {
    display: flex;
    flex-direction: column;
    padding: 20px 100px;
    padding-top: 0;
  }
  .space-title-container .title {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .space-title-container .title div {
    display: flex;
  }
`
