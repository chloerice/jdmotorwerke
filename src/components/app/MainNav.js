import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { LinkContainer } from 'react-router-bootstrap'
import { Glyphicon, Navbar, NavbarBrand, Nav, NavItem, Image, Col } from 'react-bootstrap'
import './App.css'

class MainNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  /*
    The .active class is being applied to '/' even when it isn't the current
    location.pathname because all other paths are its children. This method
    corrects for that.
  */
  onlyOneActiveMatch = (match, location) => {
    if (match) return location.pathname === match.path
  }

  render () {
    const {links, brand, black, toggleMainMenu} = this.props
    return (
      <Navbar collapseOnSelect className={black ? 'navbar-black' : ''}>
        <Navbar.Header>
          <NavbarBrand>
            <LinkContainer to='/'>
              <Image
                src={brand}
                alt='JD Motorwerke logo' height='60px'
              />
            </LinkContainer>
          </NavbarBrand>
          <Col
            onClick={toggleMainMenu}
            className={black ? 'Home-menuToggle black' : 'Home-menuToggle'}
            xs={2} smHidden mdHidden lgHidden
          >
            <Glyphicon glyph='align-justify' />
          </Col>

        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className='nav-main'>
            {
              links.map((link, i) => {
                return link.hash
                  ? (
                    <li key={i}>
                      <HashLink to={link.to} onSelect={this.toggleMenuCollapse}>
                        {link.text}
                      </HashLink>
                    </li>
                  )

                  : (
                    <LinkContainer to={link.to} key={i} isActive={this.onlyOneActiveMatch}>
                      <NavItem onSelect={this.toggleMenuCollapse}>
                        {link.text}
                      </NavItem>
                    </LinkContainer>
                  )
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(MainNav)
