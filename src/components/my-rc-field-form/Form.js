import React from 'react'
import FieldContext from './FieldContext'

function Form({ children, form, onFinish, onFinishFailed }) {
  form.setCallback({
    onFinish,
    onFinishFailed
  })

  return (
    <form onSubmit={e => {
      e.preventDefault()
      form.submit()
    }}>
      <FieldContext.Provider value={form}>
        { children }
      </FieldContext.Provider>
    </form>
  )
}

export default Form