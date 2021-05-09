import React, { Component } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  -webkit-text-decoration-line: line-through; /* Safari */
  text-decoration-line: line-through;
`

class TaskItem extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <div>
          {this.props.task.status === false ? (
            <input
              value={this.props.task.summary}
              name="{index}"
              onChange={this.handleChange}
            ></input>
          ) : (
            <Input
              value={this.props.task.summary}
              name="{index}"
              onChange={this.handleChange}
            ></Input>
          )}
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            checked={this.props.task.status === true}
            onChange={() => this.props.handleStatusClick(this.props.index)}
          />
        </div>
      </div>
    )
  }
}

export default TaskItem
