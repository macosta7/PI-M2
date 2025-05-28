const { Router } = require("express"); // Importa o Router do express
const UsuarioController = require("../controllers/UsuarioController"); // Importa o controlador de usuários
const upload = require("../config/multer"); // Importa a configuração do multer

const router = Router(); // Cria um roteador para gerenciar as rotas


router.get("/", (req, res) => { // Rota inicial
  res.redirect("/login"); // Redireciona para a página de login
});

router.get("/login", (req, res) => {
  res.render("login"); // Renderiza a página de login
});

router.get("/cadastro", (req, res) => {
  res.render("cadastro"); // Renderiza a página de cadastro
});

router.post("/usuarios", upload.single('foto_perfil'), UsuarioController.create);         // Cadastrar usuário
router.post("/login", UsuarioController.login);             // Login
router.get("/usuarios/:id", UsuarioController.detail);      // Detalhes do usuário
router.delete("/usuarios/:id", UsuarioController.remove);   // Excluir usuário
router.get("/editar-perfil", UsuarioController.editarPerfilForm); // Renderizar o formulário de edição de perfil
router.post("/editar-perfil", upload.single('foto_perfil'), UsuarioController.update);          // Atualizar perfil

module.exports = router; // Exporta o roteador para ser utilizado em outros arquivos
