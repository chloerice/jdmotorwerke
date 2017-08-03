import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './Contact.css'

const Contact = props => (
  <Row id='Contact' className='gradient'>
    <Col xs={12} sm={12} md={12} lg={12}>
      <header className='Contact-header'>
        <h2>CONTACT</h2>
        <p>
          Having trouble finding your dream car? Give us a call at (530) 238-5853 or fill out the form below.
        </p>
      </header>
      <hr className='separator separator--white' />
    </Col>
  </Row>
)

export default Contact
