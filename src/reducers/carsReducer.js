import { RECEIVE_CARS } from './constants'

const carsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CARS: return action.cars
    default: return state
  }
}

export default carsReducer
