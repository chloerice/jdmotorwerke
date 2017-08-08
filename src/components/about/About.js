import React, { Component } from 'react'
import { Grid, Row, Col, Navbar, Nav, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainNav from '../app/MainNav'
import './About.css'
import brandBlack from '../dashboard/jdmotorwerke-logo.png'
import Jon from './JD-Motorwerke-Owner-Jon-Rice.png'

class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      about: '0',
      showMainMenu: false,
      opacity: '0',
      height: '0',
      padding: '0',
      marginBottom: '0'
    }
  }

  toggleMainMenu = (event) => {
    if (event) event.preventDefault()
    this.setState({
      about: this.state.about === 'calc(100vh - 190px)'
        ? 'inherit'
        : 'calc(100vh - 150px)',
      showMainMenu: !this.state.showMainMenu,
      height: this.state.height === '190px' ? '0' : '190px',
      padding: this.state.padding === '10px 0' ? '0' : '10px 0',
      opacity: this.state.opacity === '0' ? '0.7' : '0'
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
      {to: '/', text: 'Home'},
      {to: '/about', text: 'About'},
      {to: '/inventory', text: 'Inventory'},
      {to: '/#Contact', text: 'Contact', hash: true}
    ]
    let display = this.state.height === '0' ? 'none' : 'block'
    return (
      <div>
        <MainNav black brand={brandBlack} links={mainMobileMenu} toggleMainMenu={this.toggleMainMenu} />
        <Nav
          className='Dashboard-menu-collapse gradient'
          style={menuCollapseStyle}
          stacked
        >
          {
            mainMobileMenu.map((link, i) => (
              <li
                className='Dashboard__nav-item'
                key={i}
                onClick={this.toggleMainMenu}
              >
                <Link to={link.to} style={{display}}>
                  {link.text}
                </Link>
              </li>
            ))
          }
        </Nav>
        <Grid id='About' className='fadeIn animated' fluid>
          <Row>
            {/* MOBILE */}
            <Col xs={12} smHidden mdHidden lgHidden>
              <h2 className='About__header--mobile'>About the Owner</h2>
              <p className='About__owner-text--mobile'>
                Jon D. Rice founded JD Motorwerke in the fall of 2016. A longtime vet of America's auto parts capital--California's Recycle Rd--he's got almost a decade of automotive industry experience servicing, dismantling, and selling European cars.  His passions include travelling with the love of his life, Kylee, and hunting down rare BMWs.
              </p>
            </Col>
            <Col className='About__owner--mobile' xs={12} smHidden mdHidden lgHidden>
              <Image
                className='About__owner-image--mobile'
                responsive
                src={Jon}
                alt='A photo of JD Motorwerke founder Jon Rice.'
              />
            </Col>
            {/* DESKTOP/TABLET */}
            <Col className='About__owner' xsHidden sm={12} md={12} lg={12}>
              <Image
                className='About__owner-image'
                responsive
                src={Jon}
                alt='A photo of JD Motorwerke founder Jon Rice.'
              />
              <h2 className='About__header'>About the Owner</h2>
              <p className='About__owner-text'>
                Jon D. Rice founded JD Motorwerke in the fall of 2016. A longtime vet of America's auto parts capital--California's Recycle Rd--he's got almost a decade of automotive industry experience servicing, dismantling, and selling European cars. His passions include travelling with the love of his life, Kylee, and hunting down rare BMWs.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default About
