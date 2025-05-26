require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require("express-session");
const db = require('./config/db');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Configuração de view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configuração de sessão ANTES das rotas
app.use(session({
  secret: 'checkin-room-seguro',
  resave: false,
  saveUninitialized: false
}));

// Conexão com o banco de dados
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Rotas
    const userRoutes = require('./routes/usuarios');
    const reservaRoutes = require('./routes/reservas');
    const notificacaoRoutes = require('./routes/notificacoes');

    app.use('/', userRoutes);
    app.use('/', reservaRoutes);
    app.use('/', notificacaoRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    // Inicializa o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escutando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
