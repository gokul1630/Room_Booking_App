import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Loader from './Components/Loader'
import NavBar from './Components/NavBar'
import RoomDashboard from './Components/RoomDashboard'
import RoomDescription from './Components/RoomDescription'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import User from './Components/User'
import rootStore from './features/redux/store'

const App = () => {
  const NavRoute = ({ exact, path, component: Component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        const user = localStorage.getItem('user')
        return user ? (
          <>
            <NavBar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to='/signin' />
        )
      }}
    />
  )
  return (
    <Provider store={rootStore}>
      <HashRouter basename='/'>
        <Switch>
          <Route exact path='/' component={Loader} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <NavRoute path='/user/home' component={RoomDashboard} />
          <NavRoute exact path='/user/profile' component={User} />
          <NavRoute path='/owner/home' component={RoomDashboard} />
          <NavRoute exact path='/room/:id' component={RoomDescription} />
        </Switch>
      </HashRouter>
    </Provider>
  )
}

export default App
