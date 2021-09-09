import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import styled from 'styled-components'
import { BsFillGridFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import jobs2 from '../assets/jobs2.jpg'
import WorkspaceModal from '../Components/WorkspaceModal'

import { Link, Route, Switch } from 'react-router-dom'

export default function WorkspacePage() {
  const [gridStyle, setGridStyle] = useState(false)
  const [newWorkspaceModal, setNewWorkspaceModal] = useState(false)

  return (
    <>
      <WorkspaceWrapper>
        <Switch>
          <Route path='/workspace/:id/edit'>
            <WorkspaceModal isEditing />
          </Route>
          <Route path='/workspace/create'>
            <WorkspaceModal />
          </Route>
        </Switch>
        <div className='workspace'>
          <Sidebar />
          <div className='page-content'>
            <Header />
            <header className='workspace-title-container'>
              <div className='title'>
                <h3 style={{ fontSize: '25px' }}>My Workspaces</h3>
                <div className='view-container'>
                  <div
                    className={` ${
                      gridStyle ? 'grid-style grid-style-active' : 'grid-style'
                    }`}
                    onClick={() => setGridStyle(true)}
                  >
                    <BsFillGridFill />
                  </div>
                  <div
                    className={` ${
                      gridStyle ? 'list-style' : 'list-style list-style-active'
                    }`}
                    onClick={() => setGridStyle(false)}
                  >
                    <FaList />
                  </div>
                </div>
              </div>
              <div className='line'></div>
            </header>
            <div className='button-container'>
              <Link to='/workspace/create'>
                <button className='add-workspace-btn'>
                  <AiOutlinePlus /> Add Workspace
                </button>
              </Link>
            </div>
            <div
              className={`${
                gridStyle
                  ? 'grid-workspace-container'
                  : 'list-workspace-container'
              }`}
            >
              <WorkspaceConsumer>
                {(value) => {
                  return value.workspaceList.map((item) => {
                    const id = item.id
                    return (
                      <div
                        key={id}
                        className={`${gridStyle ? 'grid-card' : 'list-card'}`}
                        onClick={(e) => value.handleDetail(id)}
                      >
                        <Link to={`/workspace/${id}/details`}>
                          <div className='workspace-info'>
                            <div className='thumbnail'>
                              <img src={item.image} alt='thumbnail' />
                            </div>
                            <h2 className='workspace-title'>{item.title}</h2>
                          </div>
                        </Link>
                        <div className='workspace-options'>
                          <Link to={`/workspace/${id}/edit`}>
                            <FiEdit />
                          </Link>
                          <RiDeleteBin6Line
                            onClick={(e) => {
                              value.deleteWorkspace(id)
                            }}
                          />
                        </div>
                      </div>
                    )
                  })
                }}
              </WorkspaceConsumer>
            </div>
          </div>
        </div>
      </WorkspaceWrapper>
    </>
  )
}

const WorkspaceWrapper = styled.section`
  .workspace {
    font-family: 'IBM Plex Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .page-content {
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
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .view-container {
    display: flex;
    gap: 8px;
  }
  .grid-style,
  .list-style {
    width: 30px;
    height: 30px;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  .grid-style-active,
  .list-style-active {
    border: 1px solid #468aef;
  }
  .grid-style-active svg,
  .list-style-active svg {
    color: #468aef;
  }
  .button-container {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0px 100px;
    margin-top: -20px;
  }
  .grid-workspace-container,
  .list-workspace-container {
    width: 100%;
    padding: 0px 100px;
    gap: 35px;
  }
  .grid-workspace-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .list-workspace-container {
    display: flex;
    flex-direction: column;
  }
  .list-card {
    height: 96px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f4f8;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px 40px 20px 15px;
    border-radius: 10px;
  }
  .workspace-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .thumbnail {
    height: 65px;
    width: 100px;
    background: #c4c4c4;
    border-radius: 6px;
    overflow: hidden;
  }
  .thumbnail img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .workspace-title {
    font-size: 25px;
    font-weight: 500;
    font-family: 'IBM Plex Sans', sans-serif;
    color: black;
  }
  .workspace-options {
    display: flex;
    gap: 25px;
    font-size: 18px;
    color: #c4c4c4;
  }
  .workspace-options a {
    color: #c4c4c4;
  }
  .workspace-options svg {
    cursor: pointer;
  }
  .grid-card .workspace-info {
    flex-direction: column;
  }
  .grid-card {
    gap: 40px;
    height: 212px;
    padding: 20px;
    background: #f2f4f8;
    // border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grid-card .thumbnail {
    height: 70px;
    width: 240px;
  }
  .grid-card:hover,
  .list-card:hover {
    cursor: pointer;
    transform: scale(1.01);
    border: 1px solid #0063ff;
  }
`
