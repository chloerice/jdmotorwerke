import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CarDetailFields from './CarDetailFields'
import { updatingCar, requestingCar } from '../../reducers/actions/cars'
import Loading from '../utilities/LoadingAnimation'

class EditCar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      VIN: this.props.car ? this.props.car.VIN : '',
      year: this.props.car ? this.props.car.year : '',
      make: this.props.car ? this.props.car.make : '',
      model: this.props.car ? this.props.car.model : '',
      status: this.props.car ? this.props.car.status : '',
      purchasePrice: this.props.car ? this.props.car.purchasePrice : '',
      sellingPrice: this.props.car ? this.props.car.sellingPrice : '',
      soldPrice: this.props.car ? this.props.car.soldPrice : '',
      stateOfOrigin: this.props.car ? this.props.car.stateOfOrigin : '',
      title: this.props.car ? this.props.car.title : '',
      mileage: this.props.car ? this.props.car.mileage : '',
      specs: {
        drivetrain: this.props.car ? this.props.car.specs.drivetrain : '',
        engine: this.props.car ? this.props.car.specs.engine : '',
        transmission: this.props.car ? this.props.car.specs.transmission : '',
        fuelType: this.props.car ? this.props.car.specs.fuelType : '',
        fuelEconomy: this.props.car ? this.props.car.specs.fuelEconomy : '',
        exteriorColor: this.props.car ? this.props.car.specs.exterior.color : '',
        finish: this.props.car ? this.props.car.specs.exterior.finish : '',
        interiorColor: this.props.car ? this.props.car.specs.interior.color : '',
        fabrication: this.props.car ? this.props.car.specs.interior.fabrication : '',
        features: this.props.car ? this.props.car.specs.features : ''
      }
    }
  }

  componentDidMount () {
    const {car, getCar, match} = this.props
    const currentCarId = match.params.id
    if (!car || (car.id !== currentCarId)) getCar(currentCarId)
  }

  componentWillReceiveProps (nextProps) {
    const {getCar, match} = this.props
    const currentCarId = match.params.id
    if (!nextProps.car || (nextProps.car.id !== currentCarId)) getCar(currentCarId)
    else {
      this.setState({
        VIN: nextProps.car.VIN,
        year: nextProps.car.year,
        make: nextProps.car.make,
        model: nextProps.car.model,
        status: nextProps.car.status,
        purchasePrice: nextProps.car.purchasePrice,
        sellingPrice: nextProps.car.sellingPrice,
        soldPrice: nextProps.car.soldPrice,
        stateOfOrigin: nextProps.car.stateOfOrigin,
        title: nextProps.car.title,
        mileage: nextProps.car.mileage,
        specs: {
          drivetrain: nextProps.car.specs.drivetrain,
          engine: nextProps.car.specs.engine,
          transmission: nextProps.car.specs.transmission,
          fuelType: nextProps.car.specs.fuelType,
          fuelEconomy: nextProps.car.specs.fuelEconomy,
          exteriorColor: nextProps.car.specs.exterior.color,
          finish: nextProps.car.specs.exterior.finish,
          interiorColor: nextProps.car.specs.interior.color,
          fabrication: nextProps.car.specs.interior.fabrication,
          features: nextProps.car.specs.features
        }
      })
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
      VIN: this.props.car ? this.props.car.VIN : '',
      year: this.props.car ? this.props.car.year : '',
      make: this.props.car ? this.props.car.make : '',
      model: this.props.car ? this.props.car.model : '',
      status: this.props.car ? this.props.car.status : '',
      purchasePrice: this.props.car ? this.props.car.purchasePrice : '',
      sellingPrice: this.props.car ? this.props.car.sellingPrice : '',
      soldPrice: this.props.car ? this.props.car.soldPrice : '',
      stateOfOrigin: this.props.car ? this.props.car.stateOfOrigin : '',
      title: this.props.car ? this.props.car.title : '',
      mileage: this.props.car ? this.props.car.mileage : '',
      specs: {
        drivetrain: this.props.car ? this.props.car.specs.drivetrain : '',
        engine: this.props.car ? this.props.car.specs.engine : '',
        transmission: this.props.car ? this.props.car.specs.transmission : '',
        fuelType: this.props.car ? this.props.car.specs.fuelType : '',
        fuelEconomy: this.props.car ? this.props.car.specs.fuelEconomy : '',
        exteriorColor: this.props.car ? this.props.car.specs.exterior.color : '',
        finish: this.props.car ? this.props.car.specs.exterior.finish : '',
        interiorColor: this.props.car ? this.props.car.specs.interior.color : '',
        fabrication: this.props.car ? this.props.car.specs.interior.fabrication : '',
        features: this.props.car ? this.props.car.specs.features : ''
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const car = this.state
    car.specs.exterior = {color: car.specs.exteriorColor, finish: car.specs.finish}
    car.specs.interior = {color: car.specs.interiorColor, fabrication: car.specs.fabrication}
    delete car.specs.exteriorColor
    delete car.specs.interiorColor
    car.updatedAt = new Date().toLocaleString()
    car.id = this.props.car.id
    this.clearForm()
    this.props.updateCar(car)
  }

  render () {
    console.log(this.state)
    return !this.props.car
      ? <Loading />
      : (
        <CarDetailFields
          state={this.state}
          handleChange={this.handleChange}
          isInvalid={this.isInvalid}
          buttonText='Update Car'
          formheadingText='Update Car'
          handleSubmit={this.handleSubmit}
        />
      )
  }
}

EditCar.propTypes = {
  car: PropTypes.object,
  match: PropTypes.object,
  updateCar: PropTypes.func,
  getCar: PropTypes.func,
  fetching: PropTypes.bool
}

const mapStateToProps = state => ({
  car: state.currentCar,
  fetching: state.loading
})

const mapDispatchToProps = dispatch => ({
  updateCar: car => dispatch(updatingCar(car)),
  getCar: id => dispatch(requestingCar(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCar))
