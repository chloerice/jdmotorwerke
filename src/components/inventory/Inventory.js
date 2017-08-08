import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MainNav from '../app/MainNav'
import MenuCollapse from '../app/MenuCollapse'
import './Inventory.css'
import brandBlack from '../dashboard/jdmotorwerke-logo.png'

class Inventory extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
      showMainMenu: !this.state.showMainMenu,
      height: this.state.height === '190px' ? '0' : '190px',
      padding: this.state.padding === '10px 0' ? '0' : '10px 0',
      opacity: this.state.opacity === '0' ? '0.7' : '0'
    })
  }

  render () {
    const menuCollapseStyle = {
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
        <MainNav
          black
          brand={brandBlack}
          links={mainMobileMenu}
          toggleMainMenu={this.toggleMainMenu}
        />
        <MenuCollapse
          display={display}
          style={menuCollapseStyle}
          links={mainMobileMenu}
        />
        <Grid id='Inventory' className='fadeIn animated' fluid>
          <Row>
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

Inventory.propTypes = {
  cars: PropTypes.array
}

const mapStateToProps = state => ({
  cars: state.cars.all
})

export default withRouter(connect(mapStateToProps)(Inventory))
