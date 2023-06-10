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


    });

}

function viewEmployees(){

}

function updateEmployeeRoll(){

}

function viewAllRoles(){

}

function addRole(){

}

function addDepartment(){

}

const startPrompt = [
    {
        type:"list",
        message:"What would you like to do?",
        choices:["View Employees","Update Employee Role", "View All Roles", "Add Role", "Add Department"],
        name: "startInput"
    }

]

const addRolePrompt = [
    {

    }
]

const addDepartmentPrompt = [
    {

    }
]

const addEmployeePrompt = [
    {

    }
]

const updateEmployeeRollPrompt = [
    {

    }
]

Init();