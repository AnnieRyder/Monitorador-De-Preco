// backend/src/routes/produtoRoutes.ts
import { Router } from 'express';
import { ProdutoController } from '../controllers/produtoControllers';

const router = Router();

router.post('/produtos', ProdutoController.criar);
router.get('/produtos', ProdutoController.listar);
router.get('/produtos/feed', ProdutoController.obterFeedOfertas);
router.get('/scrapers/busca', ProdutoController.buscarSugestoes);
router.get('/produtos/sincronizar-todos', ProdutoController.atualizarPrecosLote);
router.get('/produtos/seed-inicial', ProdutoController.popularBancoInicial);

router.put('/produtos/:id', ProdutoController.atualizar);
router.delete('/produtos/:id', ProdutoController.excluir);

// NOVA ROTA DE BUSCA REALTIME:
router.get('/scrapers/busca', ProdutoController.buscarSugestoes);

export default router;