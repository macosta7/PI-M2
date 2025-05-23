const Joi = require("joi");

module.exports = Joi.object({
  id_usuario: Joi.number().integer().positive(),
  nome: Joi.string().min(3).required(),
  email_usuario: Joi.string().email().required(),
  senha_usuario: Joi.string().min(4).required(),
  ocupacao_usuario: Joi.string().valid("aluno", "professor", "coordenador", "recepcao").required()
});
