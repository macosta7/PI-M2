const db = require('../config/database');

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO notificacoes (id_usuario, id_reserva, mensagem_notificacao, visualizada_notificacao)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      data.id_usuario,
      data.id_reserva,
      data.mensagem_notificacao,
      data.visualizada_notificacao || false
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findByUsuario(id_usuario) {
    const query = `
      SELECT * FROM notificacoes
      WHERE id_usuario = $1
      ORDER BY data_notificacao DESC;
    `;
    const result = await db.query(query, [id_usuario]);
    return result.rows;
  },

  async marcarComoVisualizada(id_notificacao) {
    const query = `
      UPDATE notificacoes
      SET visualizada_notificacao = TRUE
      WHERE id_notificacao = $1
      RETURNING *;
    `;
    const result = await db.query(query, [id_notificacao]);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM notificacoes WHERE id_notificacao = $1';
    return db.query(query, [id]);
  }
};
