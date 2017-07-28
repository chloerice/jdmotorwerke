import { RECEIVE_ERROR, DISMISS_ERROR } from './constants'

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ERROR: return action.error
    case DISMISS_ERROR: return null
    default: return state
  }
}

export default errorReducer