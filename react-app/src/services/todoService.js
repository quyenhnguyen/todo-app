import { getAllTodo, addTodo, editTodoAction } from '../actions/TodoActions'

function fetchTodosOfUser(id) {
  return (dispatch) => {
    fetch(`http://localhost:3001/users/${id}/tasks/`, {
      method: 'GET',
    }).then((response) => {
      response.json().then((data) => {
        dispatch(getAllTodo(data)) //update state through action instead of return value
      })
    })
  }
}

function addNewTodo(summary, acc_id) {
  var status = false
  return (dispatch) => {
    fetch('http://localhost:3001/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary, acc_id }),
    }).then((response) => {
      //update state, dispatchAction(addTodo)
      if (response.status === 200) {
        response.json().then((data) => {
          dispatch(addTodo(data))
        })
      } else console.log('add new todo fail')
    })
  }
}
function editTodo(task) {
  console.log('click')
  return (dispatch) => {
    fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then((response) => {
      if (response.status === 200) {
        dispatch(editTodoAction(task))
      }
    })
  }
}

export { fetchTodosOfUser, addNewTodo, editTodo }
