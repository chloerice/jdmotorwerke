import { combineReducers } from 'redux'
import loading from './loadingReducer'
import auth from './authReducer'
import customers from './customersReducer'
import cars from './carsReducer'
import error from './errorReducer'

const rootReducer = combineReducers({
  loading,
  customers,
  cars,
  auth,
  error
})

export default rootReducer
