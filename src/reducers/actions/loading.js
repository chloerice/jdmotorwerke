import { REQUEST_CUSTOMERS, UPDATE_CUSTOMER, CREATE_NEW_CUSTOMER,
         REQUEST_CARS, LIST_NEW_CAR, UPDATE_CAR, AUTHENTICATING } from '../constants'

export const requestCars = () => ({
  loading: true,
  type: REQUEST_CARS
})

export const updateCar = () => ({
  loading: true,
  type: UPDATE_CAR
})

export const listNewCar = () => ({
  loading: true,
  type: LIST_NEW_CAR
})

export const requestCustomers = () => ({
  loading: true,
  type: REQUEST_CUSTOMERS
})

export const updateCustomer = () => ({
  loading: true,
  type: UPDATE_CUSTOMER
})

export const createNewCustomer = () => ({
  loading: true,
  type: CREATE_NEW_CUSTOMER
})

export const authenticating = () => ({
  loading: true,
  type: AUTHENTICATING
})
