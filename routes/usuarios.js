const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/', (req, res) => {
  res.render('pages/login'); // ou o nome do arquivo .ejs correspondente
});

// Rotas para usuários
router.post('/usuarios', UsuarioController.criarUsuario);
router.post('/login', UsuarioController.login);
router.put('/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

module.exports = router;
