import React, { useState } from 'react'
import { WorkspaceConsumer } from '../Context'
import Sidebar from '../Components/Sidebar'
import { RiArrowGoBackFill } from 'react-icons/ri'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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

  const [isWorkspace, setIsWorkspace] = useState(false)
  const [isDocs, setIsDocs] = useState(false)
  const [isImages, setIsImages] = useState(false)
  const [isRecents, setIsRecents] = useState(true)
  const [isNotes, setIsNotes] = useState(false)

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
          <h1 className='animation-title'>Trash</h1>
          <div className='line'></div>
        </div>
        <div className='trash-options'>
          <div
            className={`workspace-option ${isRecents ? 'active' : ''}`}
            onClick={() => {
              setIsRecents(true)
              setIsWorkspace(false)
              setIsDocs(false)
              setIsImages(false)
              setIsNotes(false)
            }}
          >
            <h1>Recents</h1>
          </div>
          <div
            className={`workspace-option ${isWorkspace ? 'active' : ''}`}
            onClick={() => {
              setIsWorkspace(true)
              setIsDocs(false)
              setIsImages(false)
              setIsRecents(false)
              setIsNotes(false)
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
              setIsRecents(false)
              setIsNotes(false)
            }}
          >
            <h1>Docs</h1>
          </div>
          <div
            className={`images-option ${isNotes ? 'active' : ''}`}
            onClick={() => {
              setIsWorkspace(false)
              setIsDocs(false)
              setIsImages(false)
              setIsRecents(false)
              setIsNotes(true)
            }}
          >
            <h1>Notes</h1>
          </div>
          <div
            className={`images-option ${isImages ? 'active' : ''}`}
            onClick={() => {
              setIsWorkspace(false)
              setIsDocs(false)
              setIsImages(true)
              setIsRecents(false)
              setIsNotes(false)
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
                return <></>
              })
            : isImages
            ? value.trash.map((item) => {
                if (item.type === 'Image') {
                  return (
                    <div className='bucket-image-card' key={item.previewId}>
                      <div className='trash-image-container'>
                        <img src={item.source} alt='' />
                      </div>
                      <div className='card-options'>
                        <div className='delete-btn'>
                          <RiDeleteBin6Line
                            onClick={() => {
                              value.deleteBucketImagePermanently(item.previewId)
                            }}
                          />
                        </div>
                        <div className='restore-btn'>
                          <VscDebugRestart
                            onClick={() =>
                              value.restoreBucketImage(
                                item.workspaceId,
                                item.spaceKey,
                                item.bucketId,
                                item.previewId
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
                return <></>
              })
            : isDocs
            ? value.trash.map((item) => {
                if (item.type === 'Docs') {
                  return (
                    <div className='docs-card'>
                      <div className='top'>
                        <p className='title'>{item.title}</p>
                      </div>
                      <div className='bottom'>
                        <p className='created-on'>{item.createdOn}</p>
                        <div className='docs-card-options'>
                          <div className='restore-btn'>
                            <VscDebugRestart
                              onClick={() =>
                                value.restoreDocs(
                                  item.workspaceId,
                                  item.spaceKey,
                                  item.id
                                )
                              }
                            />
                          </div>
                          <div className='delete-btn'>
                            <RiDeleteBin6Line
                              onClick={() => {
                                value.deleteDocsPermanently(item.id)
                              }}
                            />
                          </div>
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
    border-radius: 0px 0px 6px 6px;
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
    grid-template-columns: repeat(5, 1fr);
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
    font-weight: 400;
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
  .images-storage {
    display: grid;
    padding: 10px 150px;
    gap: 35px;
    grid-template-columns: repeat(6, 1fr);
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
  .bucket-image-card .trash-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(to bottom, grey, black);
    border-radius: 0px;
  }
  .trash-image-container img {
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
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.31);
  }
  .bucket-image-card:hover .card-options {
    transform: translateY(0);
  }
  .bucket-image-card .card-options .delete-btn,
  .bucket-image-card .card-options .restore-btn {
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
  .bucket-image-card .card-options .restore-btn:hover {
    color: #1ca806;
  }
  .docs-storage {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
    padding: 0px 150px;
  }
  .docs-card {
    height: 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    height: 100%;
    background: #f2f4f8;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .docs-card .title {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }
  .docs-card .bottom {
    display: flex;
    justify-content: space-between;
  }
  .docs-card .created-on {
    color: #c4c4c4;
  }
  .docs-card .docs-card-options {
    display: flex;
    gap: 10px;
  }
  .docs-card .bottom .delete-btn,
  .docs-card .bottom .restore-btn {
    color: #c4c4c4;
    font-size: 16px;
  }
  .docs-card .bottom .delete-btn:hover {
    color: #f54848;
    cursor: pointer;
  }
  .docs-card .bottom .restore-btn:hover {
    color: #1ca806;
  }
`
