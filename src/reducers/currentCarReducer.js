import { RECEIVE_CAR } from './constants'

const currentCarReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_CAR: return action.car
    default: return state
  }
}

export default currentCarReducer
