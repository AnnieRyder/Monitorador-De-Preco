// backend/src/services/scraperService.ts
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import path from 'path';

puppeteer.use(StealthPlugin());

export interface DadosProdutoRaspado {
  nome: string;
  preco: number;
  loja: string;
  imagem?: string;
  precoOriginal?: number;
}

export interface SugestaoProdutoBusca {
  nome: string;
  url: string;
  loja: string;
  imagem: string | null;
  precoAtual: number;
}

export class ScraperService {
  
  static async raspar(url: string): Promise<DadosProdutoRaspado> {
    const urlLower = url.toLowerCase();
    let loja = 'Desconhecida';

    if (urlLower.includes('amazon')) loja = 'Amazon';
    else if (urlLower.includes('mercadolivre') || urlLower.includes('mlb')) loja = 'Mercado Livre';
    else if (urlLower.includes('magazineluiza') || urlLower.includes('magalu')) loja = 'Magalu';
    else if (urlLower.includes('kabum')) loja = 'Kabum';
    else if (urlLower.includes('shopee')) loja = 'Shopee'; 

    // ⚡ MODO HEADLESS SILENCIOSO: Roda escondido em segundo plano com argumentos de camuflagem
    const browser = await puppeteer.launch({
      headless: true, 
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--window-size=1366,768'
      ]
    });

    try {
      const page = await browser.newPage();
      
      // ⚡ BYPASS DEFINITIVO: Remove a flag que aponta o uso de ferramentas de automação
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      });

      // Definição de User-Agent e Viewport idênticos a uma navegação humana comum
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1366, height: 768 });

      // 🍪 INJEÇÃO MÁGICA DE COOKIES: Carrega as sessões geradas a partir da raiz do backend
      let caminhoCookie = '';
      if (loja === 'Mercado Livre') caminhoCookie = path.join(process.cwd(), 'cookies-ml.json');
      if (loja === 'Kabum') caminhoCookie = path.join(process.cwd(), 'cookies-kabum.json');
      if (loja === 'Magalu') caminhoCookie = path.join(process.cwd(), 'cookies-magalu.json');

      if (caminhoCookie && fs.existsSync(caminhoCookie)) {
        try {
          const cookiesInstancia = JSON.parse(fs.readFileSync(caminhoCookie, 'utf8'));
          await page.setCookie(...cookiesInstancia);
          console.log(`🍪 Cookies aplicados com sucesso para: ${loja}`);
        } catch (cookieError) {
          console.warn(`⚠️ Falha ao carregar cookies para ${loja}:`, cookieError);
        }
      }

      console.log(`🔍 Robô analisando: ${loja}...`);
      
      // Carrega o DOM básico de forma rápida para coletar a informação antes das travas JavaScript rodarem
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });

      // Pausa curta e natural para simular o tempo de leitura de tela e garantir a injeção do HTML
      await new Promise(r => setTimeout(r, 4000));

      let dados: DadosProdutoRaspado = { nome: '', preco: 0, loja };

      if (loja === 'Mercado Livre') {
        dados = await page.evaluate((): any => {
          const doc = (globalThis as any).document;
          
          // 1. Tenta buscar direto na tag de preço estruturado
          const metaPrice = doc.querySelector('meta[itemprop="price"]')?.getAttribute('content');
          let preco = metaPrice ? parseFloat(metaPrice) : 0;

          // 2. Se a tag meta falhar, tenta varrer seletores de texto alternativos do ML
          if (preco === 0) {
            const elementoPreco = doc.querySelector('.andes-money-amount__fraction');
            const elementoCentavos = doc.querySelector('.andes-money-amount__cents');
            if (elementoPreco) {
              let texto = elementoPreco.textContent.replace(/\./g, '');
              if (elementoCentavos) texto += `.${elementoCentavos.textContent}`;
              preco = parseFloat(texto) || 0;
            }
          }

          const nome = doc.querySelector('h1.ui-pdp-title')?.textContent?.trim() || 'Produto Sem Nome';
          const imagem = doc.querySelector('.ui-pdp-gallery__figure__image')?.getAttribute('src') || undefined;

          return { nome, preco, loja: 'Mercado Livre', imagem };
        });
      } 
      else if (loja === 'Kabum') {
        dados = await page.evaluate((): any => {
          const doc = (globalThis as any).document;
          const nome = doc.querySelector('h1')?.textContent?.trim() || 'Produto Sem Nome';
          
          // Seletor inteligente focado na classe fixa e em propriedades semânticas do HTML
          const precoEl = doc.querySelector('.finalPrice') || doc.querySelector('[class*="price-finaling"]') || doc.querySelector('[itemprop="price"]');
          let precoTexto = precoEl ? precoEl.textContent || precoEl.getAttribute('content') || '0' : '0';
          
          const preco = parseFloat(precoTexto.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')) || 0;
          return { nome, preco, loja: 'Kabum' };
        });
      }
      else if (loja === 'Amazon') {
        dados = await page.evaluate((): any => {
          const doc = (globalThis as any).document;
          const nome = doc.getElementById('productTitle')?.textContent?.trim() || 'Produto Sem Nome';
          const precoEl = doc.querySelector('.a-price .a-offscreen')?.textContent;
          const precoOriginalEl = doc.querySelector('.a-text-price .a-offscreen')?.textContent;

          const preco = precoEl ? parseFloat(precoEl.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')) : 0;
          const precoOriginal = precoOriginalEl ? parseFloat(precoOriginalEl.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')) : undefined;

          return { nome, preco, loja: 'Amazon', precoOriginal };
        });
      }
      else if (loja === 'Magalu') {
        dados = await page.evaluate((): any => {
          const doc = (globalThis as any).document;
          const nome = doc.querySelector('h1[data-testid="heading-product-title"]')?.textContent?.trim() || 'Produto Sem Nome';
          const precoEl = doc.querySelector('[data-testid="price-value"]')?.textContent || '0';
          const preco = parseFloat(precoEl.replace('R$', '').replace(/\s/g, '').replace('.', '').replace(',', '.')) || 0;
          return { nome, preco, loja: 'Magalu', precoOriginal: undefined };
        });
      }
      else if (loja === 'Shopee') {
        dados = { nome: 'Produto na Shopee (Requer verificação)', preco: 0, loja: 'Shopee' };
      }
      else {
        throw new Error('Loja não suportada!');
      }

      console.log(`✅ Resultado raspado: ${dados.nome} - R$ ${dados.preco}`);
      return dados;
    } catch (error: any) {
      console.error(`Erro ao raspar a URL: ${url}`, error);
      throw new Error(`Falha na raspagem em tempo real: ${error.message}`);
    } finally {
      // Garante o fechamento da instância para não estourar o consumo de RAM do sistema
      await browser.close();
    }
  }

  static async buscar(termo: string): Promise<SugestaoProdutoBusca[]> {
    return new Promise((resolve) => {
      const urlApi = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(termo)}`;
      const https = require('https');

      https.get(urlApi, (res: any) => {
        let dadosBrutos = '';
        res.on('data', (chunk: any) => dadosBrutos += chunk);
        res.on('end', () => {
          try {
            const dados = JSON.parse(dadosBrutos);
            if (!dados.results || !Array.isArray(dados.results)) return resolve([]);
            const mapeado = dados.results.slice(0, 10).map((item: any) => ({
              nome: item.title || 'Produto sem título',
              url: item.permalink || '',
              loja: 'Mercado Livre',
              imagem: item.thumbnail ? item.thumbnail.replace('-I.jpg', '-O.jpg') : null,
              precoAtual: parseFloat(item.price) || 0
            }));
            resolve(mapeado);
          } catch (e) { resolve([]); }
        });
      }).on('error', () => resolve([]));
    });
  }
}