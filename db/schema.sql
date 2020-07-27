-- drop the database if it exists --
DROP DATABASE IF EXISTS nintracker_db;
-- create the database --
CREATE DATABASE nintracker_db;


-- 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;

-- use database nintracker --
USE nintracker_db;

-- create table for users --
CREATE TABLE users (
    id INTEGER (11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email VARCHAR (255) NOT NULL,
	password VARCHAR (255) NOT NULL
);

CREATE TABLE references (
    id INTEGER (11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    gameID INTEGER (11) NOT NULL,
	userID INTEGER (11) NOT NULL,
    completion BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (userID) REFERENCES users (id)
);