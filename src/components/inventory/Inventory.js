import React, { Component } from 'react'
import { Grid, Row, Col, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainNav from '../app/MainNav'
import './Inventory.css'
import brandBlack from '../dashboard/jdmotorwerke-logo.png'

class Inventory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inventory: 'inherit',
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
      about: this.state.about === 'calc(100vh - 150px)'
        ? 'inherit'
        : 'calc(100vh - 150px)',
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
      {to: '/', text: 'Home'},
      {to: '/about', text: 'About'},
      {to: '/inventory', text: 'Inventory'}
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
        <Grid fluid>
          <Row id='Inventory' style={{minHeight: this.state.inventory}}>
            <Col>
              <header className='Inventory__header'>
                <h2>(INVENTORY)</h2>
              </header>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Inventory
