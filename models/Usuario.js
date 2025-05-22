const db = require('../config/database');

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO usuarios (nm_usuario, email_usuario, ocupacao_usuario, senha_usuario)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [data.nome, data.email, data.ocupacao, data.senha];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email_usuario = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT * FROM usuarios WHERE id_usuario = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async update(id, data) {
    const query = `
      UPDATE usuarios
      SET nm_usuario = $1,
          email_usuario = $2,
          ocupacao_usuario = $3,
          senha_usuario = $4
      WHERE id_usuario = $5
      RETURNING *;
    `;
    const values = [data.nome, data.email, data.ocupacao, data.senha, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1';
    return db.query(query, [id]);
  }
};
