// backend/src/controllers/produtoControllers.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ScraperService } from '../services/scraperService';

const pool = new Pool({
  connectionString: "postgresql://postgres.jywkijnxgqtfjtosksqy:EXTWCGZKyxemK6T!@aws-1-us-west-2.pooler.supabase.com:6543/postgres"
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class ProdutoController {

  static async criar(req: Request, res: Response): Promise<any> {
    try {
      const { url, precoAlvo, usuarioId, nome, imagem } = req.body;

      if (!url || !precoAlvo || !usuarioId) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
      }

      const dadosRaspados = await ScraperService.raspar(url);

      const novoProduto = await prisma.produto.create({
        data: {
          nome: nome || dadosRaspados.nome || "Produto Sem Nome",
          url: url,
          loja: dadosRaspados.loja || "Loja Não Identificada",
          imagem: imagem || dadosRaspados.imagem,
          precoAlvo: parseFloat(precoAlvo),
          usuarioId: usuarioId,
          historico: {
            create: {
              preco: dadosRaspados.preco || 0
            }
          }
        },
        include: {
          historico: true
        }
      });

      return res.status(201).json({
        message: 'Produto cadastrado e monitorado com sucesso! 🎉',
        produto: novoProduto
      });

    } catch (error: any) {
      console.error('Erro no controller de produto:', error);
      return res.status(500).json({ error: error.message || 'Erro interno ao cadastrar produto.' });
    }
  }

  static async listar(req: Request, res: Response): Promise<any> {
    try {
      const produtos = await prisma.produto.findMany({
        include: {
          historico: {
            orderBy: {
              data: 'desc'
            }
          }
        }
      });

      return res.status(200).json(produtos);
    } catch (error: any) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar produtos.' });
    }
  }

  static async buscarSugestoes(req: Request, res: Response): Promise<any> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Informe um parâmetro de busca válido (?q=termo).' });
      }

      const resultados = await ScraperService.buscar(q);
      return res.status(200).json(resultados);
    } catch (error: any) {
      console.error('Erro no controller de busca por sugestões:', error);
      return res.status(500).json({ error: 'Erro interno ao realizar busca por raspagem.' });
    }
  }

  static async obterFeedOfertas(req: Request, res: Response): Promise<any> {
    try {
      const produtosDasLojas = [
        {
          id: "feed-sony-xm5",
          nome: "Headphone Sony WH-1000XM5 Wireless Noise Cancelling",
          url: "https://www.amazon.com.br/Headphone-Sony-WH-1000XM5-Wireless-Cancelling/dp/B09XS7JWHH",
          loja: "Amazon",
          imagem: "https://m.media-amazon.com/images/I/61+7Bc9v6GL._AC_SL1500_.jpg",
          precoAlvo: 2500.00, 
          historico: [{ preco: 2699.00, data: new Date().toISOString() }] 
        },
        {
          id: "feed-ps5-slim",
          nome: "Console PlayStation 5 Slim Edição Digital 1TB",
          url: "https://www.mercadolivre.com.br/console-playstation-5-slim-edico-digital-1tb-branco-sony/p/MLB37397750",
          loja: "Mercado Livre",
          imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_784534-MLU74737272844_022024-F.webp",
          precoAlvo: 3000.00,
          historico: [{ preco: 3150.00, data: new Date().toISOString() }]
        }
      ];

      return res.status(200).json(produtosDasLojas);
    } catch (error) {
      console.error('Erro ao gerar feed estático:', error);
      return res.status(500).json({ error: 'Erro interno ao carregar o feed.' });
    }
  }

  static async atualizarPrecosLote(req: Request, res: Response): Promise<any> {
    try {
      const produtos = await prisma.produto.findMany();
      console.log(`🤖 Iniciando varredura automatizada para ${produtos.length} produtos...`);

      for (const produto of produtos) {
        try {
          console.log(`🔍 Raspando preço atual de: ${produto.nome} (${produto.loja})`);
          const dadosRaspados = await ScraperService.raspar(produto.url);
          
          if (dadosRaspados.preco > 0) {
            await prisma.historicoPreco.create({
              data: {
                preco: dadosRaspados.preco,
                produtoId: produto.id // ⚡ É uma string UUID
              }
            });
            console.log(`✅ Preço atualizado com sucesso: R$ ${dadosRaspados.preco}`);
          }
        } catch (erroItem) {
          console.error(`❌ Erro ao atualizar o produto ${produto.nome}:`, erroItem);
        }
      }

      return res.status(200).json({ message: 'Todos os produtos foram sincronizados e atualizados no Supabase! 🚀' });
    } catch (error: any) {
      console.error('Erro global na atualização em lote:', error);
      return res.status(500).json({ error: 'Erro ao processar atualização em lote.' });
    }
  }

  static async popularBancoInicial(req: Request, res: Response): Promise<any> {
    try {
      const primeiroUsuario = await prisma.usuario.findFirst({
        select: { id: true }
      });

      if (!primeiroUsuario) {
        return res.status(400).json({ 
          error: 'Nenhum usuário encontrado no banco de dados. Cadastre um usuário no sistema antes de rodar o seed!' 
        });
      }

      const usuarioIdReal = primeiroUsuario.id;

      await prisma.historicoPreco.deleteMany({});
      await prisma.produto.deleteMany({});

      console.log("🧹 Banco de dados limpo com sucesso!");

      const produtosParaInserir = [
        {
          nome: "Console Playstation®5 Slim Digital - Pacote Astro Bot E Gran Turismo 7 - Branco",
          url: "https://www.mercadolivre.com.br/console-playstation5-slim-digital-pacote-astro-bot-e-gran-turismo-7-branco/p/MLB57081243",
          loja: "Mercado Livre",
          precoAlvo: 3500.00,
          precoAtual: 3812.99,
          imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_667226-MLA96871260244_112025-F.webp"
        },
        {
          nome: "Apple iPhone 15 (128 GB) - Azul",
          url: "https://www.mercadolivre.com.br/apple-iphone-15-128-gb-azul-distribuidor-autorizado/p/MLB1027172667",
          loja: "Mercado Livre",
          precoAlvo: 3800.00,
          precoAtual: 3998.86,
          imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_831434-MLA96401363339_102025-F.webp"
        }
      ];

      for (const p of produtosParaInserir) {
        await prisma.produto.create({
          data: {
            nome: p.nome,
            url: p.url,
            loja: p.loja,
            imagem: p.imagem,
            precoAlvo: p.precoAlvo,
            usuarioId: usuarioIdReal,
            historico: {
              create: {
                preco: p.precoAtual
              }
            }
          }
        });
      }

      return res.status(201).json({ message: "Banco de dados populado com produtos reais com sucesso! 🎉" });
    } catch (error: any) {
      console.error("Erro ao popular banco:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // ⚡ CORREÇÃO: Removido o 'Number(id)' pois o seu ID no banco é uma String (UUID)
  static async atualizar(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { nome, url, imagem, precoAlvo } = req.body;

      const produtoAtualizado = await prisma.produto.update({
        //  SOLUÇÃO: String(id) garante ao TypeScript que isso é um texto único
        where: { id: String(id) }, 
        data: {
          nome: nome,
          url: url,
          imagem: imagem,
          precoAlvo: precoAlvo ? parseFloat(precoAlvo) : undefined
        }
      });

      return res.status(200).json({ message: "Produto atualizado com sucesso!", produto: produtoAtualizado });
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar produto.' });
    }
  }

  /**
   * ROTA: DELETE /api/produtos/:id
   */
  static async excluir(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      await prisma.historicoPreco.deleteMany({
        //  SOLUÇÃO: String(id) garante ao TypeScript que isso é um texto único
        where: { produtoId: String(id) } 
      });

      await prisma.produto.delete({
        //  SOLUÇÃO: String(id) garante ao TypeScript que isso é um texto único
        where: { id: String(id) } 
      });

      return res.status(200).json({ message: "Produto excluído permanentemente!" });
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error);
      return res.status(500).json({ error: 'Erro interno ao excluir produto.' });
    }
  }
}