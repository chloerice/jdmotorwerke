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
    this.props.stopLoading()
    this.setState({opacity: 1})
  }

  render () {
    let {opacity} = this.state
    const {cars} = this.props

    return (
      <Row ref='inventory' className='InventoryList'>
        {cars && cars
          .filter(c => (c.status === 'sold' || c.status === 'for sale'))
          .map((car, i) => {
            const {year, make, model, specs, id} = car
            const isSold = car.status === 'sold'
            const soldClass = isSold ? 'InventoryCard__sold' : ''
            const yrMkModel = `${year} ${make} ${model}`
            const url = `/used-cars-for-sale/${yrMkModel.toLowerCase().split(' ').join('-')}/${id}`
            const card = (
              <InventoryCard
                car={car}
                color={specs.exterior.color}
                yrMkModel={yrMkModel}
                opacity={opacity}
                handleOnLoad={this.handleOnLoad}
              />
            )
            const cardMarkup = isSold ? card : <Link to={url}>{card}</Link>

            return (
              <Col className={`InventoryCard ${soldClass}`} key={car.id} xs={12} sm={6} md={6} lg={6}>
                {cardMarkup}
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
