import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

let loggingMiddleware = null
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  loggingMiddleware = createLogger({collapsed: true})
}

const store = createStore(
  rootReducer,
  applyMiddleware(
    loggingMiddleware,
    thunkMiddleware
  )
)

export default store
