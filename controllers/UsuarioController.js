const pool = require('../config/database');

// Criar novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, ocupacao, senha } = req.body;

  const query = `
    INSERT INTO usuarios (nm_usuario, email_usuario, ocupacao_usuario, senha_usuario)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [nome, email, ocupacao, senha];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email_usuario = $1 AND senha_usuario = $2';
  const values = [email, senha];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar perfil do usuário
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, ocupacao, senha } = req.body;

  const query = `
    UPDATE usuarios
    SET nm_usuario = $1,
        email_usuario = $2,
        ocupacao_usuario = $3,
        senha_usuario = $4
    WHERE id_usuario = $5
    RETURNING *;
  `;
  const values = [nome, email, ocupacao, senha, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar usuário
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
