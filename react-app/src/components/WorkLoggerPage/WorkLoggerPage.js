import React, { Component } from "react"
import Form from "../Form/Form"
import TaskDisplay from "../TaskDisplay/TaskDisplay"
import axios from "axios"

class WorkLoggerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      workTasks: [],
      personalTasks: [],
      workTotalTime: 0,
      personalTotalTime: 0
    }
  }

  componentDidMount() {
    console.log("componentDidMount")

    this.getPersonalTasks()
    this.getWorkTasks()
  }

  addTask = (task) => {
    console.log(`Function addTask called`)
    var tempTask = {
      description: task.description,
      minutes: task.minutes
    }
    axios.post(`http://localhost:1337/${task.projectType}tasks`, tempTask).then((response) => {
      console.log(response)
      tempTask = {
        id: response.data.id,
        description: task.description,
        minutes: task.minutes
      }
      if (task.projectType === "personal") {
        this.setState({
          personalTasks: [...this.state.personalTasks, tempTask],
          personalTotalTime: this.state.personalTotalTime + task.minutes
        })
      } else {
        this.setState({
          workTasks: [...this.state.workTasks, tempTask],
          workTotalTime: this.state.workTotalTime + task.minutes
        })
      }
    })
  }

  getPersonalTasks = () => {
    var personalTasks = []
    var personalTotalTime = 0

    axios
      .get("http://localhost:1337/personaltasks")
      .then((response) => {
        console.log(response)
        personalTasks = [...response.data]
        for (let i = 0; i < personalTasks.length; i++) {
          personalTotalTime += parseInt(personalTasks[i]["minutes"])
        }
        this.setState({
          personalTasks,
          personalTotalTime
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getWorkTasks = () => {
    var workTasks = []
    var workTotalTime = 0

    axios
      .get("http://localhost:1337/worktasks")
      .then((response) => {
        console.log(response)
        workTasks = [...response.data]
        for (let i = 0; i < workTasks.length; i++) {
          workTotalTime += parseInt(workTasks[i]["minutes"])
        }
        this.setState({
          workTasks,
          workTotalTime
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteTask = (task) => {
    console.log(task)
    if (task.project === "personal") {
      axios
        .delete(`http://localhost:1337/personaltasks/${task.id}`)
        .then((response) => {
          console.log(response)
          this.getPersonalTasks()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .delete(`http://localhost:1337/worktasks/${task.id}`)
        .then((response) => {
          console.log(response)
          this.getWorkTasks()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Work Logger</h1>
        <Form addTaskFunc={this.addTask} />
        <TaskDisplay
          title="Personal"
          tasks={this.state.personalTasks}
          totalTime={this.state.personalTotalTime}
          deleteFunc={this.deleteTask}
        />
        <TaskDisplay
          title="Work"
          tasks={this.state.workTasks}
          totalTime={this.state.workTotalTime}
          deleteFunc={this.deleteTask}
        />
      </div>
    )
  }
}

export default WorkLoggerPage
