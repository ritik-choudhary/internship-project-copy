import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import companylogo from '../assets/companylogo.png'
import TemplateDoc from '../Components/CoverLetter/TemplateDoc'
import { TEMPLATES } from '../Components/CoverLetter/TemplateFiles'
import { HiOutlineDocumentText } from 'react-icons/hi'

export default function CoverLetterTemplates() {
  return (
    <>
      <Switch>
        <Route path='/coverlettertemplates/read'>
          <TemplateDoc />
        </Route>
      </Switch>
      <CoverLetterTemplatesComponent />
    </>
  )
}

function CoverLetterTemplatesComponent() {
  return (
    <TemplatesWrapper>
      <div className='templates-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='templates-header'>
            <Link to='/'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='templates-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='templates-title-container'>
            <div className='title'>
              <div>
                <h3
                  className='animation-title'
                  style={{ fontSize: '20px', fontWeight: '400' }}
                >
                  Cover Letter Templates
                </h3>
              </div>
            </div>
            <div className='line'></div>
          </header>
          <div className='storage'>
            {TEMPLATES.map((item) => {
              return (
                <Link
                  to={{
                    pathname: `/coverlettertemplates/read`,
                    state: { src: item.file, name: item.name },
                  }}
                  key={item.id}
                >
                  <div className='template-card'>
                    <HiOutlineDocumentText />
                    <p className='template-name'>{item.name}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </TemplatesWrapper>
  )
}

const TemplatesWrapper = styled.section`
  .templates-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .templates-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 30px;
  }
  .templates-header {
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
  .templates-back-btn {
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
  .templates-back-btn:hover {
    transform: scale(1.05);
  }
  .templates-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .templates-title-container .title {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
  }
  .templates-title-container .title div {
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
  .template-card {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    background: #f2f4f8;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px 40px 20px 15px;
    border-radius: 10px;
  }
  .template-card:hover {
    cursor: pointer;
    transform: scale(1.01);
    border: 1px solid #0063ff;
  }
  .template-card svg {
    color: #468aef;
  }
  .template-name {
    color: black;
    font-size: 14px;
    font-weight: 400;
  }
`
