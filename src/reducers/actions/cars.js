import { RECEIVE_CARS, RECEIVE_CAR } from '../constants'
import { requestCars, requestCar, updateCar, listNewCar } from './loading'
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

export const receiveCar = car => ({
  car,
  loading: false,
  type: RECEIVE_CAR
})

/* -------- ASYNC ACTION(S) -------- */
export const requestingCar = key => dispatch => {
  dispatch(requestCar())
  return readDataOnce('Cars', key)
    .then(car => dispatch(receiveCar(car)))
    .catch(() => receiveAlert({
      type: 'error',
      style: 'danger',
      title: 'No dice!',
      message: 'Sorry, Jaaan, we\'re having trouble fetching that car\'s data. Hit up Chlaaaaa!',
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
      message: `Successfully updated ${car.year} ${car.make} ${car.model}`,
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
