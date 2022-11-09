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
    if (!rows[0]) return null;
    return new Soda(rows[0]);
  }

  static async insert(soda) {
    const { rows } = await pool.query(
      `
      INSERT INTO sodas (name, country, color, image) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [soda.name, soda.country, soda.color, soda.image]
    );
    console.log(rows);
    return new Soda(rows[0]);
  }

  static async updateById(id, newAttrs) {
    // get the current row from the database
    const soda = await Soda.getById(id);
    console.log('soda in update', soda);

    // if we can't find a matching row, lets return null
    if (!soda) return null;

    // combine the new attributes with the old attributes
    const updatedData = { ...soda, ...newAttrs };

    const { rows } = await pool.query(
      `
      UPDATE sodas
      SET name = $2, color = $3, country = $4, image = $5
      WHERE id = $1
      RETURNING *
    `,
      [
        id,
        updatedData.name,
        updatedData.color,
        updatedData.country,
        updatedData.image,
      ]
    );

    return new Soda(rows[0]);
  }
}

module.exports = { Soda };
