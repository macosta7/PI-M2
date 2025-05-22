const pool = require('../config/database');

// Criar novo horário
exports.criarHorario = async (req, res) => {
  const { id_sala, horario_inicio, horario_fim, dia_semana } = req.body;

  const query = `
    INSERT INTO horarios (id_sala, horario_inicio, horario_fim, dia_semana)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [id_sala, horario_inicio, horario_fim, dia_semana];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar horários por sala
exports.listarHorariosPorSala = async (req, res) => {
  const { id_sala } = req.params;

  const query = `
    SELECT * FROM horarios
    WHERE id_sala = $1
    ORDER BY dia_semana, horario_inicio;
  `;

  try {
    const result = await pool.query(query, [id_sala]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verificar se horário está disponível
exports.verificarDisponibilidade = async (req, res) => {
  const { id_horario, data_reserva } = req.body;

  const query = `
    SELECT * FROM reservas
    WHERE id_horario = $1 AND data_reserva = $2
    AND status_reserva IN ('pendente', 'aprovada');
  `;

  try {
    const result = await pool.query(query, [id_horario, data_reserva]);
    const ocupado = result.rows.length > 0;
    res.status(200).json({ disponivel: !ocupado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
