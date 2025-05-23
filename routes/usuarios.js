const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();


router.get("/", (req, res) => {
  res.redirect("/login"); // ou 'cadastro', se preferir como tela inicial
});

router.get("/login", (req, res) => {
  res.render("login"); // ou 'cadastro', se preferir como tela inicial
});

router.get("/cadastro", (req, res) => {
  res.render("cadastro"); // ou 'cadastro', se preferir como tela inicial
});

router.post("/usuarios", UsuarioController.create);         // Cadastro
router.post("/login", UsuarioController.login);             // Login
router.get("/usuarios/:id", UsuarioController.detail);      // Ver perfil
router.put("/usuarios/:id", UsuarioController.update);      // Editar perfil
router.delete("/usuarios/:id", UsuarioController.remove);   // Deletar perfil

module.exports = router;
