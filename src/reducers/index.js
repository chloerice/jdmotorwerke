import { combineReducers } from 'redux'
import loading from './loadingReducer'
import auth from './authReducer'
import customers from './customersReducer'
import cars from './carsReducer'
import alert from './alertReducer'

const rootReducer = combineReducers({
  loading,
  customers,
  cars,
  auth,
  alert
})

export default rootReducer
