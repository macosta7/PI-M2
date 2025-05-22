const express = require('express');
const router = express.Router();
const NotificacaoController = require('../controllers/NotificacaoController');

router.get('/notificacoes/usuario/:id_usuario/view', NotificacaoController.exibirNotificacoes);
router.post('/notificacoes', NotificacaoController.enviarNotificacao);
router.get('/notificacoes/usuario/:id_usuario', NotificacaoController.listarNotificacoesDoUsuario);
router.post('/notificacoes/:id', NotificacaoController.marcarComoVisualizada);
router.delete('/notificacoes/:id', NotificacaoController.excluirNotificacao);

module.exports = router;

