import React, { useState, useEffect } from 'react'
import Header from '../Components/Dashboard/Header'
import Tiles from '../Components/Dashboard/Tiles'
import Sidebar from '../Components/Sidebar'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../Context'

export default function Dashboard() {
  return (
    <Switch>
      <Route to='/'>
        <DashboardComponent />
      </Route>
    </Switch>
  )
}

function DashboardComponent() {
  const [showTut, setShowTut] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTut(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <>
              <div
                className='dashboard'
                style={{ overflow: `${value.tutorial ? 'hidden' : 'auto'}` }}
              >
                <Sidebar />
                <div className='dashboard-content'>
                  <Header />
                  <Tiles />
                </div>
              </div>
              {value.tutorial ? (
                showTut ? (
                  <TutorialWrapper>
                    <div className='tut-overlay'>
                      {count === 0 ? (
                        <h1
                          className='entry-animation'
                          style={{
                            color: 'white',
                            fontSize: '50px',
                            whiteSpace: 'nowrap',
                            fontWeight: '400',
                          }}
                        >
                          Welcome to your Virtual Desk!
                        </h1>
                      ) : count === 1 ? (
                        <p
                          className='entry-animation'
                          style={{
                            color: 'white',
                            fontSize: '25px',
                          }}
                        >
                          We have made the best platform for your comfort.
                          <br /> Now manage your work without any hassel at one
                          place
                        </p>
                      ) : count === 2 ? (
                        <p
                          classname='workspace-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '232px',
                            left: '92px',
                          }}
                        >
                          Click here to add a workspace
                        </p>
                      ) : count === 3 ? (
                        <p
                          classname='recents-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '267px',
                            left: '92px',
                          }}
                        >
                          Click here to check your recents
                        </p>
                      ) : count === 4 ? (
                        <p
                          classname='notes-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '302px',
                            left: '92px',
                          }}
                        >
                          Click here to make notes
                        </p>
                      ) : count === 5 ? (
                        <p
                          classname='journal-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '338px',
                            left: '92px',
                          }}
                        >
                          Jot down any thoughts or daily life in journal
                        </p>
                      ) : count === 6 ? (
                        <p
                          classname='internships-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '374px',
                            left: '92px',
                          }}
                        >
                          The portal internships through portal will be coming
                          soon. Meanwhile, you can add your other internships by
                          clicking here
                        </p>
                      ) : count === 7 ? (
                        <p
                          classname='internships-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '410px',
                            left: '92px',
                          }}
                        >
                          Check Insights of your activities here
                        </p>
                      ) : count === 8 ? (
                        <p
                          classname='internships-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '446px',
                            left: '92px',
                          }}
                        >
                          Manage your task efficiently with our Task Manager
                        </p>
                      ) : count === 9 ? (
                        <p
                          classname='internships-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '484px',
                            left: '92px',
                          }}
                        >
                          We provide more than 100 cover letters based on your
                          needs
                        </p>
                      ) : count === 10 ? (
                        <p
                          classname='internships-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '520px',
                            left: '92px',
                          }}
                        >
                          Keep all your important documents safe at one place
                        </p>
                      ) : count === 11 ? (
                        <p
                          classname='internships-click'
                          style={{
                            color: 'white',
                            fontSize: '14px',
                            position: 'absolute',
                            top: '556px',
                            left: '92px',
                          }}
                        >
                          All your trash goes here.
                        </p>
                      ) : null}
                      <button
                        className='next-btn'
                        style={{
                          color: 'white',
                          background: '#0063FF',
                          border: 'none',
                          outline: 'none',
                          padding: '10px 20px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (count > 10) {
                            setShowTut(false)
                          }
                          setCount(count + 1)
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </TutorialWrapper>
                ) : null
              ) : null}
            </>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

const TutorialWrapper = styled.section`
  .tut-overlay {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
  }
  .entry-animation {
    animation: slide-down 0.5s ease-out;
    width: 100%;
    position: absolute;
    text-align: center;
    top: 35%;
    // left: 27%;
    transform: 'translate(-27%, -35%)';
  }

  @keyframes slide-down {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .workspace-click {
    position: absolute;
  }
`
