const db = require('../db');

class Role {
  constructor(title, salary, departmentId) {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  static async findAll() {
    try {
      const query = 'SELECT * FROM roles';
      const { rows } = await db.query(query);
      return rows.map(row => new Role(row.title, row.salary, row.departmentId));
    } catch (error) {
      console.error('Error retrieving roles:', error);
      throw error;
    }
  }

  async save() {
    try {
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
      const values = [this.title, this.salary, this.departmentId];
      await db.query(query, values);
      console.log(`Role '${this.title}' saved successfully!`);
    } catch (error) {
      console.error('Error saving role:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = 'SELECT * FROM roles WHERE id = $1';
      const values = [id];
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        return null;
      }
      const { title, salary, departmentId } = rows[0];
      return new Role(title, salary, departmentId);
    } catch (error) {
      console.error('Error retrieving role:', error);
      throw error;
    }
  }
}

module.exports = Role;
