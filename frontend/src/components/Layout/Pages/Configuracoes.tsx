// frontend/src/components/Layout/Pages/Configuracoes.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, FiBell, FiMail, FiMessageSquare, FiTrendingDown, 
  FiClock, FiBellOff, FiFileText, FiMoon, FiGlobe, FiDollarSign, 
  FiMaximize2, FiShield, FiCloudLightning, FiTrash2, FiChevronRight,
  FiUser, FiLock, FiCreditCard, FiGrid, FiEdit3, FiDownload, FiLogOut, FiSun, FiMonitor, FiInfo, FiX
} from 'react-icons/fi';

export const Configuracoes = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Estados Desktop (Abas e Tema)
  const [abaAtiva, setAbaAtiva] = useState('Minha conta');
  
  // ⚡ LÓGICA DE TEMA COM PERSISTÊNCIA GLOBAL (localStorage + <body>)
  const [temaAtivo, setTemaAtivo] = useState(() => {
    return localStorage.getItem('precocerto_theme') || 'Claro';
  });

  const aplicarTemaGlobal = (tema: string) => {
    if (tema === 'Escuro') {
      document.documentElement.style.backgroundColor = '#0f172a';
      document.body.style.backgroundColor = '#0f172a';
    } else {
      document.documentElement.style.backgroundColor = '#f8fafc';
      document.body.style.backgroundColor = '#f8fafc';
    }
  };

  const alterarTema = (novoTema: string) => {
    setTemaAtivo(novoTema);
    localStorage.setItem('precocerto_theme', novoTema);
    aplicarTemaGlobal(novoTema);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    // Força a cor do body global na primeira renderização
    aplicarTemaGlobal(temaAtivo);

    return () => window.removeEventListener('resize', handleResize);
  }, [temaAtivo]);

  const [mostrarPopupEmBreve, setMostrarPopupEmBreve] = useState(false);
  const [tituloPopup, setTituloPopup] = useState("");

  const abrirEmBreve = (titulo: string) => {
    setTituloPopup(titulo);
    setMostrarPopupEmBreve(true);
  };

  
  // ESTADOS ORIGINAIS (MOBILE)
  
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);

  const toggleStyle = (active: boolean) => ({
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    backgroundColor: active ? '#2563eb' : '#e2e8f0',
    position: 'relative' as const,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: 'none',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '0 3px',
  });

  const circleStyle = (active: boolean) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute' as const,
    left: active ? '23px' : '3px',
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
  });

  const renderSection = (titulo: string, itens: any[]) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#475569' }}>{titulo}</h3>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        {itens.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '14px 16px', 
              borderBottom: index === itens.length - 1 ? 'none' : '1px solid #f1f5f9',
              cursor: item.isToggle ? 'default' : 'pointer'
            }}
          >
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '10px', 
              backgroundColor: item.bgColor || '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: '14px', flexShrink: 0 
            }}>
              {item.icon}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.titulo}</h4>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>{item.sub}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {item.isToggle ? (
                <button 
                  onClick={item.onToggle} 
                  style={toggleStyle(item.active)}
                >
                  <div style={circleStyle(item.active)} />
                </button>
              ) : (
                <>
                  {item.extra && <span style={{ fontSize: '12px', color: '#64748b', marginRight: '6px' }}>{item.extra}</span>}
                  <FiChevronRight size={16} color="#cbd5e1" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const secaoNotificacoes = [
    { titulo: 'Notificações push', sub: 'Receba alertas sobre quedas de preço', icon: <FiBell size={18} color="#a855f7" />, bgColor: '#f3e8ff', isToggle: true, active: push, onToggle: () => setPush(!push) },
    { titulo: 'E-mail', sub: 'Receba resumos e alertas por e-mail', icon: <FiMail size={18} color="#2563eb" />, bgColor: '#eff6ff', isToggle: true, active: email, onToggle: () => setEmail(!email) },
    { titulo: 'WhatsApp', sub: 'Receba alertas pelo WhatsApp', icon: <FiMessageSquare size={18} color="#22c55e" />, bgColor: '#f0fdf4', isToggle: true, active: whatsapp, onToggle: () => setWhatsapp(!whatsapp) },
  ];

  const secaoPreferencias = [
    { titulo: 'Regras de preço', sub: 'Defina como e quando deseja ser avisado', icon: <FiTrendingDown size={18} color="#16a34a" />, bgColor: '#f0fdf4' },
    { titulo: 'Frequência de alertas', sub: 'Escolha a frequência dos seus alertas', icon: <FiClock size={18} color="#ea580c" />, bgColor: '#fff7ed' },
    { titulo: 'Silenciar produtos', sub: 'Gerencie produtos e lojas silenciadas', icon: <FiBellOff size={18} color="#ef4444" />, bgColor: '#fef2f2' },
    { titulo: 'Resumo diário', sub: 'Receba um resumo diário das suas monitorizações', icon: <FiFileText size={18} color="#6366f1" />, bgColor: '#e0e7ff' },
  ];

  const secaoGeral = [
    { titulo: 'Tema do aplicativo', sub: 'Escolha entre claro, escuro ou automático', icon: <FiMoon size={18} color="#2563eb" />, bgColor: '#eff6ff', extra: 'Claro' },
    { titulo: 'Idioma', sub: 'Selecione o idioma do aplicativo', icon: <FiGlobe size={18} color="#0284c7" />, bgColor: '#e0f2fe', extra: 'Português' },
    { titulo: 'Moeda', sub: 'Escolha a moeda para exibição dos preços', icon: <FiDollarSign size={18} color="#0d9488" />, bgColor: '#ccfbf1', extra: 'BRL (R$)' },
    { titulo: 'Unidade de medida', sub: 'Escolha como as medidas serão exibidas', icon: <FiMaximize2 size={18} color="#ca8a04" />, bgColor: '#fef9c3', extra: 'Métrico (kg, cm)' },
  ];

  const secaoConta = [
    { titulo: 'Privacidade', sub: 'Gerencie seus dados e permissões', icon: <FiShield size={18} color="#2563eb" />, bgColor: '#eff6ff' },
    { titulo: 'Backup e sincronização', sub: 'Sincronize seus dados entre dispositivos', icon: <FiCloudLightning size={18} color="#16a34a" />, bgColor: '#f0fdf4' },
    { titulo: 'Excluir conta', sub: 'Excluir sua conta permanentemente', icon: <FiTrash2 size={18} color="#ef4444" />, bgColor: '#fef2f2' },
  ];

  //  RENDERIZAÇÃO MOBILE INTACTA

  if (isMobile) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0',
              backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', marginRight: '16px'
            }}
          >
            <FiChevronLeft size={20} color="#0f172a" />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Configurações</h1>
            <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Personalize sua experiência</p>
          </div>
        </div>

        {renderSection('Notificações', secaoNotificacoes)}
        {renderSection('Preferências de alerta', secaoPreferencias)}
        {renderSection('Geral', secaoGeral)}
        {renderSection('Conta e dados', secaoConta)}
      </div>
    );
  }


  //  RENDERIZAÇÃO DESKTOP (MOCKUP FIEL)
 
  
  const darkMode = temaAtivo === 'Escuro';
  const themeColors = {
    // O bgPage aplica-se ao container raiz para que não fiquem bordas brancas (resolver depois)
    bgPage: darkMode ? '#0f172a' : '#f8fafc',
    bgCard: darkMode ? '#1e293b' : '#fff',
    textMain: darkMode ? '#f8fafc' : '#0f172a',
    textSub: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#f1f5f9',
    borderStrong: darkMode ? '#475569' : '#e2e8f0',
    hoverBg: darkMode ? '#334155' : '#f8fafc',
    bannerBg: darkMode ? '#1e1b4b' : '#faf5ff',
    bannerBorder: darkMode ? '#312e81' : '#f3e8ff',
    bannerText: darkMode ? '#c7d2fe' : '#6b21a8',
    inputBg: darkMode ? '#0f172a' : '#fff'
  };

  const abasDesktop = [
    { label: 'Minha conta', icon: <FiUser /> },
    { label: 'Notificações', icon: <FiBell /> },
    { label: 'Preferências de alerta', icon: <FiBellOff /> },
    { label: 'Privacidade', icon: <FiShield /> },
    { label: 'Segurança', icon: <FiLock /> },
    { label: 'Planos e cobrança', icon: <FiCreditCard /> },
    { label: 'Integrações', icon: <FiGrid /> }
  ];

  return (
    <div style={{ backgroundColor: themeColors.bgPage, minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', transition: 'background-color 0.3s' }}>
      
      {/* 1. CABEÇALHO */}
      <div style={{ marginBottom: '24px', paddingTop: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: themeColors.textMain }}>Configurações</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: themeColors.textSub }}>
          Personalize sua experiência no PreçoCerto.
        </p>
      </div>

      {/* 2. BARRA DE ABAS HORIZONTAL (Com marcação Em Breve) */}
      <div style={{ display: 'flex', gap: '24px', borderBottom: `1px solid ${themeColors.borderStrong}`, marginBottom: '32px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {abasDesktop.map(aba => {
          const ativo = abaAtiva === aba.label;
          return (
            <button 
              key={aba.label}
              onClick={() => {
                if (aba.label === 'Minha conta') {
                  setAbaAtiva(aba.label);
                } else {
                  abrirEmBreve(aba.label);
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none',
                padding: '0 0 16px 0', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                color: ativo ? '#6366f1' : themeColors.textSub,
                borderBottom: ativo ? '2px solid #6366f1' : '2px solid transparent',
                marginBottom: '-1px', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              {aba.icon} {aba.label}
            </button>
          )
        })}
      </div>

      {/* 3. LAYOUT PRINCIPAL (Split Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* LADO ESQUERDO: INFOS DA CONTA, PREFERÊNCIAS E TEMA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Informações da conta */}
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: themeColors.textMain }}>Informações da conta</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: themeColors.textSub }}>Gerencie seus dados pessoais e de acesso.</p>
            
            <div style={{ backgroundColor: themeColors.bgCard, borderRadius: '24px', padding: '24px', border: `1px solid ${themeColors.border}`, position: 'relative' }}>
              <button 
                onClick={() => abrirEmBreve("Editar Perfil")}
                style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, borderRadius: '10px', fontSize: '13px', fontWeight: '700', color: themeColors.textMain, cursor: 'pointer' }}
              >
                <FiEdit3 size={14} /> Editar
              </button>
              
              <div 
                onClick={() => abrirEmBreve("Informações da Conta")}
                style={{ display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>RV</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', color: themeColors.textSub, fontWeight: '600' }}>Nome</span>
                    <span style={{ fontSize: '15px', color: themeColors.textMain, fontWeight: '700' }}>Rayane Vitoria</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', color: themeColors.textSub, fontWeight: '600' }}>E-mail</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '15px', color: themeColors.textMain, fontWeight: '700' }}>rayaneic7@gmail.com</span>
                      <span style={{ backgroundColor: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>Verificado</span>
                    </div>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', color: themeColors.textSub, fontWeight: '600' }}>Telefone</span>
                    <span style={{ fontSize: '15px', color: themeColors.textMain, fontWeight: '700' }}>(11) 99999-9999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferências gerais */}
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: themeColors.textMain }}>Preferências gerais</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: themeColors.textSub }}>Personalize como o sistema funciona para você.</p>
            
            <div style={{ backgroundColor: themeColors.bgCard, borderRadius: '24px', padding: '24px', border: `1px solid ${themeColors.border}` }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: `1px solid ${themeColors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColors.textSub }}><FiDollarSign /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Moeda</p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSub }}>Escolha a moeda exibida nos preços.</p>
                  </div>
                </div>
                <select style={{ padding: '10px 16px', borderRadius: '10px', border: `1px solid ${themeColors.borderStrong}`, backgroundColor: themeColors.inputBg, color: themeColors.textMain, fontSize: '13px', fontWeight: '600', outline: 'none' }}>
                  <option>Real (R$)</option>
                  <option>Dólar (US$)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${themeColors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColors.textSub }}><FiGlobe /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Idioma</p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSub }}>Escolha o idioma da plataforma.</p>
                  </div>
                </div>
                <select style={{ padding: '10px 16px', borderRadius: '10px', border: `1px solid ${themeColors.borderStrong}`, backgroundColor: themeColors.inputBg, color: themeColors.textMain, fontSize: '13px', fontWeight: '600', outline: 'none' }}>
                  <option>Português (BR)</option>
                  <option>English (US)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColors.textSub }}><FiClock /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Fuso horário</p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSub }}>Defina o fuso horário para alertas.</p>
                  </div>
                </div>
                <select style={{ padding: '10px 16px', borderRadius: '10px', border: `1px solid ${themeColors.borderStrong}`, backgroundColor: themeColors.inputBg, color: themeColors.textMain, fontSize: '13px', fontWeight: '600', outline: 'none' }}>
                  <option>(GMT-03:00) Brasília</option>
                </select>
              </div>

            </div>
          </div>

          {/* Aparência (TEMA FUNCIONAL E PERSISTENTE) */}
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: themeColors.textMain }}>Aparência</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: themeColors.textSub }}>Escolha o tema da interface.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div 
                onClick={() => alterarTema('Claro')}
                style={{ padding: '16px', backgroundColor: themeColors.bgCard, border: temaAtivo === 'Claro' ? '2px solid #6366f1' : `1px solid ${themeColors.border}`, borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <FiSun size={20} color={temaAtivo === 'Claro' ? '#6366f1' : themeColors.textSub} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Claro</p>
                  <p style={{ margin: 0, fontSize: '11px', color: themeColors.textSub }}>Usar tema claro</p>
                </div>
              </div>

              <div 
                onClick={() => alterarTema('Escuro')}
                style={{ padding: '16px', backgroundColor: themeColors.bgCard, border: temaAtivo === 'Escuro' ? '2px solid #6366f1' : `1px solid ${themeColors.border}`, borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <FiMoon size={20} color={temaAtivo === 'Escuro' ? '#6366f1' : themeColors.textSub} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Escuro</p>
                  <p style={{ margin: 0, fontSize: '11px', color: themeColors.textSub }}>Usar tema escuro</p>
                </div>
              </div>

              <div 
                onClick={() => alterarTema('Automático')}
                style={{ padding: '16px', backgroundColor: themeColors.bgCard, border: temaAtivo === 'Automático' ? '2px solid #6366f1' : `1px solid ${themeColors.border}`, borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <FiMonitor size={20} color={temaAtivo === 'Automático' ? '#6366f1' : themeColors.textSub} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Automático</p>
                  <p style={{ margin: 0, fontSize: '11px', color: themeColors.textSub }}>Padrão do sistema</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: AÇÕES DA CONTA E AJUDA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Ações da Conta */}
          <div style={{ backgroundColor: themeColors.bgCard, borderRadius: '24px', padding: '24px', border: `1px solid ${themeColors.border}` }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: themeColors.textMain }}>Ações da conta</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div 
                onClick={() => abrirEmBreve("Exportar Dados")} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColors.hoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = themeColors.bgPage; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}><FiDownload /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Exportar meus dados</p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSub }}>Baixe um arquivo com seus dados.</p>
                  </div>
                </div>
                <FiChevronRight color={themeColors.textSub} />
              </div>

              <div 
                onClick={() => abrirEmBreve("Excluir Conta")} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColors.hoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = themeColors.bgPage; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}><FiTrash2 /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Excluir conta</p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSub }}>Exclua sua conta permanentemente.</p>
                  </div>
                </div>
                <FiChevronRight color={themeColors.textSub} />
              </div>

              <div 
                onClick={() => abrirEmBreve("Sair da Conta")} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: themeColors.bgPage, border: `1px solid ${themeColors.borderStrong}`, borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColors.hoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = themeColors.bgPage; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}><FiLogOut /></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: themeColors.textMain }}>Sair da conta</p>
                    <p style={{ margin: 0, fontSize: '12px', color: themeColors.textSub }}>Desconecte-se da sua conta atual.</p>
                  </div>
                </div>
                <FiChevronRight color={themeColors.textSub} />
              </div>
            </div>
          </div>

          {/* Sobre o App */}
          <div style={{ backgroundColor: themeColors.bgCard, borderRadius: '24px', padding: '24px', border: `1px solid ${themeColors.border}` }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: themeColors.textMain }}>Sobre o sistema</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: themeColors.textMain }}><FiInfo color={themeColors.textSub} /> Versão</span>
                <span style={{ fontSize: '13px', color: themeColors.textSub, fontWeight: '600' }}>1.2.0</span>
              </div>
              <div onClick={() => abrirEmBreve("Termos de Uso")} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: themeColors.textMain }}><FiFileText color={themeColors.textSub} /> Termos de uso</span>
                <FiChevronRight color={themeColors.textSub} />
              </div>
              <div onClick={() => abrirEmBreve("Política de Privacidade")} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: themeColors.textMain }}><FiShield color={themeColors.textSub} /> Política de privacidade</span>
                <FiChevronRight color={themeColors.textSub} />
              </div>
            </div>
          </div>

          {/* Banner de Ajuda */}
          <div style={{ backgroundColor: themeColors.bannerBg, borderRadius: '24px', padding: '24px', border: `1px solid ${themeColors.bannerBorder}`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: themeColors.textMain }}>Precisa de ajuda?</h3>
            <p style={{ margin: 0, fontSize: '13px', color: themeColors.bannerText }}>Nossa equipe está pronta para te ajudar a configurar tudo.</p>
            <button 
              onClick={() => abrirEmBreve("Central de Ajuda")}
              style={{ padding: '12px 0', backgroundColor: themeColors.bgCard, border: `1px solid ${themeColors.borderStrong}`, borderRadius: '12px', color: '#7e22ce', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Abrir central de ajuda <FiChevronRight />
            </button>
          </div>

        </div>
      </div>

      {/* MODAL POPUP EM BREVE GERAL */}
      {mostrarPopupEmBreve && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: themeColors.bgCard, borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: `1px solid ${themeColors.border}`, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <FiInfo size={26} />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: themeColors.textMain }}>{tituloPopup}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: themeColors.textSub, lineHeight: '1.5' }}>Esta funcionalidade estará disponível em breve!</p>
            <button onClick={() => setMostrarPopupEmBreve(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}

    </div>
  );
};