import * as types from '../constants/ActionTypes'

//define 1 action that user want to do to change state of store, 1 action should have (type, attribute)
//then reducers receive all action and switch case to deal with constant action
export function getAllTodo(data) {
  return {
    type: types.LIST_ALL,
    data,
  }
}

export function addTodo(task) {
  return {
    type: types.ADD_TODO,
    task,
  }
}

export function editTodoAction(task) {
  return {
    type: types.EDIT_TODO,
    task,
  }
}
