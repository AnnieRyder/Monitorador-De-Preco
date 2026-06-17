// frontend/src/components/Layout/Pages/Perfil.tsx
import { 
  FiSettings, 
  FiChevronRight, 
  FiTag, 
  FiBell, 
  FiTrendingUp, 
  FiBarChart2, 
  FiUser, 
  FiShield, 
  FiCreditCard, 
  FiGift, 
  FiSliders, 
  FiShoppingCart, 
  FiMoon, 
  FiHelpCircle, 
  FiMessageSquare, 
  FiInfo,
  FiStar
} from 'react-icons/fi';

export const Perfil = () => {
  // Alinhando as estatísticas com o ecossistema dos seus mocks anteriores
  const estatisticas = [
    { label: 'Produtos monitorados', valor: '12', icon: <FiTag size={20} color="#3b82f6" /> },
    { label: 'Alertas ativos', valor: '5', icon: <FiBell size={20} color="#22c55e" /> },
    { label: 'Total economizado este mês', valor: 'R$ 867,30', icon: <FiTrendingUp size={20} color="#eab308" /> },
    { label: 'Alertas recebidos', valor: '28', icon: <FiBarChart2 size={20} color="#a855f7" /> },
  ];

  const menuMinhaConta = [
    { titulo: 'Dados pessoais', sub: 'Nome, e-mail e senha', icon: <FiUser size={18} color="#3b82f6" /> },
    { titulo: 'Segurança', sub: 'Altere sua senha e preferências de segurança', icon: <FiShield size={18} color="#22c55e" /> },
    { titulo: 'Plano e assinatura', sub: 'Gerencie seu plano atual', icon: <FiCreditCard size={18} color="#a855f7" />, extra: <span style={{ fontSize: '12px', fontWeight: '600', color: '#2563eb', marginRight: '4px', cursor: 'pointer' }}>Fazer upgrade</span> },
    { titulo: 'Indique e ganhe', sub: 'Convide amigos e ganhe benefícios', icon: <FiGift size={18} color="#f97316" /> },
  ];

  const menuPreferencias = [
    { titulo: 'Notificações', sub: 'Gerencie como você recebe alertas', icon: <FiBell size={18} color="#ef4444" /> },
    { titulo: 'Preferências de alerta', sub: 'Configure suas regras e limites', icon: <FiSliders size={18} color="#06b6d4" /> },
    { titulo: 'Lojas favoritas', sub: 'Gerencie suas lojas preferidas', icon: <FiShoppingCart size={18} color="#2563eb" /> },
    { titulo: 'Tema do aplicativo', sub: '', icon: <FiMoon size={18} color="#6366f1" />, extra: <span style={{ fontSize: '12px', color: '#64748b', marginRight: '4px' }}>Claro</span> },
  ];

  const menuSuporte = [
    { titulo: 'Central de ajuda', sub: 'Tire suas dúvidas', icon: <FiHelpCircle size={18} color="#3b82f6" /> },
    { titulo: 'Fale conosco', sub: 'Entre em contato com nossa equipe', icon: <FiMessageSquare size={18} color="#22c55e" /> },
    { titulo: 'Sobre o app', sub: '', icon: <FiInfo size={18} color="#a855f7" />, extra: <span style={{ fontSize: '12px', color: '#64748b', marginRight: '4px' }}>Versão 1.0.0</span> },
  ];

  const renderSection = (titulo: string, itens: any[]) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{titulo}</h3>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        {itens.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '14px 16px', 
              borderBottom: index === itens.length - 1 ? 'none' : '1px solid #f1f5f9',
              cursor: 'pointer'
            }}
          >
            {/* Ícone Redondinho com BG Suave */}
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '10px', 
              backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: '14px', flexShrink: 0 
            }}>
              {item.icon}
            </div>
            
            {/* Textos Informativos */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.titulo}</h4>
              {item.sub && <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</p>}
            </div>

            {/* Elemento Extra (Texto de Versão, Upgrade ou Tema) + Seta */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {item.extra && item.extra}
              <FiChevronRight size={16} color="#cbd5e1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '120px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Meu Perfil</h1>
          <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Gerencie sua conta e preferências</p>
        </div>
        <FiSettings size={22} color="#475569" style={{ marginTop: '4px', cursor: 'pointer' }} />
      </div>

      {/* CARD DO USUÁRIO CUSTOMIZADO */}
      <div style={{ 
        display: 'flex', alignItems: 'center', backgroundColor: '#fff', 
        padding: '16px', borderRadius: '20px', border: '1px solid #f1f5f9', marginBottom: '24px',
        cursor: 'pointer'
      }}>
        {/* Avatar customizado com iniciais ou placeholder elegante */}
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eff6ff', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          border: '2px solid #bfdbfe'
        }}>
          <FiUser size={28} color="#2563eb" />
        </div>

        {/* Informações da Conta */}
        <div style={{ marginLeft: '16px', flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Rayane Vitoria</h2>
          <p style={{ margin: '2px 0 6px 0', fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>rayaneic7@gmail.com</p>
          
          {/* Badge de Plano */}
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '6px', 
            fontSize: '11px', fontWeight: '700' 
          }}>
            <FiStar size={11} fill="#2563eb" /> Plano Gratuito
          </div>
        </div>
        <FiChevronRight size={18} color="#cbd5e1" style={{ flexShrink: 0, marginLeft: '8px' }} />
      </div>

      {/* GRADE DE ESTATÍSTICAS (Grid 2x2 perfeitamente distribuído) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px', 
        marginBottom: '28px' 
      }}>
        {estatisticas.map((est, idx) => (
          <div key={idx} style={{ 
            backgroundColor: '#fff', padding: '14px', borderRadius: '16px', 
            border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' 
          }}>
            {est.icon}
            <div>
              <span style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{est.valor}</span>
              <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '500', marginTop: '2px', lineHeight: '1.3' }}>{est.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LISTAGENS DE SEÇÕES */}
      {renderSection('Minha conta', menuMinhaConta)}
      {renderSection('Preferências', menuPreferencias)}
      {renderSection('Suporte e sobre', menuSuporte)}

    </div>
  );
};