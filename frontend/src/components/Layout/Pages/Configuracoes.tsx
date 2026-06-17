// frontend/src/components/Layout/Pages/Configuracoes.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiBell, 
  FiMail, 
  FiMessageSquare, 
  FiTrendingDown, 
  FiClock, 
  FiBellOff, 
  FiFileText, 
  FiMoon, 
  FiGlobe, 
  FiDollarSign, 
  FiMaximize2, 
  FiShield, 
  FiCloudLightning, 
  FiTrash2,
  FiChevronRight
} from 'react-icons/fi';

export const Configuracoes = () => {
  const navigate = useNavigate();

  // Estados para os toggles de notificações
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);

  // Estilo base do Switch (Toggle pill)
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
            {/* Ícone Redondinho */}
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '10px', 
              backgroundColor: item.bgColor || '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: '14px', flexShrink: 0 
            }}>
              {item.icon}
            </div>
            
            {/* Textos */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.titulo}</h4>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>{item.sub}</p>
            </div>

            {/* Ação da Direita: Toggle ou Seta */}
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

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '120px' }}>
      
      {/* HEADER */}
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

      {/* LISTAGEM DAS SEÇÕES DINÂMICAS */}
      {renderSection('Notificações', secaoNotificacoes)}
      {renderSection('Preferências de alerta', secaoPreferencias)}
      {renderSection('Geral', secaoGeral)}
      {renderSection('Conta e dados', secaoConta)}

    </div>
  );
};