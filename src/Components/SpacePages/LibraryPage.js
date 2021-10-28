import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlus, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import LibraryModal from '../Library/LibraryModal'
import { WorkspaceConsumer } from '../../Context'
import { RiDeleteBin6Line } from 'react-icons/ri'
import PdfModal from '../Library/PdfModal'

export default function LibraryPage() {
  const param = useParams()

  const backgroundImages = [
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1468273519810-d3fe4c125cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1475243907012-e01b4e4b0a1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608993969690-624ce1e6807e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1499332309261-096aa86a939d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1533669955142-6a73332af4db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492539438225-2666b2a98f93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/5984614/pexels-photo-5984614.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4069089/pexels-photo-4069089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5984591/pexels-photo-5984591.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/4218709/pexels-photo-4218709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2765617/pexels-photo-2765617.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/1204743/pexels-photo-1204743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/326624/pexels-photo-326624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5503752/pexels-photo-5503752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  ]

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
                      let randomIndex = Math.floor(
                        Math.random() * backgroundImages.length
                      )
                      if (singleBook.pdf) {
                        name = singleBook.pdf.name
                        return (
                          <Link
                            to={{
                              pathname: `/workspace/${param.id}/details/${param.spaceKey}/readpdf/${singleBook.id}`,
                              state: { favourite: true },
                            }}
                          >
                            <div className='book-card' key={singleBook.id}>
                              <div className='book-card-image-container'>
                                <img
                                  src={backgroundImages[randomIndex]}
                                  alt='book'
                                />
                              </div>
                              <div className='book-card-btns'>
                                <h4
                                  style={{
                                    color: 'white',
                                    fontWeight: '400',
                                  }}
                                >
                                  {singleBook.title
                                    ? singleBook.title.length > 15
                                      ? `${singleBook.title.slice(0, 15)}...`
                                      : singleBook.title
                                    : name.length > 15
                                    ? `${name.slice(0, 15)}...`
                                    : name}
                                </h4>
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                  }}
                                >
                                  <AiFillHeart
                                    className='book-favourite-toggle'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      value.toggleFavourite(
                                        param.id,
                                        param.spaceKey,
                                        singleBook.favourite,
                                        singleBook.id
                                      )
                                    }}
                                  />
                                  <RiDeleteBin6Line
                                    className='book-delete-btn'
                                    onClick={(e) => {
                                      e.preventDefault()
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
                            </div>
                          </Link>
                        )
                      } else {
                        return (
                          <a
                            href={singleBook.link}
                            target='_blank'
                            rel='noreferrer noopener'
                          >
                            <div className='book-card' key={singleBook.id}>
                              <div className='book-card-image-container'>
                                <img
                                  src={backgroundImages[randomIndex]}
                                  alt='book'
                                />
                              </div>
                              <div className='book-card-btns'>
                                <h4
                                  style={{ color: 'white', fontWeight: '400' }}
                                >
                                  {singleBook.title
                                    ? singleBook.title.length > 15
                                      ? `${singleBook.title.slice(0, 15)}...`
                                      : singleBook.title
                                    : singleBook.link.length > 15
                                    ? `${singleBook.link.slice(8, 22)}...`
                                    : singleBook.link}
                                </h4>
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                  }}
                                >
                                  <AiFillHeart
                                    className='book-favourite-toggle'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      value.toggleFavourite(
                                        param.id,
                                        param.spaceKey,
                                        singleBook.favourite,
                                        singleBook.id
                                      )
                                    }}
                                  />
                                  <RiDeleteBin6Line
                                    className='book-delete-btn'
                                    onClick={(e) => {
                                      e.preventDefault()
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
                            </div>
                          </a>
                        )
                      }
                    })
                  }
                  return <div key={Math.floor(Math.random() * 100000)}></div>
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
                  return item?.bookShelf?.map((singleBook) => {
                    let name = ''
                    let randomIndex = Math.floor(
                      Math.random() * backgroundImages.length
                    )
                    if (singleBook.pdf) {
                      name = singleBook.pdf.name
                      return (
                        <Link
                          to={{
                            pathname: `/workspace/${param.id}/details/${param.spaceKey}/readpdf/${singleBook.id}`,
                            state: { favourite: false },
                          }}
                        >
                          <div className='book-card' key={singleBook.id}>
                            <div className='book-card-image-container'>
                              <img
                                src={backgroundImages[randomIndex]}
                                alt='book'
                              />
                            </div>
                            <div className='book-card-btns'>
                              <h4 style={{ color: 'white', fontWeight: '400' }}>
                                {singleBook.title
                                  ? singleBook.title.length > 15
                                    ? `${singleBook.title.slice(0, 15)}...`
                                    : singleBook.title
                                  : name.length > 15
                                  ? `${name.slice(0, 15)}...`
                                  : name}
                              </h4>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'center',
                                }}
                              >
                                {singleBook.favourite ? (
                                  <AiFillHeart
                                    className='book-favourite-toggle'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      value.toggleFavourite(
                                        param.id,
                                        param.spaceKey,
                                        singleBook.favourite,
                                        singleBook.id
                                      )
                                    }}
                                  />
                                ) : (
                                  <AiOutlineHeart
                                    className='book-favourite-toggle'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      value.toggleFavourite(
                                        param.id,
                                        param.spaceKey,
                                        singleBook.favourite,
                                        singleBook.id
                                      )
                                    }}
                                  />
                                )}
                                <RiDeleteBin6Line
                                  className='book-delete-btn'
                                  onClick={(e) => {
                                    e.preventDefault()
                                    value.deleteBook(
                                      singleBook.favourite,
                                      singleBook.id,
                                      param.id,
                                      param.spaceKey
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    } else {
                      return (
                        <a
                          href={singleBook.link}
                          target='_blank'
                          rel='noreferrer noopener'
                        >
                          <div className='book-card' key={singleBook.id}>
                            <div className='book-card-image-container'>
                              <img
                                src={backgroundImages[randomIndex]}
                                alt='book'
                              />
                            </div>
                            <div className='book-card-btns'>
                              <h4 style={{ color: 'white', fontWeight: '400' }}>
                                {singleBook.title
                                  ? singleBook.title.length > 15
                                    ? `${singleBook.title.slice(0, 15)}...`
                                    : singleBook.title
                                  : singleBook.link.length > 15
                                  ? `${singleBook.link.slice(8, 22)}...`
                                  : singleBook.link}
                              </h4>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'center',
                                }}
                              >
                                {singleBook.favourite ? (
                                  <AiFillHeart
                                    className='book-favourite-toggle'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      value.toggleFavourite(
                                        param.id,
                                        param.spaceKey,
                                        singleBook.favourite,
                                        singleBook.id
                                      )
                                    }}
                                  />
                                ) : (
                                  <AiOutlineHeart
                                    className='book-favourite-toggle'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      value.toggleFavourite(
                                        param.id,
                                        param.spaceKey,
                                        singleBook.favourite,
                                        singleBook.id
                                      )
                                    }}
                                  />
                                )}
                                <RiDeleteBin6Line
                                  className='book-delete-btn'
                                  onClick={(e) => {
                                    e.preventDefault()
                                    value.deleteBook(
                                      singleBook.favourite,
                                      singleBook.id,
                                      param.id,
                                      param.spaceKey
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </a>
                      )
                    }
                  })
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
    padding: 0px 150px;
    padding-bottom: 56px;
    padding-top: 0;
    width: 100%;
  }
  .top {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 35vh;
    margin-bottom: 10px;
  }
  .my-favourites,
  .book-shelf {
    font-size: 20px;
    font-weight: 400;
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
    border-radius: 5px;
  }
  .add-new:hover {
    cursor: pointer;
    transform: scale(1.07);
    border: 1px solid #0063ff;
  }
  .storage {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
  }
  .book-card {
    position: relative;
    color: #fff;
    height: 56px;
    background: pink;
    border-radius: 5px;
    overflow: hidden;
    background: linear-gradient(to bottom, grey, black);
  }
  .book-card-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .book-card-image-container img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.45;
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
    position: absolute;
    top: 34%;
    padding: 0 10px;
  }
  .book-card a {
    font-size: 15px;
    color: white;
  }
  .book-favourite-toggle {
    color: red;
  }
  .book-delete-btn:hover {
    color: #f54848;
  }
`
