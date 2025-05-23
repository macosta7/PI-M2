const Joi = require("joi"); // Importa o Joi para validação de dados

module.exports = Joi.object({ // Define o esquema de validação para notificações
  id_reserva: Joi.number().integer().positive(), 
  id_usuario: Joi.number().integer().required(),
  id_sala: Joi.number().integer().required(),
  data_reserva: Joi.date().required(),
  id_horario: Joi.number().integer().required(),
  status_reserva: Joi.string().valid("pendente", "aprovada", "rejeitada").optional()
});
