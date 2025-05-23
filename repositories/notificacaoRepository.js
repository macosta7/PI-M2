const db = require("../config/db"); // Importa a configuração do banco de dados

module.exports = { // Exporta um objeto com métodos para interagir com a tabela de notificações
  async listarPorUsuario(id_usuario) { // Função para listar notificações por ID de usuário
    const result = await db.query(`
      SELECT 
        n.mensagem_notificacao,
        n.visualizada_notificacao,
        r.data_reserva,
        r.status_reserva,
        s.nm_sala,
        h.horario_inicio,
        h.horario_fim
      FROM notificacoes n
      JOIN reservas r ON n.id_reserva = r.id_reserva
      JOIN salas s ON r.id_sala = s.id_sala
      JOIN horarios h ON r.id_horario = h.id_horario
      WHERE n.id_usuario = $1
      ORDER BY r.data_reserva DESC;
    `, [id_usuario]);

    return result.rows; // Retorna as notificações encontradas
  },


  async criar(data) { // Função para criar uma nova notificação
    const result = await db.query(`
      INSERT INTO notificacoes (id_usuario, id_reserva, mensagem_notificacao, visualizada_notificacao)
      VALUES ($1, $2, $3, false)
      RETURNING *;
    `, [data.id_usuario, data.id_reserva, data.mensagem_notificacao]);

    return result.rows[0]; // Retorna a notificação criada
  }
};
