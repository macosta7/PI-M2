const db = require("../config/db"); // Importa a configuração do banco de dados

module.exports = { // Exporta um objeto com métodos para interagir com a tabela de notificações
  async buscarSalas() { // Função para buscar todas as salas
    const result = await db.query("SELECT id_sala, nm_sala FROM salas ORDER BY nm_sala ASC");
    return result.rows; // Retorna as salas encontradas
  },

  async criarReserva(data) { // Função para criar uma nova reserva
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
    const result = await db.query(query, values); // Executa a consulta no banco de dados
    return result.rows[0]; // Retorna a reserva criada
  },

  async buscarHorarios() { // Função para buscar todos os horários
    const result = await db.query(` 
        SELECT id_horario, horario_inicio, horario_fim 
        FROM horarios
        ORDER BY horario_inicio
    `);
    return result.rows; // Retorna os horários encontrados
  },
  
  async buscarHorariosDisponiveis(id_sala, data_reserva) { // Função para buscar horários disponíveis para uma sala e data específicas
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

    return result.rows; // Retorna os horários disponíveis
  },

  async listarPendentesComUsuarioSala() { // Função para listar reservas pendentes com informações de usuário e sala
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
    return result.rows; // Retorna as reservas pendentes encontradas
  },

  async  atualizarStatus(id_reserva, status) { // Função para atualizar o status de uma reserva
    const result = await db.query(`
      UPDATE reservas
      SET status_reserva = $1
      WHERE id_reserva = $2
      RETURNING *;
    `, [status, id_reserva]);
    return result.rows[0]; // Retorna a reserva atualizada
  },
};



