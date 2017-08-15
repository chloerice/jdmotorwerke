import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import InventoryCard from './InventoryCard'
import './Inventory.css'

export default class InventoryList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      opacity: 0
    }
  }

  handleOnLoad = () => {
    this.setState({opacity: 1})
  }

  render () {
    let {opacity} = this.state
    const {cars} = this.props

    return (
      <Row ref='inventory' className='InventoryList'>
        {cars && cars.map((car, i) => {
          const {year, make, model, color, id, status} = car
          const yrMkModel = `${year} ${make} ${model}`
          const url = yrMkModel.toLowerCase().split(' ').join('-')
          return (
            <Col className='InventoryCard' key={i} xs={12} sm={6} md={6} lg={6}>
              {
                status === 'sold'
                  ? (
                    <InventoryCard
                      car={car}
                      color={color}
                      yrMkModel={yrMkModel}
                      opacity={opacity}
                      handleOnLoad={this.handleOnLoad}
                    />
                  )
                  : (
                    <Link to={`/used-cars-for-sale/${url}/${id}`}>
                      <InventoryCard
                        car={car}
                        color={color}
                        yrMkModel={yrMkModel}
                        opacity={opacity}
                        handleOnLoad={this.handleOnLoad}
                      />
                    </Link>
                  )
              }
            </Col>
          )
        })}
      </Row>
    )
  }
}

InventoryList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object)
}
