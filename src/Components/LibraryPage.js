import React from 'react'
import styled from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import LibraryModal from '../Components/LibraryModal'

export default function LibraryPage() {
  const param = useParams()
  return (
    <LibraryPageWrapper>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/addfavourite'>
          <LibraryModal />
        </Route>
      </Switch>
      <div className='library-page'>
        <div className='container'>
          <h3 className='title'>My Favourites</h3>
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/addfavourite`}
          >
            <div className='add-new'>
              <AiOutlinePlus />
              <p>Add new</p>
            </div>
          </Link>
        </div>

        <div className='container'>
          <h3 className='title'>My Book Shelf</h3>
          <div className='add-new'>
            <AiOutlinePlus />
            <p>Add new</p>
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
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .container .title {
    font-size: 30px;
    font-weight: 700;
  }
  .add-new {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 25px;
    color: #468aef;
    width: 341px;
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
`
