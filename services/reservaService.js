const reservaRepo = require("../repositories/reservaRepository");
const reservaModel = require("../models/reservaModel");

function validarReserva(payload) {
  const { error, value } = reservaModel.validate(payload);
  if (error) throw error;
  return value;
}

module.exports = {
  async getSalasDisponiveis() {
    return await reservaRepo.buscarSalas();
  },

  async getHorariosDisponiveis() {
    return await reservaRepo.buscarHorarios(); // nova função no repo
  },

  async create(payload) {
    const reservaValida = validarReserva(payload);
    return await reservaRepo.criarReserva(reservaValida);
  },

  async getHorariosDisponiveisParaSalaEData(id_sala, data_reserva) {
    return await reservaRepo.buscarHorariosDisponiveis(id_sala, data_reserva);
  }
};
