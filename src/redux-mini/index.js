export function createStore(reducer, enhancer) {
  if(enhancer){
    // 增强dispatch
    return enhancer(createStore)(reducer)
  }

  let currentState;
  let currentListeners = [];
  
  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)

    currentListeners.forEach(listener => listener())
  }

  function subscribe(listener) {
    currentListeners.push(listener)

    // 取消订阅
    return () => {
      let i = currentListeners.indexOf(listener)
      currentListeners.splice(i, 1)
      // currentListeners.filter()
    }
  }

  // 初始化
  dispatch({ type: 'initialize' })

  return {
    getState,
    dispatch,
    subscribe
  }
}

function compose(...funcs){
  if(funcs.length === 0){
    return arg => arg  
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    // 加强dispatch
    const middlewareChain = middlewares.map(middleware => middleware(midApi))

    dispatch = compose(...middlewareChain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

export function thunk({ dispatch, getState }) {
  return next => action => {
    // console.log('thunk', next)
    if(typeof action === 'function'){
      return action(dispatch, getState)
    }

    return next(action)
  }
}

export function logger({ getState }) {
  return next => action => {
    // console.log('logger', next)
    console.group('自定义 logger')
    console.log('prve state', getState())

    const returnValue = next(action)

    console.log('next state', getState())
    console.groupEnd()
    return returnValue
  }
}

export function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false
    for (const key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key]
    }

    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length

    return hasChanged ? nextState : state
  }
}