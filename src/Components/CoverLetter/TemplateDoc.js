import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaRegCopy } from 'react-icons/fa'

export default function TemplateDocModal() {
  return <TemplateDocModalComponent />
}

const TemplateDocModalComponent = () => {
  const location = useLocation()
  const history = useHistory()

  const fileUrl = location.state.src

  const [text, setText] = useState()
  const [copied, setCopied] = useState(false)

  const [msg, setMsg] = useState('Copied')

  fetch(fileUrl)
    .then((r) => r.text())
    .then((t) => setText(t))

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setMsg('')
        setCopied(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    setMsg('Copied')
  }, [copied])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          minHeight: '90vh',
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
        {copied ? (
          <p style={{ color: 'green', fontSize: '16px' }}>{msg}</p>
        ) : null}

        <div
          className='right'
          style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          <FaRegCopy
            style={{
              fontSize: '20px',
              cursor: 'pointer',
              color: '#468aef',
            }}
            onClick={() => {
              navigator.clipboard.writeText(text)
              setCopied(true)
            }}
          />
          <Link to={`/coverlettertemplates`}>
            <AiFillCloseCircle
              style={{
                fontSize: '30px',
                color: '#FFC8C8',
                cursor: 'pointer',
              }}
            />
          </Link>
        </div>
      </header>
      <div
        className='scroll-on-hover'
        style={{
          background: 'white',
          borderRadius: '0px 0px 10px 10px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
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
