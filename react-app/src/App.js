import './App.css'
import React, { Component } from 'react'
import CustomForm from './Components/CustomForm'
import Home from './Components/Home'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true,
      isSignUp: false,
    }
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
  }

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
      return response.json().then((data) => {})
    })

    e.preventDefault()
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home}></Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <CustomForm name="Login"></CustomForm>
          </Route>
          <Route path="/signup">
            <CustomForm name="Sign up"></CustomForm>
          </Route>
        </div>
      </Router>
    )
  }
}

export default App
