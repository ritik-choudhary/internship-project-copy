import React from 'react'
import Modal from 'react-modal'
import { Link, useParams, useLocation, Switch, Route } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineFullscreen } from 'react-icons/ai'
import { WorkspaceConsumer } from '../../Context'
import { Viewer } from '@react-pdf-viewer/core'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import FullPagePdf from './FullPagePdf'

export default function PdfModal() {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/readpdf/:pdfID/fullPage'>
          <FullPagePdf />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/readpdf/:pdfID'>
          <PdfModalComponent />
        </Route>
      </Switch>
    </>
  )
}

const PdfModalComponent = () => {
  const param = useParams()
  const location = useLocation()
  const [data, setData] = React.useState()
  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          minHeight: '80vh',
          width: '493px',
          top: '23%',
          left: '50%',
          right: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -10%)',
          boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          background: 'transparent',
          padding: '-20px',
          border: 'none',
          overflow: 'visible !important',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.31)',
        },
      }}
    >
      <header
        style={{
          display: 'flex',
          height: '40px',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '12px 30px',
          background: 'transparent',
          gap: '20px',
          position: 'fixed',
          top: '-40px',
          right: '-33px',
          zIndex: '1',
        }}
      >
        <Link
          to={{
            pathname: `/workspace/${param.id}/details/${param.spaceKey}/readpdf/${param.pdfID}/fullPage`,
            state: { data: data },
          }}
        >
          <AiOutlineFullscreen
            style={{
              fontSize: '25px',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#105eee',
            }}
          />
        </Link>
        <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
          <AiFillCloseCircle
            style={{
              fontSize: '30px',
              color: '#FFC8C8',
              cursor: 'pointer',
            }}
          />
        </Link>
      </header>
      <div
        className='modal-content'
        style={{
          background: 'white',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
        }}
      >
        <WorkspaceConsumer>
          {(value) => {
            let text = ''
            const textElement = value.workspaceElements.find(
              (item) =>
                item.id === param.spaceKey && item.workspaceID === param.id
            )
            if (location.state.favourite) {
              const bookToRead = textElement.favouriteBooks.find(
                (item) => item.id === param.pdfID
              )

              text = bookToRead.preview
              setData(text)

              return (
                <div
                  className='pdf-container'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}
                >
                  {text && (
                    <>
                      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
                        <Viewer fileUrl={text} />
                      </Worker>
                    </>
                  )}
                </div>
              )
            } else {
              const bookToRead = textElement.bookShelf.find(
                (item) => item.id === param.pdfID
              )
              text = bookToRead.preview
              setData(text)
              return (
                <div
                  className='pdf-container'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%',
                  }}
                >
                  {text && (
                    <>
                      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
                        <Viewer fileUrl={text} />
                      </Worker>
                    </>
                  )}
                </div>
              )
            }
          }}
        </WorkspaceConsumer>
      </div>
    </Modal>
  )
}
