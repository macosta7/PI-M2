CREATE TABLE usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nm_usuario TEXT NOT NULL,
  email_usuario TEXT UNIQUE NOT NULL,
  ocupacao_usuario TEXT NOT NULL CHECK (ocupacao_usuario IN ('aluno', 'professor', 'coordenador', 'recepcao')),
  senha_usuario TEXT NOT NULL
);

CREATE TABLE salas (
  id_sala SERIAL PRIMARY KEY,
  nm_sala TEXT NOT NULL
);

CREATE TABLE horarios (
  id_horario SERIAL PRIMARY KEY,
  id_sala INT REFERENCES salas(id_sala) ON DELETE CASCADE,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  dia_semana TEXT NOT NULL CHECK (dia_semana IN ('segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'))
);

CREATE TABLE reservas (
  id_reserva SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  id_sala INT REFERENCES salas(id_sala) ON DELETE CASCADE,
  data_reserva DATE NOT NULL,
  id_horario INT REFERENCES horarios(id_horario) ON DELETE CASCADE,
  status_reserva TEXT NOT NULL CHECK (status_reserva IN ('pendente', 'aprovada', 'rejeitada'))
);

CREATE TABLE notificacoes (
  id_notificacao SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  id_reserva INT REFERENCES reservas(id_reserva) ON DELETE CASCADE,
  mensagem_notificacao TEXT NOT NULL,
  visualizada_notificacao BOOLEAN DEFAULT FALSE,
  data_notificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO salas (nm_sala) VALUES
  ('R01'),
  ('R02'),
  ('R03'),
  ('R04'),
  ('R05'),
  ('R06'),
  ('R07'),
  ('R08'),
  ('R09'),
  ('R10');

DROP TABLE horarios CASCADE;

CREATE TABLE horarios (
  id_horario SERIAL PRIMARY KEY,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL
);

INSERT INTO horarios (horario_inicio, horario_fim) VALUES
  ('08:00', '09:00'),
  ('09:00', '10:00'),
  ('10:00', '11:00'),
  ('11:00', '12:00'),
  ('13:00', '14:00'),
  ('14:00', '15:00'),
  ('15:00', '16:00'),
  ('16:00', '17:00'),
  ('17:00', '18:00');




