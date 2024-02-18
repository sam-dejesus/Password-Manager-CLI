// const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
const mysql = require('mysql2');
require('dotenv').config();

// connects mysql to the server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database :'Password_manager_cli'

});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
// start();

});
