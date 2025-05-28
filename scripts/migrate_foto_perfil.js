const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const runMigration = async () => {
  const filePath = path.join(__dirname, 'add_foto_perfil.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    await pool.query(sql);
    console.log('Migração executada com sucesso! Coluna foto_perfil adicionada.');
  } catch (err) {
    console.error('Erro ao executar a migração:', err);
  } finally {
    await pool.end();
  }
};

runMigration();
