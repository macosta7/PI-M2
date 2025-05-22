const express = require('express');
const router = express.Router();
const SalaController = require('../controllers/SalaController');

// Rotas para salas
router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.put('/salas/:id', SalaController.editarSala);
router.delete('/salas/:id', SalaController.excluirSala);

module.exports = router;
