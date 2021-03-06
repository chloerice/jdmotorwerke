import React, { Component } from 'react'
import { Row, Col, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { creatingCustomer } from '../../reducers/actions/customers'
import PropTypes from 'prop-types'
import './Contact.css'

class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      zipCode: '',
      make: '',
      model: '',
      year: '',
      color: '',
      message: ''
    }
  }

  handleChange = type => event => {
    this.setState({[`${type}`]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const { year, make, model, color, name, email, phone, zipCode, message } = this.state
    const date = new Date().toLocaleString()
    const yrMkModelColor = `${year} ${make} ${model}, ${color}`
    const customer = {
      name,
      email,
      phone,
      zipCode,
      message,
      yrMkModelColor,
      createdAt: date,
      updatedAt: date,
      status: 'New Inquiry'
    }
    this.props.createCustomer(customer)
    this.clearForm()
  }

  clearForm = () => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      zipCode: '',
      make: '',
      model: '',
      year: '',
      color: '',
      message: ''
    })
  }

  isInvalid = () => {
    const { year, make, model, name, email, phone } = this.state
    return (!year || !make || !model || !name || !email || !phone)
  }

  render () {
    return (
      <Row id='Contact' className='gradient'>
        <Col xs={12} sm={12} md={12} lg={12}>
          <header className='Contact__header'>
            <h2>Contact Us</h2>
          </header>
          <hr className='separator separator--white' />
          <p className='subtext'>
            Having trouble finding the car you want at a reasonable price without cringeworthy mileage?
          </p>
          <p className='subtext'>
            We've got you covered. Give us a call at (530) 238-5853 or fill out the form below.
          </p>
          <form className='Contact__form' onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <FormGroup className='align-left' controlId='name'>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    required
                    onChange={this.handleChange('name')}
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='phone'>
                  <ControlLabel>Phone</ControlLabel>
                  <FormControl
                    required
                    type='tel'
                    onChange={this.handleChange('phone')}
                    value={this.state.phone}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='email'>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    required
                    type='email'
                    onChange={this.handleChange('email')}
                    value={this.state.email}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='zipcode'>
                  <ControlLabel>Zip Code</ControlLabel>
                  <FormControl
                    type='tel'
                    onChange={this.handleChange('zipCode')}
                    value={this.state.zipCode}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <FormGroup className='align-left' controlId='make'>
                  <ControlLabel>Make</ControlLabel>
                  <FormControl
                    required
                    onChange={this.handleChange('make')}
                    value={this.state.make}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='model'>
                  <ControlLabel>Model</ControlLabel>
                  <FormControl
                    required
                    onChange={this.handleChange('model')}
                    value={this.state.model}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='year'>
                  <ControlLabel>Year</ControlLabel>
                  <FormControl
                    required
                    type='tel'
                    onChange={this.handleChange('year')}
                    value={this.state.year}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='color'>
                  <ControlLabel>Color</ControlLabel>
                  <FormControl
                    onChange={this.handleChange('color')}
                    value={this.state.color}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <FormGroup className='align-left' controlId='message'>
                  <ControlLabel>Message</ControlLabel>
                  <FormControl
                    componentClass='textarea'
                    onChange={this.handleChange('message')}
                    value={this.state.message}
                  />
                </FormGroup>
                <Button bsStyle='primary' bsSize='lg' type='submit' disabled={this.isInvalid()}>
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}

Contact.propTypes = {
  createCustomer: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  createCustomer: customer => dispatch(creatingCustomer(customer))
})

export default connect(null, mapDispatchToProps)(Contact)
