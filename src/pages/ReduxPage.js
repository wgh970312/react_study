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
    store.dispatch({ type: "ADD1" })
  }

  asyncAdd = () => {
    // debugger
    store.dispatch(() => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD1' })
      }, 1000)
    })
  }

  add2 = () => {
    store.dispatch({ type: "ADD2" })
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count1}</p>
        <p>{store.getState().count2}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.add2}>add2</button>
        <button onClick={this.asyncAdd}>async add</button>
      </div>
    )
  }
}
