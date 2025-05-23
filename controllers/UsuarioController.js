const usuarioService = require("../services/usuarioService");

exports.create = async (req, res) => {
  try {
    await usuarioService.create(req.body);
    res.redirect("/login"); // redireciona para a tela de login
  } catch (e) {
    res.status(400).render("cadastro", { erro: e.message });
  }
};

exports.login = async (req, res) => {
  console.log("⏳ Entrando na função login");

  try {
    const usuario = await usuarioService.login(req.body.email, req.body.senha);

    if (!usuario) {
      return res.status(401).render("login", { erro: "Credenciais inválidas" });
    }

    req.session.id_usuario = usuario.id_usuario;

    if (usuario.ocupacao_usuario === "recepcao") {
      return res.redirect("/painel-admin");
    } else {
      return res.redirect("/reserva");
    }
  } catch (e) {
    console.error(e);
    res.status(500).render("login", { erro: "Erro no servidor" });
  }
};

exports.detail = async (req, res) => {
  try {
    const usuario = await usuarioService.detail(req.params.id);
    usuario ? res.json(usuario) : res.sendStatus(404);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const usuarioAtualizado = await usuarioService.update(req.params.id, req.body);
    res.json(usuarioAtualizado);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Caso queira deixar pronto:
exports.remove = async (req, res) => {
  try {
    await usuarioService.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
