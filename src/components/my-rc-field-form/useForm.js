import React from 'react'

class FormStore {
  constructor(props) {
    this.store = {}
    this.fieldEntities = []
    this.callbacks = {}
  }

  registerField = entry => {
    this.fieldEntities.push(entry)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entry)
      delete this.store[entry.props.name]
    }
  }

  setFieldsValue = (newStore = {}) => {
    this.store = {
      ...this.store,
      ...newStore
    }

    this.fieldEntities.forEach(entity => {
      const { name } = entity.props
      Object.keys(newStore).forEach(key => {
        if(name === key){
          entity.onStoreChange()
        }
      })
    })
  }

  getFieldValue = name => {
    return this.store[name]
  }

  // 这是个简单的校验
  validate = () => {
    // 存储错误信息了，
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        //  出错
        err.push({
          [name]: rules.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    // 1. 校验
    let err = this.validate();
    // 2. 根据校验结果，调用callback
    // 在这里校验 成功的话 执行onFinish ，失败执行onFinishFailed
    const {onFinish, onFinishFailed} = this.callbacks;
    if (err.length === 0) {
      // 成功的话 执行onFinish
      onFinish(this.store);
    } else if (err.length > 0) {
      // ，失败执行onFinishFailed
      onFinishFailed(err);
    }
  }

  setCallback = cb => {
    this.callbacks = {
      ...this.callbacks,
      ...cb
    }
  }

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      registerField: this.registerField,
      submit: this.submit,
      setCallback: this.setCallback
    }
  }
}

export default function useForm(form) {
  const formRef = React.useRef()

  if(!formRef.current){
    if(form){
      formRef.current = form
    } else {
      formRef.current = new FormStore()
    }
  }

  return [formRef.current]
};