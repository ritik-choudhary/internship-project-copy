import './App.css'
import Dashboard from './Pages/Dashboard'
import Trash from './Pages/TrashPage'
import Workspace from './Pages/WorkspacePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Modal from 'react-modal'
import Details from './Pages/Details'
import SingleClubPage from './Pages/SingleClubPage'
import ResourcePage from './Pages/ResourcePage'
import SingleMoodboard from './Pages/SingleMoodboard'
import BrainboardContentModal from './Pages/BrainboardContentModal'
import HabitRecords from './Pages/HabitRecords'
import SingleWorkshopPage from './Pages/SingleWorkshopPage'
import WorkshopResourcePage from './Pages/WorkshopResourcePage'
import ShareWorkshopResourceModal from './Components/ShareWorkshopResourceModal'
// import TaskPdfModal from './Components/ResourceModals/TaskPdfModal'

Modal.setAppElement('#root')

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID/share'>
            <WorkshopResourcePage isSharing />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/resourcedata/:resourceID'>
            <WorkshopResourcePage />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/share'>
            <ShareWorkshopResourceModal />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID'>
            <ResourcePage />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insidemoodboard/:moodboardID'>
            <SingleMoodboard />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insidedigitalBrainboard/:brainboardID'>
            <BrainboardContentModal isEditing />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insidehabit/:habitID'>
            <HabitRecords />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID'>
            <SingleClubPage />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID'>
            <SingleWorkshopPage />
          </Route>
          {/* <Route path='/workspace/:id/details/:spaceKey/addtodo/readpdf'>
            <TaskPdfModal isTodo />
          </Route> */}
          <Route path='/workspace/:id/details' component={Details}></Route>
          <Route path='/workspace' component={Workspace}></Route>
          <Route exact path='/trash' component={Trash}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
