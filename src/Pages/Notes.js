import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { RiDeleteBin6Line } from 'react-icons/ri'
import JournalModal from '../Components/Journal/JournalModal'
import JournalModalEntry from '../Components/Journal/JournalModalEntry'
import { AiOutlinePlus } from 'react-icons/ai'
import companylogo from '../assets/companylogo.png'

export default function Journal() {
  return (
    <>
      <Switch>
        <Route path='/notes/editnotes/:notesID'>
          <JournalModalEntry isNotes />
        </Route>
        <Route path='/notes/addnew'>
          <JournalModal isNotes />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <NotesComponent value={value}></NotesComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function NotesComponent(props) {
  const { value } = props
  return (
    <NotesWrapper>
      <div className='notes-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='notes-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='notes-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='notes-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Notes
                </h3>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='storage'>
            <Link to='/notes/addnew'>
              <div className='add-new-card'>
                <AiOutlinePlus />
                <p>Add new</p>
              </div>
            </Link>
            {value.notes?.map((item) => {
              return (
                <Link to={`/notes/editnotes/${item.id}`}>
                  <div className='notes-card'>
                    <div className='top'>
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
                    </div>
                    <div className='bottom'>
                      <p className='created-on'>{item.createdOn}</p>
                      <div className='delete-btn'>
                        <RiDeleteBin6Line
                          onClick={(e) => {
                            e.preventDefault()
                            value.deleteNotes(item.id)
                          }}
                        />
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
            })}
          </div>
        </div>
      </div>
    </NotesWrapper>
  )
}

const NotesWrapper = styled.section`
  .notes-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .notes-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .notes-header {
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
  .notes-back-btn {
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
  .notes-back-btn:hover {
    transform: scale(1.05);
  }
  .notes-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .notes-title-container .title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
  }
  .notes-title-container .title div {
    display: flex;
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
  .storage {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
    padding: 10px 150px;
  }
  .add-new-card {
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
  .notes-card {
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
  .notes-card:hover {
    transform: translateY(-3px);
  }
  .notes-card .title {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }
  .animation-title-container {
    width: 150px;
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
  .notes-card .bottom {
    display: flex;
    justify-content: space-between;
  }
  .notes-card .created-on {
    color: #c4c4c4;
    font-weight: 400;
  }
  .notes-card .bottom .delete-btn {
    color: #c4c4c4;
    font-size: 16px;
  }
  .notes-card .bottom .delete-btn:hover {
    color: #f54848;
    cursor: pointer;
  }

  .delete-btn {
    position: relative;
  }

  .delete-btn:hover .hover-msg {
    opacity: 1;
  }

  .hover-msg {
    position: absolute;
    top: -16px;
    left: -10px;
    opacity: 0;
  }
`
