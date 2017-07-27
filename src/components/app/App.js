import React, { Component } from 'react'
import { Grid, Nav, Glyphicon, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import MainNav from './Navbar'
import Home from '../home/Home'
import About from '../about/About'
import Contact from '../contact/Contact'
import Inventory from '../inventory/Inventory'
import Dashboard from '../dashboard/Dashboard'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'
import './App.css'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showDashMenu: false,
      opacity: 0,
      height: 0,
      padding: 0,
      marginBottom: 0
    }
  }

  toggleDashMenu = event => {
    if (event) event.preventDefault()
    this.setState({
      showDashMenu: !this.state.showDashMenu,
      height: this.state.height === '215px' ? '0' : '215px',
      padding: this.state.padding === '75px 0 10px 0' ? '0' : '75px 0 10px 0',
      opacity: this.state.opacity === 0 ? 1 : 0,
      marginBottom: this.state.marginBottom === '-60px' ? 0 : '-60px'
    })
  }

  /*
    The .active class is being applied to '/' even when it isn't the current
    location.pathname because all other paths are its children. This method
    corrects for that.
  */
  onlyOneActiveMatch = (match, location) => {
    if (match) return location.pathname === match.path
    else return false
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

    const {user} = this.props
    return (
      <Router>
        <div>
          <MainNav
            user={this.props.user}
            toggleDashMenu={this.toggleDashMenu}
            onlyOneActiveMatch={this.onlyOneActiveMatch}
          />
          <Nav
            className='Dashboard-menu-collapse'
            style={dashMenuStyle}
            stacked
            onSelect={this.toggleDashMenu}
          >
            <ScrollToTopOnMount scroll={this.state.showDashMenu} />
            {
              user &&
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
          <Grid fluid className='App'>
            <Route path='/dashboard/:action' component={() => {
              if (!user) return <Redirect to='/login' />
              return <Dashboard />
            }} />
            <Route path='/dashboard/:action/:id' component={() => {
              if (!user) return <Redirect to='/login' />
              return <Dashboard />
            }} />
            {/* PUBLIC ROUTES */}
            <Route exact strict path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/inventory' component={Inventory} />
            <Route path='/contact' component={Contact} />
          </Grid>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({ user: state.auth })

export default withRouter(connect(mapStateToProps)(App))
