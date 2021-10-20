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
        <Route path='/taskmanager/info/:taskID/readdoc'>
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
    if (!selectedTask) {
      selectedTask = value.taskManager[3].find(
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
          <p style={{ color: '#c4c4c4', fontSize: '12px' }}>Docs</p>
          <div
            className='doc-container'
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '50px',
              fontSize: '14px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {selectedTask?.docsList?.map((doc) => {
              const linkTodoc = selectedTask.docPreview.find(
                (item) => item.previewId === doc.docId
              )
              const type =
                doc.docFile.name.split('.')[
                  doc.docFile.name.split('.').length - 1
                ]
              return (
                <>
                  <Link
                    to={{
                      pathname: `/taskmanager/info/${param.taskID}/readdoc`,
                      state: { src: linkTodoc?.source, fileType: type },
                    }}
                    key={doc.docId}
                  >
                    <div className='doc' style={{ fontSize: '12px' }}>
                      {doc.docFile.name.length > 60
                        ? `${doc.docFile.name.slice(0, 60)}...`
                        : doc.docFile.name}
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
