import React from 'react'
import Modal from 'react-modal'
import { WorkspaceConsumer } from '../../Context'
import { Link, Route, useParams, Switch } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import InternshipsPdfModal from './InternshipsPdfModal'

export default function LinksAndPdfsModal() {
  return (
    <>
      <Switch>
        <Route path='/internships/docs/:internshipID/readpdf'>
          <InternshipsPdfModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <LinksAndPdfsModalComponent
              value={value}
            ></LinksAndPdfsModalComponent>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

function LinksAndPdfsModalComponent(props) {
  const { value } = props
  const param = useParams()

  const selectedInternship = value.internships.find(
    (item) => item.id === param.internshipID
  )
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
            color: '#468AEF',
          }}
        >
          Docs and other resources
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
      <section
        style={{
          padding: '22px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ color: '#c4c4c4', fontSize: '12px' }}>Pdf</p>
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
            {selectedInternship.pdfList.map((pdf) => {
              const linkToPdf = selectedInternship.pdfPreview.find(
                (item) => item.previewId === pdf.pdfId
              )
              return (
                <>
                  <Link
                    to={{
                      pathname: `/internships/docs/${param.internshipID}/readpdf`,
                      state: { src: linkToPdf?.source },
                    }}
                    key={pdf.pdfId}
                  >
                    <div className='pdf' style={{ fontSize: '12px' }}>
                      {pdf.pdfFile.name.length > 30
                        ? `${pdf.pdfFile.name.slice(0, 30)}...`
                        : pdf.pdfFile.name}
                    </div>
                  </Link>
                </>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ color: '#c4c4c4', fontSize: '12px' }}>Links</p>
          <div
            className='links-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {selectedInternship.links.map((item) => {
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
      </section>
    </Modal>
  )
}
