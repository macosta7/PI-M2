const Joi = require("joi"); // Importa o Joi para validação de dados

module.exports = Joi.object({ // Define o esquema de validação para notificações
  id_notificacao: Joi.number().integer().positive(),
  id_usuario: Joi.number().integer().required(),
  id_reserva: Joi.number().integer().required(),
  mensagem_notificacao: Joi.string().required(),
  visualizada_notificacao: Joi.boolean(),
  data_notificacao: Joi.date()
});
