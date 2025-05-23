const reservaService = require("../services/reservaService");

exports.renderForm = async (req, res) => {
  try {
    const salas = await reservaService.getSalasDisponiveis();
    const horarios = []; // ainda não foi feita busca

    res.render("reserva", {
      salas,
      horarios,
      salaSelecionada: null,      // ← adicionando valor padrão
      dataSelecionada: null       // ← adicionando valor padrão
    });
  } catch (e) {
    res.status(500).send("Erro ao carregar a tela de reserva.");
  }
};



exports.create = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      id_usuario: req.session.id_usuario
    };

    await reservaService.create(payload);

    res.redirect("/reserva"); // volta para o formulário após reservar
  } catch (e) {
    res.status(400).render("reserva", {
      erro: e.message,
      salas: await reservaService.getSalasDisponiveis()
    });
  }
};

exports.buscarHorariosDisponiveis = async (req, res) => {
  try {
    const { id_sala, data_reserva } = req.body;

    const salas = await reservaService.getSalasDisponiveis();
    const horarios = await reservaService.getHorariosDisponiveisParaSalaEData(id_sala, data_reserva);

    res.render("reserva", {
      salas,
      horarios,
      salaSelecionada: id_sala,
      dataSelecionada: data_reserva
    });
  } catch (e) {
    res.status(500).send("Erro ao buscar horários disponíveis.");
  }
};

