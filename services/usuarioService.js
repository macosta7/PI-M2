const usuarioRepo = require("../repositories/usuarioRepository"); // Importa o repositório de usuários

// Nomes que não podem ser usados
const NOMES_RESERVADOS = new Set(["admin", "root", "system", "recepcao"]); // Define um conjunto de nomes reservados

function validarNome(nome) { // Função para validar o nome do usuário
  if (!nome) throw new Error("Nome é obrigatório."); // Verifica se o nome é fornecido
  if (NOMES_RESERVADOS.has(nome.toLowerCase())) {
    throw new Error("Nome de usuário reservado."); // Verifica se o nome é reservado
  }
}

async function validarEmailUnico(email, ignorarId = null) { // Função para validar se o email é único
  const usuario = await usuarioRepo.findByEmail(email); // Busca o usuário pelo email
  if (usuario && usuario.id_usuario !== ignorarId) {
    throw new Error("E-mail já cadastrado."); // Verifica se o email já está cadastrado
  }
}

module.exports = { // Exporta um objeto com métodos para gerenciar usuários
  async create(payload) {
    validarNome(payload.nome); // Valida o nome do usuário
    await validarEmailUnico(payload.email_usuario); // Valida se o email é único

    const novoUsuario = await usuarioRepo.create(payload); // Cria um novo usuário
    return novoUsuario;
  },

  async login(email, senha) { // Função para realizar o login do usuário
    const usuario = await usuarioRepo.findByEmail(email); // Busca o usuário pelo email
    if (!usuario) return null;
    if (usuario.senha_usuario !== senha) return null; // Verifica se a senha está correta
    return usuario;
  },

  async detail(id) {
    return await usuarioRepo.findById(id); // Busca o usuário pelo ID
  },

  async update(id, payload) {
    if (payload.nome) validarNome(payload.nome); // Valida o nome do usuário
    if (payload.email_usuario) await validarEmailUnico(payload.email_usuario, id); // Valida se o email é único

    return await usuarioRepo.update(id, payload); // Atualiza o usuário
  },

  async remove(id) {
    await usuarioRepo.remove(id); // Remove o usuário
  }
};
