import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useParams, Link, useHistory } from 'react-router-dom'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
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
  const { value, isEditing, isSharing } = props
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`

  let count = 0

  const param = useParams()
  const history = useHistory()

  const [title, setTitle] = useState()
  const [createdOn, setCreatedOn] = useState(date)
  const [createdBy, setCreatedBy] = useState()
  const [financersList, setFinancersList] = useState([])
  const [financerToAdd, setFinancerToAdd] = useState('')
  const [sponsorsList, setSponsorsList] = useState([])
  const [sponsorToAdd, setSponsorToAdd] = useState()
  const [company, setCompany] = useState()
  const [personalDetails, setPersonalDetails] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])

  const [financeToEdit, setFinanceToEdit] = useState()

  function isValidHttpUrl(string) {
    let url

    try {
      url = new URL(string)
    } catch (_) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  useEffect(() => {
    if (isEditing || isSharing) {
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
      setFinancersList(selectedFinance.financersList)
      setSponsorsList(selectedFinance.sponsorsList)
      setCompany(selectedFinance.company)
      setPersonalDetails(selectedFinance.personalDetails)
      setLinks(selectedFinance.links)
    }
  }, [
    isSharing,
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
        {isSharing ? (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`}
          >
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
          >
            <AiOutlineClose
              style={{
                fontSize: '20px',
                color: '#C4C4C4',
                cursor: 'pointer',
              }}
            />
          </Link>
        )}
      </header>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 30px 30px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            if (!isSharing) {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`
              )
            } else {
              history.push(
                `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`
              )
            }
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          if (!isSharing) {
            if (isEditing) {
              const finance = {
                title: title,
                createdOn: createdOn,
                createdBy: createdBy,
                financersList: financersList,
                sponsorsList: sponsorsList,
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
                financersList: financersList,
                sponsorsList: sponsorsList,
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
          } else {
            history.push(
              `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`
            )
          }
        }}
      >
        <div className='finance-note-name' style={{ paddingBottom: '20px' }}>
          <input
            autoFocus
            required
            type='text'
            name='name'
            id='name'
            maxLength='100'
            value={title}
            onChange={(e) => {
              if (!isSharing) setTitle(e.target.value)
            }}
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
            <p style={{ fontSize: '14px', color: '#468AEF' }}>{createdOn}</p>
          </div>
          <div className='single-option'>
            <label htmlFor='created-by'>Created by</label>
            <input
              type='text'
              name='created-by'
              id='created-by'
              maxLength='100'
              value={createdBy}
              className={createdBy ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setCreatedBy(e.target.value)
              }}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='financer'>Financer</label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                justifyContent: 'flex-end',
              }}
            >
              <input
                type='text'
                name='financer'
                id='financer'
                maxLength='30'
                disabled={isSharing}
                value={financerToAdd}
                className={financerToAdd ? '' : 'skeleton'}
                onChange={(e) => {
                  if (!isSharing) setFinancerToAdd(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (!isSharing) {
                      if (financerToAdd) {
                        setFinancersList([
                          ...financersList,
                          {
                            financer: financerToAdd,
                            id: new Date().getTime().toString(),
                          },
                        ])
                        setFinancerToAdd('')
                      }
                    }
                  }
                }}
              />

              <div className='add-financer-btn'>
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
                    marginLeft: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    if (!isSharing) {
                      if (financerToAdd) {
                        setFinancersList([
                          ...financersList,
                          {
                            financer: financerToAdd,
                            id: new Date().getTime().toString(),
                          },
                        ])
                        setFinancerToAdd('')
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className='financers-list'
            style={{
              display: `${financersList.length > 0 ? 'grid' : 'none'}`,
              gridTemplateColumns: '1fr',
              width: '52%',
              gap: '5px',
              borderRadius: '3px',
              maxHeight: '60px',
              overflow: 'auto',
              overflowX: 'hidden',
              padding: '3px 10px',
              marginLeft: '170px',
              marginRight: '10px',
              fontSize: '12px',
            }}
          >
            {financersList.map((item) => {
              return (
                <div
                  className='single-financer'
                  style={{
                    display: 'flex',
                    gap: '3px',
                    alignItems: 'center',
                    height: '20px',
                    border: '1px solid #468aef',
                    borderRadius: '5px',
                    fontSize: '12px',
                    padding: '3px',
                    color: '#468aef',
                  }}
                >
                  <p style={{ width: '90%' }}>
                    {item.financer.length > 20
                      ? `${item.slice(0, 20)}...`
                      : item.financer}
                  </p>
                  <AiOutlineClose
                    style={{ cursor: 'pointer', color: '#ff0000' }}
                    onClick={() => {
                      if (!isSharing) {
                        let tempFinancers = [...financersList]
                        const newFinancers = tempFinancers.filter(
                          (temp) => temp.id !== item.id
                        )
                        setFinancersList(newFinancers)
                      }
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div className='single-option'>
            <label htmlFor='sponsor'>Sponsor</label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                justifyContent: 'flex-end',
              }}
            >
              <input
                type='text'
                name='sponsor'
                id='sponsor'
                maxLength='50'
                value={sponsorToAdd}
                disabled={isSharing}
                className={sponsorToAdd ? '' : 'skeleton'}
                onChange={(e) => {
                  if (!isSharing) setSponsorToAdd(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (!isSharing) {
                      if (sponsorToAdd) {
                        setSponsorsList([
                          ...sponsorsList,
                          {
                            sponsor: sponsorToAdd,
                            id: new Date().getTime().toString(),
                          },
                        ])
                        setSponsorToAdd('')
                      }
                    }
                  }
                }}
              />

              <div className='add-sponsor-btn'>
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
                    marginLeft: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    if (!isSharing) {
                      if (sponsorToAdd) {
                        setSponsorsList([
                          ...sponsorsList,
                          {
                            sponsor: sponsorToAdd,
                            id: new Date().getTime().toString(),
                          },
                        ])
                        setSponsorToAdd('')
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className='sponsors-list'
            style={{
              display: `${sponsorsList.length > 0 ? 'grid' : 'none'}`,
              gridTemplateColumns: '1fr',
              width: '52%',
              gap: '5px',
              borderRadius: '3px',
              maxHeight: '60px',
              overflow: 'auto',
              overflowX: 'hidden',
              padding: '3px 10px',
              marginLeft: '170px',
              marginRight: '10px',
            }}
          >
            {sponsorsList.map((item) => {
              return (
                <div
                  className='single-sponsor'
                  style={{
                    display: 'flex',
                    gap: '3px',
                    alignItems: 'center',
                    height: '20px',
                    border: '1px solid #468aef',
                    borderRadius: '5px',
                    fontSize: '12px',
                    padding: '3px',
                    color: '#468aef',
                  }}
                >
                  <p style={{ width: '90%' }}>
                    {item.length > 20
                      ? `${item.sponsor.slice(0, 20)}...`
                      : item.sponsor}
                  </p>

                  <AiOutlineClose
                    style={{ cursor: 'pointer', color: '#ff0000' }}
                    onClick={() => {
                      if (!isSharing) {
                        let tempSponsors = [...sponsorsList]
                        const newSponsors = tempSponsors.filter(
                          (temp) => temp.id !== item.id
                        )
                        setSponsorsList(newSponsors)
                      }
                    }}
                  />
                </div>
              )
            })}
          </div>
          <div className='single-option'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              maxLength='100'
              value={company}
              className={company ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setCompany(e.target.value)
              }}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='personalDetails'>Personal details</label>
            <input
              type='text'
              name='personalDetails'
              id='personalDetails'
              maxLength='100'
              value={personalDetails}
              className={personalDetails ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setPersonalDetails(e.target.value)
              }}
            />
          </div>
          <div className='single-option'>
            <label htmlFor='link'>Link</label>

            <input
              type='url'
              name='link'
              id='link'
              disabled={isSharing}
              value={linkToAdd}
              className={linkToAdd ? '' : 'skeleton'}
              onChange={(e) => {
                if (!isSharing) setLinkToAdd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (!isSharing) {
                    if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                      setLinks([
                        ...links,
                        {
                          link: linkToAdd,
                          id: new Date().getTime().toString(),
                        },
                      ])
                      setLinkToAdd('')
                    }
                  }
                }
              }}
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
                  if (!isSharing) {
                    if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                      setLinks([
                        ...links,
                        {
                          link: linkToAdd,
                          id: new Date().getTime().toString(),
                        },
                      ])
                      setLinkToAdd('')
                    }
                  }
                }}
              />
            </div>
          </div>
          <div
            className='links-container'
            style={{
              display: `${links.length > 0 ? 'grid' : 'none'}`,
              gap: '3px',
              gridTemplateColumns: 'repeat(3,1fr)',
              marginLeft: '179px',
              width: '50%',
              maxHeight: '40px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {links.map((item) => {
              count++
              return (
                <div
                  className='link'
                  style={{
                    display: 'flex',

                    alignItems: 'center',
                    width: '60px',
                    height: '20px',
                    border: '1px solid #468AEF',
                    borderRadius: '5px',
                    fontSize: '12px',
                    gap: '5px',
                    padding: '0 5px',
                    whiteSpace: 'nowrap',
                  }}
                  key={count}
                >
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noreferrer noopener'
                    style={{
                      color: '#468AEF',
                      fontSize: '12px',
                      fontWeight: '400',
                      width: '80%',
                    }}
                  >
                    Link {count}
                  </a>
                  <AiOutlineClose
                    style={{ color: '#f54848', cursor: 'pointer' }}
                    onClick={() => {
                      if (!isSharing) {
                        let tempLinks = [...links]
                        const newLinks = tempLinks.filter(
                          (temp) => temp.id !== item.id
                        )
                        setLinks(newLinks)
                      }
                    }}
                  />
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
              background: '#0063FF',
              border: 'none',
              outline: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <p>Save</p>
            </div>
          </button>
        </div>
      </form>
    </Modal>
  )
}
