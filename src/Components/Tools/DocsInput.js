import React from 'react'
import { FaUpload } from 'react-icons/fa'

export default function DocsInput(props) {
  const { setDocsList, docsList } = props
  return (
    <>
      <label
        htmlFor='doc-upload'
        style={{
          color: '#959595',
          fontSize: '12px',
          fontWeight: '500',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>Upload Doc</p>
        </div>
      </label>
      <input
        type='file'
        name='doc-upload'
        id='doc-upload'
        hidden
        multiple
        accept='.docx,.pdf'
        onChange={(e) => {
          let tempDocs = docsList
          for (let i = 0; i < e.target.files.length; i++) {
            tempDocs = [
              ...tempDocs,
              {
                docId: new Date().getTime().toString() + i,
                docFile: e.target.files[i],
              },
            ]
          }
          setDocsList(tempDocs)
        }}
      />
      <label htmlFor='doc-upload'>
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
            {docsList.length > 1 ? 'Add docs' : 'Upload Doc'}
          </div>
        </div>
      </label>
    </>
  )
}
