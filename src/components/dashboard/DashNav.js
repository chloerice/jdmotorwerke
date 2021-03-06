import React from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, NavbarBrand, Glyphicon, Image, Col } from 'react-bootstrap'
import '../app/App.css'
import brandBlack from '../app/JDMotorwerke_black_text.png'

const DashNav = props => (
  <Navbar fixedTop collapseOnSelect className='navbar-dash'>
    <Navbar.Header>
      <NavbarBrand>
        <a href='/admin' target='_blank'>
          <Image
            className="Nav--logo"
            src={brandBlack}
            alt='click to open the JD Motorwerke website in new tab'
            height='60px' />
        </a>
      </NavbarBrand>
      <Col
        onClick={props.toggleDashMenu}
        className='Dashboard-menuToggle'
        xs={2} smHidden mdHidden lgHidden
      >
        <Glyphicon glyph='cog' />
      </Col>
    </Navbar.Header>
  </Navbar>
)

export default withRouter(DashNav)
