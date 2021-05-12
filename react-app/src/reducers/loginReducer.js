import * as types from '../constants/ActionTypes'
let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

var loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      }
    case types.LOGIN_FAILURE:
      return {}
    default:
      return state
  }
}

export default loginReducer
