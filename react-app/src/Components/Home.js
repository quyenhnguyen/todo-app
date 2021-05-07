import React from 'react'
import { withRouter } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>User with id: {this.props.location.state.id}</div>
  }
}
export default withRouter(Home)
