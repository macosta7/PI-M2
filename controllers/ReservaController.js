const reservaService = require("../services/reservaService"); // Importa o serviço de reserva

exports.renderForm = async (req, res) => { // Função para renderizar o formulário de reserva
  try {
    const salas = await reservaService.getSalasDisponiveis(); // Chama o serviço para obter as salas disponíveis
    res.render("reserva", { // Renderiza a página de reserva com as salas disponíveis
      salas,
      salaSelecionada: null,
      dataSelecionada: null,
      horarios: undefined,
      erro: null
    });
  } catch (e) {
    res.status(500).send("Erro ao carregar a tela de reserva."); // Envia uma resposta de erro ao cliente
  }
};

exports.create = async (req, res) => { // Função para criar uma nova reserva
  try {
    const payload = { // Cria o payload com os dados da reserva
      ...req.body,
      id_usuario: req.session.id_usuario
    };

    await reservaService.create(payload); // Chama o serviço para criar a reserva

    res.redirect("/reserva"); // Redireciona para a página de reserva após criar a reserva
  } catch (e) {
    const salas = await reservaService.getSalasDisponiveis(); // Chama o serviço para obter as salas disponíveis

    res.status(400).render("reserva", { // Renderiza a página de reserva com os dados obtidos
      salas,
      salaSelecionada: req.body.id_sala,
      dataSelecionada: req.body.data_reserva,
      horarios: await reservaService.getHorariosDisponiveisParaSalaEData(req.body.id_sala, req.body.data_reserva),
      erro: e.message
    });
  }
};

exports.buscarHorariosDisponiveis = async (req, res) => { // Função para buscar horários disponíveis
  try {
    const { id_sala, data_reserva } = req.body; // Obtém os dados do corpo da requisição

    const salas = await reservaService.getSalasDisponiveis(); // Chama o serviço para obter as salas disponíveis
    const horarios = await reservaService.getHorariosDisponiveisParaSalaEData(id_sala, data_reserva); // Chama o serviço para obter os horários disponíveis

    res.render("reserva", { // Renderiza a página de reserva com os dados obtidos
      salas,
      horarios,
      salaSelecionada: id_sala,
      dataSelecionada: data_reserva
    });
  } catch (e) {
    res.status(500).send("Erro ao buscar horários disponíveis."); // Envia uma resposta de erro ao cliente
  }
};

exports.painelAdmin = async (req, res) => { // Função para renderizar o painel administrativo
  const id = req.session.id_usuario; // Obtém o ID do usuário da sessão
  const ocupacao = req.session.ocupacao_usuario; // Obtém a ocupação do usuário da sessão

  if (!id || ocupacao !== "recepcao") {
    return res.redirect("/login"); // Redireciona para a página de login se o ID do usuário não estiver na sessão ou se a ocupação não for recepção
  }

  try {
    const reservas = await reservaService.listarPendentes(); // Chama o serviço para listar reservas pendentes
    res.render("painelAdmin", { reservas }); // Renderiza a página do painel administrativo com as reservas pendentes
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao carregar o painel da recepção."); // Envia uma resposta de erro ao cliente
  }
};

exports.aprovarReserva = async (req, res) => { // Função para aprovar uma reserva
  try {
    await reservaService.atualizarStatus(req.params.id, "aprovada"); // Chama o serviço para atualizar o status da reserva para aprovada
    res.redirect("/painel-admin"); // Redireciona para o painel administrativo após aprovar a reserva
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao aprovar reserva."); // Envia uma resposta de erro ao cliente
  }
};

exports.rejeitarReserva = async (req, res) => { // Função para rejeitar uma reserva
  try {
    await reservaService.atualizarStatus(req.params.id, "rejeitada"); // Chama o serviço para atualizar o status da reserva para rejeitada
    res.redirect("/painel-admin"); // Redireciona para o painel administrativo após rejeitar a reserva
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao rejeitar reserva."); // Envia uma resposta de erro ao cliente
  }
};

