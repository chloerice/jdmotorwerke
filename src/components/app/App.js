import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Home from '../home/Home'
import Dashboard from '../dashboard/Dashboard'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'
import Login from '../login/Login'
import './App.css'
import Loading from '../utilities/LoadingAnimation'

const App = props => {
  const {user, loading, cars, customers} = props
  return (
    <Router>
      <div className='App'>
        <ScrollToTopOnMount />
        <Switch>
          <Loading isLoading={cars.length === 0 && customers.length === 0}>
            <Route
              location={location}
              key={location.key}
              path='/dashboard/:action'
              render={() => {
                if (!user) return <Redirect to='/login' />
                return <Dashboard />
              }
            } />
            <Route
              location={location}
              key={location.key}
              path='/dashboard/:action/:id'
              render={() => {
                if (!user) return <Redirect to='/login' />
                return <Dashboard />
              }
            } />
            {/* PUBLIC ROUTES */}
            <Route exact strict path='/' component={Home} />
            <Route exact path='/login' component={Login} />
          </Loading>
        </Switch>
      </div>
    </Router>
  )
}

App.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  cars: PropTypes.array,
  customers: PropTypes.array
}

const mapStateToProps = state => ({
  user: state.auth,
  cars: state.cars,
  customers: state.customers,
  loading: state.loading
})

export default withRouter(connect(mapStateToProps)(App))
