import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Home from '../home/Home'
import Dashboard from '../dashboard/Dashboard'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'
import Login from '../login/Login'
import './App.css'

const App = props => {
  const {user} = props
  return (
    <Router>
      <div className='App'>
        <ScrollToTopOnMount />
        <Switch>
          <Route exact path='/dashboard/:action' component={() => {
            if (!user) return <Redirect to='/login' />
            return <Dashboard />
          }} />
        <Route exact path='/dashboard/:action/:id' component={() => {
            if (!user) return <Redirect to='/login' />
            return <Dashboard />
          }} />
          {/* PUBLIC ROUTES */}
          <Route exact strict path='/' component={Home} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

App.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({ user: state.auth })

export default withRouter(connect(mapStateToProps)(App))
