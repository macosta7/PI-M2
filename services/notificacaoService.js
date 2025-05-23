const notificacaoRepo = require("../repositories/notificacaoRepository"); // Importa o repositório de notificações

module.exports = { // Exporta um objeto com métodos para gerenciar notificações
  async listarPorUsuario(id_usuario) { // Função para listar notificações por usuário
    return await notificacaoRepo.listarPorUsuario(id_usuario); // Chama o repositório para listar notificações
  }
};
