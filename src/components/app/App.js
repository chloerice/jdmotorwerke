import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Home from '../home/Home'
import Dashboard from '../dashboard/Dashboard'
import Login from '../login/Login'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'
import './App.css'
import Loading from '../utilities/LoadingAnimation'

const App = props => {
  const {user, cars, customers, loading} = props
  return (
    <Router>
      <div className='App'>
        <ScrollToTopOnMount />
        <Route render={({location, match, history}) => (
          <Switch location={location} key={location.key}>
            <Loading isLoading={user && (customers.length === 0 || cars.length === 0) && loading}>
              <Route
                path='/dashboard/:action'
                render={() => {
                  if (!user) return <Redirect to='/login' />
                  return <Dashboard />
                }
              } />
              <Route
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
        )} />
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
