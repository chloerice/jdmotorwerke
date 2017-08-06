import React, { Component } from 'react'
import { Row, Col, FormControl, ControlLabel, FormGroup, Button, Alert, Modal, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { creatingCustomer } from '../../reducers/actions/customers'
import { dismissAlert } from '../../reducers/actions/alerts'
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
      message: '',
      show: false
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

  handleDismiss = (event) => {
    if (event) event.preventDefault()
    this.setState({show: false})
  }

  showConfirmation = () => {
    this.setState({show: true})
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
    }, this.showConfirmation)
  }

  isInvalid = () => {
    const { year, make, model, name, email, phone } = this.state
    return (!year || !make || !model || !name || !email || !phone)
  }

  render () {
    const {alert, handleDismiss} = this.props
    return (
      <Row id='Contact' className='gradient'>
        {
          alert &&
          <Modal
            show={this.state.show}
            onHide={handleDismiss}
            autoFocus
            backdrop
            restoreFocus
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <Glyphicon glyph='check' /> <strong>{alert.title}</strong>
              </Modal.Title>
            </Modal.Header>
            <Alert bsStyle={alert.style}>
              <p>{alert.message}</p>
              {alert.signed && <p><em>{alert.signed}</em></p>}
            </Alert>
          </Modal>
        }
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
                  <ControlLabel>NAME</ControlLabel>
                  <FormControl
                    required
                    onChange={this.handleChange('name')}
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='phone'>
                  <ControlLabel>PHONE</ControlLabel>
                  <FormControl
                    required
                    type='tel'
                    onChange={this.handleChange('phone')}
                    value={this.state.phone}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='email'>
                  <ControlLabel>EMAIL</ControlLabel>
                  <FormControl
                    required
                    type='email'
                    onChange={this.handleChange('email')}
                    value={this.state.email}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='zipcode'>
                  <ControlLabel>ZIP CODE</ControlLabel>
                  <FormControl
                    type='tel'
                    onChange={this.handleChange('zipCode')}
                    value={this.state.zipCode}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <FormGroup className='align-left' controlId='make'>
                  <ControlLabel>MAKE</ControlLabel>
                  <FormControl
                    required
                    onChange={this.handleChange('make')}
                    value={this.state.make}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='model'>
                  <ControlLabel>MODEL</ControlLabel>
                  <FormControl
                    required
                    onChange={this.handleChange('model')}
                    value={this.state.model}
                  />
                </FormGroup>
                <FormGroup className='align-left' controlId='year'>
                  <ControlLabel>YEAR</ControlLabel>
                  <FormControl
                    required
                    type='tel'
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
  createCustomer: PropTypes.func,
  handleDismiss: PropTypes.func,
  alert: PropTypes.object
}

const mapStateToProps = state => ({
  alert: state.alert
})

const mapDispatchToProps = dispatch => ({
  createCustomer: customer => dispatch(creatingCustomer(customer)),
  handleDismiss: (event) => dispatch(dismissAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
