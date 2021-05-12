import React, { Component } from 'react'
import styled from 'styled-components'
import { addNewTodo } from '../services/todoService'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Button = styled.button`
  background-color: #fa841c;
  color: white;
  padding: 8px 20px;
  margin: 8px 10px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  width: 15%;
`

const Input = styled.input`
  padding: 12px 20px;
  width: 80%;
  margin: 8px 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
`

class AddTodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodoSummary: '',
    }
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  handleChange = (event) => {
    this.setState({ newTodoSummary: event.target.value })
  }
  handleAddTodo = (e) => {
    let summary = this.state.newTodoSummary
    let acc_id = this.props.userId
    console.log(acc_id)
    this.props.addNewTodo(summary, acc_id)
    e.preventDefault()
    this.onClear()
  }

  onClear() {
    this.setState({ newTodoSummary: '' })
  }
  render() {
    return (
      <div className="topnav">
        <div className="search-container">
          <form action="/" onSubmit={this.handleAddTodo}>
            <Input
              type="text"
              onChange={this.handleChange}
              name="newTodoSummary"
              placeholder="Add 1 todo to task list"
            />
            <Button type="submit">Add</Button>
          </form>
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
      addNewTodo: addNewTodo,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm)
