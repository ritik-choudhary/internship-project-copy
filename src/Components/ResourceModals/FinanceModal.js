import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FaCheckSquare } from 'react-icons/fa'
import { AiFillCloseCircle, AiOutlinePlus } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'

export default function FinanceModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return (
          <FinanceModalComponent
            value={value}
            {...props}
          ></FinanceModalComponent>
        )
      }}
    </WorkspaceConsumer>
  )
}

function FinanceModalComponent(props) {
  const { value, isEditing } = props

  let count = 0

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState()
  const [createdBy, setCreatedBy] = useState()
  const [financer, setFinancer] = useState()
  const [company, setCompany] = useState()
  const [personalDetails, setPersonalDetails] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])

  const [financeToEdit, setFinanceToEdit] = useState()

  useEffect(() => {
    if (isEditing) {
      const selectedSpace = value.workspaceElements.find(
        (item) => item.id === param.spaceKey && item.workspaceID === param.id
      )
      const selectedClub = selectedSpace.clubs.find(
        (item) => item.id === param.clubID
      )
      const selectedResource = selectedClub.resources.find(
        (item) => item.id === param.resourceID
      )
      const selectedFinance = selectedResource.finances.find(
        (item) => item.id === param.financeID
      )
      setFinanceToEdit(selectedFinance)
      setTitle(selectedFinance.title)
      setCreatedOn(selectedFinance.createdOn)
      setCreatedBy(selectedFinance.createdBy)
      setFinancer(selectedFinance.financer)
      setCompany(selectedFinance.company)
      setPersonalDetails(selectedFinance.personalDetails)
      setLinks(selectedFinance.links)
    }
  }, [
    isEditing,
    param.id,
    param.spaceKey,
    param.clubID,
    param.resourceID,
    param.financeID,
    value.workspaceElements,
  ])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '512px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          background: 'white',
          padding: '-20px',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.31)',
        },
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '12px',
        }}
      >
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
        >
          <AiFillCloseCircle
            style={{
              fontSize: '30px',
              color: '#FFC8C8',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 30px 30px',
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (isEditing) {
            const finance = {
              title: title,
              createdOn: createdOn,
              createdBy: createdBy,
              financer: financer,
              company: company,
              personalDetails: personalDetails,
              links: links,
            }
            value.editFinance(
              param.id,
              param.spaceKey,
              param.clubID,
              param.resourceID,
              financeToEdit.id,
              finance
            )
          } else {
            const finance = {
              id: new Date().getTime().toString(),
              title: title,
              createdOn: createdOn,
              createdBy: createdBy,
              financer: financer,
              company: company,
              personalDetails: personalDetails,
              links: links,
            }
            value.addNewFinance(
              param.id,
              param.spaceKey,
              param.clubID,
              param.resourceID,
              finance
            )
          }
          history.push(
            `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`
          )
        }}
      >
        <div className='finance-note-name' style={{ paddingBottom: '20px' }}>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Untitled Finance Document'
            style={{
              width: '400px',
              border: 'none',
              outline: 'none',
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '1px',
            }}
          />
        </div>
        <div className='finance-basic-info'>
          <div className='single-option'>
            <label htmlFor='created-on'>Created on</label>
            <input
              type='date'
              name='created-on'
              id='created-on'
              value={createdOn}
              onChange={(e) => setCreatedOn(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='created-by'>Created by</label>
            <input
              type='text'
              name='created-by'
              id='created-by'
              value={createdBy}
              className={createdBy ? '' : 'skeleton'}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='financer'>Financer</label>
            <input
              type='text'
              name='financer'
              id='financer'
              value={financer}
              className={financer ? '' : 'skeleton'}
              onChange={(e) => setFinancer(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              value={company}
              className={company ? '' : 'skeleton'}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='personalDetails'>Personal details</label>
            <input
              type='text'
              name='personalDetails'
              id='personalDetails'
              value={personalDetails}
              className={personalDetails ? '' : 'skeleton'}
              onChange={(e) => setPersonalDetails(e.target.value)}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='link'>Link</label>

            <input
              type='url'
              name='link'
              id='link'
              value={linkToAdd}
              className={linkToAdd ? '' : 'skeleton'}
              onChange={(e) => setLinkToAdd(e.target.value)}
            />
            <div className='add-link-btn'>
              <AiOutlinePlus
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #468aef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1px',
                  color: '#468aef',
                  marginLeft: '-20px',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  setLinks([...links, linkToAdd])
                  setLinkToAdd('')
                }}
              />
            </div>
          </div>
          <div
            className='links-container'
            style={{
              display: 'grid',
              gap: '5px',
              gridTemplateColumns: 'repeat(5,1fr)',
            }}
          >
            {links.map((item) => {
              count++
              return (
                <div
                  className='link'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60px',
                    height: '20px',
                    background: '#C8E1FF',
                  }}
                >
                  <a
                    href={item}
                    target='_blank'
                    rel='noreferrer noopener'
                    style={{ color: 'black' }}
                  >
                    Link {count}
                  </a>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className='save-btn'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <button
            type='submit'
            style={{
              color: 'white',
              background: '#1CA806',
              border: 'none',
              outline: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaCheckSquare />
              <p>Save and go</p>
            </div>
          </button>
        </div>
      </form>
    </Modal>
  )
}
