const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/ReservaController');

// Rotas para reservas
router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas/usuario/:id_usuario', ReservaController.listarReservasDoUsuario);
router.get('/reservas/pendentes', ReservaController.listarReservasPendentes);
router.put('/reservas/aprovar/:id', ReservaController.aprovarReserva);
router.put('/reservas/rejeitar/:id', ReservaController.rejeitarReserva);
router.get('/painel-admin', ReservaController.exibirPainelAdmin);


module.exports = router;
