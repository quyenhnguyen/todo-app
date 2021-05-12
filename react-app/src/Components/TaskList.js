import React, { Component } from 'react'
import styled from 'styled-components'
import TaskItem from './TaskItem'

const Input = styled.input`
  -webkit-text-decoration-line: line-through; /* Safari */
  text-decoration-line: line-through;
`

class TaskList extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    var element = this.props.taskList.map((task, index) => (
      <TaskItem
        key={index}
        index={index}
        task={task}
        handleStatusClick={this.handleStatusClick}
      ></TaskItem>
    ))
    return <div>{element}</div>
  }
}

export default TaskList
