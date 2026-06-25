// frontend/src/components/Layout/Pages/Lojas.tsx
import { useState, useEffect } from 'react';
import { 
  FiSearch, FiSliders, FiTag, FiAward, FiPercent, FiShield, 
  FiStar, FiChevronRight, FiTv, FiCpu, FiHome, FiHeart, FiWatch,
  FiPlay, FiChevronDown, FiInfo, FiX,
} from 'react-icons/fi';

export const Lojas = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // ESTADOS GERAIS (MODAL "EM BREVE")
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [tituloPopup, setTituloPopup] = useState("");

  const abrirPopupEmBreve = (titulo: string) => {
    setTituloPopup(titulo);
    setMostrarPopup(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // DADOS ORIGINAIS (MOBILE)
  
  const resumoDadosMobile = [
    { valor: '28', label: 'Lojas cadastradas', icon: <FiTag size={18} color="#a855f7" /> },
    { valor: '125', label: 'Cupons ativos', icon: <FiAward size={18} color="#22c55e" /> },
    { valor: 'Até 50%', label: 'Descontos disponíveis', icon: <FiPercent size={18} color="#f97316" /> },
    { valor: '100%', label: 'Lojas confiáveis', icon: <FiShield size={18} color="#2563eb" /> },
  ];

  const lojasDestaqueMobile = [
    { nome: 'Amazon', desc: 'Tudo para você, de A a Z.', descSub: 'Frete grátis acima de R$ 149', desconto: 'Até 40% OFF', nota: '4,8', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'Magazine Luiza', desc: 'Tecnologia, móveis e muito mais.', descSub: 'Retire na loja', desconto: 'Até 30% OFF', nota: '4,7', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'Mercado Livre', desc: 'Milhões de produtos com ótimos preços.', descSub: 'Envio rápido', desconto: 'Até 25% OFF', nota: '4,6', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'KaBuM!', desc: 'Especialista em tecnologia e games.', descSub: 'Montagem de PC', desconto: 'Até 35% OFF', nota: '4,8', tag: 'Em alta', tagColor: '#2563eb' },
    { nome: 'Shopee', desc: 'Ofertas incríveis todos os dias.', descSub: 'Cashback disponível', desconto: 'Até 50% OFF', nota: '4,6', tag: 'Popular', tagColor: '#ef4444' },
  ];

  const categoriasBuscadasMobile = [
    { label: 'Eletrônicos', icon: <FiTv size={16} color="#a855f7" /> },
    { label: 'Informática', icon: <FiCpu size={16} color="#2563eb" /> },
    { label: 'Casa', icon: <FiHome size={16} color="#22c55e" /> },
    { label: 'Beleza', icon: <FiHeart size={16} color="#ec4899" /> },
    { label: 'Moda', icon: <FiWatch size={16} color="#f97316" /> },
  ];

  // DADOS NOVOS (DESKTOP)
 
  const lojasDesktopGrid = [
    { nome: 'Amazon', cat: 'Marketplace', nota: '4,8', reviews: '25.6k', promo: '45', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { nome: 'Magazine Luiza', cat: 'Eletrodomésticos', nota: '4,7', reviews: '18.3k', promo: '32', logo: 'https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0.png' },
    { nome: 'Mercado Livre', cat: 'Marketplace', nota: '4,8', reviews: '22.1k', promo: '38', logo: 'https://logodownload.org/wp-content/uploads/2016/08/mercado-livre-logo-0.png' },
    { nome: 'Shopee', cat: 'Marketplace', nota: '4,7', reviews: '15.2k', promo: '38', logo: 'https://logodownload.org/wp-content/uploads/2021/03/shopee-logo-0.png' },
    { nome: 'Americanas', cat: 'Varejo', nota: '4,6', reviews: '10.4k', promo: '21', logo: 'https://logodownload.org/wp-content/uploads/2019/10/americanas-logo-1.png' },
    { nome: 'KaBuM!', cat: 'Informática', nota: '4,8', reviews: '13.7k', promo: '26', logo: 'https://logodownload.org/wp-content/uploads/2017/11/kabum-logo.png' },
    { nome: 'Centauro', cat: 'Esportes', nota: '4,7', reviews: '8.7k', promo: '17', logo: 'https://logodownload.org/wp-content/uploads/2017/08/centauro-logo-01.png' },
    { nome: 'Netshoes', cat: 'Esportes', nota: '4,8', reviews: '7.1k', promo: '15', logo: 'https://logodownload.org/wp-content/uploads/2020/02/netshoes-logo-0.png' },
    { nome: 'Casas Bahia', cat: 'Eletrodomésticos', nota: '4,6', reviews: '12.3k', promo: '19', logo: 'https://logodownload.org/wp-content/uploads/2014/05/casas-bahia-logo-1-2.png' },
    { nome: 'Fast Shop', cat: 'Eletrodomésticos', nota: '4,7', reviews: '6.4k', promo: '16', logo: 'https://logodownload.org/wp-content/uploads/2017/11/fast-shop-logo.png' },
    { nome: 'Ponto', cat: 'Eletrodomésticos', nota: '4,5', reviews: '4.2k', promo: '12', logo: 'https://logodownload.org/wp-content/uploads/2021/04/ponto-logo.png' },
    { nome: 'Época Cos...', cat: 'Beleza', nota: '4,8', reviews: '6.8k', promo: '11', logo: 'https://seller-pg-storage-prod.magalu.com/seller-page/magazine_luiza/epocacosmeticos-integra/headers/image/original/69a6e27734e5f8236bc2d034.jpeg' },
  ];

  const filtrosCategorias = [
    { label: 'Todas as categorias', count: '', checked: true },
    { label: 'Marketplace', count: '8', checked: false },
    { label: 'Eletrodomésticos', count: '5', checked: false },
    { label: 'Informática', count: '4', checked: false },
    { label: 'Moda e Acessórios', count: '6', checked: false },
    { label: 'Esportes', count: '3', checked: false },
    { label: 'Beleza e Saúde', count: '4', checked: false },
    { label: 'Casa e Decoração', count: '3', checked: false },
  ];


  
  //  RENDERIZAÇÃO MOBILE INTACTA 
 
  if (isMobile) {
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

        {/* 3. CARDS DE RESUMO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '28px' }}>
          {resumoDadosMobile.map((dado, idx) => (
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
          {lojasDestaqueMobile.map((loja, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #f3f4f6' }}>
              
              <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#0f172a', flexShrink: 0 }}>
                {loja.nome[0]}
              </div>

              <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{loja.nome}</h4>
                  <span style={{ backgroundColor: loja.tagColor === '#ef4444' ? '#fef2f2' : '#eff6ff', color: loja.tagColor, fontSize: '9px', fontWeight: '700', padding: '1px 5px', borderRadius: '4px' }}>
                    {loja.tag}
                  </span>
                </div>
                <p style={{ margin: '3px 0', fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loja.desc}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                  <span style={{ fontSize: '11px', color: '#eab308', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <FiStar size={11} fill="#eab308" /> {loja.nota}
                  </span>
                  <span style={{ color: '#cbd5e1', fontSize: '10px' }}>•</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loja.descSub}</span>
                </div>
              </div>

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
          {categoriasBuscadasMobile.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #f1f5f9', padding: '10px 14px', borderRadius: '12px', flexShrink: 0, cursor: 'pointer' }}>
              {cat.icon}
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

 
  // RENDERIZAÇÃO DESKTOP (MOCKUP FIEL)

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. CABEÇALHO */}
      <div style={{ marginBottom: '24px', paddingTop: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Lojas</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#64748b' }}>
          Acompanhe as lojas que você mais usa e compare preços entre elas.
        </p>
      </div>

      {/* 2. BANNER PRINCIPAL (FUNDO LILÁS) */}
      <div style={{ 
        width: '100%', borderRadius: '20px', backgroundColor: '#faf5ff', border: '1px solid #f3e8ff',
        padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiHome size={28} color="#6366f1" />
          </div>
          <div>
            <h2 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>Acompanhe suas lojas favoritas</h2>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Salve lojas e receba alertas de preços e promoções dos seus produtos.</p>
          </div>
        </div>
        <button 
          onClick={() => abrirPopupEmBreve("Como Funciona: Lojas")}
          style={{ padding: '12px 20px', backgroundColor: '#fff', border: '1px solid #e0e7ff', borderRadius: '12px', color: '#6366f1', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
        >
          <FiPlay size={16} fill="#6366f1" /> Ver como funciona
        </button>
      </div>

      {/* 3. CARDS DE RESUMO DESKTOP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ backgroundColor: '#f3e8ff', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiHome size={24} color="#a855f7" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>18</h3>
            <p style={{ margin: '2px 0 8px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Lojas monitoradas</p>
            <span onClick={() => abrirPopupEmBreve("Ver Lojas")} style={{ fontSize: '13px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Ver todas</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0fdf4', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiTag size={24} color="#16a34a" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>152</h3>
            <p style={{ margin: '2px 0 8px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Promoções ativas</p>
            <span onClick={() => abrirPopupEmBreve("Ver Promoções")} style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', cursor: 'pointer' }}>Ver promoções</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ backgroundColor: '#fff7ed', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiStar size={24} color="#ea580c" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>5</h3>
            <p style={{ margin: '2px 0 8px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Lojas favoritas</p>
            <span onClick={() => abrirPopupEmBreve("Lojas Favoritas")} style={{ fontSize: '13px', color: '#ea580c', fontWeight: '700', cursor: 'pointer' }}>Ver favoritas</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ backgroundColor: '#eff6ff', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiAward size={24} color="#2563eb" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>R$ 2.847,60</h3>
            <p style={{ margin: '2px 0 8px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Economizado nas lojas</p>
            <span onClick={() => abrirPopupEmBreve("Relatório Detalhado")} style={{ fontSize: '13px', color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}>Ver relatório</span>
          </div>
        </div>
      </div>

      {/* 4. SPLIT AREA: GRID DE LOJAS + SIDEBAR DE FILTROS */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* LADO ESQUERDO: GRID DE LOJAS */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Todas as lojas</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#334155', fontSize: '13px', fontWeight: '600' }}>
              Ordenar: Mais populares <FiChevronDown />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {lojasDesktopGrid.map((loja, idx) => (
              <div key={idx} style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                {/* Loja Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '4px', flexShrink: 0 }}>
                    <img src={loja.logo} alt={loja.nome} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loja.nome}</h4>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{loja.cat}</span>
                  </div>
                </div>

                {/* Métricas da loja */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: '#eab308' }}>
                    <FiStar fill="#eab308" size={12} /> {loja.nota} <span style={{ color: '#94a3b8', fontWeight: '500' }}>({loja.reviews})</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: '#f59e0b' }}>
                    <FiTag size={12} /> {loja.promo} promoções
                  </span>
                </div>

                {/* Botões Ação */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button 
                    onClick={() => abrirPopupEmBreve("Monitorar " + loja.nome)}
                    style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #e0e7ff', color: '#6366f1', padding: '10px 0', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                  >
                    Monitorar loja
                  </button>
                  <button 
                    onClick={() => abrirPopupEmBreve("Favoritar " + loja.nome)}
                    style={{ width: '38px', height: '38px', backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#94a3b8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    <FiHeart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => abrirPopupEmBreve("Carregar mais lojas")}
              style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#334155', padding: '12px 24px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Carregar mais lojas <FiChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* LADO DIREITO: SIDEBAR DE FILTROS */}
        <div style={{ width: '260px', flexShrink: 0 }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Filtros</h2>

          {/* Categoria Filtros */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>Categorias</span>
              <FiChevronDown size={16} color="#94a3b8" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtrosCategorias.map((f, idx) => (
                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={f.checked} readOnly style={{ width: '16px', height: '16px', accentColor: '#6366f1', cursor: 'pointer' }} />
                  <span style={{ fontSize: '13px', color: '#475569', flex: 1 }}>{f.label} {f.count && <span style={{ color: '#94a3b8' }}>({f.count})</span>}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Avaliação Mínima */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '16px' }}>Avaliação mínima</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['1+', '2+', '3+', '4+'].map((star, idx) => (
                <button key={idx} style={{ flex: 1, padding: '8px 0', backgroundColor: star === '4+' ? '#eef2ff' : '#fff', border: star === '4+' ? '1px solid #6366f1' : '1px solid #e2e8f0', color: star === '4+' ? '#6366f1' : '#64748b', borderRadius: '8px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}>
                  <FiStar fill={star === '4+' ? '#6366f1' : '#94a3b8'} size={12} /> {star}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenar Por */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '16px' }}>Ordenar por</span>
            <select style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '13px', fontWeight: '600', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}>
              <option>Mais populares</option>
              <option>Melhor avaliadas</option>
              <option>Mais promoções</option>
            </select>
          </div>

          <button 
            onClick={() => abrirPopupEmBreve("Limpar Filtros")}
            style={{ width: '100%', padding: '12px 0', backgroundColor: '#fff', border: '1px solid #e0e7ff', borderRadius: '12px', color: '#6366f1', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <FiSliders size={14} /> Limpar filtros
          </button>
        </div>
      </div>

      {/* MODAL POPUP EM BREVE GERAL */}
      {mostrarPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <FiInfo size={26} />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{tituloPopup}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Esta funcionalidade estará disponível em breve!</p>
            <button onClick={() => setMostrarPopup(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}

    </div>
  );
};