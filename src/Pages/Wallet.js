import React from 'react'
import { Link } from 'react-router-dom'
import { FaBell, FaRupeeSign, FaWallet, FaCrown } from 'react-icons/fa'
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
                <div className='users-list'>
                  <div className='single-user'>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Nitin sharma</p>
                    <p className='joined-date'>May 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Piyush Kanda</p>
                    <p className='joined-date'>jul 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Tom Cruise</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jack Nicolson</p>
                    <p className='joined-date'>Dec 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Anne Hathaway</p>
                    <p className='joined-date'>Nov 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jake Gylenhaal</p>
                    <p className='joined-date'>jan 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Brad Pitt</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Daniel Dey Lewis</p>
                    <p className='joined-date'>Feb 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Nitin sharma</p>
                    <p className='joined-date'>May 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Piyush Kanda</p>
                    <p className='joined-date'>jul 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Tom Cruise</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jack Nicolson</p>
                    <p className='joined-date'>Dec 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Anne Hathaway</p>
                    <p className='joined-date'>Nov 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jake Gylenhaal</p>
                    <p className='joined-date'>jan 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Brad Pitt</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Daniel Dey Lewis</p>
                    <p className='joined-date'>Feb 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                </div>
                <div className='hover-text'>
                  <p>Users who signed in using your referral.</p>
                </div>
              </div>
              <div className='premium'>
                <div className='heading'>
                  <FaCrown className='crown-icon' />
                  <p>Premium Users</p>
                </div>
                <div className='users-list'>
                  <div className='single-user'>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Nitin sharma</p>
                    <p className='joined-date'>May 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Piyush Kanda</p>
                    <p className='joined-date'>jul 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Tom Cruise</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jack Nicolson</p>
                    <p className='joined-date'>Dec 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Anne Hathaway</p>
                    <p className='joined-date'>Nov 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jake Gylenhaal</p>
                    <p className='joined-date'>jan 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Brad Pitt</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Daniel Dey Lewis</p>
                    <p className='joined-date'>Feb 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Nitin sharma</p>
                    <p className='joined-date'>May 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Piyush Kanda</p>
                    <p className='joined-date'>jul 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Tom Cruise</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jack Nicolson</p>
                    <p className='joined-date'>Dec 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Anne Hathaway</p>
                    <p className='joined-date'>Nov 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Jake Gylenhaal</p>
                    <p className='joined-date'>jan 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Brad Pitt</p>
                    <p className='joined-date'>jun 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Daniel Dey Lewis</p>
                    <p className='joined-date'>Feb 21</p>
                  </div>
                  <div className='single-user'>
                    <p className='user-name'>Ritik</p>
                    <p className='joined-date'>june 21</p>
                  </div>
                </div>
                <div className='hover-text'>
                  <p>
                    Users who are now under premium membership via your
                    referral.
                  </p>
                </div>
              </div>
              <div className='monthly'>
                <div className='heading'>Monthly Users</div>
                <div className='users-list'>
                  <div className='single-month'>
                    <h3 className='month-name'>Jan</h3>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                  </div>
                  <div className='single-month'>
                    <h3 className='month-name'>Feb</h3>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                  </div>
                  <div className='single-month'>
                    <h3 className='month-name'>Mar</h3>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                  </div>
                  <div className='single-month'>
                    <h3 className='month-name'>Apr</h3>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                  </div>
                  <div className='single-month'>
                    <h3 className='month-name'>May</h3>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                  </div>
                  <div className='single-month'>
                    <h3 className='month-name'>Jan</h3>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                    <p className='user-name'>Ritik Choudhary</p>
                  </div>
                </div>
                <div className='hover-text'>
                  <p>Monthly users who signed in using your referral.</p>
                </div>
              </div>
              <div className='total'>
                <div className='heading'>Total Assesment</div>
                <div className='users-count'>
                  <p style={{ opacity: '0.7' }}>Total Number of Users : </p>
                  <span>2568</span>
                </div>
                <div className='days-spent'>
                  <p style={{ opacity: '0.7' }}>Total number of days :</p>
                  <span>56</span>
                </div>
                <div className='hover-text'>
                  <p>
                    Total assesment of your referrals and number of days spent
                    by you here.
                  </p>
                </div>
              </div>
            </div>
            <div className='bottom-cards'>
              <div className='balance-card'>
                <header>
                  <FaWallet />
                  <h1>Balance</h1>
                </header>
                <div className='balance-value'>
                  <FaRupeeSign />
                  <p>1300</p>
                </div>
                <div className='wallet-btn-container'>
                  <button className='transactions'>Transactions</button>
                  <button className='withdraw'>Withdraw</button>
                </div>
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
    gap: 10px;
  }
  .referral,
  .premium,
  .monthly,
  .total {
    box-shadow: 2px 2px 5px rgb(0 0 0 / 10%);
    border-radius: 6px;
    padding: 20px;
    height: 40vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
  }
  .premium {
    background: #fee4cb;
    position: relative;
    overflow: hidden;
  }
  .premium::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #fff, transparent);
    transition: 0.5s;
    animation-name: shine;
    animation-duration: 10s;
    animation-iteration-count: infinite;
  }
  .premium .heading {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    font-weight: 600;
  }
  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    49% {
      transform: translateX(-100%);
    }

    59% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .referral {
    background: #e9e7fd;
  }

  .monthly {
    background: #dbf6fd;
  }

  .total {
    background: #ffd3e2;
  }

  .premium:hover,
  .monthly:hover,
  .total:hover {
    overflow-y: auto;
  }
  .heading {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    opacity: 0.7;
  }

  .premium::-webkit-scrollbar,
  .monthly::-webkit-scrollbar,
  .total::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .premium::-webkit-scrollbar-track,
  .monthly::-webkit-scrollbar-track,
  .total::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
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
    border-radius: 6px;
    padding: 10px;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgb(0 0 0 / 10%);
  }
  .balance-card:hover {
    transform: scale(1.05);
  }
  .balance-card header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .balance-card h1 {
    font-size: 20px;
    font-weight: 600;
  }
  .balance-card p {
    font-size: 40px;
    font-weight: 600;
  }
  .balance-value {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .balance-value svg {
    font-size: 32px;
  }
  .wallet-btn-container {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 20px;
    height: 100%;
  }
  .transactions {
    border-right: none;
    cursor: pointer;
    background: transparent;
    background: linear-gradient(to right, #009479, #25c5c5);
    color: white;
    border: none;
    margin-bottom: -10px;
    margin-left: -10px;
    font-size: 16px;
    border-right: 2px solid #67d7d6;
  }
  .withdraw {
    border-left: none;
    cursor: pointer;
    background: transparent;
    background: linear-gradient(to right, #25c5c5, #86efd8);
    color: white;
    border: none;
    margin-bottom: -10px;
    margin-right: -10px;
    font-size: 16px;
  }
  .users-list {
    height: 230px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow: hidden;
    opacity: 0.7;
  }
  .users-list:hover {
    overflow: auto;
  }
  .single-user {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .single-month .month-name {
    color: #468aef;
    font-weight: 400;
    font-size: 16px;
  }
  .joined-date {
    color: #468aef;
    font-size: 10px;
  }
  .user-name {
    font-size: 14px;
  }
  .users-list::-webkit-scrollbar {
    width: 5px;
  }
  .users-list::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .users-list::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    outline: 1px solid slategrey;
  }
  .users-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .users-count span {
    background: white;
    font-size: 30px;
    padding: 5px 10px;
    border-radius: 5px;
    color: #468aef;
  }
  .days-spent {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .days-spent p {
    font-weight: 400;
  }
  .days-spent span {
    background: white;
    font-size: 30px;
    padding: 5px 10px;
    border-radius: 5px;
    color: #468aef;
  }
  .hover-text {
    position: absolute;
    top: 0px;
    left: 10%;
    right: 10%;
    font-size: 10px;
    text-align: center;
    opacity: 0;
    padding: 3px;
    border-radius: 6px;
  }
  .premium:hover .hover-text,
  .referral:hover .hover-text,
  .monthly:hover .hover-text,
  .total:hover .hover-text {
    opacity: 1;
  }

  .hover-text {
    background: #ffffff75;
  }
`
