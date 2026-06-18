// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ScraperService } from './services/scraperService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota de teste inicial
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor do PreçoCerto rodando perfeitamente!' });
});

// Certifique-se de que este bloco está exatamente assim:
app.post('/api/sincronizar', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
       return res.status(400).json({ error: 'Por favor, envie uma URL no corpo da requisição.' });
    }

    const dadosProduto = await ScraperService.rasparProduto(url);
    return res.json(dadosProduto);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});