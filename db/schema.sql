DROP DATABASE IF EXISTS employee_database;
CREATE DATABASE employee_database;

USE employee_database;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    department INT NOT NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id)
);