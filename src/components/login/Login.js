import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { loggingIn } from '../../reducers/actions/auth'
import '../app/App.css'
import './Login.css'

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
      <div className='Login container__flex--login gradient'>
        <form className='Login__form' onSubmit={this.handleSubmit}>
          <h1 className='Login__header'>ENTER DASHBOARD</h1>
          <FormGroup controlId='email'>
            <ControlLabel>EMAIL</ControlLabel>
            <FormControl
              required
              type='email'
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>PASSWORD</ControlLabel>
            <FormControl
              required
              type='password'
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </FormGroup>
          <Button disabled={this.isInvalid()} className='Login__button' type='submit'>
            LOG IN
          </Button>
        </form>
      </div>
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
