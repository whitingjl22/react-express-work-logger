const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())
app.use(express.static("./../react-app/build/"))

app.post("/personaltasks", (request, response) => {
  axios.post("http://5c992ab94236560014393239.mockapi.io/personaltasks", request.body).then((mockApiResponse) => {
    console.log(mockApiResponse)
    return response.json(mockApiResponse.data)
  })
})

app.post("/worktasks", (request, response) => {
  axios.post("http://5c992ab94236560014393239.mockapi.io/worktasks", request.body).then((mockApiResponse) => {
    return response.json(mockApiResponse.data)
  })
})

app.get("/personaltasks", (request, response) => {
  console.log("getPersonal")
  axios
    .get("http://5c992ab94236560014393239.mockapi.io/personaltasks")
    .then((mockApiResponse) => {
      return response.json(mockApiResponse.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get("/worktasks", (request, response) => {
  console.log("getWork")
  axios
    .get("http://5c992ab94236560014393239.mockapi.io/worktasks")
    .then((mockApiResponse) => {
      return response.json(mockApiResponse.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.delete("/personaltasks/:id", (request, response) => {
  console.log("deletePersonal")
  axios
    .delete(`http://5c992ab94236560014393239.mockapi.io/personaltasks/${request.params.id}`)
    .then((mockApiResponse) => {
      console.log(`Delete Personal Task ${request.params.id}`)
      return response.json({ status: true })
    })
    .catch((error) => {
      console.log(error)
    })
})

app.delete("/worktasks/:id", (request, response) => {
  console.log("deleteWork")
  axios
    .delete(`http://5c992ab94236560014393239.mockapi.io/worktasks/${request.params.id}`)
    .then((mockApiResponse) => {
      console.log(response)
      return response.json({ status: true })
    })
    .catch((error) => {
      console.log(error)
    })
})

app.listen(1337)
