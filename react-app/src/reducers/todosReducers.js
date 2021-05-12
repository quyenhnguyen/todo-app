import * as types from '../constants/ActionTypes'

var initialState = []

var todosReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      state = action.data
      return state
    case types.ADD_TODO:
      return [...state, action.task]
    case types.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.task.id
          ? { ...todo, status: action.task.status }
          : todo
      )
    default:
      return state
  }
}

export default todosReducers
