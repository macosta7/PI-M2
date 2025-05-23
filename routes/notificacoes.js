const { Router } = require("express");
const notificacaoController = require("../controllers/NotificacaoController");

const router = Router();

// Corrigido: só uma rota que chama o controller corretamente
router.get("/notificacoes", notificacaoController.listar);

module.exports = router;
