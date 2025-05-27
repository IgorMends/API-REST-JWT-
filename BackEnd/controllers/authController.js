require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = (req, res) => {
  const { usuario, senha } = req.body;

  // Exemplo simples — em produção use banco de dados e senhas criptografadas!
  if (usuario === 'admin' && senha === '1234') {
    const token = jwt.sign({ usuario }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ mensagem: 'Credenciais inválidas' });
};