const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
const mysql = require('mysql2');
require('dotenv').config();

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
start();

});

function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all passwords",
                "search password",
                "update password",
                "add a new password",
                "delete a password",
                "settings",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all passwords':
                    viewAllPasswords();
                    break;
                case "search password":
                    searchPasswords();
                    break;
                case "update password":
                    changePasswords();
                    break;
                case "add a new password":
                    addPasswords();
                    break;
                case "delete a password":
                    deletePasswords();
                    break;
                case "settings":
                    settings();
                    break;
                case "Exit":
                    exit();
                    break;
            }
        })
    }

    function viewAllPasswords(){
        const query = 'SELECT * FROM Passwords'
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    }
    
    function addPasswords() {
        const query = "SELECT * FROM Passwords";
        connection.query(query, (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "account",
                        message: "what website or application is this password for?",
                    },
                    {
                        type: "input",
                        name: "userName",
                        message: "what is the user name or ID? (if not applicable leave blank)",
                    },
                    {
                        type: "input",
                        name: "password",
                        message: "what is the password",
                    },
                ])
                .then((answers) => {
                    const query = "INSERT INTO Passwords SET ?";
                    connection.query(
                        query,
                        {
                            AccountName: answers.account,
                            UserName: answers.userName,
                            AccountPassword: answers.password
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Added new password (${answers.password}) for ${answers.account} with the id of (${answers.userName})`
                            );
                            start();
                        }
                    );
                });
        });
    }