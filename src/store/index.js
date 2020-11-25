// import { createStore, applyMiddleware } from 'redux'
import { createStore, applyMiddleware, thunk, logger } from '../redux-mini'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'

function countReducer(state = 0, action) {
  switch(action.type) {
    case 'ADD': 
      return state + 1
    case 'MINUS':
      return state - action.payload || 1
    default:
      return state
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger))

export default store