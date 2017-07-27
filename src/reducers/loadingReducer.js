import { REQUEST_CARS, REQUEST_CUSTOMERS,
         RECEIVE_CARS, RECEIVE_CUSTOMERS,
         LIST_NEW_CAR, UPDATE_CAR, MARK_CAR_SOLD } from './constants'

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case REQUEST_CARS: return true
    case REQUEST_CUSTOMERS: return true
    case LIST_NEW_CAR: return true
    case UPDATE_CAR: return true
    case MARK_CAR_SOLD: return true
    case RECEIVE_CARS: return false
    case RECEIVE_CUSTOMERS: return false
    default: return state
  }
}

export default loadingReducer
