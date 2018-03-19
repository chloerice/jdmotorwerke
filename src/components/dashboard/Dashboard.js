import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Nav, NavItem, Row, Col, Glyphicon } from 'react-bootstrap'
import './Dashboard.css'
import Sidebar from '../utilities/Sidebar'
import ListNewCar from '../dashboard/ListNewCar'
import ManageInventory from './ManageInventory'
import Inquiries from './Inquiries'
import Customers from './Customers'
import EditCar from '../dashboard/EditCar'
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
      marginTop: 0,
      marginBottom: 0
    }
  }

  toggleDashMenu = (event) => {
    if (event) event.preventDefault()
    this.setState({
      showDashMenu: !this.state.showDashMenu,
      height: this.state.height === '235px' ? '0' : '235px',
      padding: this.state.padding === '10px 0' ? '0' : '10px 0',
      opacity: this.state.opacity === 0 ? 1 : 0,
      marginTop: this.state.marginTop === '70px' ? 0 : '70px',
      marginBottom: this.state.marginBottom === '-70px' ? 0 : '-70px'
    })
  }

  render () {
    const dashMenuStyle = {
      padding: this.state.padding,
      height: this.state.height,
      opacity: this.state.opacity,
      marginTop: this.state.marginTop,
      marginBottom: this.state.marginBottom
    }

    const dashMobileMenu = [
      {to: '/dashboard/list-new-car', glyph: 'plus-sign', text: 'List New Car'},
      {to: '/dashboard/inventory', glyph: 'list-alt', text: 'Inventory'},
      {to: '/dashboard/customers/inquiries', glyph: 'envelope', text: 'Inquiries'},
      {to: '/dashboard/customers/:id', glyph: 'user', text: 'Customers'}
    ]

    const {cars, customers} = this.props
    return (
      <Router>
        <Route render={({ location }) => (
          <div className='Dashboard'>
            <DashNav toggleDashMenu={this.toggleDashMenu} />
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
                    <NavItem style={dashMenuStyle}>
                      <Glyphicon glyph={link.glyph} /> {link.text}
                    </NavItem>
                  </LinkContainer>
                ))
              }
              <NavItem
                className='Dashboard__nav-item'
                onClick={this.props.logOut}
              >
                <Glyphicon glyph='log-out' /> Log out
              </NavItem>
            </Nav>
            <Grid fluid>
              <Row className='Dashboard'>
                <div className='container__flex'>
                  <Col xsHidden sm={3} md={2} lg={2} className='Dashboard__sidebar'>
                    <Sidebar
                      headerText='Oh hai, Jaaan!'
                      content={
                        <Nav className='Sidebar__button-container' stacked>
                          <LinkContainer to='/dashboard/list-new-car' className='Dashboard__nav-item'>
                            <NavItem><Glyphicon glyph='plus-sign' /> List New Car</NavItem>
                          </LinkContainer>
                          <LinkContainer to='/dashboard/inventory' className='Dashboard__nav-item'>
                            <NavItem><Glyphicon glyph='list-alt' /> Inventory</NavItem>
                          </LinkContainer>
                          <LinkContainer to='/dashboard/customers/inquiries' className='Dashboard__nav-item'>
                            <NavItem><Glyphicon glyph='envelope' /> Inquiries</NavItem>
                          </LinkContainer>
                          <LinkContainer to='/dashboard/customers' className='Dashboard__nav-item'>
                            <NavItem><Glyphicon glyph='user' /> Customers</NavItem>
                          </LinkContainer>
                          <NavItem
                            className='Dashboard__nav-item'
                            onClick={this.props.logOut}
                          >
                            <Glyphicon glyph='log-out' /> Log out
                          </NavItem>
                        </Nav>
                      }
                    />
                  </Col>
                  <Col xs={12} sm={9} md={10} lg={10} className='Dashboard__content'>
                    <ScrollToTopOnMount />
                    <Route exact path='/dashboard/list-new-car' component={({history}) => (
                      <ListNewCar history={history} />
                    )} />
                    <Route exact path='/dashboard/inventory' component={({history}) => (
                      <ManageInventory cars={cars} history={history} />
                    )} />
                    <Route exact path='/dashboard/inventory/:id' component={({history}) => (
                      <EditCar history={history} />
                    )} />
                    <Route exact path='/dashboard/customers/inquiries' component={({history}) => (
                      <Inquiries customers={customers} history={history} />
                    )} />
                    <Route exact path='/dashboard/customers' component={({history}) => (
                      <Customers history={history} customers={customers} />
                    )} />
                    <Route exact path='/dashboard/customers/:id' component={() => (
                      <h1>UPDATE CUSTOMER</h1>
                    )} />
                  </Col>
                </div>
              </Row>
            </Grid>
          </div>
        )} />
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
  updateCar: PropTypes.func,
  updateCustomer: PropTypes.func,
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
