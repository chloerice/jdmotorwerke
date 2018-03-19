import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import { Glyphicon, Navbar, NavbarBrand, Nav, NavItem, Image, Col } from 'react-bootstrap'

import brandWhite from '../app/JDMotorwerke_white_text.svg'
import brandBlack from '../app/JDMotorwerke_black_text.svg'

import './App.css'

class MainNav extends Component {
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
    const brandImg = brand === 'black' ? brandBlack : brandWhite

    return (
      <Navbar collapseOnSelect className={black ? 'navbar-black' : ''}>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/' className="Nav--logo">
              <Image src={brandImg} alt='JD Motorwerke' />
            </LinkContainer>
          </Navbar.Brand>
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
                      <HashLink to={link.to} onSelect={toggleMainMenu}>
                        {link.text}
                      </HashLink>
                    </li>
                  )

                  : (
                    <LinkContainer to={link.to} key={i} isActive={this.onlyOneActiveMatch}>
                      <NavItem onSelect={toggleMainMenu}>
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

MainNav.propTypes = {
  black: PropTypes.bool,
  toggleMainMenu: PropTypes.func,
  brand: PropTypes.any, // this is the brand image imported by the parent component
  links: PropTypes.array
}

export default withRouter(MainNav)
