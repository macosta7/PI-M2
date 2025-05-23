const Joi = require("joi");

module.exports = Joi.object({
  id_usuario: Joi.number().integer().positive().required(),
  id_sala: Joi.number().integer().positive().required(),
  data_reserva: Joi.date().required(),
  id_horario: Joi.number().integer().positive().required()
});
