import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { loggingIn } from '../../reducers/actions/auth'
import ScrollToTopOnMount from '../utilities/ScrollToTopOnMount'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = type => event => {
    const { value } = event.target
    this.setState({[type]: value})
  }

  clearForm = () => {
    this.setState({
      email: '',
      password: ''
    })
  }

  isInvalid = () => {
    const { email, password } = this.state
    return !(email && password)
  }

  handleSubmit = event => {
    event.preventDefault()
    const { email, password } = this.state
    this.clearForm()
    this.props.logIn(email, password)
  }

  render () {
    if (this.props.user) {
      return <Redirect to='/dashboard/inventory' />
    }

    return (
      <Grid fluid>
        <Row className='LoginForm'>
          <ScrollToTopOnMount />
          <Col xs={12} sm={6} md={6} lg={6}>
            <h1 className='LoginForm-header'>Log In</h1>
            <form className='LoginForm-body' onSubmit={this.handleSubmit}>
              <FormGroup controlId='email'>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type='email'
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
              </FormGroup>
              <FormGroup controlId='password'>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
              </FormGroup>
              <Button disabled={this.isInvalid()} className='primary' type='submit'>
                Log In
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  logIn: (email, password) => dispatch(loggingIn(email, password))
})

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default withRouter(LoginFormContainer)
