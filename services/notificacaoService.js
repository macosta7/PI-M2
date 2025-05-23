const notificacaoRepo = require("../repositories/notificacaoRepository");

module.exports = {
  async listarPorUsuario(id_usuario) {
    return await notificacaoRepo.listarPorUsuario(id_usuario);
  }
};
