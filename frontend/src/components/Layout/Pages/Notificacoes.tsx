// frontend/src/components/Layout/Pages/Notificacoes.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBell, FiCheckCircle, FiClock, FiBellOff, 
  FiSearch, FiSliders, FiMoreVertical, FiEdit2, 
  FiChevronLeft, FiChevronRight, FiInfo, FiX, FiFilter,
  FiArrowDown, FiArrowUp, FiTag, FiVolume2, FiSettings
} from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { useLayoutContext } from '../../ResponsivoLayout';

export const Notificacoes = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const context = useLayoutContext();
  const termoBusca = context?.termoBusca || "";
  const setNotificacoes = context?.setNotificacoes || (() => {});
  const notificacoesGlobais = context?.notificacoes || [];

  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros e Abas Desktop
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [filtroStatus, setFiltroStatus] = useState('Todos os status');
  const [filtroLoja, setFiltroLoja] = useState('Todas as lojas');
  
  // Paginação Desktop
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Modais Desktop
  const [mostrarPopupEmBreve, setMostrarPopupEmBreve] = useState(false);
  const [tituloPopup, setTituloPopup] = useState("");
  const [mostrarModalEdit, setMostrarModalEdit] = useState(false);
  const [alertaEditando, setAlertaEditando] = useState<any>(null);
  const [novoPrecoAlvo, setNovoPrecoAlvo] = useState("");

  const abrirEmBreve = (titulo: string) => {
    setTituloPopup(titulo);
    setMostrarPopupEmBreve(true);
  };

  const carregarAlertas = async () => {
    try {
      const apiUrl = `http://${window.location.hostname}:5000/api/produtos`;
      const resposta = await fetch(apiUrl);
      if (!resposta.ok) throw new Error('Erro ao buscar produtos');
      const dados = await resposta.json();

      const novasNotificacoes: any[] = [];

      const alertasMapeados = dados.map((p: any) => {
        const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
        const precoAlvo = p.precoAlvo || 0;
        const lojaLower = (p.loja || '').toLowerCase();
        
        let status = 'Ativo';
        if (lojaLower.includes('kabum') || lojaLower.includes('magazine luiza') || lojaLower.includes('magalu')) {
          status = 'Pausado';
        } else if (precoAtual > 0 && precoAlvo > 0 && precoAtual <= precoAlvo) {
          status = 'Disparado';
          if (!notificacoesGlobais.some((n:any) => n.id === `meta-${p.id}`)) {
            novasNotificacoes.push({ id: `meta-${p.id}`, produtoId: p.id, texto: `🎯 Meta atingida! ${p.nome} está por R$ ${precoAtual.toLocaleString('pt-BR')}`, lida: false });
          }
        } else if (precoAtual === 0) {
          status = 'Aguardando';
        }

        if (p.historico && p.historico.length >= 2) {
          const atual = p.historico[0].preco;
          const anterior = p.historico[1].preco;
          if (atual < anterior && !notificacoesGlobais.some((n:any) => n.id === `queda-${p.id}-${atual}`)) {
            novasNotificacoes.push({ id: `queda-${p.id}-${atual}`, produtoId: p.id, texto: `📉 Queda de preço: ${p.nome} caiu para R$ ${atual.toLocaleString('pt-BR')}`, lida: false });
          } else if (atual > anterior && !notificacoesGlobais.some((n:any) => n.id === `alta-${p.id}-${atual}`)) {
            novasNotificacoes.push({ id: `alta-${p.id}-${atual}`, produtoId: p.id, texto: `📈 Aumento de preço: ${p.nome} subiu para R$ ${atual.toLocaleString('pt-BR')}`, lida: false });
          }
        }

        const dataCriacao = "15/05/2026"; 
        const horaCriacao = "14:30";

        return { ...p, precoAtual, precoAlvo, status, dataCriacao, horaCriacao };
      });

      setAlertas(alertasMapeados);
      
      if (novasNotificacoes.length > 0 && setNotificacoes) {
        setNotificacoes((prev: any) => [...prev, ...novasNotificacoes]);
      }

    } catch (erro) {
      console.error("Erro ao carregar alertas:", erro);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    carregarAlertas();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSalvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertaEditando) return;
    
    setAlertas(prev => prev.map(a => a.id === alertaEditando.id ? { ...a, precoAlvo: parseFloat(novoPrecoAlvo) } : a));
    setMostrarModalEdit(false);

    try {
      await fetch(`http://${window.location.hostname}:5000/api/produtos/${alertaEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ precoAlvo: parseFloat(novoPrecoAlvo) })
      });
      carregarAlertas(); 
    } catch (err) {
      console.error(err);
    }
  };

  const abrirEdicao = (alerta: any) => {
    setAlertaEditando(alerta);
    setNovoPrecoAlvo(alerta.precoAlvo.toString());
    setMostrarModalEdit(true);
  };

  const alertasFiltrados = alertas.filter(a => {
    const buscaOk = termoBusca === "" || a.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const abaOk = abaAtiva === 'Todos' || a.status === abaAtiva || (abaAtiva === 'Ativos' && a.status === 'Ativo') || (abaAtiva === 'Disparados' && a.status === 'Disparado') || (abaAtiva === 'Aguardando' && a.status === 'Aguardando') || (abaAtiva === 'Pausados' && a.status === 'Pausado');
    const statusOk = filtroStatus === 'Todos os status' || a.status === filtroStatus;
    const lojaOk = filtroLoja === 'Todas as lojas' || (a.loja && a.loja.toLowerCase().includes(filtroLoja.toLowerCase()));
    
    return buscaOk && abaOk && statusOk && lojaOk;
  });

  const totalPaginas = Math.ceil(alertasFiltrados.length / itensPorPagina) || 1;
  const alertasPaginados = alertasFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return { bg: '#ecfdf5', text: '#10b981', dot: '#10b981' };
      case 'Disparado': return { bg: '#f3e8ff', text: '#8b5cf6', dot: '#8b5cf6' };
      case 'Aguardando': return { bg: '#fff7ed', text: '#f97316', dot: '#f97316' };
      case 'Pausado': return { bg: '#f1f5f9', text: '#64748b', dot: '#64748b' };
      default: return { bg: '#f1f5f9', text: '#64748b', dot: '#64748b' };
    }
  };

  const totalAtivos = alertas.filter(a => a.status === 'Ativo').length;
  const totalDisparados = alertas.filter(a => a.status === 'Disparado').length;
  const totalAguardando = alertas.filter(a => a.status === 'Aguardando').length;
  const totalPausados = alertas.filter(a => a.status === 'Pausado').length;


  // ==========================================
  // ESTADOS ORIGINAIS DO SEU MOBILE
  // ==========================================
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');
  const filtros = [
    { id: 'Todas', label: 'Todas', qtd: 12 },
    { id: 'Caiu', label: 'Preço caiu', qtd: 8, icon: <FiArrowDown size={14} /> },
    { id: 'Subiu', label: 'Preço subiu', qtd: 2, icon: <FiArrowUp size={14} /> },
    { id: 'Outros', label: 'Outros', qtd: 2 },
  ];
  const notificacoesHoje = [
    { id: 1, tipo: 'caiu', titulo: 'Preço caiu!', desc: 'O preço do Headphone Sony WH-1000XM5 caiu de R$ 3.299,00 para R$ 2.699,00 na Amazon.', economia: 'Você economiza R$ 600,00', hora: '09:30', lido: false },
    { id: 2, tipo: 'caiu', titulo: 'Preço caiu!', desc: 'O preço da Air Fryer Philips Walita Série 3000 caiu de R$ 599,90 para R$ 449,90 na Magalu.', economia: 'Você economiza R$ 150,00', hora: '08:15', lido: false },
    { id: 3, tipo: 'caiu', titulo: 'Preço caiu!', desc: 'O preço do Smartwatch Xiaomi Redmi Watch 3 caiu de R$ 319,00 para R$ 259,90 no Mercado Livre.', economia: 'Você economiza R$ 59,10', hora: '07:45', lido: false },
  ];
  const notificacoesOntem = [
    { id: 4, tipo: 'nova_oferta', logo: 'A', titulo: 'Nova oferta disponível', desc: 'A Amazon publicou uma nova oferta no produto Kindle 11ª Geração.', hora: 'Ontem, 18:42', tagIcon: <FiTag size={14} color="#2563eb" />, iconBg: '#eff6ff' },
    { id: 5, tipo: 'subiu', logo: 'T', titulo: 'Preço subiu', desc: 'O preço da Camiseta Nike Sportswear subiu de R$ 129,90 para R$ 149,90 na Centauro.', hora: 'Ontem, 14:20', tagIcon: <FiArrowUp size={14} color="#ef4444" />, iconBg: '#fef2f2' },
    { id: 6, tipo: 'alerta_ativado', logo: 'B', titulo: 'Alerta activado', desc: 'Seu alerta de preço para o produto Console Xbox Series S foi ativado com sucesso.', hora: 'Ontem, 09:10', tagIcon: <FiBell size={14} color="#16a34a" />, iconBg: '#f0fdf4' },
  ];
  const notificacoesSemana = [
    { id: 7, tipo: 'promocao', logo: 'M', titulo: 'Promoção especial', desc: 'A Magazine Luiza está com até 30% OFF em produtos selecionados!', hora: 'Sex, 16:30', tagIcon: <FiVolume2 size={14} color="#a855f7" />, iconBg: '#faf5ff' },
    { id: 8, tipo: 'cupom', logo: 'S', titulo: 'Cupom disponível', desc: 'Cupom de 10% OFF na Shopee para produtos de Casa e Decoração.', hora: 'Qui, 11:05', tagIcon: <FiVolume2 size={14} color="#a855f7" />, iconBg: '#faf5ff' },
  ];


  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontWeight: 'bold' }}>Carregando alertas...</div>;
  }

  // ==========================================
  // MOBILE RENDER (100% INTACTO DO SEU CÓDIGO)
  // ==========================================
  if (isMobile) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '100px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>Notificações</h1>
              <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Fique por dentro das mudanças de preço</p>
            </div>
          </div>
          <FiSettings size={22} color="#475569" style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => navigate('/configuracoes')} />
        </div>

        {/* FILTROS HORIZONTAIS */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
          {filtros.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltroAtivo(f.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px',
                border: '1px solid', borderColor: filtroAtivo === f.id ? '#e0effe' : '#e2e8f0',
                backgroundColor: filtroAtivo === f.id ? '#eff6ff' : '#fff',
                color: filtroAtivo === f.id ? '#2563eb' : '#475569',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s'
              }}
            >
              {f.icon && f.icon}
              {f.label}
              <span style={{ 
                fontSize: '11px', padding: '1px 6px', borderRadius: '8px', 
                backgroundColor: filtroAtivo === f.id ? '#3b82f6' : '#f1f5f9',
                color: filtroAtivo === f.id ? '#fff' : '#64748b', marginLeft: '2px'
              }}>{f.qtd}</span>
            </button>
          ))}
        </div>

        {/* SEÇÃO: HOJE */}
        <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 12px 4px' }}>Hoje</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {notificacoesHoje.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item.hora}</span>
                {!item.lido && <div style={{ width: '6px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />}
              </div>
              
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', borderRadius: '12px', flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                  <FiArrowDown size={12} color="#16a34a" />
                </div>
              </div>

              <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '20px' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{item.titulo}</h4>
                <p style={{ margin: '3px 0 6px 0', fontSize: '12px', color: '#475569', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</p>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a' }}>{item.economia}</span>
              </div>
              <FiChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* SEÇÃO: ONTEM */}
        <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 12px 4px' }}>Ontem</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {notificacoesOntem.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item.hora}</span>
              
              <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#0f172a', flexShrink: 0, position: 'relative' }}>
                {item.logo}
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                  {item.tagIcon}
                </div>
              </div>

              <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{item.titulo}</h4>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{item.desc}</p>
              </div>
              <FiChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* SEÇÃO: ESTA SEMANA */}
        <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 12px 4px' }}>Esta semana</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notificacoesSemana.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item.hora}</span>
              
              <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#0f172a', flexShrink: 0, position: 'relative' }}>
                {item.logo}
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                  {item.tagIcon}
                </div>
              </div>

              <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '4px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{item.titulo}</h4>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{item.desc}</p>
              </div>
              <FiChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

      </div>
    );
  }

  // ==========================================
  // DESKTOP RENDER (NOVO MOCKUP FIEL - ALERTAS)
  // ==========================================
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. CABEÇALHO */}
      <div style={{ marginBottom: '32px', paddingTop: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Alertas</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#64748b' }}>
          Acompanhe todos os alertas dos seus produtos e lojas favoritas.
        </p>
      </div>

      {/* 2. LAYOUT PRINCIPAL (Split Grid) */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        
        {/* ESQUERDA: CONTEÚDO PRINCIPAL */}
        <div style={{ flex: 1, minWidth: 0 }}>
          
          {/* CARDS DE RESUMO */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: '#f3e8ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiBell size={24} color="#8b5cf6" /></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{totalAtivos}</h3>
                <p style={{ margin: '2px 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Alertas ativos</p>
                <span onClick={() => { setAbaAtiva('Ativos'); setFiltroStatus('Ativo'); setPaginaAtual(1); }} style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Ver todos</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: '#ecfdf5', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiCheckCircle size={24} color="#10b981" /></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{totalDisparados}</h3>
                <p style={{ margin: '2px 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Alertas disparados</p>
                <span onClick={() => abrirEmBreve('Histórico de Disparos')} style={{ fontSize: '12px', color: '#10b981', fontWeight: '700', cursor: 'pointer' }}>Ver histórico</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: '#fff7ed', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiClock size={24} color="#f97316" /></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{totalAguardando}</h3>
                <p style={{ margin: '2px 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '600', whiteSpace: 'nowrap' }}>Aguardando condições</p>
                <span onClick={() => abrirEmBreve('Detalhes de Condições')} style={{ fontSize: '12px', color: '#f97316', fontWeight: '700', cursor: 'pointer' }}>Ver detalhes</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: '#eff6ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiBellOff size={24} color="#3b82f6" /></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{totalPausados}</h3>
                <p style={{ margin: '2px 0 4px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Alertas pausados</p>
                <span onClick={() => { setAbaAtiva('Pausados'); setFiltroStatus('Pausado'); setPaginaAtual(1); }} style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '700', cursor: 'pointer' }}>Ver pausados</span>
              </div>
            </div>
          </div>

          {/* BACKGROUND BRANCO PARA TABELA */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9' }}>
            
            {/* ABAS */}
            <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
              {['Todos', 'Ativos', 'Disparados', 'Aguardando', 'Pausados'].map(aba => {
                const ativo = abaAtiva === aba;
                return (
                  <button 
                    key={aba} onClick={() => { setAbaAtiva(aba); setPaginaAtual(1); }}
                    style={{ 
                      background: 'none', border: 'none', padding: '0 0 16px 0', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                      color: ativo ? '#6366f1' : '#64748b', borderBottom: ativo ? '2px solid #6366f1' : '2px solid transparent',
                      marginBottom: '-1px', transition: 'all 0.2s'
                    }}
                  >
                    {aba}
                  </button>
                );
              })}
            </div>

            {/* TABELA DE ALERTAS */}
            <div style={{ width: '100%', borderCollapse: 'collapse' }}>
              {/* Header da Tabela */}
              <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1.2fr 1.2fr 1fr 1fr 80px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>Alerta</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>Condição</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>Preço alvo</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>Status</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8' }}>Criado em</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textAlign: 'right' }}>Ações</span>
              </div>

              {/* Linhas da Tabela */}
              {alertasPaginados.map(a => {
                const cores = getStatusColor(a.status);
                return (
                  <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1.2fr 1.2fr 1fr 1fr 80px', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                    
                    {/* Alerta (Img + Nome + Loja) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '16px' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '12px', padding: '6px', border: '1px solid #f1f5f9', flexShrink: 0 }}>
                        <img src={a.imagem || 'https://via.placeholder.com/48'} alt={a.nome} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.nome}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{a.loja}</span>
                        </div>
                      </div>
                    </div>

                    {/* Condição */}
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569', fontWeight: '500' }}>Preço menor que</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748b' }}>R$ {a.precoAlvo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>

                    {/* Preço Alvo */}
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '800', color: '#10b981' }}>R$ {a.precoAlvo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: cores.bg, padding: '6px 10px', borderRadius: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cores.dot }} />
                        <span style={{ fontSize: '12px', fontWeight: '700', color: cores.text }}>{a.status}</span>
                      </div>
                    </div>

                    {/* Criado em */}
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569', fontWeight: '500' }}>{a.dataCriacao}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748b' }}>{a.horaCriacao}</p>
                    </div>

                    {/* Ações */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                      <button 
                        onClick={() => abrirEdicao(a)} 
                        style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        onClick={() => abrirEmBreve("Mais opções")} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                      >
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {alertasPaginados.length === 0 && (
                <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  Nenhum alerta encontrado para os filtros atuais.
                </div>
              )}
            </div>

            {/* CONTROLES DE PAGINAÇÃO REAIS (1, 2, 3...) */}
            {totalPaginas > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '32px' }}>
                <button 
                  onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                  disabled={paginaAtual === 1}
                  style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer', opacity: paginaAtual === 1 ? 0.5 : 1 }}
                >
                  <FiChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                  <button 
                    key={num} onClick={() => setPaginaAtual(num)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', border: num === paginaAtual ? 'none' : '1px solid #e2e8f0', backgroundColor: num === paginaAtual ? '#8b5cf6' : '#fff', color: num === paginaAtual ? '#fff' : '#64748b', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    {num}
                  </button>
                ))}

                <button 
                  onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaAtual === totalPaginas}
                  style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer', opacity: paginaAtual === totalPaginas ? 0.5 : 1 }}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DIREITA: SIDEBAR FILTROS & DICAS */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          
          {/* Caixa de Filtros */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Filtros</h3>
              <span onClick={() => abrirEmBreve("Limpar Filtros")} style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Limpar</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Status</label>
                <select value={filtroStatus} onChange={(e) => { setFiltroStatus(e.target.value); setPaginaAtual(1); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '13px', fontWeight: '500', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}>
                  <option>Todos os status</option>
                  <option>Ativo</option>
                  <option>Disparado</option>
                  <option>Aguardando</option>
                  <option>Pausado</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Lojas</label>
                <select value={filtroLoja} onChange={(e) => { setFiltroLoja(e.target.value); setPaginaAtual(1); }} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '13px', fontWeight: '500', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}>
                  <option>Todas as lojas</option>
                  <option>Amazon</option>
                  <option>Mercado Livre</option>
                  <option>Magazine Luiza</option>
                  <option>KaBuM</option>
                  <option>Centauro</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Categorias</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '13px', fontWeight: '500', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}>
                  <option>Todas as categorias</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Criado em</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '13px', fontWeight: '500', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}>
                  <option>Qualquer data</option>
                </select>
              </div>

              <button 
                onClick={() => abrirEmBreve("Aplicar Filtros")}
                style={{ width: '100%', padding: '14px 0', backgroundColor: '#8b5cf6', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', marginTop: '8px' }}
              >
                <FiFilter size={16} /> Aplicar filtros
              </button>
            </div>
          </div>

          {/* Dicas para Alertas */}
          <div style={{ backgroundColor: '#faf5ff', borderRadius: '24px', padding: '24px', border: '1px solid #f3e8ff', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#4c1d95' }}>Dicas para alertas</h3>
              <HiOutlineLightBulb size={24} color="#8b5cf6" />
            </div>

            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <FiCheckCircle size={16} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: '#5b21b6', lineHeight: '1.4', fontWeight: '500' }}>Seja específico no preço alvo para melhores resultados.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <FiCheckCircle size={16} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: '#5b21b6', lineHeight: '1.4', fontWeight: '500' }}>Ative alertas de disponibilidade para não perder oportunidades.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <FiCheckCircle size={16} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: '#5b21b6', lineHeight: '1.4', fontWeight: '500' }}>Você receberá notificações por e-mail e no sininho.</span>
              </li>
            </ul>

            <button 
              onClick={() => abrirEmBreve("Dicas Completas de Alerta")}
              style={{ padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #e9d5ff', borderRadius: '10px', color: '#8b5cf6', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginTop: '24px' }}
            >
              Saiba mais
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Como funcionam?</span>
            <span onClick={() => abrirEmBreve("Como Funcionam os Alertas?")} style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Entenda como os alertas funcionam <FiChevronRight size={14} />
            </span>
          </div>

        </div>
      </div>

      {/* MODAL DE EDIÇÃO DE PREÇO ALVO (FUNCIONAL) */}
      {mostrarModalEdit && alertaEditando && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(6px)' }}>
          <form onSubmit={handleSalvarEdicao} style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '400px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Editar Alerta</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Configure o gatilho para {alertaEditando.nome}</p>
              </div>
              <button type="button" onClick={() => setMostrarModalEdit(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><FiX size={18} /></button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Me notifique se for abaixo de:</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: '700' }}>R$</span>
                <input 
                  required type="number" step="0.01" 
                  value={novoPrecoAlvo} onChange={(e) => setNovoPrecoAlvo(e.target.value)} 
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontWeight: '600', outlineColor: '#8b5cf6' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => setMostrarModalEdit(false)} style={{ flex: 1, padding: '14px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '12px', color: '#475569', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancelar</button>
              <button type="submit" style={{ flex: 2, padding: '14px', backgroundColor: '#8b5cf6', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)' }}>Salvar</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL POPUP EM BREVE GERAL */}
      {mostrarPopupEmBreve && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#8b5cf6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <FiInfo size={26} />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{tituloPopup}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Esta funcionalidade estará disponível em breve!</p>
            <button onClick={() => setMostrarPopupEmBreve(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}

    </div>
  );
};