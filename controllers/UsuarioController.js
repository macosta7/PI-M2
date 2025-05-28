const usuarioService = require("../services/usuarioService"); // Importa o serviço de usuário
const upload = require("../config/multer"); // Importa a configuração do multer

exports.create = async (req, res) => { // Função para criar um novo usuário
  try {
    // Adiciona o caminho da foto de perfil se foi enviada
    if (req.file) {
      req.body.foto_perfil = `/uploads/${req.file.filename}`;
    }

    await usuarioService.create(req.body); // Chama o serviço para criar o usuário
    res.redirect("/login"); // Redireciona para a página de login após criar o usuário
  } catch (e) {
    res.status(400).render("cadastro", { erro: e.message }); // Renderiza a página de cadastro com o erro
  }
};

exports.login = async (req, res) => { // Função para fazer login
  try {
    const usuario = await usuarioService.login(req.body.email, req.body.senha); // Chama o serviço para fazer login

    if (!usuario) {
      return res.status(401).render("login", { erro: "Credenciais inválidas" }); // Renderiza a página de login com erro
    }

    req.session.id_usuario = usuario.id_usuario; // Armazena o ID do usuário na sessão
    req.session.ocupacao_usuario = usuario.ocupacao_usuario; // Armazena a ocupação do usuário na sessão

    if (usuario.ocupacao_usuario === "recepcao") { // Verifica se o usuário é recepção
      return res.redirect("/painel-admin"); // Redireciona para o painel administrativo
    } else {
      return res.redirect("/reserva"); // Redireciona para a página de reserva
    }

  } catch (e) {
    console.error(e);
    res.status(500).render("login", { erro: "Erro no servidor" }); // Renderiza a página de login com erro
  }
};

exports.detail = async (req, res) => { // Função para obter os detalhes de um usuário
  try {
    const usuario = await usuarioService.detail(req.params.id); // Chama o serviço para obter os detalhes do usuário
    usuario ? res.json(usuario) : res.sendStatus(404); // Envia os detalhes do usuário ou um status 404 se não encontrado
  } catch (e) {
    res.status(500).json({ error: e.message }); // Envia um erro se ocorrer
  }
};

// Caso queira deixar pronto:
exports.remove = async (req, res) => { // Função para remover um usuário
  try {
    await usuarioService.remove(req.params.id); // Chama o serviço para remover o usuário
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ error: e.message }); // Envia um erro se ocorrer
  }
};

exports.editarPerfilForm = async (req, res) => { // Função para renderizar o formulário de edição de perfil
  const id = req.session.id_usuario; // Obtém o ID do usuário da sessão
  if (!id) return res.redirect("/login"); // Redireciona para a página de login se o ID do usuário não estiver na sessão

  const usuario = await usuarioService.detail(id); // Chama o serviço para obter os detalhes do usuário
  res.render("editarPerfil", { usuario, erro: null }); // Renderiza a página de edição de perfil com os dados do usuário
};

exports.update = async (req, res) => { // Função para atualizar o perfil do usuário
  const id = req.session.id_usuario; // Obtém o ID do usuário da sessão
  if (!id) return res.redirect('/login'); // Redireciona para a página de login se o ID do usuário não estiver na sessão

  try {
    // Adiciona o caminho da foto de perfil se foi enviada
    if (req.file) {
      req.body.foto_perfil = `/uploads/${req.file.filename}`;
    }

    await usuarioService.update(id, req.body); // Chama o serviço para atualizar o usuário
    res.redirect('/reserva'); // Redireciona para a página de reserva após atualizar o usuário
  } catch (e) {
    const usuario = await usuarioService.detail(id);  // Chama o serviço para obter os detalhes do usuário
    res.status(400).render('editarPerfil', { usuario, erro: e.message }); // Renderiza a página de edição de perfil com o erro
  }
};



