const Joi = require("joi");

module.exports = Joi.object({
  id_reserva: Joi.number().integer().positive(),
  id_usuario: Joi.number().integer().required(),
  id_sala: Joi.number().integer().required(),
  data_reserva: Joi.date().required(),
  id_horario: Joi.number().integer().required(),
  status_reserva: Joi.string().valid("pendente", "aprovada", "rejeitada").optional()
});
