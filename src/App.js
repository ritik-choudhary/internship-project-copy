import './App.css'
import Dashboard from './Pages/Dashboard'
import Trash from './Pages/TrashPage'
import Workspace from './Pages/WorkspacePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Modal from 'react-modal'
import Details from './Pages/Details'
import SpaceContent from './Pages/SpaceContent'

Modal.setAppElement('#root')

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>

          <Route path='/workspace/:id/details' component={Details}></Route>
          <Route path='/workspace' component={Workspace}></Route>
          <Route exact path='/trash' component={Trash}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
