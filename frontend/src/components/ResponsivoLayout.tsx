// frontend/src/components/Layout/ResponsiveLayout.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiTag, FiShoppingBag, FiBell, FiSettings, 
  FiFileText, FiHeart, FiClock, FiHelpCircle, FiChevronDown, FiSearch, FiInfo
} from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';
import { RiCoupon2Line } from 'react-icons/ri';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [termoBusca, setTermoBusca] = useState("");
  
  // Estados para o popup de "Em breve"
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [itemPendente, setItemPendente] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const abrirPopup = (label: string) => {
    setItemPendente(label);
    setMostrarPopup(true);
  };

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
    { rota: '/favoritos', label: 'Favoritos', icon: <FiHeart size={20} />, emBreve: false },
    { rota: '#', label: 'Histórico de preços', icon: <FiClock size={20} />, emBreve: true },
  ];

  const menuSuporte = [
    { rota: '/configuracoes', label: 'Configurações', icon: <FiSettings size={20} />, emBreve: false },
    { rota: '#', label: 'Ajuda e suporte', icon: <FiHelpCircle size={20} />, emBreve: true },
  ];

  // Restaura os estilos injetados originais que você tinha para o ecossistema desktop
  const styleSheet = `
    @media (min-width: 769px) {
      .web-content-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 20px 40px 20px;
      }
      .grid-dashboard-cards {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 20px !important;
      }
      .grid-lojas-list {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 16px !important;
      }
    }
  `;

  const renderLink = (item: any) => {
    const isActive = location.pathname === item.rota && !item.emBreve;
    
    const estiloBotao = {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 20px',
      borderRadius: '12px',
      color: isActive ? '#6366f1' : '#334155',
      backgroundColor: isActive ? '#f0f3ff' : 'transparent',
      textDecoration: 'none',
      fontWeight: isActive ? '700' : '600',
      fontSize: '15px',
      transition: 'all 0.15s ease',
      width: '100%',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left' as const,
      background: 'none',
      fontFamily: 'inherit'
    };

    const conteudo = (
      <>
        <span style={{ display: 'flex', color: isActive ? '#6366f1' : '#475569' }}>
          {item.icon}
        </span>
        {item.label}
      </>
    );

    if (item.emBreve) {
      return (
        <button key={item.label} onClick={() => abrirPopup(item.label)} style={estiloBotao}>
          {conteudo}
        </button>
      );
    }

    return (
      <Link key={item.rota} to={item.rota} style={estiloBotao}>
        {conteudo}
      </Link>
    );
  };

  // ===================================================
  // 📱 SE FOR MOBILE: Devolve o container limpo original (SEM MEXER EM NADA)
  // ===================================================
  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', position: 'relative' }}>
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        <div style={{ paddingBottom: '80px' }}>
          {children}
        </div>

        {/* MODAL DE "EM BREVE" TAMBÉM RENDERIZA NO MOBILE SE CLICADO */}
        {mostrarPopup && renderModalEmBreve()}
      </div>
    );
  }

  // ===================================================
  // 💻 SE FOR DESKTOP: Estrutura em Grid e Header Fiel
  // ===================================================
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      
      {/* SIDEBAR ESQUERDA (Fiel à imagem image_9f878c.png) */}
      <aside style={{
        width: '280px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column',
        padding: '32px 16px 24px 16px', position: 'fixed', height: '100vh',
        boxSizing: 'border-box', borderRight: '1px solid #f1f5f9', zIndex: 1010
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px', marginBottom: '36px' }}>
          <div style={{ backgroundColor: '#6366f1', padding: '10px', borderRadius: '14px', display: 'flex', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
            <FiTag size={22} color="#fff" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <div>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Preço<span style={{ color: '#6366f1' }}>Certo</span>
            </span>
            <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#94a3b8', fontWeight: '500', letterSpacing: '0.3px' }}>
              Monitore. Compare. Economize.
            </p>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', scrollbarWidth: 'none' }}>
          {menuPrincipal.map(renderLink)}
          <div style={{ margin: '20px 0' }} />
          {menuUtilitarios.map(renderLink)}
          <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '24px 20px' }} />
          {menuSuporte.map(renderLink)}
        </nav>

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

      {/* ÁREA DIREITA DO COMPUTADOR */}
      <main style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column' }}>
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px',
          backgroundColor: '#ffffff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 1000,
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
            <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94a3b8' }} />
            <input
              type="text" placeholder="Buscar produtos, lojas ou categorias..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px 12px 48px', backgroundColor: '#f4f4f5', border: 'none', borderRadius: '12px', fontSize: '14px', color: '#1e293b', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div onClick={() => navigate('/notificacoes')} style={{ position: 'relative', cursor: 'pointer', display: 'flex' }}>
              <FiBell size={22} color="#475569" />
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#6366f1', color: '#ffffff',
                fontSize: '11px', fontWeight: 'bold', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}>3</span>
            </div>

            <div onClick={() => navigate('/favoritos')} style={{ cursor: 'pointer', display: 'flex' }}>
              <FiHeart size={22} color="#475569" />
            </div>

            <div onClick={() => navigate('/perfil')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '50px', padding: '4px 14px 4px 4px', backgroundColor: '#fff' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '12px' }}>RV</div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Rayane Vitoria</span>
              <FiChevronDown size={14} color="#94a3b8" />
            </div>
          </div>
        </header>

        {/* CONTAINER DA WEB: Só ganha o padding de 20px no desktop aqui */}
        <div className="web-content-container" style={{ width: '100%', boxSizing: 'border-box' }}>
          {children}
        </div>
      </main>

      {mostrarPopup && renderModalEmBreve()}
    </div>
  );

  function renderModalEmBreve() {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%',
          maxWidth: '380px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          border: '1px solid #f1f5f9'
        }}>
          <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <FiInfo size={26} />
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{itemPendente}</h3>
          <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', fontWeight: '500', lineHeight: '1.5' }}>Esta funcionalidade está sendo preparada e estará disponível em breve!</p>
          <button onClick={() => setMostrarPopup(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
        </div>
      </div>
    );
  }
};