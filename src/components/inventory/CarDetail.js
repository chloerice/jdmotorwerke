import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row, Col, Carousel, Image, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

import MainNav from '../app/MainNav'
import MenuCollapse from '../app/MenuCollapse'

import { requestingCar, receiveCar } from '../../reducers/actions/cars'
import Loading from '../utilities/LoadingAnimation'

import './CarDetail.css'

class CarDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMainMenu: false,
      opacity: '0',
      height: '0',
      padding: '0',
      marginBottom: '0',
      imgOpacity: '0',
    }
  }

  componentDidMount () {
    const {car, getCar, match} = this.props
    const currentCarId = match.params.id
    if (!car) getCar(currentCarId)
  }

  componentWillUnmount () {
    receiveCar(null)
  }

  toggleMainMenu = (event) => {
    if (event) event.preventDefault()
    this.setState({
      showMainMenu: !this.state.showMainMenu,
      height: this.state.height === '190px' ? '0' : '190px',
      padding: this.state.padding === '10px 0' ? '0' : '10px 0',
      opacity: this.state.opacity === '0' ? '0.7' : '0'
    })
  }

  toCapital = (word) => {
    const firstLetter = word.substr(0, 1).toUpperCase()
    const substring = word.substring(1)
    return `${firstLetter}${substring}`
  }

  handleOnLoad = () => {
    this.setState({ imgOpacity: '1' })
  }

  render () {
    const menuCollapseStyle = {
      padding: this.state.padding,
      height: this.state.height,
      opacity: this.state.opacity,
      marginBottom: this.state.marginBottom
    }

    const mainMobileMenu = [
      {to: '/', text: 'Home'},
      {to: '/about', text: 'About'},
      {to: '/used-cars-for-sale', text: 'Inventory'},
      {to: '/#Contact', text: 'Contact', hash: true}
    ]
    let display = this.state.height === '0' ? 'none' : 'block'
    const {car} = this.props

    return (
      <div className="fadeIn animated">
        <MainNav
          black
          brand="black"
          links={mainMobileMenu}
          toggleMainMenu={this.toggleMainMenu}
        />
        <MenuCollapse
          display={display}
          style={menuCollapseStyle}
          links={mainMobileMenu}
        />
        <Grid fluid>
          {!car && <Loading />}
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              {car && (
                <h1 className='Inventory__header'>
                  {`${car.year} ${car.make} ${car.model} ${car.sellingPrice}`}
                </h1>
              )}
            </Col>
          </Row>
          {car && (
            <Row className='CarDetail'>
              <Col xs={12} sm={12} md={7} lg={7}>
                <Carousel className='fadeIn' interval={null}>
                  {car && car.images.all.map((pic, i) => (
                    <Carousel.Item key={i}>
                      <Image
                        className="CarDetail--image"
                        responsive
                        src={pic}
                        onLoad={this.handleOnLoad}
                        style={{opacity: `${this.state.imgOpacity}`}}
                        alt={`${car.year} ${car.make} ${car.model} for sale by JD Motorwerke`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col xs={12} sm={12} md={5} lg={5}>
                <Table className="CarDetail--spec-table">
                  <tbody>
                    <tr>
                      <td>Title status</td>
                      <td>{car.title}</td>
                    </tr>
                    <tr>
                      <td>Mileage</td>
                      <td>{car.mileage}</td>
                    </tr>
                    <tr>
                      <td>Drivetrain</td>
                      <td>{car.specs.drivetrain}</td>
                    </tr>
                    <tr>
                      <td>Engine</td>
                      <td>{car.specs.engine}</td>
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      <td>{car.specs.transmission}</td>
                    </tr>
                    <tr>
                      <td>Fuel type</td>
                      <td>{this.toCapital(car.specs.fuelType)}</td>
                    </tr>
                    <tr>
                      <td>Fuel economy</td>
                      <td>{car.specs.fuelEconomy}</td>
                    </tr>
                    <tr>
                      <td>Exterior</td>
                      <td>{`${car.specs.exterior.color} ${car.specs.exterior.finish}`}</td>
                    </tr>
                    <tr>
                      <td>Interior</td>
                      <td>{`${car.specs.interior.color} ${car.specs.interior.fabrication}`}</td>
                    </tr>
                    <tr>
                      <td>Features</td>
                      <td>{car.specs.features}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Grid>
      </div>
    )
  }
}

CarDetail.propTypes = {
  car: PropTypes.object,
  match: PropTypes.object,
  getCar: PropTypes.func
}

const mapStateToProps = state => ({
  car: state.currentCar
})

const mapDispatchToProps = dispatch => ({
  getCar: id => dispatch(requestingCar(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarDetail))
