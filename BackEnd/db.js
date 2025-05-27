//const Database = require('better-sqlite3');.
const Database = require('better-sqlite3');

// Cria (ou abre) o arquivo do banco de dados
const db = new Database('database.sqlite');

// Cria a tabela 'senha' se ela ainda não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha REAL NOT NULL
  )
`).run();

module.exports = db;