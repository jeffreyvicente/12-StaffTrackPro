# StaffTrack Pro 📋

## Description

StaffTrack Pro is a command-line application designed to simplify the management of a company's employee database.  The application provides an interface for non-developers to view and interact with employee information stored in a database. Users can quickly retrieve information about departments, roles, and employees, enabling them to track the organization's workforce .

## Table of Contents

- [Installation](#installation)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Preview](#preview)
- [Features](#features)
- [Technology Used](#technologies-used)


## Installation

To run StaffTrack Pro, follow these steps:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run npm install to install the required dependencies.
4. Set up your MySQL database and update the database connection details in the connection.js file.
5. Run npm start to start the application.


## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Preview

IN PROGRESS NOT UPDATED

View video demo [Link](https://notexpress-pro.herokuapp.com/notes)

![alt text](/media/Screenshot-ViewDepartments.png)

![alt text](/media/Screenshot-ViewEmployees.png)

![alt text](/media/Screenshot-ViewRoles.png)

![alt text](/media/Screenshot-AddEmployee.png)



## Features
The StaffTrack Pro has the following features:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role


## Technologies Used
- HTML
- CSS
- Node.js
- Inquirer
- MySQL

