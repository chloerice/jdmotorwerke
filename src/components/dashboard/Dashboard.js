import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem, Row, Col, Glyphicon } from 'react-bootstrap'
import './Dashboard.css'
import Sidebar from '../utilities/Sidebar'
import ListNewCar from '../dashboard/ListNewCar'
import ManageInventory from './ManageInventory'
import Customers from './Customers'
import EditCar from '../dashboard/EditCar'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'

class Dashboard extends Component {

  render () {
    const {user, cars, customers} = this.props

    return (
      <Router>
        <Row className='Dashboard'>
          <div className='container__flex'>
            <Col xsHidden sm={3} md={3} lg={3} className='Dashboard__sidebar'>
              <Sidebar
                headerText='Oh hai, Jaaan!'
                content={
                  <Nav className='Sidebar__button-container' stacked>
                    <LinkContainer to='/dashboard/list-new-car' className='Dashboard__nav-item'>
                      <NavItem><Glyphicon glyph='plus-sign' /> List New Car</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/dashboard/manage-inventory' className='Dashboard__nav-item'>
                      <NavItem><Glyphicon glyph='list-alt' /> Manage Inventory</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/dashboard/customers' className='Dashboard__nav-item'>
                      <NavItem><Glyphicon glyph='user' /> Customers</NavItem>
                    </LinkContainer>
                  </Nav>
                }
              />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className='Dashboard__content'>
              <ScrollToTopOnMount />
              <Route path='/dashboard/list-new-car' component={() => (
                <h1>LIST NEW CAR</h1>
              )} />
              <Route path='/dashboard/manage-inventory' component={() => (
                <h1>MANAGE INVENTORY</h1>
              )} />
              <Route path='/dashboard/customers' component={() => (
                <h1>CUSTOMERS</h1>
              )} />
              <Route path='/dashboard/cars/:id' component={() => (
                <h1>EDIT LISTING</h1>
              )} />
            </Col>
          </div>
        </Row>
      </Router>
    )
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  cars: PropTypes.array,
  customers: PropTypes.array,
  removeCar: PropTypes.func,
  duplicateCar: PropTypes.func
}

const mapStateToProps = state => ({
  cars: state.cars,
  user: state.auth,
  loading: state.loading,
  customers: state.customers
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
