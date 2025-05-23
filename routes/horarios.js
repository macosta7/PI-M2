const express = require('express'); // Importa o express
const router = express.Router(); // Cria um roteador para gerenciar as rotas
const HorarioController = require('../controllers/HorarioController'); // Importa o controlador de horários

// Rotas para horários
router.post('/horarios', HorarioController.criarHorario); // Cria um novo horário
router.get('/horarios/:id_sala', HorarioController.listarHorariosPorSala); // Lista horários por sala
router.post('/horarios/disponibilidade', HorarioController.verificarDisponibilidade); // Verifica a disponibilidade de horários

module.exports = router; // Exporta o roteador para ser utilizado em outros arquivos
