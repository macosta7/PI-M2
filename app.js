const express = require('express');
const app = express();
const path = require('path');

// Middlewares
app.use(express.json()); // permite ler req.body em JSON
app.use(express.urlencoded({ extended: true })); // permite ler formulários

// Configuração de view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Importa as rotas
const usuarioRoutes = require('./routes/usuarios');
const salaRoutes = require('./routes/salas');
const horarioRoutes = require('./routes/horarios');
const reservaRoutes = require('./routes/reservas');
const notificacaoRoutes = require('./routes/notificacoes');

// Usa as rotas
app.use('/', usuarioRoutes); // Mantém rota raiz com a tela de login
app.use(salaRoutes);
app.use(horarioRoutes);
app.use(reservaRoutes);
app.use(notificacaoRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
