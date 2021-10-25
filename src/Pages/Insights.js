import React, { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

export default function Insights() {
  const [isProductivity, setIsProductivity] = useState(true)
  const [isPerformance, setIsPerformance] = useState(false)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dates = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]

  const labels = [
    '17 Jun, 21',
    '18 Jun, 21',
    '19 Jun, 21',
    '20 Jun, 21',
    '21 Jun, 21',
    '22 Jun, 21',
    '23 Jun, 21',
    '24 Jun, 21',
    '25 Jun, 21',
    '26 Jun, 21',
    '27 Jun, 21',
    '28 Jun, 21',
    '29 Jun, 21',
    '30 Jun, 21',
    '1 July, 21',
    '2 July, 21',
    '3 July, 21',
    '4 July, 21',
    '5 July, 21',
    '6 July, 21',
    '7 July, 21',
    '8 July, 21',
    '9 July, 21',
    '10 July, 21',
    '11 July, 21',
  ]

  return (
    <InsightsWrapper>
      <div className='insights-page'>
        <Sidebar />
        <div className='page-container'>
          <div className='insights-header'>
            <Link to='/'>
              <h3>thesocialcomment</h3>
            </Link>
            <div className='right-header'>
              <FaBell className='bell-icon' />
              <Link to='/'>
                <div className='insights-back-btn'>
                  <RiArrowGoBackFill /> Back
                </div>
              </Link>
            </div>
          </div>
          <header className='insights-title-container'>
            <div className='title'>
              <h3
                className='animation-title'
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                Insights
              </h3>
            </div>
            <div className='line'></div>
          </header>
          <div className='selector'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '10px',
                cursor: 'pointer',
                borderBottom: `${
                  isProductivity ? '3px solid #468AEF' : '3px solid #e5e5e5'
                }`,
              }}
              onClick={() => {
                setIsProductivity(true)
                setIsPerformance(false)
              }}
            >
              <p>Productivity Chart</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '10px',
                cursor: 'pointer',
                borderBottom: `${
                  isPerformance ? '3px solid #468AEF' : '3px solid #e5e5e5'
                }`,
              }}
              onClick={() => {
                setIsProductivity(false)
                setIsPerformance(true)
              }}
            >
              <p>Performance</p>
            </div>
          </div>
          <div className='storage'>
            {isProductivity ? (
              <div className='productivity-storage'>
                <div className='col-1'>
                  <div className='empty-space'></div>
                  {months.map((month) => {
                    return <p>{month}</p>
                  })}
                </div>
                <div className='days-col'>
                  {dates.map((date) => {
                    return (
                      <div className='single-date-stats'>
                        <div className='single-date'>{date}</div>
                        <div className='stat'>
                          {months.map((item) => {
                            return (
                              <>
                                <div
                                  className={`box ${
                                    item === 'March' && date === '15'
                                      ? 'login-day'
                                      : item === 'May' && date === '18'
                                      ? 'activity-day'
                                      : item === 'July' && date === '20'
                                      ? 'post-day'
                                      : ''
                                  }`}
                                >
                                  <div
                                    className={`msg ${
                                      item === 'March' && date === '15'
                                        ? 'login-day-msg'
                                        : item === 'May' && date === '18'
                                        ? 'activity-day-msg'
                                        : item === 'July' && date === '20'
                                        ? 'post-day-msg'
                                        : ''
                                    }`}
                                  >
                                    {item === 'March' && date === '15' ? (
                                      <p>Login Day</p>
                                    ) : item === 'May' && date === '18' ? (
                                      <p>Activity Day</p>
                                    ) : item === 'July' && date === '20' ? (
                                      <p>Post Day</p>
                                    ) : null}
                                  </div>
                                </div>
                              </>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : isPerformance ? (
              <div className='performance-storage'>
                <div className='stats-container'>
                  <div className='stats-numbers'>
                    <h1>49</h1>
                    <p>Posts last month</p>
                  </div>
                  <div className='stats-numbers'>
                    <h1>980</h1>
                    <p>Views last month</p>
                  </div>
                </div>
                <div className='views-chart'>
                  <h3 className='chart-heading'>Views</h3>
                  <p className='chart-description'>
                    Total sum of views of all the post types against the month
                  </p>
                  <div className='views-line-chart'>
                    <Line
                      data={{
                        labels: labels,
                        datasets: [
                          {
                            data: [],
                            fill: false,
                            borderColor: '#468aef',
                            tension: 0.4,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className='post-charts-container'>
                  <div className='post-types'>
                    <h3 className='chart-heading'>Post Types</h3>
                    <p className='chart-description'>
                      How much you posted in different post types
                    </p>
                    <div className='post-types-line-chart'>
                      <Line
                        data={{
                          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                          datasets: [
                            {
                              axis: 'Y',
                              data: [],
                              fill: false,
                              borderColor: '#468aef',
                              tension: 0.4,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className='posts'>
                    <h3 className='chart-heading'>Posts</h3>
                    <p className='chart-description'>
                      How much you posted in a month
                    </p>
                    <div className='posts-line-chart'>
                      <Line
                        data={{
                          labels: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                          ],
                          datasets: [
                            {
                              label: 'Views',
                              data: [],
                              fill: false,
                              borderColor: '#468aef',
                              tension: 0.4,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </InsightsWrapper>
  )
}

const InsightsWrapper = styled.section`
  .insights-page {
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }
  .insights-page .sidebar {
    z-index: 0;
  }
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 50px;
  }
  .insights-header {
    padding: 10px 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
  }
  .insights-header h3 {
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
  .insights-back-btn {
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
  .insights-back-btn:hover {
    transform: scale(1.05);
  }
  .insights-title-container {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
  }
  .insights-title-container .title {
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
  .selector {
    padding: 10px 150px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .storage {
    padding: 0px 150px;
  }
  .productivity-storage {
    display: flex;
    gap: 20px;
  }
  .days-col {
    display: grid;
    grid-template-columns: repeat(31, 1fr);
    width: 100%;
  }
  .col-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .empty-space {
    height: 20px;
  }
  .single-date-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 21.5px;
  }
  .box {
    background: #f2f4f8;
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
  }
  .login-day {
    background: #93beff;
  }
  .activity-day {
    background: #468aef;
  }
  .post-day {
    background: #1757b5;
  }
  .msg {
    display: none;
    position: absolute;
    top: -100%;
    font-size: 10px;
    background: #928f8f;
    color: white;
    padding: 5px;
    white-space: nowrap;
    z-index: 22;
    left: -20px;
    border-radius: 5px;
    font-weight: 700;
  }
  .login-day:hover .login-day-msg {
    display: flex;
  }
  .activity-day:hover .activity-day-msg {
    display: flex;
  }
  .post-day:hover .post-day-msg {
    display: flex;
  }
  .performance-storage {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .stats-container {
    display: flex;
    align-items: center;
    gap: 100px;
  }
  .stats-numbers h1 {
    color: #468aef;
    font-weight: 400;
  }
  .stats-numbers p {
    font-size: 14px;
  }
  .views-line-chart {
    height: 300px;
  }
  .chart-heading {
    font-size: 16px;
    font-weight: 400;
  }
  .chart-description {
    font-size: 12px;
    color: #c4c4c4;
    padding-bottom: 20px;
  }
  .post-charts-container {
    display: flex;
    gap: 100px;
  }

  .post-types-line-chart {
    height: 200px;
    width: 100%;
  }
  .posts-line-chart {
    height: 200px;
    width: 100%;
  }
  .posts,
  .post-types {
    width: 50%;
  }
`
