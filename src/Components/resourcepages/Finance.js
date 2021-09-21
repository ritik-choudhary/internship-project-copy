import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import FinanceModal from '../ResourceModals/FinanceModal'

export default function Finance() {
  return (
    <FinancePageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/editfinance/:financeID'>
          <FinanceModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addfinance'>
          <FinanceModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <FinanceComponent value={value}></FinanceComponent>
        }}
      </WorkspaceConsumer>
    </FinancePageWrapper>
  )
}

function FinanceComponent(props) {
  const { value } = props
  const param = useParams()

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)
  return (
    <div className='finance-page'>
      <h1 className='finance-page-header'>All</h1>
      <div className='finance-container'>
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addfinance`}
        >
          <div className='add-new-btn'>
            <AiOutlinePlus />
            <p>Add new</p>
          </div>
        </Link>
        {resource?.finances?.map((item) => {
          return (
            <div className='finance-card' key={item.id}>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/editfinance/${item.id}`}
              >
                <div className='card-info'>
                  <h4 className='title'>
                    {item.title.length > 12
                      ? `${item.title.slice(0, 12)}...`
                      : item.title}
                  </h4>
                  <p className='created-on'>{item.createdOn}</p>
                </div>
              </Link>
              <div className='delete-btn'>
                <RiDeleteBin6Line
                  onClick={() =>
                    value.deleteFinance(
                      param.id,
                      param.spaceKey,
                      param.clubID,
                      param.resourceID,
                      item.id
                    )
                  }
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const FinancePageWrapper = styled.section`
  .finance-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .finance-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .finance-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
  .add-new-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    height: 56px;
    background: #f2f4f8;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .finance-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    height: 56px;
    background: #f2f4f8;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .card-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .finance-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .finance-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .finance-card .delete-btn {
    color: #c4c4c4;
  }
  .finance-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
