import React, { Component } from 'react'
import { Table, Row, Accordion, Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './Table.css'

export default class Customers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: 1
    }
  }

  handleSelect = activeKey => event => {
    this.setState({activeKey})
  }

  mostRecentDate = customer => {
    const {createdAt, updatedAt} = customer
    if (Date.parse(createdAt) < Date.parse(updatedAt)) {
      return new Date(updatedAt).toLocaleString()
    } else {
      return new Date(createdAt).toLocaleString()
    }
  }

  sortByDate = list => {
    return list.sort((a, b) => {
      return Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
    })
  }

  render () {
    let {customers, animated} = this.props
    if (customers) {
      customers = customers
        .sort((a, b) => this.mostRecentDate(a) - this.mostRecentDate(b))
    }
    return (
      <Row className='Customers'>
        <h1 className='Customers-header'>
          Customers
        </h1>
        <Accordion defaultActiveKey={1} activeKey={this.state.activeKey}>
          {
            this.sortByDate(customers).map((customer, i) => {
              return (
                <Panel
                  key={i}
                  header={customer.name}
                  eventKey={i + 1}
                  className='Customers__panel'
                  onClick={this.handleSelect(i + 1)}
                >
                  <Table responsive className='Customers__table'>
                    <tbody>
                      <tr key={`${customer.id}${i}${customer.id}`}>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.zipCode}</td>
                        <td>{customer.yrMkModel}</td>
                        <td>{customer.status}</td>
                        <td>{this.mostRecentDate(customer)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Panel>
              )
            })
          }
        </Accordion>
      </Row>
    )
  }
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  animated: PropTypes.string
}
