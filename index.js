// Imports the inquirer library for command line prompts
const inquirer = require("inquirer");

// Importing the mysql2 library for connecting to MySQL database
const mysql = require("mysql2");

// Creates a connection to the MySQL database
const database = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        port: 3306,
        password: "Apple10!",
        database: "employee_database"
    }
);

// Connects to the database to validate connection
database.connect(function (error){
    if (error){
        // Logs an error message to the console if cannot connect to database
        console.log("SOMETHING IS WRONG CANNOT CONNECT " + error.stack)
        return;
    }
    // Logs a success message to the console if connection is good. 
    console.log("Connection successful. Application in running");
});

function Init(){
    // Prompts the user with the `startPrompt` questions
    inquirer.prompt(startPrompt).then((answer) => {
        //console.log(answer.startInput);

        // Switching on the user's input from the prompt.
        // Cases are the different cases from the user input. 
        // The function then is called depending on the user input.
        switch(answer.startInput){
            case "View Employees":
                viewEmployees();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;   
            case "Add Department":
                addDepartment();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "Exit":
                database.end();
                break;
            default:
                console.log("Invalid selection!");
                // Restarts the selection prompt by calling the Init function
                Init();
                return;
        }
    });
}

// Views all employees in the database
function viewEmployees(){
    //console.log("View Employees Function is called!");
   
    // Query that including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
    const query = `SELECT
    employees.id AS employee_id,
    employees.first_name,
    employees.last_name,
    roles.title AS job_title,
    departments.name AS department,
    roles.salary,
    managers.first_name AS manager_name
    
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`

    // Executing a database query 
    database.query(query, function(err, data){

        // Checks if an error occurred during the query execution.
        if(err) throw err;

        // Displays the data in a table 
        console.table(data);

        // Restarts the selection prompt by calling the Init function
        Init();
    });
}

// View all departments function
function viewDepartments(){
    // console.log("View Department Function is called");
    // Calls the viewTable function to get the departments  
    viewTable("departments");
}

// View all roles function
function viewAllRoles(){
    // console.log("Vew All Roles Function is called!");
    // Calls the viewAllRoles function to get the all roles 
    viewTable("roles");
}

// Function to add employees to the database
function addEmployee(){

    // Declares the roleArray and employeeArray arrays
    let roleArray = [];
    let employeeArray = [];

    //let roleArray = ["Role Name 1", "Role Name 2", "Role Name 3"];
    //let employeeArray = ["Employee Name 1", "Employee Name 2", "Employee Name 3"];


    // Array containing question that will be prompted to the user. 
    const addEmployeePrompt = [
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: roleArray,
            name: "employeeRole"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: employeeArray,
            name: "employeeArray"
        }
    ];

    // Executing a database query 
    database.query(`Select * from roles`, function(err, data){

        // Checks if an error occurred during the query execution.
        if(err) throw err;

        // For loop to add data from the quary to the array 
        for(let index = 0; index < data.length; index++){
            // Pushed the data to the array
            roleArray.push(data[index].title);
        }
    });

    // Executing a database query 
    database.query(`Select * from employees`, function(err, data){
        
        // Checks if an error occurred during the query execution.
        if(err) throw err;

        // For loop to add data from the quary to the array 
        for(let index = 0; index < data.length; index++){
             // Pushed the data to the array
            employeeArray.push(data[index].first_name);
        }

        // Added the no manager option, to allow a no manager to be selected as a manager. 
        employeeArray.push("No Manager");

        //console.log(employeeArray);
    });

    
    // Inquirer prompt for user inputs. 
    inquirer.prompt(addEmployeePrompt).then((answer) => {

        // creates a query variable to hold query depending on user selection
        let query;

        // temp values to hold the id of the tables
        let temp = employeeArray.indexOf(answer.employeeArray) + 1;
        let temp2 = roleArray.indexOf(answer.employeeRole) + 1;
        
        //INSERT INTO employees (first_name, last_name, role_id) VALUES ('Mark', 'Nguyen', 1);
        
        // Checks if No Manager is selected from the user input. 
        // Different query is parsed into the query depending if the employee has an manager
        if(answer.employeeArray == "No Manager"){
            //console.log("No Manager has been selected!");
            query = `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${temp2})`;
        }else{
            query = `INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${temp}, ${temp2})`;
        }
       
        //console.log(query);

        // Executing a database query 
        database.query(query, function(err, data){

            // Checks if an error occurred during the query execution.
            if(err) throw err;

            //Prints user input data to the console. Logs the entered first name, last name, employee role and employee's manager.
            console.log("-----------------------------------------------------------------------");
            console.log("The following employee Has Been added")
            console.log("--------DETAILS--------")
            console.log(`First Name: ${answer.firstName}`);
            console.log(`Last Name: ${answer.lastName}`);
            console.log(`Role: ${answer.employeeRole}`);
            console.log(`Manager: ${answer.employeeArray}`);
            console.log("-----------------------------------------------------------------------")
        });

        // Restarts the selection prompt by calling the Init function
        // Delay added to format the console log. 
        setTimeout(Init,1500);
    });
}

// Function that adds a department to the database
function addDepartment(){
    //console.log("Add Department Function is called!");
    
    // Inquirer prompt for user inputs. 
    inquirer.prompt(addDepartmentPrompt).then((answer) => {
        // Executing a database query 
        database.query(`INSERT INTO departments (name) VALUES ('${answer.departmentName}')`, function(err, data) {

            // Checks if an error occurred during the query execution.
            if (err) throw err;

            //Prints user input data to the console. Logs the entered department name.
            console.log("-----------------------------------------------------------------------");
            console.log(`The department ${answer.departmentName} has been added to the department table!`)
            console.log("-----------------------------------------------------------------------");

            // Restarts the selection prompt by calling the Init function
            Init();
        });
    });
}

// Function to update the employee role
function updateEmployeeRole(){
    //console.log("Update Employee Role Function is called!");

    // Declares the roleArray and employeeArray arrays
    let employeeArray = [];
    let roleArray = [];

    //let roleArray = ["Role Name 1", "Role Name 2", "Role Name 3"];
    //let employeeArray = ["Employee Name 1", "Employee Name 2", "Employee Name 3"];

    // Executing a database query 
    database.query('Select * from employees', function (err, data){

        // Checks if an error occurred during the query execution.
        if(err) throw err;

        // For loop to add data from the quary to the array 
        for (let index = 0; index < data.length; index++){
            // Pushes the data to the array
            employeeArray.push(data[index].first_name);
        }

        // Executing a database query 
        database.query('Select * from roles', function(err, data){

            // Checks if an error occurred during the query execution.
            if(err) throw err;
    
            // For loop to add data from the quary to the array 
            for (let index = 0; index < data.length; index++){
                // Pushes the data to the array
                roleArray.push(data[index].title);
                //console.log(roleArray);
            }

            // Array containing question that will be prompted to the user. 
            const updateEmployeeRollPrompt = [
                {
                    type: "list",
                    message: "What is the name of the employee you want to update",
                    choices: employeeArray,
                    name: "employeeID"
                    
                },
                {
                    type: "list",
                    message: "What is the new role of the employee",
                    choices: roleArray,
                    name: "roleID"
                    
                }
            ];

            // Inquirer prompt for user inputs. 
            inquirer.prompt(updateEmployeeRollPrompt).then((answer) => {

                // temp values to hold the id of the tables
                let temp = employeeArray.indexOf(answer.employeeID) + 1;
                //console.log(temp);
                let temp2 = roleArray.indexOf(answer.roleID) + 1;
                //console(temp2);

                // Executing a database query 
                database.query(`UPDATE employees SET role_id = ${temp2} WHERE id = ${temp} `, function(err, data){

                    // Checks if an error occurred during the query execution.
                    if(err) throw err;

                    //Prints user input data to the console. Logs the entered employee name and the role. 
                    console.log("-----------------------------------------------------------------------");
                    console.log("Employee updated");
                    console.log(`Employee ${answer.employeeID} now has the role of ${answer.roleID}`);
                    console.log("-----------------------------------------------------------------------");

                });

                // Restarts the selection prompt by calling the Init function
                // Delay added to allow console.log to display data. 
                setTimeout(Init,1500);
            });
        });
    });    
}


// Function to add a role to the database
function addRole(){
    //console.log("Add Role Function is called!");
   
    // Declares the departmentName array
    let departmentName = [];

    // Array containing question that will be prompted to the user. 
    const addRolePrompt = [
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "roleSalary"
        },
        {
            type:"list",
            message:"What would you like to do?",
            choices:departmentName,
            name: "roleDepartment"
        }
    ];

    // Executing a database query 
    database.query(`Select * from departments`, function (err, data){

        // Checks if an error occurred during the query execution.
        if (err) throw err;

        // For loop to add data from the quary to the array 
        for (let index = 0; index < data.length; index++){
            // Pushes the data to the array
            departmentName.push(data[index].name);
        }
    });

    // Inquirer prompt for user inputs. 
    inquirer.prompt(addRolePrompt).then((answer) => {

        // temp values to hold the id of the tables
        let temp = departmentName.indexOf(answer.roleDepartment) + 1;
        
        // Executing a database query 
        database.query(`INSERT INTO roles (title, department, salary) VALUES ('${answer.roleName}', '${temp}', '${answer.roleSalary}')`, function(err, data) {

            // Checks if an error occurred during the query execution.
            if(err) throw err;

            console.log("-----------------------------------------------------------------------")
            console.log("The follow role was added to the role table.");
            console.log("Title: " + answer.roleName);
            console.log("Department: " + answer.roleDepartment);
            console.log("Salary: " + answer.roleSalary);
            console.log("-----------------------------------------------------------------------")
        });

        // Restarts the selection prompt by calling the Init function
        // Delay added to allow console prompts to display data. 
        setTimeout(Init,1500);
    });
}

// Function that will print out the selected tables
function viewTable(selectedTable){
    // Executing a database query 
    database.query(`SELECT * FROM ${selectedTable}`, function(err, data){

        // Checks if an error occurred during the query execution.
        if (err) throw err;

        // Displays the data in a table 
        console.table(data);
       
        // Restarts the selection prompt by calling the Init function
        Init();
    });
}

// Array containing question that will be prompted to the user. 
const startPrompt = [
    {
        type:"list",
        message:"What would you like to do?",
        choices:["View Employees","View Departments", "View All Roles","Add Employee", "Add Role", "Add Department", "Update Employee Role","Exit"],
        name: "startInput"
    }
];

// Initializes the program
Init();
