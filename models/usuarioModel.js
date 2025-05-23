const Joi = require("joi"); // Importa o Joi para validação de dados

module.exports = Joi.object({ // Define o esquema de validação para notificações
  id_usuario: Joi.number().integer().positive(),
  nome: Joi.string().min(3).required(),
  email_usuario: Joi.string().email().required(),
  senha_usuario: Joi.string().min(4).required(),
  ocupacao_usuario: Joi.string().valid("aluno", "professor", "coordenador", "recepcao").required()
});
