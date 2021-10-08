import React from 'react'
import TaskFullPagePdf from './TaskFullPagePdf'
import Modal from 'react-modal'
import { Link, useParams, useLocation, Switch, Route } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineFullscreen } from 'react-icons/ai'
import { Viewer } from '@react-pdf-viewer/core'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function TaskPdfModal(props) {
  return (
    <>
      <Switch>
        <Route path='/workspace/:id/details/:spaceKey/addtodo/readpdf/readfullpage'>
          <TaskFullPagePdf isTodo />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/sharetask/readpdf/readfullpage'>
          <TaskFullPagePdf isSharing />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addtask/readpdf/readfullpage'>
          <TaskFullPagePdf />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/addtodo/readpdf'>
          <TaskPdfModalComponent {...props} />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share/sharetask/readpdf'>
          <TaskPdfModalComponent {...props} />
        </Route>
        <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/addtask/readpdf'>
          <TaskPdfModalComponent {...props} />
        </Route>
      </Switch>
    </>
  )
}

const TaskPdfModalComponent = (props) => {
  const { isTodo, isSharing } = props
  const param = useParams()
  const location = useLocation()
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
        {isTodo ? (
          <Link
            to={{
              pathname: `/workspace/${param.id}/details/${param.spaceKey}/addtodo/readpdf/readfullpage`,
              state: { data: location.state.src },
            }}
          >
            <AiOutlineFullscreen
              style={{
                fontSize: '25px',
                fontWeight: '500',
                color: '#105eee',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : isSharing ? (
          <Link
            to={{
              pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share/sharetask/readpdf/readfullpage`,
              state: { data: location.state.src },
            }}
          >
            <AiOutlineFullscreen
              style={{
                fontSize: '25px',
                fontWeight: '500',
                color: '#105eee',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
          <Link
            to={{
              pathname: `/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/addtask/readpdf/readfullpage`,
              state: { data: location.state.src },
            }}
          >
            <AiOutlineFullscreen
              style={{
                fontSize: '25px',
                fontWeight: '500',
                color: '#105eee',
                cursor: 'pointer',
              }}
            />
          </Link>
        )}
        {isTodo ? (
          <Link to={`/workspace/${param.id}/details/${param.spaceKey}`}>
            <AiFillCloseCircle
              style={{
                fontSize: '30px',
                color: '#FFC8C8',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : isSharing ? (
          <Link
            to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}/share`}
          >
            <AiFillCloseCircle
              style={{
                fontSize: '30px',
                color: '#FFC8C8',
                cursor: 'pointer',
              }}
            />
          </Link>
        ) : (
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
        )}
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
        <div
          className='pdf-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          {location.state.src && (
            <>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
                <Viewer fileUrl={location.state.src} />
              </Worker>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
