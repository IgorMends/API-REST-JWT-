const db = require('../db');

exports.listar = (req, res) => {
  const usuarios = db.prepare('SELECT * FROM usuarios').all();
  res.json(usuarios);
};

exports.criar = (req, res) => {
  const { nome, senha } = req.body;
  db.prepare('INSERT INTO usuarios (nome, senha) VALUES (?, ?)').run(nome, senha);
  res.status(201).json({ mensagem: 'Usuario criado com sucesso' });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { nome, senha } = req.body;
  db.prepare('UPDATE usuarios SET nome = ?, senha = ? WHERE id = ?').run(nome, senha, id);
  res.json({ mensagem: 'Usuario atualizado' });
};

exports.deletar = (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM usuarios WHERE id = ?').run(id);
  res.json({ mensagem: 'Usuario deletado' });
};