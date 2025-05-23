const Joi = require("joi");

module.exports = Joi.object({
  id_notificacao: Joi.number().integer().positive(),
  id_usuario: Joi.number().integer().required(),
  id_reserva: Joi.number().integer().required(),
  mensagem_notificacao: Joi.string().required(),
  visualizada_notificacao: Joi.boolean(),
  data_notificacao: Joi.date()
});
