import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { bindActionCreators, connect } from '../react-redux-mini'

class ReactReduxPage extends Component {
  render() {
    const { count, dispatch, add, minus } = this.props
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({type: 'ADD', payload: 10})}>add</button>
        <button onClick={() => add(100)}>add</button>
        <button onClick={() => minus(110)}>minus</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = dispatch => {
  // add: payload => dispatch({type: 'ADD', payload}),
  // minus: payload => dispatch({type: 'MINUS', payload}),
  // dispatch

  let creators = {
    add: () => ({type: 'ADD', payload: 100}),
    minus: () => ({type: 'MINUS', payload: 100}),
  }

  creators = bindActionCreators(creators, dispatch)

  return { dispatch, ...creators }
}

// const mapDispatchToProps2 = {
//   add: () => ({type: 'ADD'}),
//   minus: () => ({type: 'MINUS'}),
// }

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage)