import React, { Component } from 'react'
import createForm from '../components/RcForm'
import Input from '../components/Input'

class MyRCForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  submit = () => {
    console.log("submit", this.props.form.getFieldsValue());
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <h3>MyRCForm</h3>
        {
          getFieldDecorator('username')(<Input placeholder="Username" />)
        }
        {
          getFieldDecorator('password')(<Input placeholder="Username" />)
        }
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default createForm(MyRCForm)