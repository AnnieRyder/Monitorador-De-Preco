// frontend/src/components/Layout/Pages/Produtos.tsx
import { useState, useEffect } from 'react';
import { 
  FiSearch, FiSliders, FiBarChart2, FiDownload, FiPlus, 
  FiGrid, FiList, FiBell, FiHeart, FiMoreVertical, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';
import { CardMeusProdutos } from '../Card/CardMeusProdutos';

export const Produtos = () => {
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [termoBuscaWeb, setTermoBuscaWeb] = useState("");
  const [abaAtivaWeb, setAbaAtivaWeb] = useState("todos");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Seus dados mockados originais do mobile e do ecossistema de design
  const mockProdutos = [
    { id: 1, nome: "Headphone Sony WH-1000XM5", loja: "Amazon", precoAntigo: "R$ 3.299,00", precoAtual: "R$ 2.299,00", desconto: "-30%", metaPreco: "R$ 3.499,00", statusPreco: "Menor preço hoje", favoritado: true },
    { id: 2, nome: "Air Fryer Philips Walita Série 3000", loja: "Magazine Luiza", precoAntigo: "R$ 449,90", precoAtual: "R$ 449,90", desconto: "-25%", metaPreco: "R$ 599,90", statusPreco: "Menor preço ontem", favoritado: false },
    { id: 3, nome: "Smartwatch Xiaomi Redmi Watch 3", loja: "Mercado Livre", precoAntigo: "R$ 259,90", precoAtual: "R$ 259,90", desconto: "-18%", metaPreco: "R$ 299,90", statusPreco: "Menor preço há 2 dias", favoritado: false }
  ];

  // Dados adicionais mockados para preencher o grid de 8 itens da imagem image_d2b538.jpg
  const mockProdutosWebAdicionais = [
    { id: 4, nome: "Kindle 11ª Geração", loja: "Amazon", precoAntigo: "R$ 899,00", precoAtual: "R$ 719,00", desconto: "↓ 20%", tempo: "Há 1 dia" },
    { id: 5, nome: "Smart TV LG 55\" OLED C3", loja: "Magalu", precoAntigo: "R$ 4.999,00", precoAtual: "R$ 4.299,00", desconto: "↓ 14%", tempo: "Há 1 dia" },
    { id: 6, nome: "PlayStation 5", loja: "Amazon", precoAntigo: "R$ 2.999,00", precoAtual: "R$ 2.749,00", desconto: "↓ 8%", tempo: "Há 2 dias" },
    { id: 7, nome: "Tênis Nike Air Max Excee", loja: "Centauro", precoAntigo: "R$ 699,99", precoAtual: "R$ 594,99", desconto: "↓ 15%", tempo: "Há 2 dias" },
    { id: 8, nome: "Perfume Bleu de Chanel", loja: "Sephora", precoAntigo: "R$ 599,00", precoAtual: "R$ 519,00", desconto: "↓ 13%", tempo: "Há 3 dias" }
  ];

  const categoriasWeb = ["Todas as categorias", "Eletrônicos", "Eletrodomésticos", "Moda"];
  const lojasWeb = ["Todas as lojas", "Amazon", "Magazine Luiza", "Mercado Livre", "Shopee"];

  // Renderizador dos cards específicos do Grid Web (Fiel ao mockup image_d2b538.jpg)
  const renderCardProdutoWeb = (p: any, idx: number) => {
    return (
      <div key={p.id} style={{ 
        backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9',
        padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#f8fafc', borderRadius: '12px', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.nome}
            </h4>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginTop: '4px', display: 'inline-block' }}>
              {p.loja}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '12px' }}>
          <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 6px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
            {p.desconto.includes('↓') ? p.desconto : `↓ ${p.desconto.replace('-', '')}`}
          </span>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>
            {p.precoAntigo}
          </p>
          <p style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: '800', color: '#16a34a' }}>
            {p.precoAtual}
          </p>
          <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: '600', marginTop: '2px' }}>
            Menor preço hoje
          </span>
        </div>

        {/* Linha do Histórico de Preços SVG */}
        <div style={{ height: '30px', width: '100%', marginTop: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
          <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path 
              d="M 0 25 Q 40 10 80 20 T 160 15 T 240 5" 
              fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" 
            />
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
            {p.tempo || (idx === 0 ? '2 horas' : idx === 1 ? '5 horas' : '1 dia')}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}><FiBell size={16} /></button>
            <button style={{ background: 'none', border: 'none', color: p.favoritado ? '#6366f1' : '#64748b', cursor: 'pointer', padding: '4px' }}><FiHeart size={16} fill={p.favoritado ? '#6366f1' : 'none'} /></button>
            <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}><FiMoreVertical size={16} /></button>
          </div>
        </div>
      </div>
    );
  };

  // ===================================================
  // 📱 VERSÃO MOBILE ORIGINAL (TOTALMENTE INTACTA)
  // ===================================================
  if (isMobile) {
    return (
      <div style={{ padding: '24px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box' }}>
        
        {/* Topo: Título e Ícones */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Meus Produtos</h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>12 produtos monitorados</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#334155', marginTop: '4px' }}>
            <FiSearch size={22} style={{ cursor: 'pointer' }} />
            <FiSliders size={22} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Tabs / Segmented Control */}
        <div style={{ 
          display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '14px', marginBottom: '24px' 
        }}>
          {[
            { id: 'Todos', label: 'Todos (12)' },
            { id: 'Queda', label: '↓ Com queda (5)' },
            { id: 'SemAlteracao', label: 'Sem alteração (7)' }
          ].map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              style={{
                flex: 1, padding: '10px 4px', border: 'none', borderRadius: '10px', fontSize: '12px',
                backgroundColor: abaAtiva === aba.id ? '#1e293b' : 'transparent',
                color: abaAtiva === aba.id ? '#fff' : '#64748b',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {aba.label}
            </button>
          ))}
        </div>

        {/* Sub-Header da Lista: Ordenação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Meus produtos</span>
          <div style={{ fontSize: '12px', color: '#64748b', cursor: 'pointer' }}>
            Ordenar <span style={{ fontWeight: '700', color: '#1e293b' }}>Mais recentes ∨</span>
          </div>
        </div>

        {/* Mapeamento da Lista usando o componente novo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {mockProdutos.map((produto) => (
            <CardMeusProdutos key={produto.id} {...produto} />
          ))}
        </div>

        {/* Banner de Dica Inferior */}
        <div style={{
          display: 'flex', alignItems: 'center', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
          borderRadius: '16px', padding: '16px', marginTop: '20px'
        }}>
          <div style={{ 
            backgroundColor: '#dbeafe', color: '#1e40af', padding: '10px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '14px'
          }}>
            <FiBarChart2 size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1e3a8a' }}>Dica: Defina metas de preço</h5>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#60a5fa', lineHeight: '1.4' }}>
              Você será avisado quando o preço atingir ou ficar abaixo da sua meta.
            </p>
          </div>
          <button style={{
            backgroundColor: 'transparent', border: '1px solid #bfdbfe', color: '#2563eb',
            padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer'
          }}>
            Definir metas
          </button>
        </div>

      </div>
    );
  }

  // ===================================================
  // 💻 VERSÃO DESKTOP NOVO GRID (image_d2b538.jpg)
  // ===================================================
  const todosProdutosWeb = [...mockProdutos, ...mockProdutosWebAdicionais];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* TÍTULO E BOTÕES WEB */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>Produtos</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Acompanhe e compare os preços dos produtos que você monitora.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#334155', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            <FiDownload size={16} /> Exportar
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#6366f1', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
            <FiPlus size={16} /> Adicionar produto
          </button>
        </div>
      </div>

      {/* ABAS WEB (TABS COMPACTAS) */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { id: 'todos', label: 'Todos os produtos' },
          { id: 'monitorando', label: 'Monitorando' },
          { id: 'favoritos', label: 'Favoritos' },
          { id: 'finalizados', label: 'Finalizados' }
        ].map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtivaWeb(aba.id)}
            style={{
              padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', border: 'none',
              backgroundColor: abaAtivaWeb === aba.id ? '#f0f3ff' : 'transparent',
              color: abaAtivaWeb === aba.id ? '#6366f1' : '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            {aba.label}
          </button>
        ))}
      </div>

      {/* FILTROS E INPUTS WEB */}
      <div style={{ 
        backgroundColor: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9',
        display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px'
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '260px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" placeholder="Buscar nos meus produtos..." value={termoBuscaWeb} onChange={(e) => setTermoBuscaWeb(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px 10px 40px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <select style={{ padding: '10px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#334155', fontWeight: '500', outline: 'none' }}>
          {categoriasWeb.map((c, i) => <option key={i}>{c}</option>)}
        </select>
        
        <select style={{ padding: '10px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#334155', fontWeight: '500', outline: 'none' }}>
          {lojasWeb.map((l, i) => <option key={i}>{l}</option>)}
        </select>

        <select style={{ padding: '10px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#334155', fontWeight: '500', outline: 'none', flex: 1, maxWidth: '200px' }}>
          <option>Ordenar: Mais recentes</option>
          <option>Ordenar: Maior desconto</option>
          <option>Ordenar: Menor preço</option>
        </select>

        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#334155', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          <FiSliders size={14} /> Filtros
        </button>

        <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px', marginLeft: 'auto' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: '8px', backgroundColor: '#fff', color: '#6366f1', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
            <FiGrid size={14} /> Grade
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: '8px', backgroundColor: 'transparent', color: '#64748b', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
            <FiList size={14} /> Lista
          </button>
        </div>
      </div>

      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
        32 produtos encontrados
      </p>

      {/* GRID DE PRODUTOS WEB */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {todosProdutosWeb.map((produto, idx) => renderCardProdutoWeb(produto, idx))}
      </div>

      {/* PAGINAÇÃO WEB */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '32px' }}>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#64748b', cursor: 'pointer' }}><FiChevronLeft size={18} /></button>
        <button style={{ width: '36px', height: '36px', backgroundColor: '#f0f3ff', border: 'none', borderRadius: '10px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>1</button>
        <button style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>2</button>
        <button style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>3</button>
        <span style={{ color: '#94a3b8', padding: '0 4px' }}>...</span>
        <button style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>6</button>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#64748b', cursor: 'pointer' }}><FiChevronRight size={18} /></button>
      </div>

    </div>
  );
};