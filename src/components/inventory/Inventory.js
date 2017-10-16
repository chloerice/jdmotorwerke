import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MainNav from '../app/MainNav'
import MenuCollapse from '../app/MenuCollapse'
import InventoryList from './InventoryList'
import './Inventory.css'
import brandBlack from '../dashboard/jdmotorwerke-logo.png'
import { requestingCars } from '../../reducers/actions/cars'

class Inventory extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showMainMenu: false,
      opacity: '0',
      height: '0',
      padding: '0',
      marginBottom: '0'
    }
    this.removeCarListener = null
  }

  componentDidMount () {
    if (!this.removeCarListener) {
      this.removeCarListener = this.props.getInventory()
    }
  }

  componentWillUnmount () {
    if (this.removeCarListener) {
      this.removeCarListener()
    }
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
    let {cars} = this.props
    cars = cars
      .filter(car => car.status !== 'requires parts/service')
      .sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt))
      .sort((a, b) => {
        if (a.status === 'for sale') return -1
        else if (b.status === 'for sale') return 1
        else return 0
      })

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
        <Grid id='Inventory' className='fadeIn animated' fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <header>
                <h1 className='Inventory__header'>Used Cars For Sale</h1>
              </header>
            </Col>
          </Row>
          <InventoryList cars={cars} />
        </Grid>
      </div>
    )
  }
}

Inventory.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object),
  getInventory: PropTypes.func,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  cars: state.cars
})

const mapDispatchToProps = dispatch => ({
  getInventory: () => dispatch(requestingCars())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inventory))
