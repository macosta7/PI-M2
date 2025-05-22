const db = require('../config/database');

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO salas (nm_sala)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [data.nome];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = 'SELECT * FROM salas ORDER BY nm_sala ASC';
    const result = await db.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = 'SELECT * FROM salas WHERE id_sala = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async update(id, data) {
    const query = `
      UPDATE salas
      SET nm_sala = $1
      WHERE id_sala = $2
      RETURNING *;
    `;
    const values = [data.nome, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM salas WHERE id_sala = $1';
    return db.query(query, [id]);
  }
};
