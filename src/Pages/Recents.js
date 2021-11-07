import React from 'react'
import { Link } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import companylogo from '../assets/companylogo.png'

export default function Recents() {
  return <RecentsComponent />
}

function RecentsComponent() {
  return (
    <RecentsWrapper>
      <div className='recents-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='recents-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='recents-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='recents-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Recents
                </h3>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='storage'>
            <div className='recent-card'>
              <div className='left'>
                <h1 className='title'>First Workspace</h1>
                <p className='category'>(Workspace)</p>
              </div>
              <div className='right'>
                <div className='time-opened'>
                  <p>15 min ago</p>
                </div>
              </div>
            </div>
            <div className='recent-card'>
              <div className='left'>
                <h1 className='title'>Library (Novels)</h1>
                <p className='category'>(Space)</p>
              </div>
              <div className='right'>
                <div className='time-opened'>
                  <p>5 min ago</p>
                </div>
              </div>
            </div>
            <div className='recent-card'>
              <div className='left'>
                <h1 className='title'>Book 1</h1>
                <p className='category'>(Book)</p>
              </div>
              <div className='right'>
                <div className='time-opened'>
                  <p>1 sec ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecentsWrapper>
  )
}

const RecentsWrapper = styled.section`
  .recents-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .recents-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .recents-header {
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
  .recents-back-btn {
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
  .recents-back-btn:hover {
    transform: scale(1.05);
  }
  .recents-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .recents-title-container .title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
  }
  .recents-title-container .title div {
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 150px;
  }

  .recent-card {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f2f4f8;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px 40px 20px 15px;
    border-radius: 10px;
  }
  .recent-card:hover {
    cursor: pointer;
    transform: scale(1.01);
    border: 1px solid #0063ff;
  }
  .recent-card .left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .recent-card .title {
    font-size: 18px;
    color: black;
    font-weight: 400;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recent-card .category {
    color: #c4c4c4;
    font-size: 12px;
  }
  .time-opened {
    color: #468aef;
  }
`
