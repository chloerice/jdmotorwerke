import React, { Component } from 'react'
import { Grid, Row, Col, Nav, Glyphicon } from 'react-bootstrap'
import { HashLink } from 'react-router-hash-link'
import Services from '../services/Services'
import Contact from '../contact/Contact'
import MainNav from '../app/MainNav'
import './Home.css'
import brandWhite from '../app/jdmotorwerke-logo-white.png'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      home: 'calc(100vh - 60px)',
      showMainMenu: false,
      opacity: 0,
      height: 0,
      padding: 0,
      marginBottom: 0
    }
  }

  toggleMainMenu = (event) => {
    if (event) event.preventDefault()
    this.setState({
      home: this.state.home === 'calc(100vh - 210px)' ? 'calc(100vh - 60px)' : 'calc(100vh - 210px)',
      showMainMenu: !this.state.showMainMenu,
      height: this.state.height === '150px' ? '0' : '150px',
      padding: this.state.padding === '10px 0' ? '0' : '10px 0',
      opacity: this.state.opacity === 0 ? 0.7 : 0
    })
  }

  render () {
    const menuCollapseStyle = {
      home: this.state.home,
      padding: this.state.padding,
      height: this.state.height,
      opacity: this.state.opacity,
      marginBottom: this.state.marginBottom
    }

    const mainMobileMenu = [
      {to: '/about', text: 'About'},
      {to: '/used-cars-for-sale', text: 'Inventory'},
      {to: '/#Contact', text: 'Contact', hash: true}
    ]

    return (
      <div className='Home__container fadeIn animated'>
        <MainNav
          brand={brandWhite}
          toggleMainMenu={this.toggleMainMenu}
          links={mainMobileMenu}
        />
        <Nav
          className='Dashboard-menu-collapse gradient'
          style={menuCollapseStyle}
          stacked
        >
          {
            mainMobileMenu.map((link, i) => (
              <li
                hidden={!this.state.showMainMenu}
                className='Dashboard__nav-item'
                key={i}
                onClick={this.toggleMainMenu}
              >
                <HashLink to={link.to}>{link.text}</HashLink>
              </li>
            ))
          }
        </Nav>
        <Grid fluid>
          <Row className='Home' style={{height: this.state.home}}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <header className='Home__header'>
                <h2 className='Home__heading'>Your dream car is out there.</h2>
                <h2 className='Home__heading'>We'll help you find it.</h2>
              </header>
            </Col>
            <p className='sr-only'>Scroll down to learn more!</p>
            <Glyphicon className='scrollDown animated pulse infinite' glyph='chevron-down' />
          </Row>
          <Services />
          <Contact />
        </Grid>
      </div>
    )
  }
}

export default Home
