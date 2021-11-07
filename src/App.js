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
import BrainboardContentModal from './Components/MoodboardComponents/BrainboardContentModal'
import HabitRecords from './Pages/HabitRecords'
import SingleWorkshopPage from './Pages/SingleWorkshopPage'
import WorkshopResourcePage from './Pages/WorkshopResourcePage'
import ShareWorkshopResourceModal from './Components/Workshop/ShareWorkshopResourceModal'
import BucketListContent from './Components/BucketList/BucketListContent'
import Journal from './Pages/Journal'
import ShareClubResourceModal from './Components/Club/ShareClubResourceModal'
import Notes from './Pages/Notes'
import Internships from './Pages/Internships'
import TaskManager from './Pages/TaskManager'
import Insights from './Pages/Insights'
import DocumentShelf from './Pages/DocumentShelf'
import CoverLetterTemplates from './Pages/CoverLetterTemplates'
import Wallet from './Pages/Wallet'
import Recents from './Pages/Recents'
import Confirmation from './Components/Tools/Confirmation'

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

          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID/share'>
            <ResourcePage isSharing />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID'>
            <ResourcePage />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/share'>
            <ShareClubResourceModal />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideworkshop/:workshopID/share'>
            <ShareWorkshopResourceModal />
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
          <Route path='/workspace/:id/details/:spaceKey/bucketlistcontent/:bucketListID'>
            <BucketListContent />
          </Route>
          <Route path='/workspace/:id/details' component={Details}></Route>
          <Route path='/workspace' component={Workspace}></Route>

          <Route path='/journal' component={Journal}></Route>
          <Route path='/notes' component={Notes} />
          <Route path='/internships'>
            <Internships />
          </Route>
          <Route path='/insights'>
            <Insights />
          </Route>
          <Route path='/documentshelf'>
            <DocumentShelf />
          </Route>
          <Route path='/taskmanager' component={TaskManager} />
          <Route
            path='/coverlettertemplates'
            component={CoverLetterTemplates}
          />
          <Route path='/wallet' component={Wallet} />
          <Route path='/recents' component={Recents} />
          <Route
            path='/trash/confirmation/:deleteID'
            component={Confirmation}
          />
          <Route exact path='/trash' component={Trash}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
