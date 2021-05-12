import React from 'react'
import { withRouter } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'
import styled from 'styled-components'
import TaskList from './TaskList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchTodosOfUser, addNewTodo } from '../services/todoService'

const Container = styled.div`
  margin: 50px 300px;
  @media (max-width: 786px) {
    margin: 50px 50px;
  }
`

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    var id = user ? user.id : null
    if (id != null) {
      const fetchTodosOfUserAction = this.props.fetchTodosOfUser //call api, and create action ->update state
      fetchTodosOfUserAction(id)
    } else {
      //if user dont have an account then redirect to sign up
      this.props.history.push({
        pathname: '/login',
      })
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      return (
        <Container>
          User id: {user.id}
          <AddTodoForm userId={user.id}></AddTodoForm>
          <TaskList
            taskList={this.props.taskList}
            handleStatusTaskItemClick={this.handleStatusTaskItemClick}
          ></TaskList>
        </Container>
      )
    }
    return <div></div>
  }
}

//lay props tu sate cua store (rootReducer)
function mapStateToProps(state) {
  return {
    taskList: state.todosReducers,
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchTodosOfUser: fetchTodosOfUser,
      addNewTodo: addNewTodo,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
