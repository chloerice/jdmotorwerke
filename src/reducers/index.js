import { combineReducers } from 'redux'
import loading from './loadingReducer'
import auth from './authReducer'
import customers from './customersReducer'
import cars from './carsReducer'
import alert from './alertReducer'
import currentCar from './currentCarReducer'

const rootReducer = combineReducers({
  loading,
  customers,
  cars,
  currentCar,
  auth,
  alert
})

export default rootReducer
