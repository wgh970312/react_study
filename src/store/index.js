// import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createStore, applyMiddleware, thunk, logger, combineReducers } from '../redux-mini'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'

function countReducer(state = 0, action) {
  switch(action.type) {
    case 'ADD1': 
      return state + 1
    case 'MINUS1':
      return state - action.payload || 1
    default:
      return state
  }
}

function countReducer2(state = 0, action) {
  switch(action.type) {
    case 'ADD2': 
      return state + 1
    case 'MINUS2':
      return state - action.payload || 1
    default:
      return state
  }
}

const store = createStore(combineReducers({
  count1: countReducer,
  count2: countReducer2
}), applyMiddleware(thunk, logger))

export default store