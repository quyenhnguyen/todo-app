import React, { Component } from 'react'
import styled from 'styled-components'

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
  }

  handleChange = (event) => {
    this.setState({ newTodoSummary: event.target.value })
  }
  handleAddTodo = (e) => {
    let summary = this.state.newTodoSummary
    let acc_id = this.props.userId

    fetch('http://localhost:3001/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary, acc_id }),
    }).then((response) => {
      return response
    })

    e.preventDefault()
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

export default AddTodoForm
