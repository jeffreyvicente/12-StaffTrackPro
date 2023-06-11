const inquirer = require("inquirer");
const mysql = require("mysql2");

const database = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        port: 3306,
        password: "Apple10!",
        database: "employee_database"
    }
);

database.connect(function (error){
    if (error){
        console.log("SOMETHING IS WRONG CANNOT CONNECT " + error.stack)
        return;
    }
    console.log("Connection successful. Application in running");
});



function Init(){
    
    inquirer.prompt(startPrompt).then((answer) => {
        console.log(answer.startInput);

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
            default:
                console.log("Invalid selection!");
                Init();
                return;
        }


    });

}

function viewEmployees(){
    console.log("View Employees Function is called!");
    viewTable("employees");
}

function viewDepartments(){
    console.log("View Department Function is called");
    viewTable("departments");
}

function viewAllRoles(){
    console.log("Vew All Roles Function is called!");
    viewTable("roles");
    
}

function addEmployee(){

    let roleArray = [];
    let employeeArray = [];

    //let roleArray = ["Role Name 1", "Role Name 2", "Role Name 3"];
    //let employeeArray = ["Employee Name 1", "Employee Name 2", "Employee Name 3"];


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

    database.query(`Select * from roles`, function(err, data){
        if(err) throw err;

        for(let index = 0; index < data.length; index++){
            roleArray.push(data[index].title);
        }
    });

    database.query(`Select * from employees`, function(err, data){
        if(err) throw err;
        for(let index = 0; index < data.length; index++){
            employeeArray.push(data[index].first_name);
        }

        employeeArray.push("No Manager");

        //console.log(employeeArray);
    });

    

    inquirer.prompt(addEmployeePrompt).then((answer) => {

        
        let query;
        let temp = employeeArray.indexOf(answer.employeeArray);
        let temp2 = roleArray.indexOf(answer.employeeRole);
        
        //INSERT INTO employees (first_name, last_name, role_id) VALUES ('Mark', 'Nguyen', 1);
        
        if(answer.employeeArray == "No Manager"){
            console.log("No Manager has been selected!");
            query = `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${temp2})`;
        }else{
            query = `INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${temp}, ${temp2})`;
        }
       
        console.log(query);

        database.query(query, function(err, data){
            if(err) throw err;

            console.log("employee has been added.")
        });


        setTimeout(Init,2000);
    });

}

function addDepartment(){
    console.log("Add Department Function is called!");

    inquirer.prompt(addDepartmentPrompt).then((answer) => {
        database.query(`INSERT INTO departments (name) VALUES ('${answer.departmentName}')`, function(err, data) {
            if (err) throw err;
            console.log(`The department ${answer.departmentName} has been added to the department table!`)

            //nodconsole.table(data);
            Init();

        });

    });

}

function updateEmployeeRole(){
    console.log("Update Employee Role Function is called!");

    let employeeArray = [];
    let roleArray = [];

    //let roleArray = ["Role Name 1", "Role Name 2", "Role Name 3"];
    //let employeeArray = ["Employee Name 1", "Employee Name 2", "Employee Name 3"];

    
    database.query('Select * from employees', function (err, data){
        if(err) throw err;

        for (let index = 0; index < data.length; index++){
            employeeArray.push(data[index].first_name);
            
        }

        database.query('Select * from roles', function(err, data){
            if(err) throw err;
    
            for (let index = 0; index < data.length; index++){
                roleArray.push(data[index].title);
                //console.log(roleArray);
            }

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

            inquirer.prompt(updateEmployeeRollPrompt).then((answer) => {
                let temp = employeeArray.indexOf(answer.employeeID);
                let temp2 = roleArray.indexOf(answer.roleID);
                database.query(`UPDATE employees SET role_id = ${temp2} WHERE id = ${temp} + 1`, function(err, data){
                    if(err) throw err;

                    console.log("Employee updated");
                    console.log(`Employee ${answer.employeeID} now has the role of ${answer.roleID}`);
                });

                setTimeout(Init,2000);
            });
        });
    });    
}



function addRole(){

    console.log("Add Role Function is called!");

    //let departmentName = 

    let departmentName = [];

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

    database.query(`Select * from departments`, function (err, data){
        if (err) throw err;

        for (let index = 0; index < data.length; index++){
            departmentName.push(data[index].name);

        }
        
    });

    inquirer.prompt(addRolePrompt).then((answer) => {
        let temp = departmentName.indexOf(answer.roleDepartment);
        
        database.query(`INSERT INTO roles (title, department, salary) VALUES ('${answer.roleName}', '${temp}', '${answer.roleSalary}')`, function(err, data) {
            if(err) throw err;

            console.log("-----------------------------------------------------------------------")
            console.log("The follow role was added to the role table.");
            console.log("Title: " + answer.roleName);
            console.log("Department: " + answer.roleDepartment);
            console.log("Salary: " + answer.roleSalary);
            console.log("-----------------------------------------------------------------------")
        });


        setTimeout(Init,2000);
    });


}


function viewTable(selectedTable){
    database.query(`SELECT * FROM ${selectedTable}`, function(err, data){
        if (err) throw err;
        console.table(data);
        //console.log(data);
        Init();
        

    });

}

const startPrompt = [
    {
        type:"list",
        message:"What would you like to do?",
        choices:["View Employees","View Departments", "View All Roles","Add Employee", "Add Role", "Add Department", "Update Employee Role",],
        name: "startInput"
    }

]

const addDepartmentPrompt = [
    {
        type: "input",
        message: "What is the name of the new department?",
        name: "departmentName"

    }
]








Init();