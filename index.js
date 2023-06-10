const mysql = require("mysql2");

const database = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Apple10!",
        database: "employee_database"
    }
);