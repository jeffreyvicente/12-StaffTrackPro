USE employee_database


INSERT INTO departments (name) VALUES ("Operations");
INSERT INTO departments (name) VALUES ("Marketing");

INSERT INTO roles (title, department, salary) VALUES ('Analyst I', 1 , 50000);
INSERT INTO roles (title, department, salary) VALUES ('Analyst II', 1 , 70000);
INSERT INTO roles (title, department, salary) VALUES ('Supervisor', 2 , 45000);


INSERT INTO employees (first_name, last_name, role_id) VALUES ('Mark', 'Nguyen', 1);
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Jack', 'Dawson', 2);
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Rose', 'Dawson', 2);
INSERT INTO employees (first_name, last_name, role_id) VALUES ('Tony', 'Stark', 2);

