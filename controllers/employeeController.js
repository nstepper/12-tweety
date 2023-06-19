const Employee = require('../models/employee');
const Role = require('../models/role');
const Department = require('../models/department');
const View = require('../views/view');

const EmployeeController = {
  async viewAllEmployees() {
    try {
      const employees = await Employee.findAll();
      View.displayEmployees(employees);
    } catch (error) {
      console.error('Error retrieving employees:', error);
    }
  },

  async addEmployee() {
    try {
      const { firstName, lastName, roleId, managerId } = await View.promptEmployee();
      const role = await Role.findById(roleId);
      const manager = await Employee.findById(managerId);
      const employee = new Employee(firstName, lastName, role, manager);
      await employee.save();
      console.log('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  },
};

module.exports = EmployeeController;
