const db = require('../config/database');

module.exports = {
  // Criar nova reserva
  async create(data) {
    const query = `
      INSERT INTO reservas (id_usuario, id_sala, data_reserva, id_horario, status_reserva)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      data.id_usuario,
      data.id_sala,
      data.data_reserva,
      data.id_horario,
      data.status_reserva || 'pendente'
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Buscar reservas de um usuário
  async findByUsuario(id_usuario) {
    const query = `
      SELECT * FROM reservas
      WHERE id_usuario = $1
      ORDER BY data_reserva DESC;
    `;
    const result = await db.query(query, [id_usuario]);
    return result.rows;
  },

  // Listar reservas pendentes (modo API)
  async findPendentes() {
    const query = `
      SELECT * FROM reservas
      WHERE status_reserva = 'pendente'
      ORDER BY data_reserva ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  },

  // Atualizar status da reserva
  async updateStatus(id_reserva, status) {
    const query = `
      UPDATE reservas
      SET status_reserva = $1
      WHERE id_reserva = $2
      RETURNING *;
    `;
    const result = await db.query(query, [status, id_reserva]);
    return result.rows[0];
  },

  // Excluir reserva
  async delete(id) {
    const query = 'DELETE FROM reservas WHERE id_reserva = $1';
    return db.query(query, [id]);
  },

  // Listar reservas pendentes com dados de usuário e sala (modo view admin)
  async listarReservasPendentesComDados() {
    const query = `
      SELECT reservas.*, usuarios.nm_usuario, usuarios.ocupacao_usuario, salas.nm_sala
      FROM reservas
      JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
      JOIN salas ON reservas.id_sala = salas.id_sala
      WHERE status_reserva = 'pendente'
      ORDER BY data_reserva ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  }
};
