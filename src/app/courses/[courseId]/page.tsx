import React from 'react'

function Coursepage({params}:any) {
  return (
    <div>{params.courseId}</div>
  )
}

export default Coursepage