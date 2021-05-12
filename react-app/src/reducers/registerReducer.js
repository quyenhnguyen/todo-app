import * as types from '../constants/ActionTypes'
const initialState = {}

var registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {}
    case types.REGISTER_FAILURE:
      return {}
    default:
      return state
  }
}

export default registerReducer
