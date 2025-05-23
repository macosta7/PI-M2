const express = require('express'); // Importa o express
const router = express.Router(); // Cria um roteador para gerenciar as rotas
const SalaController = require('../controllers/SalaController'); // Importa o controlador de salas

// Rotas para salas
router.post('/salas', SalaController.criarSala); // Cria uma nova sala
router.get('/salas', SalaController.listarSalas); // Lista todas as salas
router.put('/salas/:id', SalaController.editarSala); // Edita uma sala existente
router.delete('/salas/:id', SalaController.excluirSala); // Exclui uma sala existente

module.exports = router; // Exporta o roteador para ser utilizado em outros arquivos
