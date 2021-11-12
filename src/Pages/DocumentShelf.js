import React from 'react'
import { FaBell, FaShareSquare, FaDownload } from 'react-icons/fa'
import { RiArrowGoBackFill, RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { Link, Route, Switch } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import DocumentShelfModal from '../Components/DocumentShelf/DocumentShelfModal'
import DocumentShelfDocModal from '../Components/DocumentShelf/DocumentShelfDocModal'
import DocumentShelfFullPage from '../Components/DocumentShelf/DocumentShelfFullPage'
import companylogo from '../assets/companylogo.png'

export default function DocumentShelf() {
  return (
    <>
      <Switch>
        <Route path='/documentshelf/:documentID/readdoc/fullpage'>
          <DocumentShelfFullPage />
        </Route>

        <Route path='/documentshelf/:documentID/readdoc'>
          <DocumentShelfDocModal />
        </Route>
        <Route path='/documentshelf/addnewmarksheet'>
          <DocumentShelfModal marksheet />
        </Route>
        <Route path='/documentshelf/addnewcertificate'>
          <DocumentShelfModal certificate />
        </Route>
        <Route path='/documentshelf/addnewotherdocument'>
          <DocumentShelfModal otherDocument />
        </Route>
        <Route path='/documentshelf/addnewimportant'>
          <DocumentShelfModal important />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <DocumentShelfComponent value={value}></DocumentShelfComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function DocumentShelfComponent(props) {
  const { value } = props
  return (
    <DocumentShelfWrapper>
      <div className='document-shelf-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='document-shelf-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='document-shelf-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='document-shelf-title-container'>
            <div className='title'>
              <h3
                className='animation-title'
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                Document Shelf
              </h3>
            </div>
            <div className='line'></div>
          </header>
          <div className='documents-container'>
            <section className='marksheets'>
              <header>Marksheets</header>
              <div className='storage'>
                <Link to='/documentshelf/addnewmarksheet'>
                  <div className='add-new-btn'>
                    <AiOutlinePlus />
                    <p>Add new</p>
                  </div>
                </Link>
                {value.documentShelf.map((item) => {
                  if (item.type === 'Marksheet') {
                    const type =
                      item.doc.name.split('.')[
                        item.doc.name.split('.').length - 1
                      ]
                    return (
                      <Link
                        to={{
                          pathname: `/documentshelf/${item.id}/readdoc`,
                          state: {
                            src: item.preview,
                            fileType: type,
                          },
                        }}
                      >
                        <div className='document-card' key={item.id}>
                          <div className='animation-title-container'>
                            <p
                              className={`${
                                item.title.length > 19
                                  ? 'title animation-title'
                                  : 'title'
                              }`}
                            >
                              {item.title}{' '}
                              {item.title.length > 19 ? item.title : null}
                            </p>
                          </div>
                          <div className='btn-container'>
                            <div
                              className='share-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaShareSquare />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Share
                                </p>
                              </div>
                            </div>
                            <div
                              className='download-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaDownload />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Download
                                </p>
                              </div>
                            </div>
                            <div
                              className='delete-btn'
                              onClick={(e) => {
                                e.preventDefault()
                                value.deleteDocumentShelf(item.id)
                              }}
                            >
                              <RiDeleteBin6Line />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  }
                  return <></>
                })}
              </div>
            </section>
            <section className='certificates'>
              <header>Certificates</header>
              <div className='storage'>
                <Link to='/documentshelf/addnewcertificate'>
                  <div className='add-new-btn'>
                    <AiOutlinePlus />
                    <p>Add new</p>
                  </div>
                </Link>
                {value.documentShelf.map((item) => {
                  if (item.type === 'Certificate') {
                    const type =
                      item.doc.name.split('.')[
                        item.doc.name.split('.').length - 1
                      ]
                    return (
                      <Link
                        to={{
                          pathname: `/documentshelf/${item.id}/readdoc`,
                          state: {
                            src: item.preview,
                            fileType: type,
                          },
                        }}
                      >
                        <div className='document-card' key={item.id}>
                          <div className='animation-title-container'>
                            <p
                              className={`${
                                item.title.length > 19
                                  ? 'title animation-title'
                                  : 'title'
                              }`}
                            >
                              {item.title}{' '}
                              {item.title.length > 19 ? item.title : null}
                            </p>
                          </div>
                          <div className='btn-container'>
                            <div
                              className='share-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaShareSquare />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Share
                                </p>
                              </div>
                            </div>
                            <div
                              className='download-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaDownload />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Download
                                </p>
                              </div>
                            </div>
                            <div
                              className='delete-btn'
                              onClick={(e) => {
                                e.preventDefault()
                                value.deleteDocumentShelf(item.id)
                              }}
                            >
                              <RiDeleteBin6Line />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  }
                  return <></>
                })}
              </div>
            </section>
            <section className='important'>
              <header>Important Documents</header>
              <div className='storage'>
                <Link to='/documentshelf/addnewimportant'>
                  <div className='add-new-btn'>
                    <AiOutlinePlus />
                    <p>Add new</p>
                  </div>
                </Link>
                {value.documentShelf.map((item) => {
                  if (item.type === 'Important') {
                    const type =
                      item.doc.name.split('.')[
                        item.doc.name.split('.').length - 1
                      ]
                    return (
                      <Link
                        to={{
                          pathname: `/documentshelf/${item.id}/readdoc`,
                          state: {
                            src: item.preview,
                            fileType: type,
                          },
                        }}
                      >
                        <div className='document-card' key={item.id}>
                          <div className='animation-title-container'>
                            <p
                              className={`${
                                item.title.length > 19
                                  ? 'title animation-title'
                                  : 'title'
                              }`}
                            >
                              {item.title}{' '}
                              {item.title.length > 19 ? item.title : null}
                            </p>
                          </div>
                          <div className='btn-container'>
                            <div
                              className='share-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaShareSquare />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Share
                                </p>
                              </div>
                            </div>
                            <div
                              className='download-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaDownload />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Download
                                </p>
                              </div>
                            </div>
                            <div
                              className='delete-btn'
                              onClick={(e) => {
                                e.preventDefault()
                                value.deleteDocumentShelf(item.id)
                              }}
                            >
                              <RiDeleteBin6Line />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  }
                  return <></>
                })}
              </div>
            </section>
            <section className='other-documents'>
              <header>Other Documents</header>
              <div className='storage'>
                <Link to='/documentshelf/addnewotherdocument'>
                  <div className='add-new-btn'>
                    <AiOutlinePlus />
                    <p>Add new</p>
                  </div>
                </Link>
                {value.documentShelf.map((item) => {
                  if (item.type === 'OtherDocument') {
                    const type =
                      item.doc.name.split('.')[
                        item.doc.name.split('.').length - 1
                      ]
                    return (
                      <Link
                        to={{
                          pathname: `/documentshelf/${item.id}/readdoc`,
                          state: {
                            src: item.preview,
                            fileType: type,
                          },
                        }}
                      >
                        <div className='document-card' key={item.id}>
                          <div className='animation-title-container'>
                            <p
                              className={`${
                                item.title.length > 12
                                  ? 'title animation-title'
                                  : 'title'
                              }`}
                            >
                              {item.title}{' '}
                              {item.title.length > 12 ? item.title : null}
                            </p>
                          </div>
                          <div className='btn-container'>
                            <div
                              className='share-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaShareSquare />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Share
                                </p>
                              </div>
                            </div>
                            <div
                              className='download-btn'
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaDownload />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Download
                                </p>
                              </div>
                            </div>
                            <div
                              className='delete-btn'
                              onClick={(e) => {
                                e.preventDefault()
                                value.deleteDocumentShelf(item.id)
                              }}
                            >
                              <RiDeleteBin6Line />
                              <div className='hover-msg'>
                                <p
                                  style={{
                                    color: 'black',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  }
                  return <></>
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DocumentShelfWrapper>
  )
}

const DocumentShelfWrapper = styled.section`
  .document-shelf-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .document-shelf-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 50px;
  }
  .document-shelf-header {
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
  .document-shelf-back-btn {
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
  .document-shelf-back-btn:hover {
    transform: scale(1.05);
  }
  .document-shelf-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .document-shelf-title-container .title {
    padding-bottom: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
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
  .documents-container {
    display: flex;
    padding: 10px 150px;
    flex-direction: column;
  }
  .marksheets,
  .certificates,
  .important,
  .other-documents {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 30vh;
    color: black;
  }
  .marksheets header,
  .certificates header,
  .important header,
  .other-documents header {
    font-size: 20px;
    font-weight: 400;
  }
  .marksheets .title,
  .certificates .title,
  .important .title,
  .other-documents .title {
    color: black;
    font-weight: 400;
    font-size: 14px;
  }
  .storage {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
  .add-new-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 56px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .document-card {
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background: #f2f4f8;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .animation-title-container {
    width: 90px;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  .animation-title-container .animation-title {
    animation: text-float 10s linear infinite;
  }

  @keyframes text-float {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-51%);
    }
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .document-card .delete-btn,
  .document-card .share-btn,
  .document-card .download-btn {
    color: #c4c4c4;
  }
  .document-card .btn-container .delete-btn:hover {
    color: #ff0000;
  }
  .document-card .share-btn:hover {
    color: #1ca806;
  }
  .document-card .download-btn:hover {
    color: #3e77f1;
  }

  .delete-btn,
  .download-btn,
  .share-btn {
    position: relative;
  }

  .delete-btn:hover .hover-msg,
  .download-btn:hover .hover-msg,
  .share-btn:hover .hover-msg {
    opacity: 1;
  }

  .hover-msg {
    position: absolute;
    top: -16px;
    left: -10px;
    opacity: 0;
  }
`
