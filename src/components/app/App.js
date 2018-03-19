import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { Alert, Modal, Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'

import Home from '../home/Home'
import Dashboard from '../dashboard/Dashboard'
import Login from '../login/Login'
import About from '../about/About'
import Inventory from '../inventory/Inventory'
import CarDetail from '../inventory/CarDetail'

import { dismissAlert } from '../../reducers/actions/alerts'

import './App.css'

const App = props => {
  const {user, alert, handleDismiss} = props

  return (
    <Router>
      <div className='App'>
        {
          alert &&
          <Modal
            show
            onHide={handleDismiss}
            autoFocus
            backdrop
            restoreFocus
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <Glyphicon glyph='check' /> <strong>{alert.title}</strong>
              </Modal.Title>
            </Modal.Header>
            <Alert bsStyle={alert.style}>
              <p>{alert.message}</p>
              {alert.signed && <p><em>{alert.signed}</em></p>}
            </Alert>
          </Modal>
        }
        <Route render={({location, match, history}) => (
          <Switch location={location} key={location.key}>
            <Route
              path='/dashboard/:action'
              render={() => {
                if (!user) return <Redirect to='/admin' />
                return <Dashboard />
              }}
            />
            <Route
              path='/dashboard/:action/:id'
              render={() => {
                if (!user) return <Redirect to='/login' />
                return <Dashboard />
              }}
            />
            {/* PUBLIC ROUTES */}
            <Route exact strict path='/' component={Home} />
            <Route exact path='/admin' component={Login} />
            <Route exact path='/about' component={About} />
            <Route exact path='/used-cars-for-sale' component={Inventory} />
            <Route exact path='/used-cars-for-sale/:colorYrMkModel/:id' component={CarDetail} />
          </Switch>
        )} />
      </div>
    </Router>
  )
}

App.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  cars: PropTypes.arrayOf(PropTypes.object),
  customers: PropTypes.arrayOf(PropTypes.object),
  alert: PropTypes.object,
  handleDismiss: PropTypes.func
}

const mapStateToProps = state => ({
  user: state.auth,
  cars: state.cars,
  customers: state.customers,
  loading: state.loading,
  alert: state.alert
})

const mapDispatchToProps = dispatch => ({
  handleDismiss: () => dispatch(dismissAlert())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
