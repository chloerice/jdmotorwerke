import React from 'react'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, NavbarBrand, Nav,
         Glyphicon, Col, NavItem, Image } from 'react-bootstrap'
import './App.css'
import brand from './jdmotorwerke-logo.svg'

/*
  The .active class is being applied to '/' even when it isn't the current
  location.pathname because all other paths are its children. This method
  corrects for that.
*/
const onlyOneActiveMatch = (match, location) => {
  if (match) return location.pathname === match.path
  else return false
}

const NavBar = props => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <NavbarBrand>
        <LinkContainer to='/'>
          <Image src={brand} alt='JD Motorwerke logo' height='60px' />
        </LinkContainer>
      </NavbarBrand>
      <Col
        xsHidden={!props.user}
        onClick={props.toggleDashMenu}
        className='Dashboard-menuToggle'
        xs={2} smHidden mdHidden lgHidden
      >
        <Glyphicon glyph='cog' />
      </Col>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {
        !props.user

          ? <Nav>
              <LinkContainer eventKey={1} to='/about' isActive={onlyOneActiveMatch}>
                <NavItem>About</NavItem>
              </LinkContainer>
              <LinkContainer eventKey={2} to='/inventory' isActive={onlyOneActiveMatch}>
                <NavItem>Inventory</NavItem>
              </LinkContainer>
              <LinkContainer eventKey={2} to='/contact' isActive={onlyOneActiveMatch}>
                <NavItem>Contact</NavItem>
              </LinkContainer>
            </Nav>

          : <Nav>
              <LinkContainer eventKey={1} to='/' isActive={onlyOneActiveMatch}>
                <NavItem>Site</NavItem>
              </LinkContainer>
              <LinkContainer eventKey={2} to='/dashboard' isActive={onlyOneActiveMatch}>
                <NavItem>Dashboard</NavItem>
              </LinkContainer>
            </Nav>
      }
    </Navbar.Collapse>
  </Navbar>
)

export default withRouter(NavBar)
