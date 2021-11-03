import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import companylogo from '../assets/companylogo.png'

export default function Wallet() {
  return (
    <>
      <WalletComponent />
    </>
  )
}

function WalletComponent() {
  return (
    <WalletWrapper>
      <div className='wallet-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='wallet-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='wallet-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='wallet-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Wallet
                </h3>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='storage'>
            <div className='lists'>
              <div className='referral'>
                <div className='heading'>Referral Users</div>
              </div>
              <div className='premium'>
                <div className='heading'>Premium Users</div>
              </div>
              <div className='monthly'>
                <div className='heading'>Monthly Users</div>
              </div>
              <div className='total'>
                <div className='heading'>Total Assesment</div>
              </div>
            </div>
            <div className='bottom-cards'>
              <div className='balance-card'>
                <h1>Balance</h1>
                <p>$1300</p>
              </div>
              <div className='other-card'></div>
            </div>
          </div>
        </div>
      </div>
    </WalletWrapper>
  )
}

const WalletWrapper = styled.section`
  .wallet-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .wallet-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 30px;
  }
  .wallet-header {
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
  .wallet-back-btn {
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
  .wallet-back-btn:hover {
    transform: scale(1.05);
  }
  .wallet-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .wallet-title-container .title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
  }
  .wallet-title-container .title div {
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
    gap: 20px;
    gap: 30px;
    padding: 10px 150px;
  }
  .lists {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .referral,
  .premium,
  .monthly,
  .total {
    box-shadow: 2px 2px 5px rgb(0 0 0 / 10%);
    border-radius: 6px;
    padding: 10px;
    height: 40vh;
    overflow: hidden;
  }
  .referral:hover,
  .premium:hover,
  .monthly:hover,
  .total:hover {
    overflow: auto;
  }
  .heading {
    font-size: 20px;
    text-align: center;
  }
  ..referral::-webkit-scrollbar,
  .premium::-webkit-scrollbar,
  .monthly::-webkit-scrollbar,
  .total::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ..referral::-webkit-scrollbar-track,
  .premium::-webkit-scrollbar-track,
  .monthly::-webkit-scrollbar-track,
  .total::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  ..referral::-webkit-scrollbar-thumb,
  .premium::-webkit-scrollbar-thumb,
  .monthly::-webkit-scrollbar-thumb,
  .total::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    outline: 1px solid slategrey;
  }
  .bottom-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .balance-card {
    box-shadow: 2px 2px 5px rgb(0 0 0 / 10%);
    border-radius: 6px;
    padding: 10px;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .balance-card h1 {
    font-size: 20px;
    font-weight: 600;
  }
  .balance-card p {
    font-size: 40px;
    font-weight: 600;
  }
`
