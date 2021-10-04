import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import BucketListModal from '../BucketListModal'

export default function BucketList() {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/editbucketlist/:bucketListID'>
          <BucketListModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addbucketlist'>
          <BucketListModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <BucketListComponent value={value}></BucketListComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function BucketListComponent(props) {
  const { value } = props
  const param = useParams()

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  return (
    <BucketListWrapper>
      <div className='bucket-list-page'>
        <h1 className='bucket-header'>Your Bucket List</h1>
        <div className='bucket-list-container'>
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/addbucketlist`}
          >
            <div className='add-new-btn'>
              <AiOutlinePlus />
              <p>Add new task</p>
            </div>
          </Link>
          {space?.bucketList?.map((item) => {
            let count = 0
            console.log(item.previews)
            return (
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/editbucketlist/${item.id}`}
              >
                <div className='single-bucket'>
                  <h2 className='bucket-title'>{item.title}</h2>
                  <div className='bottom'>
                    <div className='left'>
                      <p className='created-on'>{item.createdOn}</p>
                      <div className='images-container'>
                        {item.previews.map((image) => {
                          count++
                          if (count > 3) {
                            return <></>
                          }
                          return (
                            <div>
                              <img src={image.source} alt='' />
                            </div>
                          )
                        })}
                      </div>
                      {item.previews.length > 3 ? (
                        <Link
                          to={`/workspace/${param.id}/details/${param.spaceKey}/bucketlistcontent/${item.id}`}
                        >
                          <div className='see-more-btn'>see more</div>
                        </Link>
                      ) : null}
                    </div>
                    <p className='bucket-type'>{item.type}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </BucketListWrapper>
  )
}

const BucketListWrapper = styled.section`
  .bucket-list-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .bucket-header {
    font-size: 20px;
    font-weight: 600;
  }
  .bucket-list-container {
    display: flex;
    flex-direction: column;
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
    border-radius: 6px;
  }
  .single-bucket {
    padding: 10px 0px;
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    border-bottom: 1px solid #e5e5e5;
  }
  .bucket-title {
    color: black;
    font-size: 20px;
    font-weight: 400;
  }
  .single-bucket .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .single-bucket .bottom .left {
    display: flex;
    gap: 20px;
  }
  .single-bucket .bottom .left .created-on {
    color: #c4c4c4;
    font-size: 12px;
  }
  .single-bucket .bottom .left .images-container {
    display: flex;
    gap: 5px;
  }
  .single-bucket .bottom .left .images-container div {
    height: 25px;
    width: 25px;
  }
  .single-bucket .bottom .left .images-container div img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .see-more-btn {
    color: #468aef;
    font-size: 12px;
    text-decoration: underline;
  }
  .bucket-type {
    color: #468aef;
    font-size: 12px;
  }
`
