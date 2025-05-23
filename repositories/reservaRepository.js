const db = require("../config/db");

module.exports = {
  async buscarSalas() {
    const result = await db.query("SELECT id_sala, nm_sala FROM salas ORDER BY nm_sala ASC");
    return result.rows;
  },

  async criarReserva(data) {
    const query = `
      INSERT INTO reservas (id_usuario, id_sala, data_reserva, id_horario, status_reserva)
      VALUES ($1, $2, $3, $4, 'pendente')
      RETURNING *;
    `;
    const values = [
      data.id_usuario,
      data.id_sala,
      data.data_reserva,
      data.id_horario
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async buscarHorarios() {
    const result = await db.query(`
        SELECT id_horario, horario_inicio, horario_fim 
        FROM horarios
        ORDER BY horario_inicio
    `);
    return result.rows;
  },
  
  async buscarHorariosDisponiveis(id_sala, data_reserva) {
    const result = await db.query(`
        SELECT h.*
        FROM horarios h
        WHERE h.id_horario NOT IN (
        SELECT r.id_horario
        FROM reservas r
        WHERE r.id_sala = $1 AND r.data_reserva = $2
        )
        ORDER BY h.horario_inicio;
    `, [id_sala, data_reserva]);

    return result.rows;
  },

  async listarPendentesComUsuarioSala() {
    const result = await db.query(`
      SELECT 
        reservas.id_reserva,
        reservas.data_reserva,
        reservas.status_reserva,
        usuarios.nm_usuario,
        salas.nm_sala,
        horarios.horario_inicio,
        horarios.horario_fim
      FROM reservas
      JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
      JOIN salas ON reservas.id_sala = salas.id_sala
      JOIN horarios ON reservas.id_horario = horarios.id_horario
      WHERE status_reserva = 'pendente'
      ORDER BY data_reserva ASC;
    `);
    return result.rows;
  },

  async  atualizarStatus(id_reserva, status) {
    const result = await db.query(`
      UPDATE reservas
      SET status_reserva = $1
      WHERE id_reserva = $2
      RETURNING *;
    `, [status, id_reserva]);
    return result.rows[0];
  },
};



