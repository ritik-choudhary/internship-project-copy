import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import OtherOptionModal from '../ResourceModals/OtherOptionModal'

export default function OtherOption(props) {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/shareotherOption/:otherOptionID'>
          <OtherOptionModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/editotherOption/:otherOptionID'>
          <OtherOptionModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/addotherOption'>
          <OtherOptionModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <OtherOptionComponent
              value={value}
              {...props}
            ></OtherOptionComponent>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

function OtherOptionComponent(props) {
  const param = useParams()
  const { value, isSharing } = props
  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const workshop = space.workshops.find((item) => item.id === param.workshopID)

  const resource = workshop.resources.find(
    (item) => item.id === param.resourceID
  )
  return (
    <>
      {isSharing ? (
        <OtherOptionWrapper>
          <div className='otherOption-page'>
            <h1 className='otherOption-page-header'>All</h1>
            <div className='otherOption-container'>
              {resource?.otherOptionList?.map((item) => {
                return (
                  <div className='otherOption-card' key={item.id}>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/shareotherOption/${item.id}`}
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
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </OtherOptionWrapper>
      ) : (
        <OtherOptionWrapper>
          <div className='otherOption-page'>
            <h1 className='otherOption-page-header'>All</h1>
            <div className='otherOption-container'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/addotherOption`}
              >
                <div className='add-new-btn'>
                  <AiOutlinePlus />
                  <p>Add new</p>
                </div>
              </Link>
              {resource?.otherOptionList?.map((item) => {
                return (
                  <div className='otherOption-card' key={item.id}>
                    <Link
                      to={`/workspace/${param.id}/details/${param.spaceKey}/insideworkshop/${param.workshopID}/resourcedata/${param.resourceID}/editotherOption/${item.id}`}
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
                          value.deleteOtherOption(
                            param.id,
                            param.spaceKey,
                            param.workshopID,
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
        </OtherOptionWrapper>
      )}
    </>
  )
}

const OtherOptionWrapper = styled.section`
  .otherOption-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .otherOption-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .otherOption-container {
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
  .otherOption-card {
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
  .otherOption-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .otherOption-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .otherOption-card .delete-btn {
    color: #c4c4c4;
  }
  .otherOption-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
