import React, { useState } from 'react'
import { WorkspaceConsumer } from '../Context'
import { AiOutlinePlus } from 'react-icons/ai'
import Sidebar from '../Components/Sidebar'
import { RiArrowGoBackFill } from 'react-icons/ri'
import styled from 'styled-components'
import { useParams, Route, Link, Switch } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { VscDebugRestart } from 'react-icons/vsc'

export default function TrashPage() {
  return (
    <TrashWrapper>
      <WorkspaceConsumer>
        {(value) => {
          return <TrashPageComponent value={value} />
        }}
      </WorkspaceConsumer>
    </TrashWrapper>
  )
}

function TrashPageComponent(props) {
  const { value } = props

  const [isWorkspace, setIsWorkspace] = useState(true)
  const [isDocs, setIsDocs] = useState(false)
  const [isImages, setIsImages] = useState(false)

  return (
    <div className='trash-page'>
      <Sidebar />
      <div className='page-container'>
        <div className='trash-header'>
          <h3>thesocialcomment</h3>
          <div className='right-header'>
            <FaBell className='bell-icon' />
            <Link to='/'>
              <div className='trash-back-btn'>
                <RiArrowGoBackFill /> Back
              </div>
            </Link>
          </div>
        </div>
        <div className='trash-title'>
          <h1>Trash</h1>
          <div className='line'></div>
        </div>
        <div className='trash-options'>
          <div
            className={`workspace-option ${isWorkspace ? 'active' : ''}`}
            onClick={() => {
              setIsWorkspace(true)
              setIsDocs(false)
              setIsImages(false)
            }}
          >
            <h1>Workspaces</h1>
          </div>
          <div
            className={`docs-option ${isDocs ? 'active' : ''}`}
            onClick={() => {
              setIsWorkspace(false)
              setIsDocs(true)
              setIsImages(false)
            }}
          >
            <h1>Docs</h1>
          </div>
          <div
            className={`images-option ${isImages ? 'active' : ''}`}
            onClick={() => {
              setIsWorkspace(false)
              setIsDocs(false)
              setIsImages(true)
            }}
          >
            <h1>Images</h1>
          </div>
        </div>
        <div
          className={`trash-storage ${
            isWorkspace
              ? 'workspace-storage'
              : isDocs
              ? 'docs-storage'
              : isImages
              ? 'images-storage'
              : ''
          }`}
        >
          {isWorkspace
            ? value.trash.map((item) => {
                if (item.type === 'Workspace') {
                  return (
                    <div className='list-card'>
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
                      <div className='workspace-options'>
                        <div className='options'>
                          <VscDebugRestart
                            className='restore-btn'
                            onClick={(e) => value.restoreWorkspace(item.id)}
                          />
                          <RiDeleteBin6Line
                            className='delete-btn'
                            onClick={(e) => {
                              value.deleteWorkspacePermanently(item.id)
                            }}
                          />
                        </div>
                        <div className='created-on'>
                          Created on: {item.createdOn}
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            : null}
        </div>
      </div>
    </div>
  )
}

const TrashWrapper = styled.section`
  .trash-page {
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
  .trash-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .trash-header h3 {
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
  .trash-back-btn {
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
  .trash-back-btn:hover {
    transform: scale(1.05);
  }
  .trash-title {
    padding: 10px 150px 0px;
  }
  .trash-title h1 {
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
  }
  .line {
    height: 1.5px;
    width: 100%;
    background: #e5e5e5;
  }
  .trash-options {
    padding: 0px 150px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .trash-options .workspace-option h1,
  .trash-options .docs-option h1,
  .trash-options .images-option h1 {
    font-size: 20px;
    text-align: center;
    font-weight: 600;
  }
  .trash-options .workspace-option,
  .trash-options .docs-option,
  .trash-options .images-option {
    padding-bottom: 10px;
    border-bottom: 3px solid #e5e5e5;
    cursor: pointer;
  }
  .trash-options .active {
    border-bottom: 3px solid #468aef;
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
  .list-card .workspace-title {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Open Sans', sans-serif;
    color: #8d8a8a;
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
  .workspace-storage {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 12px;
  }
  .workspace-options {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 18px;
    color: #c4c4c4;
  }
  .options {
    display: flex;
    gap: 15px;
  }
  .workspace-options .created-on {
    font-size: 12px;
    color: #468aef;
    white-space: nowrap;
  }
  .workspace-options .restore-btn:hover {
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
`
