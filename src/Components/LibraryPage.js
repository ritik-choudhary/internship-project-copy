import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import LibraryModal from '../Components/LibraryModal'
import { WorkspaceConsumer } from '../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import PdfModal from './PdfModal'

export default function LibraryPage() {
  const param = useParams()
  return (
    <LibraryPageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/readpdf/:pdfID'>
          <PdfModal />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addfavourite'>
          <LibraryModal favourite />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addbookshelf'>
          <LibraryModal />
        </Route>
      </Switch>
      <div className='library-page'>
        <div className='top'>
          <h3 className='my-favourites'>My Favourites</h3>
          <div className='storage'>
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/addfavourite`}
            >
              <div className='add-new'>
                <AiOutlinePlus />
                <p>Add new</p>
              </div>
            </Link>

            <WorkspaceConsumer>
              {(value) => {
                const displayItems = value.workspaceElements.filter(
                  (item) =>
                    item.id === param.spaceKey && item.workspaceID === param.id
                )
                return displayItems.map((item) => {
                  if (item.favouriteBooks) {
                    return item.favouriteBooks.map((singleBook) => {
                      let name = ''
                      if (singleBook.pdf) {
                        name = singleBook.pdf.name
                        return (
                          <div className='book-card'>
                            <div className='book-card-btns'>
                              <Link
                                to={{
                                  pathname: `/workspace/${param.id}/details/${param.spaceKey}/readpdf/${singleBook.id}`,
                                  state: { favourite: true },
                                }}
                              >
                                <h4 style={{ color: 'white' }}>{name}</h4>
                              </Link>
                              <RiDeleteBin6Line
                                onClick={(e) => {
                                  const favourite = true
                                  value.deleteBook(
                                    favourite,
                                    singleBook.id,
                                    param.id,
                                    param.spaceKey
                                  )
                                }}
                              />
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <a href={singleBook.link}>
                            <div className='book-card'>
                              <div className='book-card-btns'>
                                <h4>{name}</h4>
                                <RiDeleteBin6Line />
                              </div>
                            </div>
                          </a>
                        )
                      }
                    })
                  }
                  return <></>
                })
              }}
            </WorkspaceConsumer>
          </div>
        </div>

        <div className='top'>
          <h3 className='book-shelf'>My Book Shelf</h3>
          <div className='storage'>
            <Link
              to={`/workspace/${param.id}/details/${param.spaceKey}/addbookshelf`}
            >
              <div className='add-new'>
                <AiOutlinePlus />
                <p>Add new</p>
              </div>
            </Link>
            <WorkspaceConsumer>
              {(value) => {
                const displayItems = value.workspaceElements.filter(
                  (item) =>
                    item.id === param.spaceKey && item.workspaceID === param.id
                )
                return displayItems.map((item) => {
                  if (item.bookShelf) {
                    return item.bookShelf.map((singleBook) => {
                      let name = ''
                      if (singleBook.pdf) {
                        name = singleBook.pdf.name
                        return (
                          <div className='book-card'>
                            <div className='book-card-btns'>
                              <Link
                                to={{
                                  pathname: `/workspace/${param.id}/details/${param.spaceKey}/readpdf/${singleBook.id}`,
                                  state: { favourite: false },
                                }}
                              >
                                <h4 style={{ color: 'white' }}>{name}</h4>
                              </Link>
                              <RiDeleteBin6Line
                                onClick={(e) => {
                                  const favourite = false
                                  value.deleteBook(
                                    favourite,
                                    singleBook.id,
                                    param.id,
                                    param.spaceKey
                                  )
                                }}
                              />
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div className='book-card'>
                            <div className='book-card-btns'>
                              <a href={singleBook.link}>
                                <h4>{name}</h4>
                              </a>
                              <RiDeleteBin6Line />
                            </div>
                          </div>
                        )
                      }
                    })
                  }
                  return <></>
                })
              }}
            </WorkspaceConsumer>
          </div>
        </div>
      </div>
    </LibraryPageWrapper>
  )
}

const LibraryPageWrapper = styled.section`
  .library-page {
    display: flex;
    flex-direction: column;
    padding: 20px 100px;
    padding-top: 0;
    gap: 130px;
    width: 100%;
    z-index: '9999999999999';
  }
  .top {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .my-favourites,
  .book-shelf {
    font-size: 30px;
    font-weight: 700;
    color: #105eee;
  }
  .add-new {
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
  .add-new:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .storage {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  .book-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #fff;
    height: 56px;
    background: pink;
    border: 1px solid #468aef;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .book-card:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .book-card-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
