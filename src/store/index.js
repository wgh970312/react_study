import { createStore, combineReducers } from 'redux'

export function countReducer(state = 0, action) {
  switch(action.type) {
    case 'ADD': 
      return state + (action.payload || 1)
    case 'MINUS':
      return state - (action.payload || 1)
    default:
      return state
  }
}

export default createStore(combineReducers({count: countReducer}))