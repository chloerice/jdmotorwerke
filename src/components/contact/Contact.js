import React, { Component } from 'react'
import { Row, Col, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { creatingCustomer } from '../../reducers/actions/customers'
import './Contact.css'

class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      zipcode: '',
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
    const { year, make, model, color, name, email, phone, zipcode, message } = this.state
    const date = Date.now()
    const yrMkModelColor = `${year} ${make} ${model}, ${color}`
    const customer = {
      name,
      email,
      phone,
      zipcode,
      message,
      yrMkModelColor,
      createdAt: date,
      updatedAt: date
    }
    this.props.createCustomer(customer)
  }

  render () {
    return (
      (
        <Row id='Contact' className='gradient'>
          <Col xs={12} sm={12} md={12} lg={12}>
            <header className='Contact__header'>
              <h2>Contact Us</h2>
            </header>
            <hr className='separator separator--white' />
            <p className='subtext'>
              Having trouble finding your dream car? Give us a call at (530) 238-5853 or fill out the form below.
            </p>
            <form className='Contact__form' onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <FormGroup className='align-left' controlId='name'>
                    <ControlLabel>NAME</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('name')}
                      value={this.state.name}
                    />
                  </FormGroup>
                  <FormGroup className='align-left' controlId='phone'>
                    <ControlLabel>PHONE</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('phone')}
                      value={this.state.phone}
                    />
                  </FormGroup>
                  <FormGroup className='align-left' controlId='email'>
                    <ControlLabel>EMAIL</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('email')}
                      value={this.state.email}
                    />
                  </FormGroup>
                  <FormGroup className='align-left' controlId='zipcode'>
                    <ControlLabel>ZIP CODE</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('zipcode')}
                      value={this.state.zipcode}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <FormGroup className='align-left' controlId='make'>
                    <ControlLabel>MAKE</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('make')}
                      value={this.state.make}
                    />
                  </FormGroup>
                  <FormGroup className='align-left' controlId='model'>
                    <ControlLabel>MODEL</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('model')}
                      value={this.state.model}
                    />
                  </FormGroup>
                  <FormGroup className='align-left' controlId='year'>
                    <ControlLabel>YEAR</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('year')}
                      value={this.state.year}
                    />
                  </FormGroup>
                  <FormGroup className='align-left' controlId='color'>
                    <ControlLabel>COLOR</ControlLabel>
                    <FormControl
                      onChange={this.handleChange('color')}
                      value={this.state.color}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <FormGroup className='align-left' controlId='message'>
                    <ControlLabel>MESSAGE</ControlLabel>
                    <FormControl
                      componentClass='textarea'
                      onChange={this.handleChange('message')}
                      value={this.state.name}
                    />
                  </FormGroup>
                  <Button bsStyle='primary' bsSize='lg' type='submit'>SUBMIT</Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      )
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createCustomer: customer => dispatch(creatingCustomer(customer))
})

export default connect(null, mapDispatchToProps)(Contact)
