const { Router } = require("express");
const ReservaController = require("../controllers/ReservaController");

const router = Router();

router.get("/reservas", (req, res) => {
  res.render("reservas"); // ou 'cadastro', se preferir como tela inicial
});

router.get("/reserva", ReservaController.renderForm); // Exibe o formulário
router.post("/reserva", ReservaController.create);    // Cria a reserva
router.post("/reserva/disponiveis", ReservaController.buscarHorariosDisponiveis);

router.get("/painel-admin", ReservaController.painelAdmin);
router.post("/reservas/:id/aprovar", ReservaController.aprovarReserva);
router.post("/reservas/:id/rejeitar", ReservaController.rejeitarReserva);

module.exports = router;
