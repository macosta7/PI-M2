const reservaService = require("../services/reservaService");

exports.renderForm = async (req, res) => {
  try {
    const salas = await reservaService.getSalasDisponiveis();
    res.render("reserva", {
      salas,
      salaSelecionada: null,     // 👈 adiciona aqui
      dataSelecionada: null,     // 👈 adiciona aqui
      horarios: undefined,       // 👈 garante que o bloco "se horários" não quebre
      erro: null
    });
  } catch (e) {
    res.status(500).send("Erro ao carregar a tela de reserva.");
  }
};

exports.create = async (req, res) => {
  console.log("➡️ Entrou no controller create");
  console.log("📦 Dados recebidos:", req.body);
  console.log("🧑 ID da sessão:", req.session.id_usuario);

  try {
    const payload = {
      ...req.body,
      id_usuario: req.session.id_usuario
    };

    await reservaService.create(payload);

    res.redirect("/reserva"); // volta para o formulário após reservar
  } catch (e) {
    const salas = await reservaService.getSalasDisponiveis();

    res.status(400).render("reserva", {
      salas,
      salaSelecionada: req.body.id_sala,
      dataSelecionada: req.body.data_reserva,
      horarios: await reservaService.getHorariosDisponiveisParaSalaEData(req.body.id_sala, req.body.data_reserva),
      erro: e.message
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

exports.painelAdmin = async (req, res) => {
  const id = req.session.id_usuario;
  const ocupacao = req.session.ocupacao_usuario;

  if (!id || ocupacao !== "recepcao") {
    return res.redirect("/login");
  }

  try {
    const reservas = await reservaService.listarPendentes();
    res.render("painelAdmin", { reservas });
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao carregar o painel da recepção.");
  }
};

exports.aprovarReserva = async (req, res) => {
  try {
    await reservaService.atualizarStatus(req.params.id, "aprovada");
    res.redirect("/painel-admin");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao aprovar reserva.");
  }
};

exports.rejeitarReserva = async (req, res) => {
  try {
    await reservaService.atualizarStatus(req.params.id, "rejeitada");
    res.redirect("/painel-admin");
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao rejeitar reserva.");
  }
};

