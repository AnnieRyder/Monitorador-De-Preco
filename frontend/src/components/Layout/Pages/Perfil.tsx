// frontend/src/components/Layout/Pages/Perfil.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSettings, FiChevronRight, FiTag, FiBell, FiTrendingUp, FiTrendingDown,
  FiBarChart2, FiUser, FiShield, FiCreditCard, FiGift, FiSliders, 
  FiShoppingCart, FiMoon, FiHelpCircle, FiMessageSquare, FiInfo, FiStar, FiEdit2, FiCalendar
} from 'react-icons/fi';
import { useLayoutContext } from '../../ResponsivoLayout';

export const Perfil = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Estados do Modal local do Perfil
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  
  // LÓGICA DE DADOS DINÂMICOS (SINCRONIA COM HOME E ALERTAS)
  
  const context = useLayoutContext();
  const notificacoes = context?.notificacoes || [];
  
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    const carregarDados = async () => {
      try {
        const apiUrl = `http://${window.location.hostname}:5000/api/produtos`;
        const resposta = await fetch(apiUrl);
        if (resposta.ok) {
          const dados = await resposta.json();
          setProdutos(dados);
        }
      } catch (erro) {
        console.error("Erro ao carregar dados do Perfil:", erro);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // CÁLCULOS DINÂMICOS REAIS BASEADOS NO BANCO DE DADOS
  const totalProdutos = produtos.length;
  
  const totalEconomizado = produtos.reduce((acc: number, p: any) => {
    const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
    const maiorPrecoHistorico = p.historico && p.historico.length > 0 ? Math.max(...p.historico.map((h: any) => h.preco)) : precoAtual;
    const precoReferencia = p.precoOriginalDaLoja || maiorPrecoHistorico;

    if (precoReferencia > precoAtual && precoAtual > 0) {
      return acc + (precoReferencia - precoAtual);
    }
    return acc;
  }, 0);

  const alertasDisparados = produtos.filter((p: any) => {
    const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
    return precoAtual > 0 && p.precoAlvo > 0 && precoAtual <= p.precoAlvo;
  }).length;

  const alertasAtivos = produtos.filter((p: any) => {
    const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
    const lojaLower = (p.loja || '').toLowerCase();
    const bloqueada = lojaLower.includes('kabum') || lojaLower.includes('magazine luiza') || lojaLower.includes('magalu');
    return !bloqueada && precoAtual > 0 && p.precoAlvo > 0 && precoAtual > p.precoAlvo;
  }).length;

  // Calcula quantas lojas diferentes o usuário está monitorando
  const lojasAcompanhadas = new Set(produtos.map(p => p.loja).filter(Boolean)).size;

  const usuario = {
    nome: "Rayane Vitoria",
    email: "rayaneic7@gmail.com",
    plano: "Plano Gratuito"
  };

  const acaoItem = (titulo: string, emBreve: boolean) => {
    if (emBreve) {
      setModalTitle(titulo);
      setModalVisible(true);
    }
  };

 
  // LISTAS DA VERSÃO MOBILE (MANTIDAS INTACTAS)
  
  const menuMinhaContaMobile = [
    { titulo: 'Dados pessoais', sub: 'Nome, e-mail e senha', icon: <FiUser size={18} color="#3b82f6" />, emBreve: true },
    { titulo: 'Segurança', sub: 'Altere sua senha e preferências de segurança', icon: <FiShield size={18} color="#22c55e" />, emBreve: true },
    { titulo: 'Plano e assinatura', sub: 'Gerencie seu plano atual', icon: <FiCreditCard size={18} color="#a855f7" />, emBreve: true },
    { titulo: 'Indique e ganhe', sub: 'Convide amigos e ganhe benefícios', icon: <FiGift size={18} color="#f97316" />, emBreve: true },
  ];

  const menuPreferenciasMobile = [
    { titulo: 'Notificações', sub: 'Gerencie como você recebe alertas', icon: <FiBell size={18} color="#ef4444" />, emBreve: true },
    { titulo: 'Preferências de alerta', sub: 'Configure suas regras e limites', icon: <FiSliders size={18} color="#06b6d4" />, emBreve: true },
    { titulo: 'Lojas favoritas', sub: 'Gerencie suas lojas preferidas', icon: <FiShoppingCart size={18} color="#2563eb" />, emBreve: true },
    { titulo: 'Tema do aplicativo', sub: '', icon: <FiMoon size={18} color="#6366f1" />, extra: <span style={{ fontSize: '12px', color: '#64748b', marginRight: '4px' }}>Claro</span>, emBreve: true },
  ];

  const menuSuporteMobile = [
    { titulo: 'Central de ajuda', sub: 'Tire suas dúvidas', icon: <FiHelpCircle size={18} color="#3b82f6" />, emBreve: true },
    { titulo: 'Fale conosco', sub: 'Entre em contato com nossa equipe', icon: <FiMessageSquare size={18} color="#22c55e" />, emBreve: true },
    { titulo: 'Sobre o app', sub: '', icon: <FiInfo size={18} color="#a855f7" />, extra: <span style={{ fontSize: '12px', color: '#64748b', marginRight: '4px' }}>Versão 1.0.0</span>, emBreve: true },
  ];

  const renderSectionMobile = (titulo: string, itens: any[]) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{titulo}</h3>
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        {itens.map((item, index) => (
          <div 
            key={index} 
            onClick={() => acaoItem(item.titulo, item.emBreve)}
            style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: index === itens.length - 1 ? 'none' : '1px solid #f1f5f9', cursor: 'pointer' }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '14px', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{item.titulo}</h4>
              {item.sub && <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</p>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {item.extra && item.extra}
              <FiChevronRight size={16} color="#cbd5e1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderItemListaWeb = (icon: any, title: string, subtitle: string, emBreve: boolean, badge?: string) => (
    <div 
      onClick={() => acaoItem(title, emBreve)}
      style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f8fafc', cursor: 'pointer', transition: 'background-color 0.2s' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <div style={{ marginRight: '16px', display: 'flex', color: '#475569' }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{title}</h4>
        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{subtitle}</p>
      </div>
      {badge && <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700', marginRight: '8px' }}>{badge}</span>}
      <FiChevronRight size={16} color="#94a3b8" />
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Meu Perfil</h1>
            <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Gerencie sua conta e preferências</p>
          </div>
          <FiSettings size={22} color="#475569" style={{ marginTop: '4px', cursor: 'pointer' }} onClick={() => navigate('/configuracoes')} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '16px', borderRadius: '20px', border: '1px solid #f1f5f9', marginBottom: '24px', cursor: 'pointer' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid #e0e7ff' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>RV</span>
          </div>
          <div style={{ marginLeft: '16px', flex: 1, minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{usuario.nome}</h2>
            <p style={{ margin: '2px 0 6px 0', fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{usuario.email}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
              <FiStar size={11} fill="#2563eb" /> {usuario.plano}
            </div>
          </div>
          <FiChevronRight size={18} color="#cbd5e1" style={{ flexShrink: 0, marginLeft: '8px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
          {[
            { label: 'Produtos monitorados', valor: totalProdutos.toString(), icon: <FiTag size={20} color="#3b82f6" /> },
            { label: 'Alertas ativos', valor: alertasAtivos.toString(), icon: <FiBell size={20} color="#22c55e" /> },
            { label: 'Total economizado este mês', valor: `R$ ${totalEconomizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: <FiTrendingUp size={20} color="#eab308" /> },
            { label: 'Alertas disparados', valor: alertasDisparados.toString(), icon: <FiBarChart2 size={20} color="#a855f7" /> },
          ].map((est, idx) => (
            <div key={idx} style={{ backgroundColor: '#fff', padding: '14px', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {est.icon}
              <div>
                <span style={{ display: 'block', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{est.valor}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '500', marginTop: '2px', lineHeight: '1.3' }}>{est.label}</span>
              </div>
            </div>
          ))}
        </div>

        {renderSectionMobile('Minha conta', menuMinhaContaMobile)}
        {renderSectionMobile('Preferências', menuPreferenciasMobile)}
        {renderSectionMobile('Suporte e sobre', menuSuporteMobile)}

        {/* MODAL RESPONSIVO MOBILE */}
        {modalVisible && renderModalEmBreve()}
      </div>
    );
  }

  function renderModalEmBreve() {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%',
          maxWidth: '360px', textAlign: 'center', border: '1px solid #f1f5f9'
        }}>
          <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <FiInfo size={26} />
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{modalTitle}</h3>
          <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Esta funcionalidade estará disponível em breve!</p>
          <button onClick={() => setModalVisible(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
        </div>
      </div>
    );
  }

  
  //  VERSÃO DESKTOP (Sincronizada com Dados Reais)
  
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box' }}>
      
      {/* HEADER DESKTOP */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Meu perfil</h1>
        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Gerencie suas informações, preferências e plano.</p>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '22px' }}>RV</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{usuario.nome}</h2>
            <p style={{ margin: '2px 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>{usuario.email}</p>
            <span style={{ backgroundColor: '#f0f3ff', color: '#6366f1', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>✦ {usuario.plano}</span>
          </div>
        </div>
        <button 
          onClick={() => acaoItem("Editar perfil", true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#6366f1', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
        >
          <FiEdit2 size={14} /> Editar perfil
        </button>
      </div>

      {/* CARDS COM DADOS REAIS DO BANCO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '16px 20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f3e8ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiTag size={18} color="#a855f7" /></div>
          <div><h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{totalProdutos}</h3><p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Produtos monitorados</p></div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '16px 20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0fdf4', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiBell size={18} color="#16a34a" /></div>
          <div><h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{alertasAtivos}</h3><p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Alertas ativos</p></div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '16px 20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#fff7ed', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiTrendingDown size={18} color="#ea580c" /></div>
          <div><h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>R$ {totalEconomizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3><p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Total economizado</p></div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '16px 20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#eff6ff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiBarChart2 size={18} color="#2563eb" /></div>
          <div><h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{alertasDisparados}</h3><p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Alertas disparados</p></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.1fr', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', padding: '12px 0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '12px 24px 16px 24px' }}>Minha conta</h3>
            {/* Todos com "true" para abrir o modal Em Breve */}
            {renderItemListaWeb(<FiUser size={18} color="#3b82f6" />, "Dados pessoais", "Nome, e-mail e informações de contato", true)}
            {renderItemListaWeb(<FiShield size={18} color="#10b981" />, "Segurança", "Senha e autenticação", true)}
            {renderItemListaWeb(<FiCreditCard size={18} color="#8b5cf6" />, "Plano e assinatura", "Gerencie seu plano atual", true, usuario.plano)}
            {renderItemListaWeb(<FiGift size={18} color="#f59e0b" />, "Indique e ganhe", "Convide amigos e ganhe benefícios", true)}
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', padding: '12px 0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '12px 24px 16px 24px' }}>Preferências</h3>
            {/*  Todos com "true" para abrir o modal Em Breve */}
            {renderItemListaWeb(<FiBell size={18} color="#ec4899" />, "Notificações", "Gerencie como você recebe alertas", true)}
            {renderItemListaWeb(<FiSliders size={18} color="#14b8a6" />, "Preferências de alerta", "Configure suas regras e limites", true)}
            {renderItemListaWeb(<FiShoppingCart size={18} color="#6366f1" />, "Lojas favoritas", "Gerencie suas lojas preferidas", true)}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* RESUMO DA CONTA SINCRONIZADO */}
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' }}>Resumo da conta</h3>
            <div style={{ backgroundColor: '#f0f5ff', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e3a8a' }}>Continue monitorando e economizando!</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#3b82f6', fontWeight: '500' }}>Você já economizou R$ {totalEconomizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', fontWeight: '500' }}><span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FiCalendar size={14} /> Membro desde</span><strong style={{ color: '#334155' }}>15/03/2024</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', fontWeight: '500' }}><span>Total economizado</span><strong style={{ color: '#334155' }}>R$ {totalEconomizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', fontWeight: '500' }}><span>Produtos monitorados</span><strong style={{ color: '#334155' }}>{totalProdutos}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', fontWeight: '500' }}><span>Alertas disparados</span><strong style={{ color: '#334155' }}>{alertasDisparados}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', fontWeight: '500' }}><span>Lojas acompanhadas</span><strong style={{ color: '#334155' }}>{lojasAcompanhadas}</strong></div>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', padding: '12px 0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '12px 24px 16px 24px' }}>Outras opções</h3>
            {renderItemListaWeb(<FiHelpCircle size={18} color="#2563eb" />, "Central de ajuda", "Tire suas dúvidas", true)}
            {renderItemListaWeb(<FiMessageSquare size={18} color="#16a34a" />, "Fale conosco", "Entre em contato com nossa equipe", true)}
            {renderItemListaWeb(<FiInfo size={18} color="#4b5563" />, "Sobre o PreçoCerto", "Versão 1.2.0", true)}
          </div>
        </div>
      </div>

      {modalVisible && renderModalEmBreve()}
    </div>
  );
};