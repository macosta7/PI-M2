const pool = require('../config/database');

// Criar uma nova reserva
exports.criarReserva = async (req, res) => {
  const { id_usuario, id_sala, data_reserva, id_horario } = req.body;

  const query = `
    INSERT INTO reservas (id_usuario, id_sala, data_reserva, id_horario, status_reserva)
    VALUES ($1, $2, $3, $4, 'pendente')
    RETURNING *;
  `;
  const values = [id_usuario, id_sala, data_reserva, id_horario];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar reservas por usuário
exports.listarReservasDoUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  const query = `
    SELECT * FROM reservas
    WHERE id_usuario = $1
    ORDER BY data_reserva DESC;
  `;

  try {
    const result = await pool.query(query, [id_usuario]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar reservas pendentes (para admin)
exports.listarReservasPendentes = async (req, res) => {
  const query = `
    SELECT reservas.*, usuarios.nm_usuario, usuarios.ocupacao_usuario, salas.nm_sala
    FROM reservas
    JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
    JOIN salas ON reservas.id_sala = salas.id_sala
    WHERE status_reserva = 'pendente'
    ORDER BY data_reserva ASC;
  `;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aprovar reserva
exports.aprovarReserva = async (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE reservas
    SET status_reserva = 'aprovada'
    WHERE id_reserva = $1
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rejeitar reserva
exports.rejeitarReserva = async (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE reservas
    SET status_reserva = 'rejeitada'
    WHERE id_reserva = $1
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  const ReservaModel = require('../models/Reserva');

  exports.exibirPainelAdmin = async (req, res) => {
    try {
        const reservas = await ReservaModel.listarReservasPendentesComDados();
        res.render('pages/painelAdmin', { reservas });
    } catch (err) {
      res.status(500).send('Erro ao carregar painel administrativo: ' + err.message);
    }
  };
};
