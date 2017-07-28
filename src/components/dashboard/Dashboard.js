import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Nav, NavItem, Row, Col, Glyphicon } from 'react-bootstrap'
import './Dashboard.css'
import Sidebar from '../utilities/Sidebar'
// import ListNewCar from '../dashboard/ListNewCar'
// import ManageInventory from './ManageInventory'
// import Customers from './Customers'
// import EditCar from '../dashboard/EditCar'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'
import DashNav from './DashNav'
import { loggingOut } from '../../reducers/actions/auth'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMainMenu: false,
      showDashMenu: false,
      opacity: 0,
      height: 0,
      padding: 0,
      marginBottom: 0
    }
  }

  toggleDashMenu = (event) => {
    if (event) event.preventDefault()
    this.setState({
      showDashMenu: !this.state.showDashMenu,
      height: this.state.height === '215px' ? '0' : '215px',
      padding: this.state.padding === '75px 0 10px 0' ? '0' : '75px 0 10px 0',
      opacity: this.state.opacity === 0 ? 1 : 0,
      marginBottom: this.state.marginBottom === '-60px' ? 0 : '-60px'
    })
  }

  render () {
    const dashMenuStyle = {
      padding: this.state.padding,
      height: this.state.height,
      opacity: this.state.opacity,
      marginBottom: this.state.marginBottom
    }

    const dashMobileMenu = [
      {to: '/dashboard/post-new-car', glyph: 'plus-sign', text: 'Post New Car'},
      {to: '/dashboard/manage-inventory', glyph: 'list-alt', text: 'Manage Inventory'},
      {to: '/dashboard/customers', glyph: 'user', text: 'Customers'}
    ]

    // const {user, cars, customers} = this.props

    return (
      <Router>
        <div>
          <DashNav logOut={this.props.logOut} toggleDashMenu={this.toggleMainMenu} />
          <Nav
            className='Dashboard-menu-collapse'
            style={dashMenuStyle}
            stacked
            onSelect={this.toggleDashMenu}
          >
            <ScrollToTopOnMount scroll={this.state.showDashMenu} />
            {
              dashMobileMenu.map((link, i) => (
                <LinkContainer
                  hidden={this.state.showDashMenu}
                  to={link.to}
                  className='Dashboard__nav-item'
                  key={i}
                >
                  <NavItem style={{opacity: this.state.opacity}}>
                    <Glyphicon glyph={link.glyph} /> {link.text}
                  </NavItem>
                </LinkContainer>
              ))
            }
          </Nav>
          <Grid fluid>
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
          </Grid>
        </div>
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
  duplicateCar: PropTypes.func,
  logOut: PropTypes.func
}

const mapStateToProps = state => ({
  cars: state.cars,
  user: state.auth,
  loading: state.loading,
  customers: state.customers
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(loggingOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
