const notificacaoService = require("../services/notificacaoService"); // Importa o serviço de notificações

exports.listar = async (req, res) => { // Função para listar notificações
  try {
    const id_usuario = req.session.id_usuario; // Obtém o ID do usuário da sessão

    if (!id_usuario) {
      return res.redirect("/login"); // Redireciona para a página de login se o ID do usuário não estiver na sessão
    }

    const notificacoes = await notificacaoService.listarPorUsuario(id_usuario); // Chama o serviço para listar notificações do usuário

    res.render("notificacoes", { notificacoes }); // Renderiza a página de notificações com os dados obtidos
  } catch (e) {
    console.error("Erro ao buscar notificações:", e); // Loga o erro no console
    res.status(500).send("Erro ao carregar notificações."); // Envia uma resposta de erro ao cliente
  }
};
