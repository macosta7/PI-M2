const pool = require('../config/db');

// Criar nova notificação
exports.enviarNotificacao = async (req, res) => {
  const { id_usuario, id_reserva, mensagem } = req.body;

  const query = `
    INSERT INTO notificacoes (id_usuario, id_reserva, mensagem_notificacao)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [id_usuario, id_reserva, mensagem];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar notificações de um usuário
exports.listarNotificacoesDoUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  const query = `
    SELECT * FROM notificacoes
    WHERE id_usuario = $1
    ORDER BY data_notificacao DESC;
  `;

  try {
    const result = await pool.query(query, [id_usuario]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Marcar notificação como visualizada
exports.marcarComoVisualizada = async (req, res) => {
  const { id } = req.params;

  const query = `
    UPDATE notificacoes
    SET visualizada_notificacao = TRUE
    WHERE id_notificacao = $1
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir notificação
exports.excluirNotificacao = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM notificacoes WHERE id_notificacao = $1 RETURNING *';

  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json({ message: 'Notificação excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const NotificacaoModel = require('../models/Notificacao');

exports.exibirNotificacoes = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const notificacoes = await NotificacaoModel.findByUsuario(id_usuario);
    res.render('pages/notificacoes', { notificacoes });
  } catch (err) {
    res.status(500).send('Erro ao carregar notificações: ' + err.message);
  }
};
