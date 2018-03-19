import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

let middleware = [thunkMiddleware]
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({collapsed: true}))
}

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
