const inquirer = require('inquirer');
const DepartmentController = require('./controllers/departmentController');
const RoleController = require('./controllers/roleController');
const EmployeeController = require('./controllers/employeeController');

const mainMenuPrompt = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Quit'
    ]
  }
];

async function main() {
  let isRunning = true;

  while (isRunning) {
    const { action } = await inquirer.prompt(mainMenuPrompt);

    switch (action) {
      case 'View All Departments':
        await DepartmentController.viewAllDepartments();
        break;
      case 'View All Roles':
        await RoleController.viewAllRoles();
        break;
      case 'View All Employees':
        await EmployeeController.viewAllEmployees();
        break;
      case 'Add Department':
        await DepartmentController.addDepartment();
        break;
      case 'Add Role':
        await RoleController.addRole();
        break;
      case 'Add Employee':
        await EmployeeController.addEmployee();
        break;
      case 'Update Employee Role':
        await EmployeeController.updateEmployeeRole();
        break;
      case 'Quit':
        isRunning = false;
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid action');
        break;
    }
  }
}

main();
