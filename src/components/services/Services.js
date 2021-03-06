import React from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import './Services.css'
import ScrollAnimation from '../utilities/ScrollAnimation'

const Services = props => (
  <Row id='Services'>
    <Col xs={12} sm={12} md={12} lg={12}>
      <header className='Services--header'>
        <h2>At Your Service</h2>
      </header>
      <hr className='separator' />
    </Col>
    <Col xs={12} sm={12} md={12} lg={12}>
      <Row>
        <Col className='Services--highlights' xs={12} sm={4} md={4} lg={4}>
          <ScrollAnimation animateIn='zoomIn' animateOnce>
            <Glyphicon className='Services--glyphicon glyph-1' glyph='star' />
          </ScrollAnimation>
          <h3>Quality Guaranteed</h3>
          <p className='text-muted subtext'>
            We purchase only the highest quality vehicles, fully inspected and detailed.
          </p>
        </Col>
        <Col className='Services--highlights' xs={12} sm={4} md={4} lg={4}>
          <ScrollAnimation animateIn='zoomIn' animateOnce>
            <Glyphicon className='Services--glyphicon glyph-2'glyph='certificate' />
          </ScrollAnimation>
          <h3>Licensed & Insured</h3>
          <p className='text-muted subtext'>
            We are a certified, licensed and insured auto dealer located in Northern California.
          </p>
        </Col>
        <Col className='Services--highlights' xs={12} sm={4} md={4} lg={4}>
          <ScrollAnimation animateIn='zoomIn' animateOnce>
            <Glyphicon className='Services--glyphicon glyph-3' glyph='search' />
          </ScrollAnimation>
          <h3>Nationwide Search</h3>
          <p className='text-muted subtext'>
            We source and ship clean, low mileage vehicles from exclusive, dealer-only auctions.
          </p>
        </Col>
      </Row>
    </Col>
  </Row>
)

export default Services
