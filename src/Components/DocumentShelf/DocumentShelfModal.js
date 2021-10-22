import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { WorkspaceConsumer } from '../../Context'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

export default function DocumentShelfModal(props) {
  return (
    <WorkspaceConsumer>
      {(value) => {
        return <DocumentShelfModalComponent value={value} {...props} />
      }}
    </WorkspaceConsumer>
  )
}

function DocumentShelfModalComponent(props) {
  const { value } = props
  const { marksheet, certificate, otherDocument, important } = props
  const history = useHistory()

  const category = marksheet
    ? 'Marksheet'
    : certificate
    ? 'Certificate'
    : otherDocument
    ? 'OtherDocument'
    : important
    ? 'Important'
    : null

  const [title, setTitle] = useState()
  const [doc, setDoc] = useState()
  const [docPreview, setDocPreview] = useState()

  useEffect(() => {
    if (doc) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDocPreview(reader.result)
      }
      reader.readAsDataURL(doc)
    }
  }, [doc])

  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: '520px',
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
          {marksheet
            ? 'Add new marksheet'
            : certificate
            ? 'Add new certificate'
            : important
            ? 'Add new important'
            : otherDocument
            ? 'Add new document'
            : null}
        </h3>
        <Link to='/documentshelf'>
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
          gap: '30px',
          padding: '22px 32px',
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 27) {
            history.push('/documentshelf')
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          value.addNewDocumentShelf({
            id: new Date().getTime().toString(),
            title: title,
            doc: doc,
            preview: docPreview,
            category: category,
          })
          history.push('/documentshelf')
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='name'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Name of the document
          </label>
          <input
            autoFocus
            required
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              borderRadius: '5px',
              height: '32px',
              outline: 'none',
              border: '1px solid #C4C4C4',
              fontSize: '16px',
              padding: '3px 8px',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            htmlFor='thumbnail'
            style={{
              color: '#959595',
              fontSize: '12px',
              marginBottom: '5px',
            }}
          >
            Select Document
          </label>
          <input
            required
            type='file'
            name='documentshelf'
            id='doc'
            accept='.docx,.pdf'
            hidden
            onChange={(e) => setDoc(e.target.files[0])}
          />
          <label htmlFor='doc'>
            <span
              className='custom-doc-btn'
              style={{
                background: 'none',
                borderRadius: '5px',
                border: '1px dashed #468AEF',
                color: '#468AEF',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none',
                display: 'block',
                textAlign: 'center',
                padding: '5px',
              }}
            >
              Upload Doc
            </span>
          </label>
          <div
            style={{
              paddingTop: '10px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              gap: '10px',
            }}
          >
            {doc
              ? doc.name.length > 60
                ? `${doc.name.slice(0, 60)}...`
                : doc.name
              : null}
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
          <Link to='/documentshelf'>
            <div
              style={{
                color: '#FF0000',
                border: 'none',
                background: 'none',
                padding: '10px 20px',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: '400',
                fontSize: '14px',
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
