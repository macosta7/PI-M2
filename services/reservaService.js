const reservaRepo = require("../repositories/reservaRepository");
const reservaModel = require("../models/reservaModel");
const notificacaoRepo = require("../repositories/notificacaoRepository");

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
  },

  async listarPendentes() {
    return await reservaRepo.listarPendentesComUsuarioSala();
  },

  async atualizarStatus(id, status) {
    const reservaAtualizada = await reservaRepo.atualizarStatus(id, status);

    // Criar notificação com base no novo status
    const mensagem = status === "aprovada"
      ? "Sua reserva foi aprovada!"
      : "Sua reserva foi rejeitada.";

    await notificacaoRepo.criar({
      id_usuario: reservaAtualizada.id_usuario,
      id_reserva: reservaAtualizada.id_reserva,
      mensagem_notificacao: mensagem
    });

    return reservaAtualizada;
  }
};
