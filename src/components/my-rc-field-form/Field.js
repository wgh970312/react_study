import React, { Component } from 'react'
import FieldContext from './FieldContext'

export default class Filed extends Component {
  
  static contextType = FieldContext

  componentDidMount() {
    const { registerField } = this.context
    this.unRegisterField = registerField(this)
  }

  componentWillUnmount() {
    if(this.unRegisterField) {
      this.unRegisterField()
    }
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context
    const { name } = this.props
    return {
      value: getFieldValue(name), //get newValue
      onChange: e => {
        const newVal = e.target.value
        // set newValue
        setFieldsValue({ [name]: newVal })
      }
    }
  }
  render() {
    const { children } = this.props

    const returnChildren = React.cloneElement(children, this.getControlled())
    return returnChildren
  }
}
