import React from 'react'
import { WorkspaceConsumer } from '../../Context'
import Modal from 'react-modal'
import styled from 'styled-components'
import { AiFillCloseCircle } from 'react-icons/ai'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import MeetingPdfModal from '../MeetingNotesComponents/MeetingPdfModal'

export default function MeetingNotes() {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/sharemeetingnotes/readpdf'>
          <MeetingPdfModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <MeetingNotesComponent value={value}></MeetingNotesComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function MeetingNotesComponent(props) {
  const { value } = props
  const param = useParams()

  const selectedSpace = value.workspaceElements.find(
    (item) => item.id === param.spaceKey
  )

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
      <MeetingNotesWrapper>
        <div className='meeting-page'>
          <div className='page-container'>
            <div className='meeting-header'>
              <h3>thesocialcomment</h3>
              <div className='right-header'>
                <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
                  <div className='meeting-back-btn'>
                    <RiArrowGoBackFill /> Back
                  </div>
                </Link>
                <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
                  <div className='meeting-close-btn'>
                    <AiFillCloseCircle />
                  </div>
                </Link>
              </div>
            </div>
            <header className='meeting-title-container'>
              <div className='line'></div>
            </header>

            <div className='meeting-details'>
              <h1 className='heading'>{selectedSpace.title}</h1>
            </div>
            <div className='meeting-notes-page'>
              <header>
                <h3>All</h3>
              </header>
              <div className='storage'>
                {selectedSpace?.meetingNotes?.map((item) => {
                  return (
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/sharemeetingnotes/${item.id}`}
                    >
                      <div className='meeting-notes-card'>
                        <div className='top'>
                          <p className='title'>{item.title}</p>
                        </div>
                        <div className='bottom'>
                          <p className='created-on'>{item.createdOn}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </MeetingNotesWrapper>
    </Modal>
  )
}

const MeetingNotesWrapper = styled.section`
  .meeting-page {
    font-family: 'Open Sans', sans-serif;
    display: flex;
  }

  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .meeting-header {
    padding: 10px 50px 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }

  .meeting-header h3 {
    color: white;
    margin-left: -130px;
  }

  .right-header {
    display: flex;
    align-items: center;
    gap: 70px;
  }
  .bell-icon {
    color: #ffca10;
  }

  .meeting-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .meeting-title-container .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 400;
  }

  .meeting-details {
    padding: 0px 150px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .meeting-details .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .meeting-details .info .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    color: #468aef;
  }

  .meeting-close-btn {
    color: #ffc8c8;
    font-size: 30px;
  }
  .line {
    width: 100%;
    height: 1.5px;
    background: #e5e5e5;
  }

  .meeting-back-btn {
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

  .meeting-notes-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    padding-top: 0;
    width: 100%;
  }
  .meeting-notes-page header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  .meeting-notes-page h3 {
    font-weight: 400;
    padding-bottom: 10px;
  }

  .storage {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
  }
  .meeting-notes-card {
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
  .meeting-notes-card:hover {
    transform: translateY(-3px);
  }
  .meeting-notes-card .title {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }
  .meeting-notes-card .bottom {
    display: flex;
    justify-content: space-between;
  }
  .meeting-notes-card .created-on {
    color: #c4c4c4;
  }
`
