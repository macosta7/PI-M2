const pool = require('../config/database');

// Criar nova sala
exports.criarSala = async (req, res) => {
  const { nome } = req.body;

  const query = `
    INSERT INTO salas (nm_sala)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [nome];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as salas
exports.listarSalas = async (req, res) => {
  const query = 'SELECT * FROM salas ORDER BY nm_sala ASC';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar sala
exports.editarSala = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const query = `
    UPDATE salas
    SET nm_sala = $1
    WHERE id_sala = $2
    RETURNING *;
  `;
  const values = [nome, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir sala
exports.excluirSala = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM salas WHERE id_sala = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
