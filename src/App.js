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

Modal.setAppElement('#root')

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>

          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID/resourcedata/:resourceID'>
            <ResourcePage />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insidemoodboard/:moodboardID'>
            <SingleMoodboard />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insidedigitalBrainboard/:brainboardID'>
            <BrainboardContentModal isEditing />
          </Route>
          <Route path='/workspace/:id/details/:spaceKey/insideclub/:clubID'>
            <SingleClubPage />
          </Route>
          <Route path='/workspace/:id/details' component={Details}></Route>
          <Route path='/workspace' component={Workspace}></Route>
          <Route exact path='/trash' component={Trash}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
