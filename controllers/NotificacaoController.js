const notificacaoService = require("../services/notificacaoService");

exports.listar = async (req, res) => {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/login");
    }

    const notificacoes = await notificacaoService.listarPorUsuario(id_usuario);

    res.render("notificacoes", { notificacoes });
  } catch (e) {
    console.error("Erro ao buscar notificações:", e);
    res.status(500).send("Erro ao carregar notificações.");
  }
};
