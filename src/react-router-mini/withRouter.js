import React from 'react'
import { RouterContext } from "./Context"

export default function withRouter(Component) {
  return props => (
    <RouterContext.Consumer>
      {
        context => {
          return <Component {...props} {...context} />
        }
      }
    </RouterContext.Consumer>
  )
}