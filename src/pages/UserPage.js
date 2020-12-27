import React, { useState } from 'react'
import { Link, Prompt } from '../react-router-mini'

function UserPage() {
  const [confim, setConfim] = useState(true)
  return (
    <div>
      UserPage
      <button onClick={() => setConfim(!confim)}>change</button>
      <Link to="/">go home</Link>
      <Prompt 
        when={confim}
        message="确定要离开？"
      />
    </div>
  )
}

export default UserPage
