import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import Container from './components/app/App'
import './index.css'
import store from './store'
import { auth } from '../firebase'
import { logIn } from './reducers/actions/auth'
import { requestingCustomers } from './reducers/actions/customers'
import { requestingCars } from './reducers/actions/cars'

let carsListener, customersListener
// listen for auth changes and turn on and off database listeners
auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(logIn(user))
    carsListener = store.dispatch(requestingCars())
    customersListener = store.dispatch(requestingCustomers())
  } else {
    carsListener && carsListener()
    customersListener && customersListener()
  }
})

const App = () => (
  <Provider store={store}>
    <Router>
      <Container />
    </Router>
  </Provider>
)

render(<App />, document.getElementById('root'))
