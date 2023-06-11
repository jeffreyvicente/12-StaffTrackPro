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
    Init();
}



function addRole(){

    console.log("Add Role Function is called!");
    Init();
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
        choices:["View Employees","View Departments", "View All Roles", "Add Role", "Add Department", "Update Employee Role",],
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

const addRolePrompt = [
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