const usuarioRepo = require("../repositories/usuarioRepository");

// Nomes que não podem ser usados
const NOMES_RESERVADOS = new Set(["admin", "root", "system", "recepcao"]);

function validarNome(nome) {
  if (!nome) throw new Error("Nome é obrigatório.");
  if (NOMES_RESERVADOS.has(nome.toLowerCase())) {
    throw new Error("Nome de usuário reservado.");
  }
}

async function validarEmailUnico(email, ignorarId = null) {
  const usuario = await usuarioRepo.findByEmail(email);
  if (usuario && usuario.id_usuario !== ignorarId) {
    throw new Error("E-mail já cadastrado.");
  }
}

module.exports = {
  async create(payload) {
    validarNome(payload.nome);
    await validarEmailUnico(payload.email_usuario);

    const novoUsuario = await usuarioRepo.create(payload);
    return novoUsuario;
  },

  async login(email, senha) {
    const usuario = await usuarioRepo.findByEmail(email);
    if (!usuario) return null;
    if (usuario.senha_usuario !== senha) return null;
    return usuario;
  },

  async detail(id) {
    return await usuarioRepo.findById(id);
  },

  async update(id, payload) {
    if (payload.nome) validarNome(payload.nome);
    if (payload.email_usuario) await validarEmailUnico(payload.email_usuario, id);

    return await usuarioRepo.update(id, payload);
  },

  async remove(id) {
    await usuarioRepo.remove(id);
  }
};
