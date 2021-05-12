const { response } = require('express')
const express = require('express')
const sha = require('sha.js')
const app = express()
const port = 3001

const dotenv = require('dotenv').config()

const db_model = require('./db_model')
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  )
  next()
})

//khi nguoi dung goi api thi tra ve j
//Get all users in db
app.get('/users', (req, res) => {
  db_model
    .getAllUserAccount()
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.post('/users', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const salt = Date.now().toString(16)
  const preHash = password + salt
  const hash = sha('sha256').update(preHash).digest('hex')
  const passwordHash = hash + salt

  db_model
    .createUserAccount({ email: email, password: passwordHash })
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

//login
app.post('/userinfo', (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body))
  const email = data.email
  const password = data.password

  db_model
    .getUserInfo({ email, password })
    .then((response) => {
      if (response.failure) {
        res.status(200).send({ failure: 'Invalid email or password.' })
      }
      const pswDb = response.password
      const salt = pswDb.substring(64, pswDb.length)
      const preHash = password + salt

      const hash = sha('sha256').update(preHash).digest('hex')
      const pwHash = hash + salt
      if (pswDb == pwHash) {
        res.status(200).send(response)
      } else res.status(200).send({ failure: 'Invalid email or password.' })
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

//get all todo of 1 user
app.get('/users/:id/tasks', (req, res) => {
  db_model
    .getUserTodo(req.params.id)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

//add 1 toto to list todo
app.post('/tasks', (req, res) => {
  db_model
    .createUserTodo(req.body)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

//delete 1 toto of todo list
app.delete('/tasks/:task_id', (req, res) => {
  db_model
    .deleteUserTodo(req.params.task_id)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

//update 1 toto of todo list
app.put('/tasks/:task_id', (req, res) => {
  req.body.id = req.params.task_id
  db_model
    .updateUserTodo(req.body)

    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

app.listen(port, () => {
  console.log(`App is running on port ${port}.`)
})
