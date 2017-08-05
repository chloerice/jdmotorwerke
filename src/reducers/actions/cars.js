import { RECEIVE_CARS } from '../constants'
import { requestCars, updateCar, listNewCar } from './loading'
import { receiveAlert } from './alerts'
import { readDataOnce, writeData, updateData } from './database'
import firebase from '../../../firebase'

const database = firebase.database()

/* -------- PURE ACTION(S) -------- */
export const receiveCars = cars => ({
  cars,
  loading: false,
  type: RECEIVE_CARS
})

/* -------- ASYNC ACTION(S) -------- */
export const requestingCarsOnce = () => dispatch => {
  dispatch(requestCars())
  return readDataOnce('/Cars')
  .then(cars => dispatch(receiveCars(cars)))
  .catch(() => receiveAlert({
    type: 'error',
    style: 'danger',
    title: 'No dice!',
    message: 'Sorry, Jaaan, we\'re having trouble fetching the car data. Hit up Chlaaaaa!',
    dismissable: true
  }))
}

export const requestingCars = () => dispatch => {
  dispatch(requestCars())
  const ref = database.ref('Cars')
  const listener = ref.orderByChild('status')
  .on('value', snapshot => {
    let cars = []
    if (snapshot.val()) {
      for (var key in snapshot.val()) {
        cars.push(snapshot.val()[key])
      }
    }
    dispatch(receiveCars(cars))
  })

  return () => ref.off('value', listener)
}

export const updatingCar = car => dispatch => {
  dispatch(updateCar())
  return updateData('Cars', car)
  .then(() => dispatch(receiveAlert({
    type: 'confirmation',
    style: 'success',
    title: 'Inventory updated!',
    message: `Successfully updated car ${car.id}`,
    dismissable: true
  })))
  .catch(() => dispatch(receiveAlert({
    type: 'error',
    style: 'danger',
    title: 'Oopsies!',
    message: 'Sorry, Jaaan, we\'re having updating that car! Please double check all fields and try again.',
    dismissable: true
  })))
}

export const listingNewCar = car => dispatch => {
  dispatch(listNewCar())
  return writeData('Cars', car)
  .then(() => dispatch(receiveAlert({
    type: 'confirmation',
    style: 'success',
    title: 'Inventory updated!',
    message: `Successfully added ${car.year} ${car.make} ${car.model} to inventory.`,
    dismissable: true
  })))
  .catch(() => dispatch(receiveAlert({
    type: 'error',
    style: 'danger',
    title: 'Ruh roh!',
    message: 'Sorry, Jaaan, we\'re having creating that car! Please double check all fields and try again.',
    dismissable: true
  })))
}
