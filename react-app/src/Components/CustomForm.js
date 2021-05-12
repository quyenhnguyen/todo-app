import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, register } from '../services/userService'

const Form = styled.form`
  border: 3px solid #f1f1f1;
`
const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`
const ButtonSubmit = styled.button`
  background-color: #fa841c;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
`

const Container = styled.div`
  padding: 16px;
`
const ContainerForgotPws = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: '#f1f1f1';
`
const FormContainer = styled.div`
  margin: 50px 300px;
  @media (max-width: 786px) {
    margin: 50px 50px;
  }
`

const Wrapper = styled.div`
  &:hover ${ButtonSubmit} {
    opacity: 90%;
  }
`

const Field = styled.div`
  margin: 20px 0px 0px 0px;
`
class CustomForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginSubmit = (e) => {
    let password = this.state.password
    let email = this.state.email
    e.preventDefault()

    const { from } = this.props.location.state || {
      from: { pathname: '/home' },
    }

    this.props.login(email, password, from)
  }

  handleSignupSubmit = (e) => {
    let password = this.state.password
    let email = this.state.email
    e.preventDefault()

    this.props.register(password, email)
  }

  render() {
    return (
      <FormContainer>
        <h2>{this.props.name}</h2>
        <Form
          action="/home"
          onSubmit={
            this.props.name === 'Login'
              ? this.handleLoginSubmit
              : this.handleSignupSubmit
          }
        >
          <Container>
            <Field>
              <label htmlFor="uname">
                <b>Username</b>
              </label>
              <Input
                onChange={this.handleChange}
                type="text"
                value={this.state.email}
                placeholder="Enter Username"
                name="email"
                required
              />
            </Field>

            <Field>
              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <Input
                onChange={this.handleChange}
                type="password"
                value={this.state.password}
                placeholder="Enter Password"
                name="password"
                required
              />
            </Field>
            <Wrapper>
              <ButtonSubmit type="submit">{this.props.name}</ButtonSubmit>
            </Wrapper>
          </Container>
          <ContainerForgotPws>
            <span>
              {this.props.name === 'Login'
                ? 'Did not have an account?'
                : 'Already have an account?'}
            </span>
            <a href={this.props.name === 'Login' ? 'signup' : '/login'}>
              {this.props.name === 'Login' ? 'SIGN UP?' : 'LOGIN'}
            </a>
          </ContainerForgotPws>
        </Form>
      </FormContainer>
    )
  }
}

function mapStateToProps(state) {
  return {}
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login: login,
      register: register,
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomForm))
