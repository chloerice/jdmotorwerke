import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { LinkContainer } from 'react-router-bootstrap'
import { Glyphicon, Navbar, NavbarBrand, Nav, Image, Col } from 'react-bootstrap'
import './App.css'
import brandWhite from './jdmotorwerke-logo-white.svg'

class MainNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  render () {

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <NavbarBrand>
            <LinkContainer to='/'>
              <Image src={brandWhite} alt='JD Motorwerke logo' height='60px' />
            </LinkContainer>
          </NavbarBrand>
          <Col
            onClick={this.props.toggleMainMenu}
            className='Dashboard-menuToggle'
            xs={2} smHidden mdHidden lgHidden
          >
            <Glyphicon glyph='align-justify' />
          </Col>

        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className='nav-main'>
            <li>
              <HashLink to='/#About' onSelect={this.toggleMenuCollapse}>About</HashLink>
            </li>
            <li>
              <HashLink to='/#Inventory' onSelect={this.toggleMenuCollapse}>Inventory</HashLink>
            </li>
            <li onSelect={this.toggleMenuCollapse}>
              <HashLink to='/#Contact'>Contact</HashLink>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(MainNav)
