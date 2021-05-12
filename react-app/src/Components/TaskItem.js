import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editTodo } from '../services/todoService'

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
  handleStatusClick = (task) => {
    task.status = !task.status
    //task.summary = this.state.summary
    this.props.editTodo(task)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.task.status === false ? (
            <input
              value={this.props.task.summary}
              name="summary"
              onChange={this.handleChange}
            ></input>
          ) : (
            <Input
              value={this.props.task.summary}
              name="summary"
              onChange={this.handleChange}
            ></Input>
          )}
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            checked={this.props.task.status === true}
            onChange={() => this.handleStatusClick(this.props.task)}
          />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {}
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      editTodo: editTodo,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)
