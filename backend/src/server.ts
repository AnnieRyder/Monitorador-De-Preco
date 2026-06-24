// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron'; // 👈 Importa o agendador de tarefas
import { ScraperService } from './services/scraperService';
import produtoRoutes from './routes/produtoRoutes';
import { ProdutoController } from './controllers/produtoControllers'; // 👈 Importa o controller para rodar o lote

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Configurações e Middlewares (Sempre no topo)
app.use(cors());
app.use(express.json());

// 2. Rotas Globais e de Teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor do PreçoCerto rodando perfeitamente!' });
});

app.post('/api/sincronizar', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
       return res.status(400).json({ error: 'Por favor, envie uma URL no corpo da requisição.' });
    }
    const dadosProduto = await ScraperService.raspar(url);
    return res.json(dadosProduto);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Vinculação das rotas do arquivo de rotas (DEVE vir antes do listen!)
app.use('/api', produtoRoutes);

// 4. Inicialização do Servidor (Sempre a ÚLTIMA coisa do arquivo)
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando redondinho na porta ${PORT}`);

  // ===================================================
  // 🤖 CONFIGURAÇÃO DO ROBÔ AUTOMÁTICO (CRON JOB)
  // ===================================================
  
  // Executa a primeira varredura assim que você salva o código ou inicia o servidor
  console.log('🤖 Inicialização: Executando primeira varredura automática nos produtos...');
  executarSincronizacaoSilenciosa();

  // Agenda para repetir de 30 em 30 minutos enquanto o servidor estiver ligado
  cron.schedule('*/30 * * * *', async () => {
    console.log('⏰ Cron Job: Iniciando atualização periódica agendada...');
    await executarSincronizacaoSilenciosa();
  });
});

// Função auxiliar que dispara a lógica do Puppeteer sem precisar de requisições de rotas HTTP externas
async function executarSincronizacaoSilenciosa() {
  try {
    // 1. Gera um atraso aleatório entre 1 e 5 minutos (em milissegundos)
    // Isso evita que o robô dispare sempre no minuto 0 ou 30 cravado
    const tempoEspera = Math.floor(Math.random() * (5 * 60 * 1000));
    
    console.log(`⏳ Robô: Aguardando ${Math.floor(tempoEspera / 1000)} segundos para evitar bloqueios...`);
    
    // Aguarda o tempo calculado antes de prosseguir
    await new Promise(resolve => setTimeout(resolve, tempoEspera));

    const mockReq = {} as any;
    const mockRes = {
      status: () => ({ json: () => {} }) 
    } as any;

    console.log('🤖 Robô: Iniciando atualização em lote...');
    await ProdutoController.atualizarPrecosLote(mockReq, mockRes);
    console.log('✅ Robô: Sincronização em lote concluída com sucesso no Supabase!');
    
  } catch (error) {
    console.error('❌ Robô: Ocorreu uma falha na execução agendada:', error);
  }
}