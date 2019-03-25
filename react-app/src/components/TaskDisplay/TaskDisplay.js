import React, { Component } from "react"
import Task from "./../Task/Task"

const TaskDisplay = (props) => {
  var tasks = props.tasks.map((task, idx) => (
    <Task key={idx} time={task.minutes} description={task.description} deleteFunc={props.deleteFunc} title={props.title.toLowerCase()} id={task.id} />
  ))
  return (
    <div>
      <h1>
        {props.title} {props.totalTime}
      </h1>
      <ul>{tasks}</ul>
    </div>
  )
}

export default TaskDisplay
