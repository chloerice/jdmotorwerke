import { LOGGING_IN, LOGGING_OUT } from './constants'

const authReducer = (state = null, action) => {
  switch (action.type) {
    case LOGGING_IN: return action.user
    case LOGGING_OUT: return null
    default: return state
  }
}

export default authReducer
