import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ContactModal from '../ResourceModals/ContactModal'

export default function Contacts(props) {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/sharecontact/:contactID'>
          <ContactModal isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/editcontact/:contactID'>
          <ContactModal isEditing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addcontact'>
          <ContactModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <ContactsComponent value={value} {...props}></ContactsComponent>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

function ContactsComponent(props) {
  const { value, isSharing } = props
  const param = useParams()

  const space = value.workspaceElements.find(
    (item) => item.workspaceID === param.id && item.id === param.spaceKey
  )

  const club = space.clubs.find((item) => item.id === param.clubID)

  const resource = club.resources.find((item) => item.id === param.resourceID)
  return (
    <>
      {isSharing ? (
        <ContactsPageWrapper>
          <div className='contacts-page'>
            <h1 className='contacts-page-header'>All</h1>
            <div className='contacts-container'>
              {resource?.contacts?.map((item) => {
                return (
                  <Link
                    to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharecontact/${item.id}`}
                  >
                    <div className='contact-card' key={item.id}>
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
        </ContactsPageWrapper>
      ) : (
        <ContactsPageWrapper>
          <div className='contacts-page'>
            <h1 className='contacts-page-header'>All</h1>
            <div className='contacts-container'>
              <Link
                to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addcontact`}
              >
                <div className='add-new-btn'>
                  <AiOutlinePlus />
                  <p>Add new</p>
                </div>
              </Link>
              {resource?.contacts?.map((item) => {
                return (
                  <Link
                    to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/editcontact/${item.id}`}
                  >
                    <div className='contact-card' key={item.id}>
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
                            value.deleteContact(
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
        </ContactsPageWrapper>
      )}
    </>
  )
}

const ContactsPageWrapper = styled.section`
  .contacts-page {
    display: flex;
    flex-direction: column;
    padding: 0px 150px;
    padding-bottom: 56px;
    gap: 10px;
    width: 100%;
  }
  .contacts-page-header {
    font-size: 20px;
    font-weight: 600;
  }
  .contacts-container {
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
    border-radius: 6px;
  }
  .contact-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    height: 56px;
    background: #f2f4f8;
    box-sizing: border-box;
    border-radius: 6px;
    cursor: pointer;
  }
  .contact-card:hover {
    border: 1px solid #468aef;
    transform: scale(1.02);
  }
  .card-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .contact-card .card-info .title {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }
  .contact-card .card-info .created-on {
    font-size: 12px;
    color: #c4c4c4;
  }
  .contact-card .delete-btn {
    color: #c4c4c4;
  }
  .contact-card .delete-btn:hover {
    cursor: pointer;
    color: #f54848;
  }
`
