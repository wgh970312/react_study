import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class RouteComponentPage extends Component {
  state = {
    count: 0
  }
  
  render() {
    const { count } = this.state
    return (
      <div>
        <h3>RouteComponentPage</h3>
        <button onClick={() => {
          this.setState({ count: count + 1})
        }}>change count {count}</button>

        <Router>
          {/* 错误举例 */}
          {/* <Route component={() => <Child count={count} />} /> */}
          {/* <Route component={() => <FunctionChild count={count} />} /> */}

          {/* 正确 */}
          <Route render={() => <Child count={count} />} />
          <Route render={() => <FunctionChild count={count} />} />
          <Route children={() => <Child count={count} />} />
          <Route children={() => <FunctionChild count={count} />} />
        </Router>
      </div>
    )
  }
}

class Child extends React.Component {
  componentDidMount() {
    console.log('Child componentDidMount');
  }

  componentWillUnmount() {
    console.log('Child componentWillUnmount');
  }

  render() {
    return (
      <div>Child</div>
    )
  }
}

function FunctionChild() {
  return (
    <div>FunctionChild</div>
  )
}