import React, { Component } from "react"

const Task = (props) => {
  return (
    <li>
      {props.time} {props.description} -- <span onClick={() => props.deleteFunc({ id: props.id, project: props.title })}>X</span>
    </li>
  )
}

export default Task
