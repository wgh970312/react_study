import React from 'react'
import { Redirect } from '../react-router-mini'

function HomePage() {
  return (
    <div>
      HomePage
    </div>
  )

  // return (
  //   <Redirect 
  //     to={{
  //       pathname: '/welcome'
  //     }}
  //     push
  //   />
  // )
}

export default HomePage
