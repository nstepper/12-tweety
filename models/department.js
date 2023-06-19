const db = require('../db');

class Department {
  constructor(name) {
    this.name = name;
  }

  static async findAll() {
    try {
      const query = 'SELECT * FROM departments';
      const { rows } = await db.query(query);
      return rows.map(row => new Department(row.name));
    } catch (error) {
      console.error('Error retrieving departments:', error);
      throw error;
    }
  }

  async save() {
    try {
      const query = 'INSERT INTO departments (name) VALUES ($1)';
      const values = [this.name];
      await db.query(query, values);
      console.log(`Department '${this.name}' saved successfully!`);
    } catch (error) {
      console.error('Error saving department:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = 'SELECT * FROM departments WHERE id = $1';
      const values = [id];
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        return null;
      }
      const { name } = rows[0];
      return new Department(name);
    } catch (error) {
      console.error('Error retrieving department:', error);
      throw error;
    }
  }
}

module.exports = Department;
