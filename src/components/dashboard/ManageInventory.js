import React, { Component } from 'react'
import { Table, Row, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Table.css'

export default class ManageInventory extends Component {

  mostRecentDate = car => {
    const {createdAt, updatedAt} = car
    if (Date.parse(createdAt) < Date.parse(updatedAt)) {
      return createdAt
    } else {
      return updatedAt
    }
  }

  render () {
    const {cars} = this.props
    return (
      <Row className='ManageInventory'>
        <h1 className='ManageInventory-header'>MANAGE INVENTORY</h1>
        <Table responsive striped hover={false}>
          <thead>
            <tr>
              <td>YR MK MODEL COLOR</td>
              <td>TITLE</td>
              <td>STATUS</td>
              <td>$ SELLING FOR</td>
              <td>$ BOUGHT FOR</td>
              <td>$ SOLD FOR</td>
              <td>LAST UPDATED</td>
            </tr>
          </thead>
          <tbody>
            {
              cars.map((car, i) => {
                const yrMkModelColor = `${car.year} ${car.make} ${car.model}, ${car.color}`
                return (
                  <tr key={i}>
                    <td>
                      {
                        car.status === 'sold'
                          ? yrMkModelColor
                          : <Link to={`/dashboard/inventory/${car.id}`}>{yrMkModelColor}</Link>
                      }
                    </td>
                    <td>{car.title}</td>
                    <td>{car.status}</td>
                    <td>{car.sellingPrice}</td>
                    <td>{car.purchasePrice}</td>
                    <td>{car.soldPrice ? car.soldPrice : 'N/A'}</td>
                    <td>{this.mostRecentDate(car)}</td>
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

ManageInventory.propTypes = {
  cars: PropTypes.array.isRequired,
  history: PropTypes.object
}
