import { RECEIVE_CUSTOMERS } from '../constants'
import { requestCustomers, createNewCustomer, updateCustomer } from './loading'
import { receiveError } from './error'
import { writeData, updateData } from '../../../database'
import { database } from '../../../firebase'

/* -------- PURE ACTION(S) -------- */
export const receiveCustomers = customers => ({
  customers,
  loading: false,
  type: RECEIVE_CUSTOMERS
})

/* -------- ASYNC ACTION(S) -------- */
export const requestingCustomers = () => dispatch => {
  dispatch(requestCustomers())
  const ref = database.ref('Customers')
  const listener = ref.orderByChild('date')
  .on('value', snapshot => {
    let customers = []
    if (snapshot.val()) {
      for (var key in snapshot.val()) {
        customers.push(snapshot.val()[key])
      }
    }
    dispatch(receiveCustomers(customers))
  })

  return () => ref.off('value', listener)
}

export const updatingCustomer = customer => dispatch => {
  dispatch(updateCustomer())
  return updateData('Customers', customer.uid)
  .then(() => console.log(`Successfully updated customer ${customer.uid}`))
  .catch(err => receiveError(err))
}

export const creatingNewCustomer = customer => dispatch => {
  dispatch(createNewCustomer())
  return writeData('Customers', customer)
  .then(() => console.log(`Successfully created ${customer.name}`))
  .catch(err => receiveError(err))
}
