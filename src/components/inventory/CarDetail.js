import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Row, Col, Carousel, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import MainNav from '../app/MainNav'
import MenuCollapse from '../app/MenuCollapse'
import brandBlack from '../dashboard/jdmotorwerke-logo.png'
import { requestingCar, receiveCar } from '../../reducers/actions/cars'
import './CarDetail.css'

class CarDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMainMenu: false,
      opacity: '0',
      height: '0',
      padding: '0',
      marginBottom: '0'
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
    let yrMkModel
    if (car) {
      const {year, make, model, sellingPrice, specs} = car
      yrMkModel = `${year} ${make} ${model}`
    }

    return (
      <div>
        <MainNav
          black
          brand={brandBlack}
          links={mainMobileMenu}
          toggleMainMenu={this.toggleMainMenu}
        />
        <MenuCollapse
          display={display}
          style={menuCollapseStyle}
          links={mainMobileMenu}
        />
        <Grid fluid>
          <Row className='CarDetail'>
            <Col xs={12} sm={12} md={8} lg={8}>
              <Carousel className='fadeIn' interval={null}>
                {car && car.images.all.map((pic, i) => (
                  <Carousel.Item key={i}>
                    <Image
                      responsive
                      src={pic}
                      alt={`a photo of the ${yrMkModel} for sale by JD Motorwerke`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
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
