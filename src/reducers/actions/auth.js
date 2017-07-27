import firebase from '../../../firebase'
import { LOGGING_IN, LOGGING_OUT } from '../constants'
import { receiveError } from './error'

export const logIn = user => ({
  user,
  type: LOGGING_IN
})

export const logOut = () => ({
  type: LOGGING_OUT
})

// we've got a listener in App.js that logs receives the user onAuthStateChange (if user)
// or pushes to /login other (if !user)
export const loggingIn = (email, password) => dispatch => {
  firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .catch(err => dispatch(receiveError(err)))
}

export const loggingOut = () => dispatch => {
  firebase.auth()
  .signOut()
  .then(() => dispatch(logOut()))
  .catch(err => dispatch(receiveError(err)))
}
