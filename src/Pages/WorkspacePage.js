import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { BsFillGridFill } from 'react-icons/bs'
import { FaList, FaBell } from 'react-icons/fa'
import { AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai'
import { WorkspaceConsumer } from '../Context'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import WorkspaceModal from '../Components/WorkspaceModal'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Empty from '../assets/png/empty.png'
import companylogo from '../assets/companylogo.png'

import { Link, Route, Switch } from 'react-router-dom'

export default function WorkspacePage() {
  return (
    <WorkspaceWrapper>
      <Switch>
        <Route path='/workspace/:id/edit'>
          <WorkspaceModal isEditing />
        </Route>
        <Route path='/workspace/create'>
          <WorkspaceModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <WorkspacePageComponent value={value}></WorkspacePageComponent>
        }}
      </WorkspaceConsumer>
    </WorkspaceWrapper>
  )
}

function WorkspacePageComponent(props) {
  const { value } = props
  const [gridStyle, setGridStyle] = useState(false)
  const [showTut, setShowTut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTut(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className='workspace'>
        <Sidebar />
        <div className='page-content'>
          <div className='workspace-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
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
              <h3 style={{ fontSize: '20px', fontWeight: '400' }}>
                My Workspaces
              </h3>
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
            {showTut ? (
              <div className='click-here-btn'>
                <p>
                  Click here to create <br /> a new workspace.
                </p>
                <AiOutlineArrowRight className='arrow' />
              </div>
            ) : null}
            <Link to='/workspace/create'>
              <button
                className='add-workspace-btn'
                onClick={() => setShowTut(false)}
              >
                <AiOutlinePlus /> <p>Add Workspace</p>
              </button>
            </Link>
          </div>
          {value.workspaceList.length > 0 ? (
            <div
              className={`${
                gridStyle
                  ? 'grid-workspace-container'
                  : 'list-workspace-container'
              }`}
            >
              {value.workspaceList.map((item) => {
                const id = item.id
                return (
                  <Link to={`/workspace/${id}/details`}>
                    <div
                      key={id}
                      className={`${gridStyle ? 'grid-card' : 'list-card'}`}
                      onClick={(e) => value.handleDetail(id)}
                    >
                      <div className='workspace-info'>
                        <div className='thumbnail'>
                          <img src={item.image} alt='thumbnail' />
                        </div>
                        <h2 className='workspace-title'>
                          {item.title.length > 14
                            ? `${item.title.slice(0, 13)}...`
                            : item.title}
                          {item.version > 1 ? `(${item.version})` : null}
                        </h2>
                      </div>

                      <div className='workspace-options'>
                        <div className='options'>
                          <Link to={`/workspace/${id}/edit`}>
                            <FiEdit className='edit-btn' />
                          </Link>
                          <RiDeleteBin6Line
                            className='delete-btn'
                            onClick={(e) => {
                              e.preventDefault()
                              value.deleteWorkspace(id)
                            }}
                          />
                        </div>
                        <div className='created-on'>
                          Created on: {item.createdOn}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className='empty-workspace'>
              <div>
                <img src={Empty} alt='' />
                <p>No workspaces added yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
    animation: page-animation 0.5s ease-out;
  }
  @keyframes page-animation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .empty-workspace {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty-workspace div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .empty-workspace p {
    color: #c4c4c4;
    font-size: 12px;
    text-transform: capitalize;
  }
  .workspace-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .logo-container {
    width: 180px;
    height: 25px;
    margin-left: -130px;
  }
  .logo-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    gap: 20px;
  }
  .grid-workspace-container,
  .list-workspace-container {
    width: 100%;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 12px;
  }
  .grid-workspace-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 35px;
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
  .list-card .workspace-info {
    gap: 20px;
  }
  .workspace-info {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 3px;
  }

  .thumbnail {
    height: 55px;
    width: 100%;
    background: #c4c4c4;
    border-radius: 6px;
    overflow: hidden;
  }
  .list-card .thumbnail {
    width: 100px;
  }
  .thumbnail img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .list-card .workspace-title {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Open Sans', sans-serif;
    color: #8d8a8a;
  }
  .grid-card .workspace-title {
    font-size: 14px;
    font-weight: 400;
    font-family: 'Open Sans', sans-serif;
    color: #8d8a8a;
  }
  .workspace-options {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 18px;
    color: #c4c4c4;
  }
  .grid-card .workspace-options {
    align-items: center;
  }
  .options {
    display: flex;
    gap: 15px;
  }
  .workspace-options .created-on {
    font-size: 12px;
    color: #468aef;
    font-weight: 400;
    white-space: nowrap;
  }
  .grid-card .workspace-options .created-on {
    display: none;
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
  .grid-card .workspace-options svg {
    font-size: 16px;
  }
  .grid-card .workspace-info {
    flex-direction: column;
    gap: 5px;
  }
  .grid-card {
    height: 175px;
    padding: 10px;
    background: #f2f4f8;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .grid-card .thumbnail {
    height: 110px;
    width: 100%;
  }
  .grid-card:hover,
  .list-card:hover {
    cursor: pointer;
    transform: scale(1.01);
    border: 1px solid #0063ff;
  }
  .click-here-btn {
    text-align: center;
    color: white;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    border-radius: 6px;
    background: black;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: click-here 2s infinite;
  }
  .click-here-btn .arrow {
    font-size: 18px;
  }

  @keyframes click-here {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`
