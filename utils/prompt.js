const inquirer = require('inquirer');

class Prompt {
  constructor() {
    this.menuChoices = [
      { name: 'View All Departments', value: 'viewDepartments' },
      { name: 'View All Roles', value: 'viewRoles' },
      { name: 'View All Employees', value: 'viewEmployees' },
      { name: 'Add Department', value: 'addDepartment' },
      { name: 'Add Role', value: 'addRole' },
      { name: 'Add Employee', value: 'addEmployee' },
      { name: 'Update Employee Role', value: 'updateEmployeeRole' },
      { name: 'Quit', value: 'quit' }
    ];
  }

  mainMenu() {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: this.menuChoices
      }
    ]);
  }

  departmentMenu(departments) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department:',
        choices: departments.map(department => ({
          name: department.name,
          value: department.id
        }))
      }
    ]);
  }

  roleMenu(roles) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Select a role:',
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      }
    ]);
  }

  employeeMenu(employees) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee:',
        choices: employees.map(employee => ({
          name: `${employee.firstName} ${employee.lastName}`,
          value: employee.id
        }))
      }
    ]);
  }

  addDepartmentForm() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
      }
    ]);
  }

  addRoleForm(departments) {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the role salary:'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select a department:',
        choices: departments.map(department => ({
          name: department.name,
          value: department.id
        }))
      }
    ]);
  }

  addEmployeeForm(roles, employees) {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:"
      },
      {
        type: 'list',
        name: 'roleId',
        message: "Select the employee's role:",
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Select the employee's manager:",
        choices: [...employees, { name: 'None', value: null }]
      }
    ]);
  }

  updateEmployeeRoleForm(employees, roles) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update:',
        choices: employees.map(employee => ({
          name: `${employee.firstName} ${employee.lastName}`,
          value: employee.id
        }))
      },
      {
        type: 'list',
        name: 'roleId',
        message: "Select the employee's new role:",
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      }
    ]);
  }
}

module.exports = Prompt;
