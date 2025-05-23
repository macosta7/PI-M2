const { Router } = require("express"); // Importa o Router do express
const notificacaoController = require("../controllers/NotificacaoController"); // Importa o controlador de notificações

const router = Router(); // Cria um roteador para gerenciar as rotas

router.get("/notificacoes", notificacaoController.listar); // Rota para listar notificações

module.exports = router; // Exporta o roteador para ser utilizado em outros arquivos
