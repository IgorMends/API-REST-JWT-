const jwt = require('jsonwebtoken');
const db = require('../db'); // Certifique-se que o caminho está correto
const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN
exports.login = (req, res) => {
  const { usuario, senha } = req.body;

  const user = db
    .prepare("SELECT * FROM usuarios WHERE nome = ? AND senha = ?")
    .get(usuario, senha);

  if (user) {
    const token = jwt.sign({ usuario }, JWT_SECRET, { expiresIn: '1m' });
    return res.json({ token });
  }

  res.status(401).json({ mensagem: 'Credenciais inválidas' });
};


exports.registrar = (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios' });
  }

  const existente = db.prepare("SELECT * FROM usuarios WHERE nome = ?").get(usuario);
  if (existente) {
    return res.status(409).json({ mensagem: 'Usuário já existe' });
  }

  db.prepare("INSERT INTO usuarios (nome, senha) VALUES (?, ?)").run(usuario, senha);

  res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
};