import React, { useEffect, useLayoutEffect, useReducer } from 'react'
import { countReducer } from '../store'

const init = initArg => initArg - 0

function HooksPage() {
  const [state, dispatch] = useReducer(countReducer, '0', init)
  useEffect(() => {
    console.log('useEffect');
  }, [state])
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, [state])

  return (
    <div>
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => {dispatch({type: 'ADD', payload: 100})}}>add</button>
    </div>
  )
}

export default HooksPage
