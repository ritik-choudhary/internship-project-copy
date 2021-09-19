import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { BsFillGridFill } from 'react-icons/bs'
import { FaList, FaBell } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import WorkspaceModal from '../Components/WorkspaceModal'
import { RiArrowGoBackFill } from 'react-icons/ri'

import { Link, Route, Switch } from 'react-router-dom'

export default function WorkspacePage() {
  const [gridStyle, setGridStyle] = useState(false)

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
            <div className='workspace-header'>
              <h3>thesocialcomment</h3>
              <div className='right-header'>
                <FaBell className='bell-icon' />
                <Link to='/'>
                  <div className='workspace-back-btn'>
                    <RiArrowGoBackFill /> Back
                  </div>
                </Link>
              </div>
            </div>
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
                            <h2 className='workspace-title'>
                              {item.title.length > 14
                                ? `${item.title.slice(0, 13)}...`
                                : item.title}
                            </h2>
                          </div>
                        </Link>
                        <div className='workspace-options'>
                          <div className='created-on'>
                            Created on: {item.createdOn}
                          </div>
                          <div className='options'>
                            <Link to={`/workspace/${id}/edit`}>
                              <FiEdit className='edit-btn' />
                            </Link>
                            <RiDeleteBin6Line
                              className='delete-btn'
                              onClick={(e) => {
                                value.deleteWorkspace(id)
                              }}
                            />
                          </div>
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
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .page-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .workspace-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .workspace-header h3 {
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
  .workspace-back-btn {
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
  .workspace-back-btn:hover {
    transform: scale(1.05);
  }
  .workspace-title-container {
    display: flex;
    flex-direction: column;
    padding: 10px 150px;
    padding-top: 0;
  }
  .workspace-title-container .title {
    margin-bottom: 10px;
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
    padding: 0px 150px;
    margin-top: -15px;
  }
  .grid-workspace-container,
  .list-workspace-container {
    width: 100%;
    padding: 0px 150px;
    gap: 12px;
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
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f4f8;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px 40px 20px 15px;
    border-radius: 10px;
  }
  .workspace-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .thumbnail {
    height: 55px;
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
    font-size: 20px;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    color: black;
  }
  .workspace-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: 18px;
    color: #c4c4c4;
  }
  .options {
    display: flex;
    gap: 25px;
  }
  .created-on {
    font-size: 12px;
    color: #468aef;
  }
  .grid-card .workspace-options {
    display: none;
  }
  .grid-card:hover .workspace-options {
    display: flex;
  }
  .workspace-options .edit-btn:hover {
    color: #3e77f1;
  }
  .workspace-options .delete-btn:hover {
    color: #f54848;
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
    gap: 5px;
    height: 212px;
    padding: 20px;
    background: #f2f4f8;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grid-card .thumbnail {
    height: 120px;
    width: 214.03px;
  }
  .grid-card:hover,
  .list-card:hover {
    cursor: pointer;
    transform: scale(1.01);
    border: 1px solid #0063ff;
  }
`
