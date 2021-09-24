import React from 'react'
import Modal from 'react-modal'
import { useLocation, Link, useParams } from 'react-router-dom'
import { Viewer } from '@react-pdf-viewer/core'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function MeetingFullPagePdf() {
  const location = useLocation()
  const param = useParams()
  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '1342px',
          height: '95%',
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
          background: 'rgba(0, 0, 0)',
        },
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px 20px',
          position: 'fixed',
          top: '0px',
          right: '0px',
          zIndex: '1',
        }}
      >
        <Link
          to={`/workspace/${param.id}/details/${param.spaceKey}/insideclub/${param.clubID}/resourcedata/${param.resourceID}`}
        >
          <AiFillCloseCircle
            style={{ color: '#FFC8C8', fontSize: '30px', cursor: 'pointer' }}
          />
        </Link>
      </header>
      <div
        className='pdf-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
        }}
      >
        {location.state.data && (
          <>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
              <Viewer fileUrl={location.state.data} />
            </Worker>
          </>
        )}
      </div>
    </Modal>
  )
}
