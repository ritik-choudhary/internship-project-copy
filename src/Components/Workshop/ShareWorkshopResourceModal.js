import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WorkspaceConsumer } from '../../Context'
import styled from 'styled-components'
import Modal from 'react-modal'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import companylogo from '../../assets/companylogo.png'

export default function ShareWorkshopPage() {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <SingleWorkshopPageComponent
            value={value}
          ></SingleWorkshopPageComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function SingleWorkshopPageComponent(props) {
  const { value } = props
  const param = useParams()

  const [conductedBy, setConductedBy] = useState()
  const [members, setMembers] = useState()
  const [about, setAbout] = useState()

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const workshop = space.workshops.find((item) => item.id === param.workshopID)

  useEffect(() => {
    if (workshop) {
      setConductedBy(workshop?.basicInfo?.conductedBy)
      setMembers(workshop?.basicInfo?.members || [])
      setAbout(workshop?.basicInfo?.about)
    }
  }, [workshop])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '95vw',
          minHeight: '95vh',
          top: '20%',
          left: '50%',
          right: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -20%)',
          boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          background: 'white',
          padding: '-20px',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.31)',
        },
      }}
    >
      <SingleWorkshopPageWrapper>
        <div className='single-workshop-page'>
          <div className='page-container'>
            <div className='single-workshop-header'>
              <div className='logo-container'>
                <img src={companylogo} alt='logo' />
              </div>
              <div className='right-header'>
                <Link
                  to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}`}
                >
                  <div className='single-workshop-back-btn'>
                    <RiArrowGoBackFill /> Back
                  </div>
                </Link>
              </div>
            </div>
            <header className='workshop-title-container'>
              <div className='line'></div>
            </header>

            <div className='single-workshop-details'>
              <div className='info'>
                <div className='heading'>
                  <h1>
                    {workshop.title.length > 15
                      ? `${workshop.title.slice(0, 30)}...`
                      : workshop.title}
                  </h1>
                </div>
                <div className='basic-info'>
                  <form>
                    <div className='field'>
                      <label htmlFor='created-on'>Created on</label>
                      <input
                        type='text'
                        name='created-on'
                        id='created-on'
                        value={workshop.createdOn}
                      />
                    </div>
                    <div className='field'>
                      <label htmlFor='conducted-by'>Conducted by</label>
                      <input
                        type='text'
                        name='conducted-by'
                        id='conducted-by'
                        value={conductedBy}
                      />
                    </div>
                    <div className='field'>
                      <label htmlFor='members'>Members</label>
                      <input type='text' name='members' id='members' />
                      <div className='members-container'>
                        {members?.map((item) => {
                          return (
                            <div className='member-tag' key={item.id}>
                              <p>{item.name}</p>
                              <AiOutlineClose />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className='field'>
                      <label htmlFor='about'>About</label>
                      <input
                        type='text'
                        name='about'
                        id='about'
                        value={about}
                        maxLength='100'
                        style={{ width: '800px' }}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <section className='resources'>
                <h1 className='heading'>Resources</h1>
                <div className='resources-container'>
                  {workshop?.resources?.map((item) => {
                    return (
                      <Link
                        to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${item.id}/share`}
                      >
                        <div className='resource-card'>
                          <p>{item.title}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </SingleWorkshopPageWrapper>
    </Modal>
  )
}

const SingleWorkshopPageWrapper = styled.section`
  .single-workshop-page {
    font-family: 'Open Sans', sans-serif;
    // min-height: 100vh;
    display: flex;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .single-workshop-header {
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
  .workshop-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .workshop-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }
  .workshop-title-container .title div {
    display: flex;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }
  .single-workshop-details {
    padding: 0px 150px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .single-workshop-details .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .single-workshop-details .info .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #468aef;
  }
  .single-workshop-details .info .heading svg {
    cursor: pointer;
  }
  .info h1 {
    font-size: 20px;
    font-weight: 400;
  }
  .basic-info {
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    padding: 15px 15px;
    overflow: auto;
  }
  .basic-info form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .basic-info form div {
    display: flex;
    gap: 30px;
  }
  .basic-info form div label {
    color: #c4c4c4;
    font-size: 14px;
    font-weight: 400;
    width: 120px;
  }
  .basic-info form div input {
    border: none;
    font-size: 14px;
    font-weight: 400;
    outline: none;
  }
  .basic-info form div input:hover {
    border-bottom: 1px solid #468aef;
  }
  .basic-info form .members-container {
    display: flex;
    height: 25px;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .basic-info form .member-tag {
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    padding: 3px 5px;
    background: #e5e5e5;
  }
  .member-tag p {
    font-size: 14px;
  }
  .member-tag svg {
    font-size: 14px;
    color: red;
    cursor: pointer;
  }
  .resources {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .resources .heading {
    font-size: 20px;
    font-weight: 400;
  }
  .resources-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .single-workshop-back-btn {
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
  .resource-card {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    font-weight: 400;
    color: #468aef;
    padding: 20px 20px;
    background: #f2f4f8;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .resource-card p {
    white-space: nowrap;
  }
  .resource-card svg {
    font-size: 20px;
  }
  .resource-card:hover {
    transform: scale(1.04);
    border: 1px solid #468aef;
  }
  .add-new-resource {
    border: 1px solid #468aef;
    box-shadow: none;
  }
  .animation-title {
    animation: slide-in 0.5s ease-in-out;
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
`
