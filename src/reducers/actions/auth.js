import firebase from '../../../firebase'
import { LOGGING_IN, LOGGING_OUT } from '../constants'
import { authenticating } from './loading'
import { receiveAlert } from './alerts'

export const logIn = user => ({
  user,
  loading: false,
  type: LOGGING_IN
})

export const logOut = () => ({
  type: LOGGING_OUT
})

// we've got a listener in App.js that logs receives the user onAuthStateChange (if user)
// or pushes to /login other (if !user)
export const loggingIn = (email, password) => dispatch => {
  dispatch(authenticating())
  firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .catch(() => dispatch(receiveAlert({
    type: 'error',
    style: 'danger',
    title: 'Wrong email or password',
    message: 'Sorry, Jaaan, we\'re having trouble logging you in! Please double check your email and password and try again.',
    dismissable: true
  })))
}

export const loggingOut = () => dispatch => {
  firebase.auth()
  .signOut()
  .then(() => dispatch(logOut()))
  .catch(() => dispatch(receiveAlert({
    type: 'error',
    style: 'danger',
    title: 'Woopsie doopsie!',
    message: 'Unable to log you out, please try again!',
    dismissable: true
  })))
}
