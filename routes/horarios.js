const express = require('express');
const router = express.Router();
const HorarioController = require('../controllers/HorarioController');

// Rotas para horários
router.post('/horarios', HorarioController.criarHorario);
router.get('/horarios/:id_sala', HorarioController.listarHorariosPorSala);
router.post('/horarios/disponibilidade', HorarioController.verificarDisponibilidade);

module.exports = router;
