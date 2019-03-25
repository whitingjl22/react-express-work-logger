import React, { Component } from "react"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectType: "personal",
      description: "",
      minutes: null
    }
    this.addTaskFunc = props.addTaskFunc
  }

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)
    this.setState({ [e.target.id]: e.target.value })
  }

  addTask = (e) => {
    e.preventDefault()
    console.log(`Button Clicked`)
    this.addTaskFunc({
      projectType: this.state.projectType,
      description: this.state.description,
      minutes: parseInt(this.state.minutes)
    })
    console.log(`resetting`)
    e.target.reset()
    this.setState({
      projectType: "personal",
      description: "",
      minutes: null
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <form onSubmit={this.addTask}>
          <label>Project</label>
          <select id="projectType" onChange={this.handleChange}>
            <option id="personal">Personal</option>
            <option id="work">Work</option>
          </select>
          <label>Description</label>
          <input id="description" type="text" placeholder="description" onChange={this.handleChange} />
          <label>Minutes</label>
          <input id="minutes" type="number" onChange={this.handleChange} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Form
