const pool = require('../utils/pool');

class Soda {
  id;
  name;
  country;
  color;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.country = row.country;
    this.color = row.color;
    this.image = row.image;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from sodas');
    return rows.map((soda) => new Soda(soda));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from sodas where id = $1', [
      id,
    ]);
    return new Soda(rows[0]);
  }
}

module.exports = { Soda };
