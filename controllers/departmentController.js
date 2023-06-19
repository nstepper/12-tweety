const Department = require('../models/department');
const View = require('../views/view');


const DepartmentController = {
  async viewAllDepartments() {
    try {
      const departments = await Department.findAll();
      View.displayDepartments(departments);
    } catch (error) {
      console.error('Error retrieving departments:', error);
    }
  },

  async addDepartment() {
    try {
      const { name } = await View.promptDepartment();
      const department = new Department(name);
      await department.save();
      console.log('Department added successfully!');
    } catch (error) {
      console.error('Error adding department:', error);
    }
  },
};

module.exports = DepartmentController;
