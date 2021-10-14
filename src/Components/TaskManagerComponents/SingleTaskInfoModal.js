import React from 'react'
import Modal from 'react-modal'
import { WorkspaceConsumer } from '../../Context'
import { Link, Route, useParams, Switch } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import TaskPdfModal from './TaskPdfModal'

export default function SingleTaskInfoModal() {
  return (
    <>
      <Switch>
        <Route path='/taskmanager/info/:taskID/readpdf'>
          <TaskPdfModal />
        </Route>
      </Switch>
      <WorkspaceConsumer>
        {(value) => {
          return (
            <SingleTaskInfoModalComponent
              value={value}
            ></SingleTaskInfoModalComponent>
          )
        }}
      </WorkspaceConsumer>
    </>
  )
}

function SingleTaskInfoModalComponent(props) {
  const { value } = props
  const param = useParams()

  let selectedTask = value.taskManager[0].find(
    (item) => item.id === param.taskID
  )

  if (!selectedTask) {
    selectedTask = value.taskManager[1].find((item) => item.id === param.taskID)
    if (!selectedTask) {
      selectedTask = value.taskManager[2].find(
        (item) => item.id === param.taskID
      )
    }
  }

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
          {selectedTask.title}
        </h3>
        <Link to='/taskmanager'>
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
          <p style={{ color: '#c4c4c4', fontSize: '12px' }}>Created By</p>
          <h4 style={{ fontSize: '14px', fontWeight: '400' }}>
            {selectedTask.createdBy}
          </h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ color: '#c4c4c4', fontSize: '12px' }}>Due Date</p>
          <h4 style={{ fontSize: '14px', fontWeight: '400' }}>
            {selectedTask.dueDate}
          </h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ color: '#c4c4c4', fontSize: '12px' }}>Description</p>
          <h4 style={{ fontSize: '14px', fontWeight: '400' }}>
            {selectedTask.description}
          </h4>
        </div>

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
            {selectedTask?.pdfList?.map((pdf) => {
              const linkToPdf = selectedTask.pdfPreview.find(
                (item) => item.previewId === pdf.pdfId
              )
              return (
                <>
                  <Link
                    to={{
                      pathname: `/taskmanager/info/${param.taskID}/readpdf`,
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
            {selectedTask?.links?.map((item) => {
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
