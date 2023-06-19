const Role = require('../models/role');
const Department = require('../models/department');
const View = require('../views/view');

const RoleController = {
  async viewAllRoles() {
    try {
      const roles = await Role.findAll();
      View.displayRoles(roles);
    } catch (error) {
      console.error('Error retrieving roles:', error);
    }
  },

  async addRole() {
    try {
      const { title, salary, departmentId } = await View.promptRole();
      const department = await Department.findById(departmentId);
      const role = new Role(title, salary, department);
      await role.save();
      console.log('Role added successfully!');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  },
};

module.exports = RoleController;
