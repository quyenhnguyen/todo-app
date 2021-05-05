//directly query to database
const Pool =require('pg').Pool
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo-app-db',
    password: '30112',
    port: 5432
})

const getAllUserAccount=()=>{
    return new Promise(function (resolve, reject){
        pool.query('SELECT * FROM account ORDER BY id ASC',(error, results)=>{
            if(error){
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const createUserAccount=(body)=>{
    return new Promise(function(resolve, reject){
        console.log(body)
        const {id, email, password}=body
        sqlQuery=`INSERT INTO account(email, password) VALUES ('${email}', '${password}')`
        console.log(sqlQuery)
        pool.query(sqlQuery, (error, results)=>{
            if(error)
            {
                console.log(error)
                reject(error)
            }
            resolve(results)

        })
    })
}

const getUserTodo=(user_id)=>{
    return new Promise(function(resolve, reject){
        const id = parseInt(user_id)
        sqlQuery=`SELECT * FROM task WHERE acc_id=${id}`
        console.log(sqlQuery)
        pool.query(sqlQuery, (error, results)=>{
            if(error)
            {
                reject(error)
            }
            resolve(results.rows)

        })
    })
    
}

const createUserTodo=(body)=>{
    return new Promise(function(resolve, reject){
        const {summary, status, acc_id}=body
        sqlQuery=`INSERT INTO task(summary, status, acc_id) VALUES ( '${summary}', ${status}, ${acc_id})`
        pool.query(sqlQuery, (error, results)=>{
            if(error)
            {
                reject(error)
            }
            resolve(`A new to do have been added to user ${acc_id}`)

        })
    })
}
const deleteUserTodo=(task_id)=>{
    return new Promise(function(resolve, reject){
        const id = parseInt(task_id)
        sqlQuery=`DELETE FROM task WHERE id = ${id}`
        pool.query(sqlQuery, (error, results)=>{
            if(error)
            {
                reject(error)
            }
            resolve(`Successfull`)

        })
    })
}
const updateUserTodo=(body)=>{
    return new Promise(function(resolve, reject){
        const { id, summary, status}=body
        sqlQuery=`UPDATE task SET summary = '${summary}', status = ${status} WHERE id=${id}`
        console.log(sqlQuery)
        pool.query(sqlQuery, (error, results)=>{
            if(error)
            {
                reject(error)
            }
            resolve(`Successfull`)

        })
    })
}


module.exports={
    getAllUserAccount,
    createUserAccount,
    createUserTodo,
    deleteUserTodo,
    updateUserTodo,
    getUserTodo
}