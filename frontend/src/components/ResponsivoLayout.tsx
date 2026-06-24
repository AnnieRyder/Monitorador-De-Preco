// frontend/src/components/Layout/ResponsiveLayout.tsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiTag, FiShoppingBag, FiBell, FiSettings, 
  FiFileText, FiHeart, FiClock, FiHelpCircle, FiChevronDown, FiSearch, FiInfo
} from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';
import { RiCoupon2Line } from 'react-icons/ri';

// 🌐 CONTEXTO GLOBAL: Ponte invisível entre o Layout e a Home
export const LayoutContext = createContext<any>(null);
export const useLayoutContext = () => useContext(LayoutContext);

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const [termoBusca, setTermoBusca] = useState("");
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const [mostrarDropdownNotif, setMostrarDropdownNotif] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [itemPendente, setItemPendente] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

const buscarNotificacoesIniciais = async () => {
      try {
        // ⚡ ALTERADO AQUI: Trocado 'localhost' por IP dinâmico para o celular conseguir conversar com o PC
        const resposta = await fetch(`http://${window.location.hostname}:5000/api/produtos`);
        if (resposta.ok) {
          const produtos = await resposta.json();
          const alertasGerados: any[] = [];
          produtos.forEach((p: any) => {
            const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : p.precoAtual;
            if (precoAtual <= p.precoAlvo) {
              alertasGerados.push({
                id: `notif-${p.id}`,
                produtoId: p.id,
                texto: `O preço do ${p.nome.slice(0, 18)}... caiu na ${p.loja}!`,
                lida: false
              });
            }
          });
          setNotificacoes(alertasGerados);
        }
      } catch (err) {
        console.error("Erro ao gerar notificações no layout:", err);
      }
    };

    buscarNotificacoesIniciais();
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  const abrirPopup = (label: string) => {
    setItemPendente(label);
    setMostrarPopup(true);
  };

  const marcarComoLida = (id: string) => {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const alertasDisparados = notificacoes.filter(n => !n.lida).length;

  const menuPrincipal = [
    { rota: '/', label: 'Início', icon: <FiHome size={20} />, emBreve: false },
    { rota: '/produtos', label: 'Produtos', icon: <FiTag size={20} />, emBreve: false },
    { rota: '/promocoes', label: 'Promoções', icon: <HiOutlineFire size={20} />, emBreve: false },
    { rota: '/lojas', label: 'Lojas', icon: <FiShoppingBag size={20} />, emBreve: false },
    { rota: '/notificacoes', label: 'Alertas', icon: <FiBell size={20} />, emBreve: false },
    { rota: '#', label: 'Cupons', icon: <RiCoupon2Line size={20} />, emBreve: true },
    { rota: '#', label: 'Relatórios', icon: <FiFileText size={20} />, emBreve: true },
  ];

  const menuUtilitarios = [
    // ⚡ MUDADO: emBreve agora está true para chamar o modal
    { rota: '#', label: 'Favoritos', icon: <FiHeart size={20} />, emBreve: true },
    { rota: '#', label: 'Histórico de preços', icon: <FiClock size={20} />, emBreve: true },
  ];

  const menuSuporte = [
    { rota: '/configuracoes', label: 'Configurações', icon: <FiSettings size={20} />, emBreve: false },
    { rota: '#', label: 'Ajuda e suporte', icon: <FiHelpCircle size={20} />, emBreve: true },
  ];

  const styleSheet = `
    @media (min-width: 769px) {
      .web-content-container { max-width: 1200px; margin: 0 auto; padding: 20px 20px 40px 20px; }
      .grid-dashboard-cards { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 20px !important; }
      .grid-lojas-list { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
    }
  `;

  const renderLink = (item: any) => {
    const isActive = location.pathname === item.rota && !item.emBreve;
    const estiloBotao = {
      display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 20px', borderRadius: '12px',
      color: isActive ? '#6366f1' : '#334155', backgroundColor: isActive ? '#f0f3ff' : 'transparent',
      textDecoration: 'none', fontWeight: isActive ? '700' : '600', fontSize: '15px', width: '100%', border: 'none', cursor: 'pointer', background: 'none', fontFamily: 'inherit', textAlign: 'left' as const
    };

    const [favoritos, setFavoritos] = useState<any[]>([]);

const alternarFavorito = (produto: any) => {
  setFavoritos(prev => {
    const jaExiste = prev.find(p => p.id === produto.id);
    if (jaExiste) return prev.filter(p => p.id !== produto.id);
    return [...prev, produto];
  });
};

    if (item.emBreve) {
      return (
        <button key={item.label} onClick={() => abrirPopup(item.label)} style={estiloBotao}>
          <span style={{ display: 'flex', color: isActive ? '#6366f1' : '#475569' }}>{item.icon}</span>
          {item.label}
        </button>
      );
    }

    return (
      <Link key={item.rota} to={item.rota} style={estiloBotao}>
        <span style={{ display: 'flex', color: isActive ? '#6366f1' : '#475569' }}>{item.icon}</span>
        {item.label}
      </Link>
    );
  };

  // ===================================================
  // 📱 RENDERIZAÇÃO MOBILE LÍMPIDA
  // ===================================================
  if (isMobile) {
    return (
      <LayoutContext.Provider value={{ termoBusca, setTermoBusca, notificacoes, setNotificacoes, marcarComoLida }}>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', position: 'relative' }}>
          <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
          <div style={{ paddingBottom: '80px' }}>
            {children}
          </div>
          {mostrarPopup && renderModalEmBreve()}
        </div>
      </LayoutContext.Provider>
    );
  }

  // ===================================================
  // 💻 RENDERIZAÇÃO DESKTOP (COMPLETA E COM O PERFIL EM BAIXO RESTAURADO)
  // ===================================================
  return (
    <LayoutContext.Provider value={{ termoBusca, setTermoBusca, notificacoes, setNotificacoes, marcarComoLida }}>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        
        {/* SIDEBAR ESQUERDA FIEL A image_281c18.png */}
        <aside style={{ width: '280px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', padding: '32px 16px 24px 16px', position: 'fixed', height: '100vh', boxSizing: 'border-box', borderRight: '1px solid #f1f5f9', zIndex: 1010 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px', marginBottom: '36px' }}>
            <div style={{ backgroundColor: '#6366f1', padding: '10px', borderRadius: '14px', display: 'flex', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
              <FiTag size={22} color="#fff" style={{ transform: 'rotate(90deg)' }} />
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Preço<span style={{ color: '#6366f1' }}>Certo</span></span>
              <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#94a3b8', fontWeight: '500' }}>Monitore. Compare. Economize.</p>
            </div>
          </div>
          
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {menuPrincipal.map(renderLink)}
            <div style={{ margin: '20px 0' }} />
            {menuUtilitarios.map(renderLink)}
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '24px 20px' }} />
            {menuSuporte.map(renderLink)}
          </nav>

          {/* ⚡ RESTAURADO: Aba Perfil no rodapé da Sidebar Desktop (Sua marcação em vermelho) */}
          <div 
            onClick={() => navigate('/perfil')}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px',
              backgroundColor: '#f8fafc', borderRadius: '16px', cursor: 'pointer', marginTop: '16px', border: '1px solid #f1f5f9',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '14px' }}>
              RV
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Rayane Vitoria
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6366f1', fontWeight: '700' }}>
                Plano Gratuito
              </p>
            </div>
            <FiChevronDown size={18} color="#64748b" style={{ marginLeft: '4px' }} />
          </div>
        </aside>

        <main style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px', backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 1000 }}>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
              <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
              <input type="text" placeholder="Buscar produtos, lojas ou categorias..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px 12px 48px', backgroundColor: '#f4f4f5', border: 'none', borderRadius: '12px', fontSize: '14px', color: '#1e293b', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div onClick={() => setMostrarDropdownNotif(!mostrarDropdownNotif)} style={{ position: 'relative', cursor: 'pointer', display: 'flex' }}>
                <FiBell size={22} color="#475569" />
                {alertasDisparados > 0 && <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#6366f1', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{alertasDisparados}</span>}
              </div>

              {mostrarDropdownNotif && (
                <div style={{ position: 'absolute', top: '50px', right: '180px', width: '300px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', zIndex: 2000, padding: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>Notificações de Quedas</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
                    {notificacoes.filter((n:any) => !n.lida).length === 0 ? (
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b', textAlign: 'center' }}>Nenhum alerta pendente</p>
                    ) : (
                      notificacoes.filter((n:any) => !n.lida).map((n:any) => (
                        <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                          <p style={{ margin: 0, fontSize: '11px', color: '#334155', lineHeight: '1.4' }}>{n.texto}</p>
                          <button onClick={() => marcarComoLida(n.id)} style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', padding: '5px 8px', cursor: 'pointer', fontWeight: '700' }}>Lido</button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ⚡ VINCULADO: Coração do Topo também abre o Modal "Em breve" dos Favoritos */}
              <div onClick={() => abrirPopup('Favoritos')} style={{ cursor: 'pointer', display: 'flex' }}>
                <FiHeart size={22} color="#475569" />
              </div>

              <div onClick={() => navigate('/perfil')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '50px', padding: '4px 14px 4px 4px', backgroundColor: '#fff' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '12px' }}>RV</div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Rayane Vitoria</span>
                <FiChevronDown size={14} color="#94a3b8" />
              </div>
            </div>
          </header>

          <div className="web-content-container" style={{ width: '100%', boxSizing: 'border-box' }}>
            {children}
          </div>
        </main>
      </div>
      {mostrarPopup && renderModalEmBreve()}
    </LayoutContext.Provider>
  );

  function renderModalEmBreve() {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
          <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><FiInfo size={26} /></div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{itemPendente}</h3>
          <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Disponível em breve!</p>
          <button onClick={() => setMostrarPopup(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
        </div>
      </div>
    );
  }
};