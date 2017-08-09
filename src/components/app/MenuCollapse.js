import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import PropTypes from 'prop-types'

const MenuCollapse = props => (
  <Nav
    className='Dashboard-menu-collapse gradient'
    style={props.style}
    stacked
  >
    {
      props.links.map((link, i) => {
        return link.hash
          ? (
            <li key={i} className='Dashboard__nav-item'>
              <HashLink
                to={link.to}
                style={{display: props.display}}
                onSelect={props.toggleMainMenu}
              >
                {link.text}
              </HashLink>
            </li>
          )

          : (
            <li
              className='Dashboard__nav-item'
              key={i}
              onClick={props.toggleMainMenu}
            >
              <Link to={link.to} style={{display: props.display}}>
                {link.text}
              </Link>
            </li>
          )
      })
    }
  </Nav>
)

MenuCollapse.propTypes = {
  display: PropTypes.string,
  links: PropTypes.array,
  style: PropTypes.object
}

export default MenuCollapse
