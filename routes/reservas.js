const { Router } = require("express"); // Importa o Router do express
const ReservaController = require("../controllers/ReservaController"); // Importa o controlador de reservas

const router = Router(); // Cria um roteador para gerenciar as rotas

router.get("/reservas", (req, res) => { // Rota para exibir a tela de reservas
  res.render("reservas"); // Renderiza a página de reservas
});

router.get("/reserva", ReservaController.renderForm); // Renderiza o formulário de reserva
router.post("/reserva", ReservaController.create); // Cria uma nova reserva
router.post("/reserva/disponiveis", ReservaController.buscarHorariosDisponiveis); // Busca horários disponíveis

router.get("/painel-admin", ReservaController.painelAdmin); // Renderiza o painel administrativo
router.post("/reservas/:id/aprovar", ReservaController.aprovarReserva); // Aprova uma reserva
router.post("/reservas/:id/rejeitar", ReservaController.rejeitarReserva); // Rejeita uma reserva

module.exports = router; // Exporta o roteador para ser utilizado em outros arquivos
