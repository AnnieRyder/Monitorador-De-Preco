// frontend/src/components/Layout/Pages/Promocoes.tsx
import { useState, useEffect } from 'react';
import { 
  FiSearch, FiSliders, FiBell, FiHeart, FiClock, FiChevronRight,
  FiTag, FiTv, FiHome, FiCpu, FiWatch, FiTrendingDown, FiCopy, FiCheck, FiInfo
} from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

export const Promocoes = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // ==========================================
  // ESTADOS E LÓGICAS ORIGINAIS (MOBILE)
  // ==========================================
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  
  const categorias = [
    { id: 'Todas', label: 'Todas', qtd: 128, icon: <FiTag size={18} /> },
    { id: 'Eletrônicos', label: 'Eletrônicos', qtd: 45, icon: <FiTv size={18} /> },
    { id: 'Casa', label: 'Casa', qtd: 28, icon: <FiHome size={18} /> },
    { id: 'Informática', label: 'Informática', qtd: 18, icon: <FiCpu size={18} /> },
    { id: 'Moda', label: 'Moda', qtd: 15, icon: <FiWatch size={18} /> },
  ];

  const destaques = [
    { id: 1, nome: "Headphone Sony WH-1000XM5", loja: "Amazon", precoAtual: "R$ 2.299,00", precoAntigo: "R$ 3.299,00", desconto: "-30%", emAlta: true, statusPreco: "Menor preço histórico", tempo: "Termina em 2 dias", favoritado: true },
    { id: 2, nome: "Air Fryer Philips Walita Série 3000", loja: "Magazine Luiza", precoAtual: "R$ 449,90", precoAntigo: "R$ 599,90", desconto: "-25%", emAlta: false, statusPreco: "Menor preço hoje", tempo: "Termina em 5 dias", favoritado: false },
    { id: 3, nome: "Smartwatch Xiaomi Redmi Watch 3", loja: "Mercado Livre", precoAtual: "R$ 259,90", precoAntigo: "R$ 319,00", desconto: "-18%", emAlta: false, statusPreco: "Menor preço em 30 dias", tempo: "Termina em 1 dia", favoritado: false },
  ];

  const lojas = [
    { nome: "Amazon", desconto: "Até 40% OFF" },
    { nome: "Magazine Luiza", desconto: "Até 30% OFF" },
    { nome: "Mercado Livre", desconto: "Até 25% OFF" },
    { nome: "Kabum!", desconto: "Até 35% OFF" },
  ];

  // ==========================================
  // NOVOS ESTADOS E LÓGICAS (DESKTOP)
  // ==========================================
  const [categoriaAtivaWeb, setCategoriaAtivaWeb] = useState('Todas as promoções');
  const [copiadoId, setCopiadoId] = useState<string | null>(null);
  
  // Timer Fake para o Banner Principal (Looping Infinito)
  const TEMPO_INICIAL = 776712; 
  const [tempoRestante, setTempoRestante] = useState(TEMPO_INICIAL);

  // Estados Modal
  const [mostrarPopupHome, setMostrarPopupHome] = useState(false);
  const [itemPendenteHome, setItemPendenteHome] = useState("");

  const abrirPopupEmBreve = (label: string) => {
    setItemPendenteHome(label);
    setMostrarPopupHome(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    // Lógica do Cronômetro Regressivo com Auto-Reset
    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) return TEMPO_INICIAL;
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  // Formatador das caixas do Cronômetro
  const formatarTempo = (segundosTotais: number) => {
    const dias = Math.floor(segundosTotais / 86400);
    const horas = Math.floor((segundosTotais % 86400) / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;
    return { 
      dias: dias.toString().padStart(2, '0'), 
      horas: horas.toString().padStart(2, '0'), 
      minutos: minutos.toString().padStart(2, '0'), 
      segundos: segundos.toString().padStart(2, '0') 
    };
  };

  const tFormatado = formatarTempo(tempoRestante);

  // Lógica de Copiar Cupom
  const handleCopiarCupom = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiadoId(codigo);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  // Categorias Dinâmicas Desktop
  const categoriasDesktop = [
    { id: 'Todas as promoções', label: 'Todas as promoções', sub: '124 ofertas', icon: <FiTag size={18} /> },
    { id: 'Em alta', label: 'Em alta', sub: '28 ofertas', icon: <HiOutlineFire size={18} /> },
    { id: 'Tecnologia', label: 'Tecnologia', sub: '45 ofertas', icon: <FiTv size={18} /> },
    { id: 'Casa e Decoração', label: 'Casa e Decoração', sub: '18 ofertas', icon: <FiHome size={18} /> },
    { id: 'Moda', label: 'Moda', sub: '22 ofertas', icon: <FiWatch size={18} /> },
    { id: 'Beleza', label: 'Beleza', sub: '11 ofertas', icon: <FiBell size={18} /> },
  ];

  // Dados com imagens reais e uniformes extraídas do mockup de e-commerce
  const produtosDesktop = [
    { id: 1, cat: 'Tecnologia', nome: "Smart TV LG 55\" OLED C3 4K", loja: "Magazine Luiza", lojaLogo: "https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0.png", precoAntigo: 4999.00, precoAtual: 3499.00, desconto: "-30%", tempo: "Termina em 2 dias", img: "https://s2-techtudo.glbimg.com/E9-sAO7zIaN-LcefSXci8pp8CMI=/0x0:1280x765/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/5/V/x7USZjTaiqk21Qbd0WmA/lg-oled-evo-c3-07.jpg" },
    { id: 2, cat: 'Tecnologia', nome: "Headphone Bluetooth Sony WH-1000XM5", loja: "Amazon", lojaLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", precoAntigo: 3299.00, precoAtual: 1742.30, desconto: "-25%", tempo: "Termina em 5 dias", img: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SX679_.jpg" },
    { id: 3, cat: 'Moda', nome: "Tênis Casual Nike Air Max Excee", loja: "Shopee", lojaLogo: "https://logodownload.org/wp-content/uploads/2021/03/shopee-logo-0.png", precoAntigo: 699.99, precoAtual: 594.99, desconto: "-15%", tempo: "Termina em 1 dia", img: "https://heppo.com/cdn/shop/products/60226-86_436c8fe7-a564-4e6b-bd14-3f33bac1618c.png?v=1669984641" },
    { id: 4, cat: 'Casa e Decoração', nome: "Air Fryer Philips Walita Série 3000", loja: "Mercado Livre", lojaLogo: "https://logodownload.org/wp-content/uploads/2016/08/mercado-livre-logo-0.png", precoAntigo: 599.90, precoAtual: 479.90, desconto: "-20%", tempo: "Termina em 3 dias", img: "https://i.zst.com.br/thumbs/12/36/39/-1299665325.jpg"},
  ];

  const cuponsDesktop = [
    { loja: "Shopee", bg: "#fff7ed", color: "#ea580c", desc: "10% OFF", sub: "em compras acima de R$99", codigo: "SHOPEE10", val: "31/05/2026", logo: "https://logodownload.org/wp-content/uploads/2021/03/shopee-logo-0.png" },
    { loja: "Amazon", bg: "#f8fafc", color: "#0f172a", desc: "15% OFF", sub: "em produtos selecionados", codigo: "AMAZON15", val: "28/05/2026", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { loja: "Magalu", bg: "#eff6ff", color: "#2563eb", desc: "20% OFF", sub: "em eletrodomésticos", codigo: "MAGALU20", val: "02/06/2026", logo: "https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0.png" },
    { loja: "Mercado Livre", bg: "#fefce8", color: "#eab308", desc: "R$ 20 OFF", sub: "em compras acima de R$200", codigo: "ML20", val: "30/05/2026", logo: "https://logodownload.org/wp-content/uploads/2016/08/mercado-livre-logo-0.png" },
  ];

  const produtosFiltradosWeb = produtosDesktop.filter(p => 
    categoriaAtivaWeb === 'Todas as promoções' || categoriaAtivaWeb === 'Em alta' ? true : p.cat === categoriaAtivaWeb
  );

  // ==========================================
  // RENDERIZAÇÃO MOBILE INTACTA
  // ==========================================
  if (isMobile) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '100px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Promoções</h1>
            <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>As melhores ofertas para você</p>
          </div>
          <div style={{ position: 'relative', marginTop: '4px', cursor: 'pointer' }}>
            <FiBell size={24} color="#0f172a" />
            <div style={{ position: 'absolute', top: 1, right: 2, width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
          </div>
        </div>

        {/* BARRA DE BUSCA E FILTRO */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <FiSearch size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              placeholder="Buscar promoções e lojas"
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px 12px 45px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
            <FiSliders size={16} /> Filtros
          </button>
        </div>

        {/* HORIZONTAL CAROUSEL: CATEGORIAS */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
          {categorias.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                backgroundColor: '#fff', border: categoriaAtiva === cat.id ? '1px solid #3b82f6' : '1px solid #f1f5f9',
                borderRadius: '16px', padding: '12px', width: '75px', flexShrink: 0, textAlign: 'center', cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.01)', transition: 'all 0.2s'
              }}
            >
              <div style={{ 
                width: '42px', height: '42px', borderRadius: '12px', margin: '0 auto 8px auto',
                backgroundColor: categoriaAtiva === cat.id ? '#eff6ff' : '#f8fafc',
                color: categoriaAtiva === cat.id ? '#3b82f6' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cat.icon}
              </div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: categoriaAtiva === cat.id ? '#3b82f6' : '#1e293b' }}>{cat.label}</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{cat.qtd}</p>
            </div>
          ))}
        </div>

        {/* SEÇÃO: DESTAQUES PARA VOCÊ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Destaques para você</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6', cursor: 'pointer' }}>Ver todos</span>
        </div>

        {/* LISTA DE DESTAQUES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {destaques.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #f3f4f6', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '6px', zIndex: 2 }}>{item.desconto}</span>
              
              <div style={{ width: '75px', height: '75px', backgroundColor: '#f3f4f6', borderRadius: '16px', flexShrink: 0 }} />
              
              <div style={{ marginLeft: '16px', flex: 1, minWidth: 0, paddingRight: '4px' }}>
                {item.emAlta && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px', marginBottom: '4px' }}>
                    <HiOutlineFire size={11} /> EM ALTA
                  </span>
                )}
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>{item.nome}</h4>
                <p style={{ margin: '2px 0 6px 0', fontSize: '11px', color: '#64748b' }}>{item.loja}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700' }}>
                  <FiTrendingDown size={12} /> {item.statusPreco}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: item.favoritado ? '#fef2f2' : '#f8fafc', display: 'flex', cursor: 'pointer' }}>
                  <FiHeart size={14} color={item.favoritado ? '#ef4444' : '#94a3b8'} fill={item.favoritado ? '#ef4444' : 'none'} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>{item.precoAtual}</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through' }}>{item.precoAntigo}</span>
                <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><FiClock size={11} /> {item.tempo}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CARD: OFERTAS RELÂMPAGO */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '14px', marginRight: '14px' }}>
            <HiOutlineFire size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Ofertas relâmpago</h4>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>Descontos por tempo limitado.</p>
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginRight: '8px' }}>
            <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>05</span><span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '600' }}>hrs</span></div>
            <span style={{ color: '#2563eb', fontWeight: '700', marginBottom: '10px' }}>:</span>
            <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>18</span><span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '600' }}>min</span></div>
            <span style={{ color: '#2563eb', fontWeight: '700', marginBottom: '10px' }}>:</span>
            <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>42</span><span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '600' }}>seg</span></div>
          </div>
          <FiChevronRight size={18} color="#cbd5e1" />
        </div>

        {/* SEÇÃO: LOJAS COM MELHORES OFERTAS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Lojas com melhores ofertas</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6', cursor: 'pointer' }}>Ver todas</span>
        </div>

        {/* CAROUSEL HORIZONTAL: LOJAS */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {lojas.map((loja, idx) => (
            <div key={idx} style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '14px', width: '130px', flexShrink: 0, textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f8fafc', borderRadius: '50%', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px', color: '#334155', border: '1px solid #e2e8f0' }}>
                {loja.nome[0]}
              </div>
              <h5 style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>{loja.nome}</h5>
              <p style={{ margin: '4px 0 10px 0', fontSize: '10px', fontWeight: '700', color: '#16a34a' }}>{loja.desconto}</p>
              <button style={{ width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '6px 0', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Ver ofertas</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ===================================================
  // RENDERIZAÇÃO DESKTOP CORRIGIDA E PROPORCIONAL
  // ===================================================
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '24px', paddingTop: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Promoções</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#64748b' }}>
          Descubra as melhores ofertas e economize ainda mais.
        </p>
      </div>

      {/* CATEGORIAS FILTRÁVEIS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        {categoriasDesktop.map((cat) => {
          const ativo = categoriaAtivaWeb === cat.id;
          return (
            <div 
              key={cat.id} 
              onClick={() => setCategoriaAtivaWeb(cat.id)}
              style={{
                backgroundColor: ativo ? '#ffffff' : '#fff', 
                border: ativo ? '1px solid #6366f1' : '1px solid #f1f5f9',
                borderRadius: '16px', padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: ativo ? '0 4px 12px rgba(99, 102, 241, 0.12)' : 'none'
              }}
            >
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '10px',
                backgroundColor: ativo ? '#eef2ff' : '#f8fafc',
                color: ativo ? '#6366f1' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cat.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: ativo ? '#6366f1' : '#1e293b' }}>{cat.label}</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{cat.sub}</p>
              </div>
            </div>
          );
        })}
        <button 
          onClick={() => abrirPopupEmBreve("Painel de Filtros")}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '14px', fontWeight: '700', color: '#0f172a', cursor: 'pointer' }}
        >
          <FiSliders size={16} /> Filtros
        </button>
      </div>

      {/* BANNER PRINCIPAL: PROPORCIONAL COM IMAGEM DE ASSETS EM LOOPING */}
      <div style={{ 
        width: '100%', borderRadius: '24px', background: 'linear-gradient(90deg, #100b2a 0%, #240c50 100%)', 
        padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div>
            <span style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Oferta do Dia</span>
            <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '900', margin: '8px 0 4px 0' }}>Até 40% OFF</h2>
            <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0 0 20px 0' }}>em produtos selecionados</p>
            <button 
              onClick={() => abrirPopupEmBreve("Ofertas Especiais")}
              style={{ padding: '12px 24px', backgroundColor: '#fff', border: 'none', borderRadius: '12px', color: '#0f172a', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Ver ofertas <FiChevronRight size={16} />
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '70px', height: '70px', backgroundColor: '#6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-10deg)', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
              <span style={{ fontSize: '36px', color: '#fff', fontWeight: '900' }}>%</span>
            </div>
            {/* Injeção correta da imagem de mockup no espaço do banner */}
            <div style={{ width: '220px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/src/assets/banner.png" alt="Banner Promoções" style={{  maxHeight: '25rem', marginLeft: '15rem', borderRadius: '42%', boxShadow: 'linear-gradient(90deg, #100b2a 0%, #240c50 100%)', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </div>

        {/* Cronômetro Flutuante */}
        <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>A oferta termina em:</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[{v: tFormatado.dias, l: 'Dias'}, {v: tFormatado.horas, l: 'Horas'}, {v: tFormatado.minutos, l: 'Min'}, {v: tFormatado.segundos, l: 'Seg'}].map((t, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '52px', height: '56px', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ color: '#fff', fontSize: '24px', fontWeight: '800' }}>{t.v}</span>
                </div>
                <span style={{ color: '#cbd5e1', fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROMOÇÕES EM DESTAQUE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Promocões em destaque</h2>
        <span onClick={() => abrirPopupEmBreve("Todas as Promoções")} style={{ fontSize: '14px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Ver todas</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {produtosFiltradosWeb.map(p => {
          const economia = p.precoAntigo - p.precoAtual;
          return (
            <div key={p.id} style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ backgroundColor: '#6366f1', color: '#fff', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '800' }}>{p.desconto}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2px' }}>
                    <img src={p.lojaLogo} alt={p.loja} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>{p.loja}</span>
                </div>
              </div>
              
              <div style={{ height: '130px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                <img src={p.img} alt={p.nome} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>{p.nome}</h4>
              
              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>R$ {p.precoAntigo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p style={{ margin: '2px 0 4px 0', fontSize: '22px', fontWeight: '900', color: '#16a34a' }}>R$ {p.precoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Economize R$ {economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
                  <FiClock size={14} /> {p.tempo}
                </div>
                <button 
                  onClick={() => abrirPopupEmBreve("Favoritos")}
                  style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <FiHeart size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CUPONS DE DESCONTO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Cupons de desconto</h2>
        <span onClick={() => abrirPopupEmBreve("Todos os Cupons")} style={{ fontSize: '14px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Ver todos</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {cuponsDesktop.map((cupom, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: cupom.bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', boxSizing: 'border-box', border: '1px solid #f1f5f9' }}>
                <img src={cupom.logo} alt={cupom.loja} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: cupom.color }}>{cupom.desc}</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{cupom.sub}</p>
              </div>
            </div>

            <div 
              style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '16px' }}
              onClick={() => handleCopiarCupom(cupom.codigo)}
            >
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#334155', letterSpacing: '1px' }}>{cupom.codigo}</span>
              {copiadoId === cupom.codigo ? <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', fontWeight: '700' }}><FiCheck size={16} /> Copiado</div> : <FiCopy size={16} color="#94a3b8" />}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Válido até {cupom.val}</span>
              <span onClick={() => abrirPopupEmBreve("Regras do Cupom")} style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Ver regras</span>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP DE SUPORTE */}
      {mostrarPopupHome && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <FiInfo size={26} />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{itemPendenteHome}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Esta funcionalidade estará disponível em breve!</p>
            <button onClick={() => setMostrarPopupHome(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};