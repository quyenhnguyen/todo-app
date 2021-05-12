import {
  loginFailure,
  loginSuccess,
  registerSuccess,
} from '../actions/UserAction'
import { history } from '../helpers/history'
function login(email, password, from) {
  return (dispatch) => {
    fetch('http://localhost:3001/userinfo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      response.json().then((data) => {
        if (data.failure) {
          dispatch(loginFailure(data.failure))
        } else {
          localStorage.setItem('user', JSON.stringify(data))

          dispatch(loginSuccess(data))
          history.push(from)
        }
      })
    })
  }
}

function register(email, password) {
  return (dispatch) => {
    fetch('http://localhost:3001/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      response.json().then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(registerSuccess(data))

        history.push({
          pathname: '/home',
        })
      })
    })
  }
}

export { login, register }
