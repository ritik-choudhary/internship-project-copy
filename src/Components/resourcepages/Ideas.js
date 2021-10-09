import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import IdeaModal from '../ResourceModals/IdeaModal'
import IdeaPdfModal from '../ResourceModals/IdeaPdfModal'

export default function Ideas(props) {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/shareidea/readpdf'>
          <IdeaPdfModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addidea/readpdf'>
          <IdeaPdfModal />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/shareidea/:ideaID'>
          <IdeaModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/editidea/:ideaID'>
          <IdeaModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addidea'>
          <IdeaModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return <IdeasComponent value={value} {...props}></IdeasComponent>
        }}
      </WorkspaceConsumer>
    </>
  )
}

function IdeasComponent(props) {
  const param = useParams()
  const { value, isSharing } = props
  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)

  return (
    <>
      {isSharing ? (
        <IdeasWrapper>
          <div className='ideas-page'>
            <h1 className='ideas-page-header'>All</h1>
            <div className='ideas-container'>
              {resource?.ideas?.map((item) => {
                return (
                  <Link
                    to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/shareidea/${item.id}`}
                  >
                    <div className='ideas-card' key={item.id}>
                      <div className='card-info'>
                        <h4 className='title'>
                          {item.title.length > 12
                            ? `${item.title.slice(0, 12)}...`
                            : item.title}
                        </h4>
                        <p className='created-on'>{item.createdOn}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </IdeasWrapper>
      ) : (
        <IdeasWrapper>
          <div className='ideas-page'>
            <h1 className='ideas-page-header'>All</h1>
            <div className='ideas-container'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addidea`}
              >
                <div className='add-new-btn'>
                  <AiOutlinePlus />
                  <p>Add new</p>
                </div>
              </Link>
              {resource?.ideas?.map((item) => {
                return (
                  <Link
                    to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/editidea/${item.id}`}
                  >
                    <div className='ideas-card' key={item.id}>
                      <div className='card-info'>
                        <h4 className='title'>
                          {item.title.length > 12
                            ? `${item.title.slice(0, 12)}...`
                            : item.title}
                        </h4>
                        <p className='created-on'>{item.createdOn}</p>
                      </div>

                      <div className='delete-btn'>
                        <RiDeleteBin6Line
                          onClick={(e) => {
                            e.preventDefault()
                            value.deleteIdea(
                              param.id,
                              param.spaceKey,
                              param.clubID,
                              param.resourceID,
                              item.id
                            )
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </IdeasWrapper>
      )}
    </>
  )
}

const IdeasWrapper = styled.section`
  .ideas-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .ideas-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .ideas-container {
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
    border-radius: 6px;
  }
  .ideas-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    height: 56px;
    background: #f2f4f8;
    border-radius: 6px;
    cursor: pointer;
  }
  .ideas-card:hover {
    border: 1px solid #468aef;
    transform: scale(1.02);
  }
  .card-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .ideas-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .ideas-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .ideas-card .delete-btn {
    color: #c4c4c4;
  }
  .ideas-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
