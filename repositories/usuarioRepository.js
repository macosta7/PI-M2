const db = require("../config/db"); // Importa a configuração do banco de dados
const schema = require("../models/usuarioModel"); // Importa o esquema de validação do usuário

function validate(data) { // Função para validar os dados do usuário
  const { error, value } = schema.validate(data); // Valida os dados usando o esquema definido
  if (error) throw error;
  return value; // Retorna os dados validados
}

module.exports = { // Exporta um objeto com métodos para interagir com a tabela de usuários
  async create(usuario) { // Função para criar um novo usuário
    usuario = validate(usuario);

  const query = `
    INSERT INTO usuarios (nm_usuario, email_usuario, senha_usuario, ocupacao_usuario, foto_perfil)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    usuario.nome,
    usuario.email_usuario,
    usuario.senha_usuario,
    usuario.ocupacao_usuario,
    usuario.foto_perfil || null,
  ];

    const result = await db.query(query, values); // Executa a consulta no banco de dados
    return result.rows[0]; // Retorna o usuário criado
  },

  async findByEmail(email) { // Função para buscar um usuário pelo email
    const query = `
      SELECT * FROM usuarios WHERE email_usuario = $1;
    `;
    const result = await db.query(query, [email]); // Executa a consulta no banco de dados
    return result.rows[0] || null; // Retorna o usuário encontrado ou null se não encontrado
  },

  async findById(id) { // Função para buscar um usuário pelo ID
    const query = `
      SELECT * FROM usuarios WHERE id_usuario = $1;
    `;
    const result = await db.query(query, [id]); // Executa a consulta no banco de dados
    return result.rows[0] || null; // Retorna o usuário encontrado ou null se não encontrado
  },

  async update(id, payload) { // Função para atualizar um usuário
    payload = validate(payload); // Valida os dados do usuário

    const query = `
      UPDATE usuarios
      SET nm_usuario = $1, email_usuario = $2, senha_usuario = $3, ocupacao_usuario = $4, foto_perfil = $5
      WHERE id_usuario = $6
      RETURNING *;
    `;
    const values = [
      payload.nome,
      payload.email_usuario,
      payload.senha_usuario,
      payload.ocupacao_usuario,
      payload.foto_perfil || null,
      id
    ];

    const result = await db.query(query, values); // Executa a consulta no banco de dados
    return result.rows[0]; // Retorna o usuário atualizado
  },

  async remove(id) { // Função para remover um usuário
    const query = `DELETE FROM usuarios WHERE id_usuario = $1`;
    await db.query(query, [id]); // Executa a consulta no banco de dados
  }
};
