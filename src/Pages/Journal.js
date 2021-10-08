import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { WorkspaceConsumer } from '../Context'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { RiDeleteBin6Line } from 'react-icons/ri'
import JournalModal from '../Components/JournalModal'
import JournalModalEntry from '../Components/JournalModalEntry'
import { AiOutlinePlus } from 'react-icons/ai'

export default function Journal() {
  return (
    <>
      <Switch>
        <Route path='/journal/edit/:journalID'>
          <JournalModalEntry />
        </Route>
        <Route path='/journal/addnew'>
          <JournalModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <JournalComponent value={value}></JournalComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function JournalComponent(props) {
  const { value } = props
  return (
    <JournalWrapper>
      <div className='journal-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='journal-header'>
            <h3>thesocialcomment</h3>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='journal-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='journal-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Journal
                </h3>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='storage'>
            <Link to='/journal/addnew'>
              <div className='add-new-card'>
                <AiOutlinePlus />
                <p>Add new</p>
              </div>
            </Link>
            {value.journal?.map((item) => {
              return (
                <Link to={`/journal/edit/${item.id}`}>
                  <div className='journal-card'>
                    <div className='top'>
                      <p className='title'>{item.title}</p>
                    </div>
                    <div className='bottom'>
                      <p className='created-on'>{item.createdOn}</p>
                      <div className='delete-btn'>
                        <RiDeleteBin6Line
                          onClick={(e) => {
                            e.preventDefault()
                            value.deleteJournal(item.id)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </JournalWrapper>
  )
}

const JournalWrapper = styled.section`
  .journal-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .journal-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .journal-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .journal-header h3 {
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
  .journal-back-btn {
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
  .journal-back-btn:hover {
    transform: scale(1.05);
  }
  .journal-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .journal-title-container .title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
  }
  .journal-title-container .title div {
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
  .journal-card {
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
  .journal-card .title {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }
  .journal-card .bottom {
    display: flex;
    justify-content: space-between;
  }
  .journal-card .created-on {
    color: #c4c4c4;
    font-weight: 400;
  }
  .journal-card .bottom .delete-btn {
    color: #c4c4c4;
    font-size: 16px;
  }
  .journal-card .bottom .delete-btn:hover {
    color: #f54848;
    cursor: pointer;
  }
`
