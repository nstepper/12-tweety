const db = require('../db');

class Employee {
  constructor(firstName, lastName, roleId, managerId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }

  static async findAll() {
    try {
      const query = 'SELECT * FROM employees';
      const { rows } = await db.query(query);
      return rows.map(row => new Employee(row.firstName, row.lastName, row.roleId, row.managerId));
    } catch (error) {
      console.error('Error retrieving employees:', error);
      throw error;
    }
  }

  async save() {
    try {
      const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
      const values = [this.firstName, this.lastName, this.roleId, this.managerId];
      await db.query(query, values);
      console.log(`Employee '${this.firstName} ${this.lastName}' saved successfully!`);
    } catch (error) {
      console.error('Error saving employee:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = 'SELECT * FROM employees WHERE id = $1';
      const values = [id];
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        return null;
      }
      const { firstName, lastName, roleId, managerId } = rows[0];
      return new Employee(firstName, lastName, roleId, managerId);
    } catch (error) {
      console.error('Error retrieving employee:', error);
      throw error;
    }
  }

  async updateRole(roleId) {
    try {
      const query = 'UPDATE employees SET role_id = $1 WHERE id = $2';
      const values = [roleId, this.id];
      await db.query(query, values);
      console.log(`Employee '${this.firstName} ${this.lastName}' role updated successfully!`);
    } catch (error) {
      console.error('Error updating employee role:', error);
      throw error;
    }
  }
}

module.exports = Employee;
