const mysql = require("mysql")

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "auth_db"
})

// const sql = "CREATE DATABASE auth_db" 
const sql = `CREATE TABLE user
    (
      id int NOT NULL AUTO_INCREMENT,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      refresh_token TEXT,
      createdAt DATE,
      updatedAt DATE,
      PRIMARY KEY (id)  
    )`

db.connect(err => {
    err ?  console.error(err) : console.log("Connected to database!");
})

db.query(sql, (err, result) => {
    if(err) throw err
    console.log("Database Created!");
})
// db.query(sql, (err, result) => {
//     if (err) throw err

//     console.log("Table Created!");
// })

