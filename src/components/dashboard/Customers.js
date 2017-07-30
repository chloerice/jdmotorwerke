import React, { Component } from 'react'
import { Table, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './Customers.css'

export default class Customers extends Component {

  mostRecentDate = customer => {
    const {createdAt, updatedAt} = customer
    if (Date.parse(createdAt) < Date.parse(updatedAt)) {
      return createdAt
    } else {
      return updatedAt
    }
  }

  render () {
    const {customers} = this.props
    return (
      <Row className='Customers'>
        <h1 className='Customers-header'>CUSTOMER INQUIRIES</h1>
        <Table responsive>
          <thead>
            <tr>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>PHONE</td>
              <td>ZIPCODE</td>
              <td>YR MK MODEL</td>
              <td>STATUS</td>
              <td>MESSAGE</td>
              <td>LAST UPDATED</td>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((customer, i) => {
                return (
                  <tr key={i}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.zipCode}</td>
                    <td>{customer.yrMkModel}</td>
                    <td>{customer.status}</td>
                    <td>{customer.message}</td>
                    <td>{this.mostRecentDate(customer)}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Row>
    )
  }
}

Customers.propTypes = {
  customers: PropTypes.array,
  history: PropTypes.object
}
