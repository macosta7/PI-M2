const db = require("../config/db");
const schema = require("../models/usuarioModel");

function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
}

module.exports = {
  async create(usuario) {
    usuario = validate(usuario);

  const query = `
    INSERT INTO usuarios (nm_usuario, email_usuario, senha_usuario, ocupacao_usuario)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    usuario.nome,        
    usuario.email_usuario,
    usuario.senha_usuario,
    usuario.ocupacao_usuario,
  ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = `
      SELECT * FROM usuarios WHERE email_usuario = $1;
    `;
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  },

  async findById(id) {
    const query = `
      SELECT * FROM usuarios WHERE id_usuario = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },

  async update(id, payload) {
    payload = validate(payload);

    const query = `
      UPDATE usuarios
      SET nm_usuario = $1, email_usuario = $2, senha_usuario = $3, ocupacao_usuario = $4
      WHERE id_usuario = $5
      RETURNING *;
    `;
    const values = [
      payload.nome,
      payload.email_usuario,
      payload.senha_usuario,
      payload.ocupacao_usuario,
      id
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async remove(id) {
    const query = `DELETE FROM usuarios WHERE id_usuario = $1`;
    await db.query(query, [id]);
  }
};
