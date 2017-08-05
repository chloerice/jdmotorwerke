import { RECEIVE_CUSTOMERS } from '../constants'
import { requestCustomers, createNewCustomer, updateCustomer } from './loading'
import { receiveAlert } from './alerts'
import { writeData, updateData } from './database'
import firebase from '../../../firebase'

const database = firebase.database()

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
  return updateData('Customers', customer)
  .then(() => console.log(`Successfully updated customer ${customer.uid}`))
  .catch(() => receiveAlert({
    type: 'error',
    style: 'danger',
    message: `Sorry, Jaaan, we're having trouble updating ${customer.name}'s info! Please double check all table fields and try again. Hit up Chlaaaaa if you need help!`,
    dismissable: true
  }))
}

export const creatingCustomer = customer => dispatch => {
  dispatch(createNewCustomer())
  return writeData('Customers', customer)
  .then(() => dispatch(receiveAlert({
    type: 'confirmation',
    style: 'success',
    title: 'Submitted successfully!',
    message: `Thanks for your inquiry, ${customer.name.split(' ')[0]}. I'll do some market research and be in touch within 2 business days.`,
    signed: 'Jon Rice - Owner, JD Motorwerke',
    dismissable: true
  })))
  .catch(() => receiveAlert({
    type: 'error',
    style: 'danger',
    title: 'Uh oh!',
    message: 'Sorry, we\'re having trouble sending your inquiry. Please double check form fields and try again.',
    dismissable: true
  }))
}
