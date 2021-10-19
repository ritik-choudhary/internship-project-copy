import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'

export default function OngoingModal() {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return <OngoingModalComponent value={value}></OngoingModalComponent>
      }}
    </WorkspaceConsumer>
  )
}

function OngoingModalComponent(props) {
  const { value } = props
  const history = useHistory()

  const defaultDate = new Date().toISOString().substring(0, 10)

  const [title, setTitle] = useState()
  const [company, setCompany] = useState()
  const [startDate, setStartDate] = useState(defaultDate)
  const [description, setDescription] = useState()
  const [linkToAdd, setLinkToAdd] = useState()
  const [links, setLinks] = useState([])
  const [pdfList, setPdfList] = useState([])
  const [pdfPreview, setPdfPreview] = useState([])

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
    if (pdfList) {
      setPdfPreview([])
      pdfList.forEach((pdf) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPdfPreview((pdfPreview) => [
            ...pdfPreview,
            { previewId: pdf.pdfId, source: reader.result },
          ])
        }
        reader.readAsDataURL(pdf.pdfFile)
      })
    } else {
      setPdfPreview([])
    }
  }, [pdfList])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '450px',
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
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 30px',
          borderBottom: '1px solid #DEDEDE',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '700',
          }}
        >
          Add new internship
        </h3>
        <Link to='/internships'>
          <AiOutlineClose
            style={{
              fontSize: '20px',
              color: '#C4C4C4',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>
      <form
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '22px 32px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault()
            history.push('/internships')
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          value.addNewOngoingInternship({
            id: new Date().getTime().toString(),
            title: title,
            company: company,
            startDate: startDate,
            description: description,
            links: links,
            pdfPreview: pdfPreview,
            pdfList: pdfList,
          })
          history.push('/internships')
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='title'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            maxLength='100'
            autoFocus
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='company'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Company
          </label>
          <input
            type='text'
            name='company'
            id='company'
            maxLength='30'
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='start-date'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Start Date
          </label>
          <input
            type='date'
            name='start-date'
            id='start-date'
            required
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='description'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Description
          </label>

          <textarea
            id='description'
            name='description'
            rows='4'
            cols='50'
            maxLength='500'
            style={{
              borderRadius: '5px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '12px',
              padding: '3px 8px',
              fontFamily: 'Open Sans',
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='links'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>Add Links</p>
            <AiOutlinePlus
              style={{
                fontSize: '16px',
                color: '#0063FF',
                cursor: 'pointer',
              }}
              onClick={() => {
                if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                  setLinks([...links, linkToAdd])
                  setLinkToAdd('')
                }
              }}
            />
          </label>
          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <input
              type='url'
              name='links'
              id='links'
              style={{
                width: '100%',
                borderRadius: '5px',
                height: '32px',
                outline: 'none',
                border: '1px solid #C4C4C4',
                fontSize: '16px',
                padding: '3px 8px',
              }}
              value={linkToAdd}
              onChange={(e) => {
                setLinkToAdd(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (linkToAdd && isValidHttpUrl(linkToAdd)) {
                    setLinks([...links, linkToAdd])
                    setLinkToAdd('')
                  }
                }
              }}
            />
            <div className='link-add-btn'></div>
          </div>
          <div
            className='links-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {links?.map((item) => {
              return (
                <a
                  style={{ fontSize: '12px' }}
                  href={item}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {item.length > 40 ? `${item.slice(0, 60)}...` : item}
                </a>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='pdf'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p>Upload Docs</p>
              <AiOutlinePlus
                style={{
                  color: '#468AEF',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              />
            </div>
          </label>
          <input
            type='file'
            name='pdf'
            id='pdf'
            hidden
            accept='.docx,.pdf'
            onChange={(e) => {
              setPdfList([
                ...pdfList,
                {
                  pdfId: new Date().getTime().toString(),
                  pdfFile: e.target.files[0],
                },
              ])
            }}
          />
          <label htmlFor='pdf'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '5px',
                border: '1px dashed #468AEF',
                height: '32px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#468AEF',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                <FaUpload />
                Upload Docs
              </div>
            </div>
          </label>

          <div
            className='pdf-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {pdfList.map((pdf) => {
              const linkToPdf = pdfPreview.find(
                (item) => item.previewId === pdf.pdfId
              )

              const type =
                pdf.pdfFile.name.split('.')[
                  pdf.pdfFile.name.split('.').length - 1
                ]
              console.log('type 1', type)
              return (
                <>
                  <Link
                    to={{
                      pathname: `/internships/addnewongoing/readpdf`,
                      state: {
                        src: linkToPdf?.source,
                        fileType: type,
                      },
                    }}
                    key={pdf.pdfId}
                  >
                    <div className='pdf-file' style={{ fontSize: '12px' }}>
                      {pdf.pdfFile.name.length > 15
                        ? `${pdf.pdfFile.name.slice(0, 15)}...`
                        : pdf.pdfFile.name}
                    </div>
                  </Link>
                </>
              )
            })}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Link to='/internships'>
            <div
              style={{
                color: '#FF0000',
                border: 'none',
                background: 'none',
                padding: '10px 20px',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              Cancel
            </div>
          </Link>
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
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}
