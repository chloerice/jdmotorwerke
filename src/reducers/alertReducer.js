import { RECEIVE_ALERT, DISMISS_ALERT } from './constants'

const alertReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ALERT: return action.alert
    case DISMISS_ALERT: return null
    default: return state
  }
}

export default alertReducer
