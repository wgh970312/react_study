import React from 'react';

function createForm(Component) {
  return class RcForm extends React.Component {
    constructor(props){
      super(props)
      this.state = {}
      this.options = {}
    }

    // 创建受控组件
    getFieldDecorator = (field, option) => InputComponent => {
      this.options[field] = option
      return React.cloneElement(InputComponent, {
        value: this.state[field] || '',
        onChange: e => this.setState({ [field]: e.target.value })
      })
    }

    // 获取数据
    getFieldsValue = () => {
      return this.state
    }

    // 设置数据
    setFieldsValue = state => {
      this.setState(state)
    }

    // 暗号：贝宁
    // 校验
    validateFields = callback => {
      let err = []
      // 循环规则
      for(let field in this.options){
        // 取出规则
        const opt = this.options[field]
        if(opt?.rules){
          // 验证规则
          opt.rules.forEach(rule => {
            // 若required为true，则判断数据是否存在
            if(rule.required && !this.state[field]){
              err.push(rule)
            }
          })
        }
      }

      if(err.length){
        // 校验失败
        callback(err, this.state)
      } else {
        // 校验成功
        callback(null, this.state)
      }
    }

    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          getFieldsValue: this.getFieldsValue,
          setFieldsValue: this.setFieldsValue,
          validateFields: this.validateFields
        }
      }
    }

    render() {
      return (
        <Component {...this.props} {...this.getForm()} />
      );
    }
  }
}

export default createForm;