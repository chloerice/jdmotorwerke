import React from 'react'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, NavbarBrand, Nav,
         Glyphicon, NavItem, Image, Col } from 'react-bootstrap'
import '../app/App.css'
import './Dashboard.css'
import brandBlack from './jdmotorwerke-logo.svg'

/*
  The .active class is being applied to '/' even when it isn't the current
  location.pathname because all other paths are its children. This method
  corrects for that.
*/
const onlyOneActiveMatch = (match, location) => {
  if (match) return location.pathname === match.path
  else return false
}

const DashNav = props => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <NavbarBrand>
        <LinkContainer to='/'>
          <Image src={brandBlack} alt='JD Motorwerke logo' height='60px' />
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
      <Nav pullRight className='nav-dashboard'>
        <LinkContainer eventKey={1} to='/' isActive={onlyOneActiveMatch}>
          <NavItem>Site</NavItem>
        </LinkContainer>
        <LinkContainer eventKey={2} to='/dashboard' isActive={onlyOneActiveMatch}>
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <NavItem onClick={props.logOut}>Log out</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default withRouter(DashNav)
