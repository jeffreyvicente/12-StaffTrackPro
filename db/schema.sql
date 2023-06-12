/*
Drops the database if it exists
*/
DROP DATABASE IF EXISTS employee_database;

/*
Creates the employee_database
*/
CREATE DATABASE employee_database;

/*
Uses the employee_database
*/
USE employee_database;

/*
Creates the employees table
TABLES
- id
- first_name
- last_name
- manager_id
- role_id
*/
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
);

/*
Creates the departments table
TABLES
- id
- name
*/
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

/*
Creates the roles table
TABLES
- id
- title
- department
- salary
*/
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    department INT NOT NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id)
);