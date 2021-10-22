import React, { useState } from 'react'
import Modal from 'react-modal'
import { Link, useParams, useLocation, Switch, Route } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineFullscreen } from 'react-icons/ai'
import { Viewer } from '@react-pdf-viewer/core'
import { Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import FileViewer from 'react-file-viewer'

export default function DocumentShelfDocModal() {
  const param = useParams()
  const location = useLocation()

  const [size, setSize] = useState({
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
  })

  return (
    <Modal
      isOpen={true}
      style={{
        content: size,
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
        <AiOutlineFullscreen
          style={{
            fontSize: '25px',
            fontWeight: '500',
            color: '#105eee',
            cursor: 'pointer',
          }}
          onClick={() =>
            setSize({
              width: '100%',
              height: '100%',
              left: '0',
              right: '0',
              marginRight: '0',
              transform: 'translate(0,0)',
              boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
              borderRadius: '10px',
              background: 'transparent',
              padding: '-20px',
              border: 'none',
              overflow: 'visible !important',
            })
          }
        />

        <Link to='/documentshelf'>
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
        <div
          className='doc-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          {location.state.fileType === 'pdf'
            ? location.state.src && (
                <>
                  <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
                    <Viewer fileUrl={location.state.src} />
                  </Worker>
                </>
              )
            : location.state.src && (
                <FileViewer
                  fileType={location.state.fileType}
                  filePath={location.state.src}
                />
              )}
        </div>
      </div>
    </Modal>
  )
}
