// frontend/src/components/Layout/Pages/Lojas.tsx
import { 
  FiSearch, 
  FiSliders, 
  FiTag, 
  FiAward, 
  FiPercent, 
  FiShield, 
  FiStar, 
  FiChevronRight,
  FiTv,
  FiCpu,
  FiHome,
  FiHeart,
  FiWatch
} from 'react-icons/fi';

export const Lojas = () => {
  const resumoDados = [
    { valor: '28', label: 'Lojas cadastradas', icon: <FiTag size={18} color="#a855f7" /> },
    { valor: '125', label: 'Cupons ativos', icon: <FiAward size={18} color="#22c55e" /> },
    { valor: 'Até 50%', label: 'Descontos disponíveis', icon: <FiPercent size={18} color="#f97316" /> },
    { valor: '100%', label: 'Lojas confiáveis', icon: <FiShield size={18} color="#2563eb" /> },
  ];

  const lojasDestaque = [
    { nome: 'Amazon', desc: 'Tudo para você, de A a Z.', descSub: 'Frete grátis acima de R$ 149', desconto: 'Até 40% OFF', nota: '4,8', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'Magazine Luiza', desc: 'Tecnologia, móveis e muito mais.', descSub: 'Retire na loja', desconto: 'Até 30% OFF', nota: '4,7', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'Mercado Livre', desc: 'Milhões de produtos com ótimos preços.', descSub: 'Envio rápido', desconto: 'Até 25% OFF', nota: '4,6', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'KaBuM!', desc: 'Especialista em tecnologia e games.', descSub: 'Montagem de PC', desconto: 'Até 35% OFF', nota: '4,8', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'Shopee', desc: 'Ofertas incríveis todos os dias.', descSub: 'Cashback disponível', desconto: 'Até 50% OFF', nota: '4,6', tag: 'Popular', tagColor: '#ef4444' },
  ];

  const categoriasBuscadas = [
    { label: 'Eletrônicos', icon: <FiTv size={16} color="#a855f7" /> },
    { label: 'Informática', icon: <FiCpu size={16} color="#2563eb" /> },
    { label: 'Casa', icon: <FiHome size={16} color="#22c55e" /> },
    { label: 'Beleza', icon: <FiHeart size={16} color="#ec4899" /> },
    { label: 'Moda', icon: <FiWatch size={16} color="#f97316" /> },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '120px' }}>
      
      {/* 1. HEADER */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Lojas</h1>
        <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Compare preços entre as melhores lojas</p>
      </div>

      {/* 2. BARRA DE BUSCA E FILTRO */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <FiSearch size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            placeholder="Buscar lojas"
            style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px 12px 45px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
          <FiSliders size={16} /> Filtros
        </button>
      </div>

      {/* 3. CARDS DE RESUMO (Grid de Métricas 4 Colunas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '28px' }}>
        {resumoDados.map((dado, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', padding: '12px 6px', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
              {dado.icon}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{dado.valor}</span>
            <span style={{ fontSize: '9px', color: '#64748b', fontWeight: '500', marginTop: '2px', lineHeight: '1.2' }}>{dado.label}</span>
          </div>
        ))}
      </div>

      {/* 4. SEÇÃO: LOJAS EM DESTAQUE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Lojas em destaque</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#2563eb', cursor: 'pointer' }}>Ver todas</span>
      </div>

      {/* LISTA DAS LOJAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {lojasDestaque.map((loja, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #f3f4f6' }}>
            
            {/* Logo Placeholder (Letra inicial estilizada) */}
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#0f172a', flexShrink: 0 }}>
              {loja.nome[0]}
            </div>

            {/* Informações da Loja */}
            <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{loja.nome}</h4>
                <span style={{ backgroundColor: loja.tagColor === '#ef4444' ? '#fef2f2' : '#eff6ff', color: loja.tagColor, fontSize: '9px', fontWeight: '700', padding: '1px 5px', borderRadius: '4px' }}>
                  {loja.tag}
                </span>
              </div>
              <p style={{ margin: '3px 0', fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loja.desc}</p>
              
              {/* Rodapé das infos: Nota e SubTexto */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                <span style={{ fontSize: '11px', color: '#eab308', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <FiStar size={11} fill="#eab308" /> {loja.nota}
                </span>
                <span style={{ color: '#cbd5e1', fontSize: '10px' }}>•</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loja.descSub}</span>
              </div>
            </div>

            {/* Ações da Direita */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '6px' }}>
                {loja.desconto}
              </span>
              <button style={{ backgroundColor: '#eff6ff', border: 'none', color: '#2563eb', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
                Ver ofertas
              </button>
              <FiChevronRight size={16} color="#cbd5e1" />
            </div>

          </div>
        ))}
      </div>

      {/* 5. BANNER DE CUPONS EXCLUSIVOS */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '20px', padding: '16px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '12px', display: 'flex', marginRight: '14px' }}>
          <FiPercent size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#14532d' }}>Cupons e ofertas exclusivas</h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#166534', lineHeight: '1.4' }}>Ative cupons nas lojas parceiras e economize ainda mais!</p>
        </div>
        <button style={{ backgroundColor: '#dcfce7', border: '1px solid #bbf7d0', color: '#16a34a', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Ver cupons <FiChevronRight size={14} />
        </button>
      </div>

      {/* 6. SEÇÃO: CATEGORIAS MAIS BUSCADAS */}
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Categorias mais buscadas</span>
      </div>

      {/* CAROUSEL HORIZONTAL DE CATEGORIAS */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {categoriasBuscadas.map((cat, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #f1f5f9', padding: '10px 14px', borderRadius: '12px', flexShrink: 0, cursor: 'pointer' }}>
            {cat.icon}
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{cat.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};