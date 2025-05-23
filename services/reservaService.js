const reservaRepo = require("../repositories/reservaRepository"); // Importa o repositório de reservas
const reservaModel = require("../models/reservaModel"); // Importa o modelo de reserva
const notificacaoRepo = require("../repositories/notificacaoRepository"); // Importa o repositório de notificações

function validarReserva(payload) { // Função para validar os dados da reserva
  const { error, value } = reservaModel.validate(payload); // Valida os dados usando o modelo definido
  if (error) throw error; 
  return value; // Retorna os dados validados
}

module.exports = { // Exporta um objeto com métodos para gerenciar reservas
  async getSalasDisponiveis() { // Função para buscar salas disponíveis
    return await reservaRepo.buscarSalas(); // Chama o repositório para buscar salas
  },

  async getHorariosDisponiveis() { // Função para buscar horários disponíveis
    return await reservaRepo.buscarHorarios(); // Chama o repositório para buscar horários
  },

  async create(payload) { // Função para criar uma nova reserva
    const reservaValida = validarReserva(payload); // Valida os dados da reserva
    return await reservaRepo.criarReserva(reservaValida); // Chama o repositório para criar a reserva
  },

  async getHorariosDisponiveisParaSalaEData(id_sala, data_reserva) { // Função para buscar horários disponíveis para uma sala e data específicas
    return await reservaRepo.buscarHorariosDisponiveis(id_sala, data_reserva); // Chama o repositório para buscar horários disponíveis
  },

  async listarPendentes() { // Função para listar reservas pendentes
    return await reservaRepo.listarPendentesComUsuarioSala(); // Chama o repositório para listar reservas pendentes
  },

  async atualizarStatus(id, status) { // Função para atualizar o status de uma reserva
    const reservaAtualizada = await reservaRepo.atualizarStatus(id, status); // Chama o repositório para atualizar o status da reserva

    const mensagem = status === "aprovada" // Verifica se o status é "aprovada"
      ? "Sua reserva foi aprovada!"
      : "Sua reserva foi rejeitada.";

    await notificacaoRepo.criar({ // Cria uma nova notificação
      id_usuario: reservaAtualizada.id_usuario,
      id_reserva: reservaAtualizada.id_reserva,
      mensagem_notificacao: mensagem
    });

    return reservaAtualizada; // Retorna a reserva atualizada
  }
};
