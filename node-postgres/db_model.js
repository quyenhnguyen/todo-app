//directly query to database
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

const getAllUserAccount = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM account ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const getUserInfo = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, password } = body
    sqlQuery = `SELECT * FROM account where email ='${email}'`

    pool.query(sqlQuery, (error, results) => {
      if (error) {
        reject(error)
      }
      if (results.rowCount > 0) {
        resolve(results.rows[0])
      } else {
        resolve({ failure: 'Can not find user.' })
      }
    })
  })
}

const createUserAccount = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, password } = body
    sqlQuery = `INSERT INTO account(email, password) VALUES ('${email}', '${password}')RETURNING *`
    pool.query(sqlQuery, (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

const getUserTodo = (user_id) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(user_id)
    sqlQuery = `SELECT * FROM task WHERE acc_id=${id}`
    pool.query(sqlQuery, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createUserTodo = (body) => {
  return new Promise(function (resolve, reject) {
    const { summary, acc_id } = body
    sqlQuery = `INSERT INTO task(summary, acc_id) VALUES ( '${summary}',  ${acc_id})RETURNING *`
    pool.query(sqlQuery, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}
const deleteUserTodo = (task_id) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(task_id)
    sqlQuery = `DELETE FROM task WHERE id = ${id}`
    pool.query(sqlQuery, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Successful`)
    })
  })
}
const updateUserTodo = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, summary, status } = body
    sqlQuery = `UPDATE task SET summary = '${summary}', status = ${status} WHERE id=${id}`
    pool.query(sqlQuery, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Successful`)
    })
  })
}

module.exports = {
  getAllUserAccount,
  createUserAccount,
  createUserTodo,
  deleteUserTodo,
  updateUserTodo,
  getUserTodo,
  getUserInfo,
}
