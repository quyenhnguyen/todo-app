import React from 'react'
import { withRouter } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'
import styled from 'styled-components'
import TaskList from './TaskList'

const Container = styled.div`
  margin: 50px 300px;
  @media (max-width: 786px) {
    margin: 50px 50px;
  }
`

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
    }
    this.handleStatusTaskItemClick = this.handleStatusTaskItemClick.bind(this)
  }

  componentDidMount() {
    try {
      var id = this.props.location.state.id
      fetch(`http://localhost:3001/users/${id}/tasks/`, {
        method: 'GET',
      }).then((response) => {
        response.json().then((data) => {
          this.setState({
            taskList: data,
          })
        })
      })
    } catch (e) {
      console.log('User does not have an account!!')
    }
  }
  handleStatusTaskItemClick(params) {
    //recieve data from child component
    var index = params
    let tasks = this.state.taskList
    tasks[index].status = !tasks[index].status
    this.setState({ taskList: tasks })

    //update in db
    fetch(`http://localhost:3001/tasks/${tasks[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks[index]),
    })
  }

  render() {
    try {
      var id = this.props.location.state.id
      return (
        <Container>
          User with id: {id}
          {/* Add new toto */}
          <AddTodoForm userId={id}></AddTodoForm>
          <TaskList
            taskList={this.state.taskList}
            handleStatusTaskItemClick={this.handleStatusTaskItemClick}
          ></TaskList>
        </Container>
      )
    } catch (e) {
      //if user dont have an account then redirect to sign up
      this.props.history.push({
        pathname: '/signup',
      })
      return <div></div>
    }
  }
}
export default withRouter(Home)
