import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CarDetailFields from './CarDetailFields'
import { listingNewCar } from '../../reducers/actions/cars'

class CreateCar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      VIN: '',
      year: '',
      make: '',
      model: '',
      status: '',
      purchasePrice: '',
      sellingPrice: '',
      soldPrice: '',
      stateOfOrigin: '',
      title: '',
      mileage: '',
      specs: {
        drivetrain: '',
        engine: '',
        transmission: '',
        fuelType: '',
        fuelEconomy: '',
        exteriorColor: '',
        finish: '',
        interiorColor: '',
        fabrication: '',
        features: ''
      }
    }
  }

  handleChange = (type, specs) => event => {
    const {value} = event.target
    if (specs) this.setState({specs: {...this.state.specs, [`${type}`]: value}})
    else this.setState({[`${type}`]: value})
  }

  isInvalid = () => {
    const {
      VIN,
      year,
      make,
      model,
      status,
      purchasePrice,
      sellingPrice,
      soldPrice,
      stateOfOrigin,
      title,
      mileage,
      specs
    } = this.state
    const {
      drivetrain,
      engine,
      transmission,
      fuelType,
      fuelEconomy,
      exteriorColor,
      finish,
      interiorColor,
      fabrication,
      features
    } = specs
    return !(
      VIN &&
      year &&
      make &&
      model &&
      status &&
      purchasePrice &&
      sellingPrice &&
      soldPrice &&
      stateOfOrigin &&
      title &&
      mileage &&
      drivetrain &&
      engine &&
      transmission &&
      fuelType &&
      fuelEconomy &&
      exteriorColor &&
      finish &&
      interiorColor &&
      fabrication &&
      features
    )
  }

  clearForm = () => {
    this.setState({
      VIN: '',
      year: '',
      make: '',
      model: '',
      status: '',
      purchasePrice: '',
      sellingPrice: '',
      soldPrice: '',
      stateOfOrigin: '',
      title: '',
      mileage: '',
      drivetrain: '',
      engine: '',
      transmission: '',
      fuelType: '',
      fuelEconomy: '',
      exteriorColor: '',
      finish: '',
      interiorColor: '',
      fabrication: '',
      features: ''
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const car = this.state
    car.specs.exterior = {color: car.specs.exteriorColor, finish: car.specs.finish}
    car.specs.interior = {color: car.specs.interiorColor, fabrication: car.specs.fabrication}
    delete car.specs.exteriorColor
    delete car.specs.interiorColor
    car.createdAt = new Date().toLocaleString()
    car.updatedAt = car.createdAt
    this.clearForm()
    this.props.createCar(car)
  }

  render () {
    return (
      <CarDetailFields
        state={this.state}
        handleChange={this.handleChange}
        isInvalid={this.isInvalid}
        buttonText='Create Car'
        formheadingText='List New Car'
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

CreateCar.propTypes = {
  createCar: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  createCar: car => dispatch(listingNewCar(car))
})

export default connect(null, mapDispatchToProps)(CreateCar)
