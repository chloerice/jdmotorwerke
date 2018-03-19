import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'

import MainNav from '../app/MainNav'
import MenuCollapse from '../app/MenuCollapse'

import Jon from './JD-Motorwerke-Owner-Jon-Rice.png'

import './About.css'

class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMainMenu: false,
      opacity: '0',
      height: '0',
      padding: '0',
      marginBottom: '0',
      imgOpacity: '0'
    }
  }

  handleOnLoad = () => {
    this.setState({imgOpacity: 1})
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
      {to: '/used-cars-for-sale', text: 'Inventory'},
      {to: '/#Contact', text: 'Contact', hash: true}
    ]
    let display = this.state.height === '0' ? 'none' : 'block'
    return (
      <div>
        <MainNav
          black
          brand="black"
          links={mainMobileMenu}
          toggleMainMenu={this.toggleMainMenu}
        />
        <MenuCollapse
          display={display}
          style={menuCollapseStyle}
          links={mainMobileMenu}
        />
        <Grid id='About' className='fadeIn animated' fluid>
          <Row>
            <Col xs={12} sm={5} smPush={7} md={6} mdPush={6} lg={7} lgPush={5}>
              <h2 className='About__header'>About the Owner</h2>
              <p className='About__owner-text'>
                Jon D. Rice founded JD Motorwerke in the fall of 2016. A vet of America's auto parts capital, California's Recycle Road, he's got over a decade of automotive industry experience servicing, dismantling, and selling European cars.
              </p>
              <p className='About__owner-text'>
                For years, he's used his expertise and resources to save family and friends the time, money and stress involved in purchasing from a car lot. Jon believes everyone should have access to an auto insider, and is thrilled to extend this service to the broader community of car buyers.
              </p>
              <p className='About__owner-text'>
                When he's not hunting down deals for his clients, he enjoys travelling with the love of his life, Kylee, and restoring rare BMWs.
              </p>
            </Col>
            <Col className='About__owner-image-container' xs={12} sm={7} smPull={5} md={6} mdPull={6} lg={5} lgPull={7}>
              <Image
                className='About__owner-image'
                onLoad={this.handleOnLoad}
                responsive
                src={Jon}
                alt='A photo of JD Motorwerke founder, Jon Rice.'
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default About
