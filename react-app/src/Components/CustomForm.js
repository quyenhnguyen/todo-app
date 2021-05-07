import React, { useState, useEffect, Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

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
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  fetchData() {
    fetch('http://localhost:3001/users/', {
      method: 'GET',
    }).then((response) => {
      return response.json().then((data) => {
        console.log(data) //
      })
    })
  }

  handleLoginSubmit(e) {}

  handleSignupSubmit = (e) => {
    let password = this.state.password
    let email = this.state.email

    fetch('http://localhost:3001/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return response.json().then((data) => {
        this.props.history.push({
          pathname: '/home',
          state: { id: data.id },
        })
        console.log(data) //lay dc id của user
      })
    })

    e.preventDefault()
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
            <button onClick={this.fetchData}>Fetch</button>
          </ContainerForgotPws>
        </Form>
      </FormContainer>
    )
  }
}
export default withRouter(CustomForm)
