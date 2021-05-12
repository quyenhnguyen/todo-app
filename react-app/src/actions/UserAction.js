import * as types from '../constants/ActionTypes'

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user,
  }
}

export function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    error,
  }
}

export function registerSuccess(user) {
  return {
    type: types.REGISTER_SUCCESS,
    user,
  }
}

export function registerFailure(error) {
  return {
    type: types.REGISTER_FAILURE,
    error,
  }
}
