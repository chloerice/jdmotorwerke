import { RECEIVE_CARS } from '../constants'
import { requestCars, updateCar, listNewCar } from './loading'
import { receiveError } from './error'
import { readDataOnce, writeData, updateData } from './database'
import { database } from '../../../firebase'

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
  .catch(err => receiveError(err))
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
  return updateData('Cars', car.uid)
  .then(() => console.log(`Successfully updated car ${car.uid}`))
  .catch(err => receiveError(err))
}

export const listingNewCar = car => dispatch => {
  dispatch(listNewCar())
  return writeData('Cars', car)
  .then(() => console.log(`Successfully created ${car.year} ${car.make} ${car.model}`))
  .catch(err => receiveError(err))
}
