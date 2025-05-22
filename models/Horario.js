const db = require('../config/database');

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO horarios (id_sala, horario_inicio, horario_fim, dia_semana)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [data.id_sala, data.horario_inicio, data.horario_fim, data.dia_semana];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findBySala(id_sala) {
    const query = `
      SELECT * FROM horarios
      WHERE id_sala = $1
      ORDER BY dia_semana, horario_inicio;
    `;
    const result = await db.query(query, [id_sala]);
    return result.rows;
  },

  async findById(id) {
    const query = 'SELECT * FROM horarios WHERE id_horario = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async update(id, data) {
    const query = `
      UPDATE horarios
      SET id_sala = $1,
          horario_inicio = $2,
          horario_fim = $3,
          dia_semana = $4
      WHERE id_horario = $5
      RETURNING *;
    `;
    const values = [data.id_sala, data.horario_inicio, data.horario_fim, data.dia_semana, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM horarios WHERE id_horario = $1';
    return db.query(query, [id]);
  }
};
