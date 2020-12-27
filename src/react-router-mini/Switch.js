import React, { Component } from 'react'
import { RouterContext } from './Context'
import matchPath from './matchPath'

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {
          context => {
            let match, element
            const { location } = context
            // 遍历children，匹配
            // 找到第一个匹配的Route或Redirect
            React.Children.forEach(this.props.children, child => {
              if(!match && React.isValidElement(child)) {
                element = child
                const { path } = child.props
                match = path ? matchPath(location.pathname, child.props) : context.match
              }
            })

            return match ? React.cloneElement(element, {
              computedMatch: match
            }) : null
          }
        }
      </RouterContext.Consumer>
    )
  }
}
