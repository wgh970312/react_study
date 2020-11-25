import React, { Component } from 'react'
import store from '../store'

export default class ReduxPage extends Component {
  componentDidMount() {
    // store 发生变化
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  add = () => {
    store.dispatch({ type: "ADD" })
  }

  asyncAdd = () => {
    // debugger
    store.dispatch(() => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' })
      }, 1000)
    })
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyncAdd}>async add</button>
      </div>
    )
  }
}
