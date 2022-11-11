import {Route, Switch} from 'react-router-dom'

import NotFoundRoute from './components/NotFoundRoute'

import HomeRoute from './components/HomeRoute'

import LoginRoute from './components/LoginRoute'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
    <Route component={NotFoundRoute} />
  </Switch>
)

export default App
