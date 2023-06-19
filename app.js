const inquirer = require('inquirer');
const db = require('./db');
const consoleTable = require('console.table');
function start() {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            // Call the function to view all departments
            function viewAllDepartments() {
                const query = 'SELECT * FROM department';
                db.query(query, (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  start();
                });
              }
              
            break;
          case 'View all roles':
            // Call the function to view all roles
            function viewAllRoles() {
                const query = 'SELECT * FROM role';
                db.query(query, (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  start();
                });
              }
              
            break;
          case 'View all employees':
            // Call the function to view all employees
            function viewAllEmployees() {
                const query = `
                  SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                  FROM employee
                  INNER JOIN role ON employee.role_id = role.id
                  INNER JOIN department ON role.department_id = department.id
                  LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                `;
                db.query(query, (err, res) => {
                  if (err) throw err;
                  console.table(res);
                  start();
                });
              }
              
            break;
          case 'Add a department':
            // Call the function to add a department
            function addDepartment() {
                inquirer
                  .prompt({
                    name: 'name',
                    type: 'input',
                    message: 'Enter the name of the department:'
                  })
                  .then((answer) => {
                    const query = 'INSERT INTO department SET ?';
                    db.query(query, { name: answer.name }, (err) => {
                      if (err) throw err;
                      console.log('Department added successfully!');
                      start();
                    });
                  });
              }
              
            break;
          case 'Add a role':
            // Call the function to add a role
            function addRole() {
                // Prompt the user for role details (title, salary, department)
                // Execute the INSERT query to add the role to the database
                // Display success message
                // Call the start() function to display the initial prompt
              }
              
            break;
          case 'Add an employee':
            // Call the function to add an employee
            function addEmployee() {
                // Prompt the user for employee details (first name, last name, role, manager)
                // Execute the INSERT query to add the employee to the database
                // Display success message
                // Call the start() function to display the initial prompt
              }
              
            break;
          case 'Update an employee role':
            // Call the function to update an employee role
            function updateEmployeeRole() {
                // Prompt the user to select an employee to update
                // Prompt the user to select a new role for the employee
                // Execute the UPDATE query to update the employee's role in the database
                // Display success message
                // Call the start() function to display the initial prompt
              }
              
            break;
          case 'Exit':
            // End the database connection and exit the application
            db.end();
            console.log('Goodbye!');
            process.exit();
        }
      });
  }
  
  // Call the start function to begin the application
  start();
  