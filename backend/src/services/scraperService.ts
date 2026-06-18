// backend/src/services/scraperService.ts

interface DadosProdutoRaspado {
  nome: string;
  precoAtual: number;
  loja: string;
  imagem: string;
}

export class ScraperService {
  /**
   * Simula ou raspa o produto de forma inteligente para evitar bloqueios no desenvolvimento
   */
  static async rasparProduto(url: string): Promise<DadosProdutoRaspado> {
    // Simulando um delay sutil de rede real (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const urlMinuscula = url.toLowerCase();

    // 1. Tratamento simulado se for um link de PlayStation 5
    if (urlMinuscula.includes('playstation') || urlMinuscula.includes('ps5')) {
      return {
        nome: "Console PlayStation 5 Slim Edição Digital 1TB Branco - Sony",
        precoAtual: 3499.00,
        loja: urlMinuscula.includes('amazon') ? 'Amazon' : 'Mercado Livre',
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_704052-MLA74659972352_022024-F.webkit"
      };
    }

    // 2. Tratamento simulado se for um link de Headphone Sony
    if (urlMinuscula.includes('wh-1000xm5') || urlMinuscula.includes('headphone')) {
      return {
        nome: "Headphone Sony Wireless Noise Cancelling WH-1000XM5 Preto",
        precoAtual: 2299.00,
        loja: urlMinuscula.includes('amazon') ? 'Amazon' : 'Mercado Livre',
        imagem: "https://m.media-amazon.com/images/I/61NffgVw9FL._AC_SX679_.jpg"
      };
    }

    // 3. Fallback genérico inteligente para qualquer outro link enviado
    const extrairNomePelaUrl = url.split('/')[3]?.replace(/-/g, ' ') || 'Produto Monitorado';
    const nomeFormatado = extrairNomePelaUrl.charAt(0).toUpperCase() + extrairNomePelaUrl.slice(1);

    return {
      nome: nomeFormatado.length > 20 ? nomeFormatado.substring(0, 50) + "..." : "Produto Especial",
      precoAtual: Math.floor(Math.random() * (1200 - 150 + 1)) + 150, // Preço randômico entre R$150 e R$1200
      loja: urlMinuscula.includes('amazon') ? 'Amazon' : 'Mercado Livre',
      imagem: ""
    };
  }
}