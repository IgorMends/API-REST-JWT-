const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/usuarioRoutes');
const { verificarToken } = require('./middlewares/authMiddleware');
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100,
  message: { mensagem: 'Muitas requisições, tente novamente mais tarde.' },
});

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(globalLimiter);

// Rotas públicas
app.use('/login', authRoutes);

// Rotas protegidas
app.use('/produtos', verificarToken, produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});