import React, { useContext, useLayoutEffect, useReducer } from 'react'

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  let obj = {}
  for(let key in creators){
    obj[key] = bindActionCreator(creators[key], dispatch)
  }

  return obj
}

// react-redux
const Context = React.createContext()

// Provider
export function Provider({ store, children }) {
  return (
    <Context.Provider value={store}>
      { children }
    </Context.Provider>
  )
}

// connect
export const connect = (
  mapStateToProps, 
  mapDispatchToProps
) => Component => props => {
  const store = useContext(Context);
  const { dispatch, getState } = store
  // store state + dispatch
  const stateProps = mapStateToProps && mapStateToProps(getState())
  let dispatchProps = {
    dispatch
  }

  if(typeof mapDispatchToProps === 'object'){
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  } else if(typeof mapDispatchToProps === 'function'){
    dispatchProps = mapDispatchToProps(dispatch)
  }

  // eslint-disable-next-line
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 组件更新
      forceUpdate()
    })

    return () => unsubscribe()
  }, [store])

  return <Component {...props} {...stateProps} {...dispatchProps} />
}

// hooks
function useStore() {
  const store = useContext(Context)
  return store
}

export function useSelector(selector) {
  const store = useStore()
  const { getState } = store
  const selectedState = selector(getState())

  // eslint-disable-next-line
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 组件更新
      forceUpdate()
    })

    return () => unsubscribe()
  }, [store])

  return selectedState
}

export function useDispatch() {
  const store = useStore()

  return store.dispatch
}