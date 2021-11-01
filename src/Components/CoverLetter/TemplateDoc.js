import React, { useState } from 'react'
import Modal from 'react-modal'
import { Link, useLocation } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function TemplateDocModal() {
  return <TemplateDocModalComponent />
}

const TemplateDocModalComponent = () => {
  const location = useLocation()

  const fileUrl = location.state.src

  const [text, setText] = useState()

  fetch(fileUrl)
    .then((r) => r.text())
    .then((t) => setText(t))

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          minHeight: '80vh',
          width: '1132px',
          top: '50%',
          left: '50%',
          right: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          background: 'transparent',
          padding: '-20px',
          border: 'none',
          overflow: 'hidden',
        },
        overlay: {
          background: 'rgba(0, 0, 0, 0.31)',
        },
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          background: 'white',
          borderRadius: '10px 10px 0px 0px',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#468aef' }}>
          {location.state.name}
        </h2>
        <Link to={`/coverlettertemplates`}>
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
        className='scroll-on-hover'
        style={{
          background: 'white',
          borderRadius: '0px 0px 10px 10px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
          padding: '20px',
          textAlign: 'justify',
        }}
      >
        {text?.split('\n')?.map((item) => {
          return (
            <p>
              {item}
              <br />
            </p>
          )
        })}
      </div>
    </Modal>
  )
}
