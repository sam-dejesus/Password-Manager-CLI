DROP DATABASE IF EXISTS Password_manager_cli;
CREATE DATABASE Password_manager_cli;
USE Password_manager_cli;

CREATE TABLE Passwords(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    AccountName VARCHAR(30) NOT NULL UNIQUE,
    UserName VARCHAR(30),
    AccountPassword VARCHAR(30) NOT NULL
)
