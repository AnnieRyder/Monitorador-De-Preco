// frontend/src/components/Layout/Pages/Home.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBell, FiTag, FiTrendingDown, FiDollarSign, 
  FiPieChart, FiStar, FiChevronRight, FiChevronLeft, FiSearch, FiInfo, FiEye, FiSettings
} from 'react-icons/fi';

import { DashboardResumo } from '../../../Dashboard/DashboardResumo';
import { useLayoutContext } from '../../ResponsivoLayout';

// ⚡ COMPONENTE DE CARD INTERNO PARA O MOBILE (Garante que a imagem carregue)
const CardProdutoMobile = ({ nome, loja, precoAtual, precoAntigo, desconto, imagem }: any) => (
  <div style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '20px', padding: '16px', border: '1px solid #f1f5f9', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
    
    <div style={{ width: '80px', height: '80px', backgroundColor: '#f8fafc', borderRadius: '12px', flexShrink: 0, padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
      {imagem ? (
        <img src={imagem} alt={nome} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      ) : (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0', borderRadius: '8px' }} />
      )}
    </div>
    
    <div style={{ marginLeft: '16px', flex: 1, minWidth: 0, paddingRight: '20px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nome}</h4>
      <p style={{ margin: '2px 0 8px 0', fontSize: '12px', color: '#64748b' }}>{loja}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#16a34a', fontSize: '14px', fontWeight: '800' }}>
          {precoAtual}
        </span>
      </div>
      
      {/* ⚡ Exibe o Preço Antigo Riscado embaixo */}
      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#94a3b8', textDecoration: precoAntigo ? 'line-through' : 'none' }}>
        {precoAntigo ? precoAntigo : '\u00A0'}
      </p>
    </div>
    
    {desconto ? (
      <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
        <span style={{ backgroundColor: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>
          {desconto}
        </span>
      </div>
    ) : (
      <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
        <span style={{ backgroundColor: '#f1f5f9', color: '#94a3b8', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}>
          -
        </span>
      </div>
    )}
  </div>
);

export const Home = () => {
  const navigate = useNavigate();
  
  // ⚡ CONTEXTO INJETADO
  const context = useLayoutContext();
  const termoBusca = context?.termoBusca || "";
  const setTermoBusca = context?.setTermoBusca || (() => {});
  const notificacoes = context?.notificacoes || [];
  const setNotificacoes = context?.setNotificacoes || (() => {});
  const marcarComoLida = context?.marcarComoLida || (() => {});

  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [indiceCarrossel, setIndiceCarrossel] = useState(0);
  
  // Controle do menu dropdown para o Mobile
  const [mostrarDropdownNotif, setMostrarDropdownNotif] = useState(false);

  // ESTADOS PARA O POPUP DE "EM BREVE"
  const [mostrarPopupHome, setMostrarPopupHome] = useState(false);
  const [itemPendenteHome, setItemPendenteHome] = useState("");

  const abrirPopupHome = (label: string) => {
    setItemPendenteHome(label);
    setMostrarPopupHome(true);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    const carregarFeed = async () => {
      try {
        const apiUrl = `http://${window.location.hostname}:5000/api/produtos`;
        
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) throw new Error('Erro ao buscar o feed');
        const dados = await resposta.json();
        setProdutos(dados);

        // ⚡ GERAÇÃO DE NOTIFICAÇÕES (Sininho e Histórico)
        if (setNotificacoes) {
          const novasNotificacoes: any[] = [];
          
          dados.forEach((p: any) => {
            const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
            
            // Verifica Queda/Alta real no histórico (TRAVA DE SEGURANÇA CORRIGIDA)
            if (p.historico && p.historico.length >= 2) {
              const atual = Number(p.historico[0].preco);
              const anterior = Number(p.historico[1].preco);
              
              if (atual > 0 && anterior > 0 && atual !== anterior) {
                if (atual < anterior && !notificacoes.some((n:any) => n.id === `queda-${p.id}-${atual}`)) {
                  novasNotificacoes.push({ id: `queda-${p.id}-${atual}`, tipo: 'queda', produtoId: p.id, texto: `📉 O ${p.nome.slice(0, 15)}... caiu para R$ ${atual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, lida: false });
                } else if (atual > anterior && !notificacoes.some((n:any) => n.id === `alta-${p.id}-${atual}`)) {
                  novasNotificacoes.push({ id: `alta-${p.id}-${atual}`, tipo: 'alta', produtoId: p.id, texto: `📈 O ${p.nome.slice(0, 15)}... subiu para R$ ${atual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, lida: false });
                }
              }
            }

            // Verifica se a Meta foi batida (Opcional, caso queira notificar a meta no sininho da Home)
            if (precoAtual > 0 && p.precoAlvo > 0 && precoAtual <= p.precoAlvo) {
              if (!notificacoes.some((n:any) => n.id === `meta-${p.id}`)) {
                novasNotificacoes.push({ id: `meta-${p.id}`, tipo: 'meta', produtoId: p.id, texto: `🎯 Meta batida! ${p.nome.slice(0, 15)}... por R$ ${precoAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, lida: false });
              }
            }
          });
          
          if (novasNotificacoes.length > 0) {
            setNotificacoes((prev: any) => [...prev, ...novasNotificacoes]);
          }
        }
      } catch (erro) {
        console.error("Erro ao conectar com a API de feed:", erro);
      } finally {
        setLoading(false);
      }
    };

    carregarFeed();

    // POLLING: Atualiza a Dashboard automaticamente a cada 15 segundos
    const intervaloDeAtualizacao = setInterval(() => {
      carregarFeed();
    }, 15000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervaloDeAtualizacao);
    };
  }, [notificacoes, setNotificacoes]);

  const notificacoesGlobais = notificacoes || [];

  const produtosFiltrados = produtos.filter((p: any) => {
    const buscaSegura = termoBusca ? termoBusca.toLowerCase() : "";
    return p.nome.toLowerCase().includes(buscaSegura) || p.loja.toLowerCase().includes(buscaSegura);
  });

  const limparAlertaDoItem = (produtoId: string) => {
    if (setNotificacoes && notificacoes) {
      setNotificacoes((prev: any[]) => prev.map(n => n.produtoId === produtoId ? { ...n, lida: true } : n));
    }
  };

  const totalAlertasAtivos = produtosFiltrados.filter(p => 
    notificacoes && notificacoes.some((n: any) => n.produtoId === p.id && !n.lida)
  ).length;

  const alertasDisparados = (notificacoesGlobais || []).filter((n: any) => !n.lida).length;

  // ⚡ CALCULADORA UNIVERSAL DE PREÇOS
  const getValoresDoProduto = (p: any) => {
    const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
    const maiorPrecoHistorico = p.historico && p.historico.length > 0 ? Math.max(...p.historico.map((h: any) => h.preco)) : precoAtual;
    const precoAntigo = p.precoOriginalDaLoja || maiorPrecoHistorico;
    const porcentagemDesconto = precoAntigo > precoAtual && precoAtual > 0 
      ? Math.round(((precoAntigo - precoAtual) / precoAntigo) * 100) 
      : 0;

    return { precoAtual, precoAntigo, porcentagemDesconto };
  };

  const totalEconomizado = produtosFiltrados.reduce((acc: number, p: any) => {
    const { precoAtual, precoAntigo } = getValoresDoProduto(p);
    if (precoAntigo > precoAtual && precoAtual > 0) {
      return acc + (precoAntigo - precoAtual);
    }
    return acc;
  }, 0);

  // Variáveis Dinâmicas para o Dashboard do Mobile
  const totalComQueda = produtosFiltrados.filter(p => getValoresDoProduto(p).porcentagemDesconto > 0).length;

  const lojasOfertas = [
    { nome: 'Amazon', desconto: 'Até 40% OFF', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { nome: 'Magazine Luiza', desconto: 'Até 30% OFF', logo: 'https://logodownload.org/wp-content/uploads/2014/06/magalu-logo-0.png' },
    { nome: 'Mercado Livre', desconto: 'Até 25% OFF', logo: 'https://logodownload.org/wp-content/uploads/2016/08/mercado-livre-logo-0.png' },
    { nome: 'Shopee', desconto: 'Até 50% OFF', logo: 'https://logodownload.org/wp-content/uploads/2021/03/shopee-logo-0.png' },
    { nome: 'KaBuM!', desconto: 'Até 35% OFF', logo: 'https://logodownload.org/wp-content/uploads/2017/11/kabum-logo.png' },
    { nome: 'Casas Bahia', desconto: 'Até 15% OFF', logo: 'https://logodownload.org/wp-content/uploads/2014/05/casas-bahia-logo-1-2.png' },
  ];

  const moverCarrosselDireta = () => { if (indiceCarrossel + 5 < lojasOfertas.length) setIndiceCarrossel(indiceCarrossel + 1); };
  const moverCarrosselEsquerda = () => { if (indiceCarrossel > 0) setIndiceCarrossel(indiceCarrossel - 1); };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', fontWeight: 'bold', color: '#0b1e36', backgroundColor: '#f8fafc' }}>
        Carregando ofertas em tempo real...
      </div>
    );
  }

  // ===================================================
  // 📱 INTERFACE MOBILE RENDERIZADA
  // ===================================================
  if (isMobile) {
    return (
      <div style={{ paddingBottom: '40px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        
        {/* Header Azul Mobile */}
        <div style={{ 
          backgroundColor: '#0b1e36', 
          color: 'white', 
          padding: '30px 20px 80px',
          marginBottom: '2px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Olá, Bem Vindo! 👋</h2>
              <p style={{ opacity: 0.8, fontSize: '12px', margin: '4px 0 0 0' }}>
                Monitore seus produtos e receba <br />alertas quando o preço cair
              </p>
            </div>
            
            <div style={{ position: 'relative', marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
              <div 
                onClick={() => setMostrarDropdownNotif(!mostrarDropdownNotif)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <FiBell size={24} color="white" />
                {alertasDisparados > 0 && (
                  <div style={{ 
                    position: 'absolute', top: 0, right: 2, 
                    width: '7px', height: '7px', 
                    backgroundColor: '#f97316', 
                    borderRadius: '50%', 
                    border: '2px solid #0b1e36' 
                  }} />
                )}
              </div>

              {/* MENU DROPDOWN MOBILE */}
              {mostrarDropdownNotif && (
                <div style={{ 
                  position: 'absolute', top: '35px', right: '0', width: '260px', backgroundColor: '#fff', 
                  borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 9999, padding: '12px', color: '#0f172a' 
                }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>Alertas Ativos</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                    {(notificacoesGlobais || []).filter((n: any) => !n.lida).length === 0 ? (
                      <p style={{ margin: 0, fontSize: '11px', color: '#64748b', textAlign: 'center' }}>Nenhum alerta pendente</p>
                    ) : (
                      (notificacoesGlobais || []).filter((n: any) => !n.lida).map((n: any) => (
                        <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '6px', borderRadius: '8px' }}>
                          <p style={{ margin: 0, fontSize: '11px', color: '#334155', lineHeight: '1.3' }}>{n.texto}</p>
                          <button onClick={(e) => { e.stopPropagation(); marcarComoLida(n.id); }} style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '10px', padding: '4px 6px', cursor: 'pointer' }}>Lido</button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ position: 'relative', marginTop: '15px' }}>
            <FiSearch size={20} color="#999" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              placeholder="Buscar produto ou loja" 
              value={termoBusca || ""}
              onChange={(e) => setTermoBusca && setTermoBusca(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: '14px 20px 14px 45px', borderRadius: '25px', border: 'none', display: 'block', outline: 'none' }} 
            />
          </div>
        </div>

        {/* Dashboard Resumo Externo (Dinâmico e Restaurado) */}
        <DashboardResumo />

        {/* Listas Originais Mobile com Imagens Inline */}
        <div style={{ marginTop: '32px', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', margin: 0, color: '#1a1a1a', fontWeight: '700' }}>Alertas de preço</h3>
            <span onClick={() => navigate('/produtos')} style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Ver todos</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {produtosFiltrados
              .map((p: any) => {
                const valores = getValoresDoProduto(p);
                return { ...p, ...valores };
              })
              .sort((a, b) => b.porcentagemDesconto - a.porcentagemDesconto)
              .slice(0, 4)
              .map((p: any) => (
                <CardProdutoMobile // ⚡ USANDO O COMPONENTE INTERNO QUE GARANTE A IMAGEM NO MOBILE
                  key={p.id} 
                  nome={p.nome} 
                  loja={p.loja} 
                  imagem={p.imagem}
                  precoAtual={`R$ ${p.precoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} 
                  precoAntigo={p.precoAntigo > p.precoAtual ? `R$ ${p.precoAntigo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ""} 
                  desconto={p.porcentagemDesconto > 0 ? `↓ ${p.porcentagemDesconto}%` : ""} 
                />
              ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '36px' }}>
            <h3 style={{ fontSize: '16px', margin: 0, color: '#1a1a1a', fontWeight: '700' }}>Histórico de alertas</h3>
            <span onClick={() => navigate('/alertas')} style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Ver todos</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notificacoesGlobais.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center' }}>Nenhum alerta recente.</p>
            ) : (
              notificacoesGlobais.slice(0, 3).map((n: any) => {
                const isQueda = n.tipo === 'queda';
                const isAlta = n.tipo === 'alta';
                return (
                  <div key={n.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: isQueda ? '#ecfdf5' : (isAlta ? '#fef2f2' : '#eff6ff'), borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isQueda ? '#10b981' : (isAlta ? '#ef4444' : '#3b82f6'), flexShrink: 0 }}>
                        <FiBell size={18} />
                      </div>
                      <div style={{ minWidth: 0, paddingRight: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1f2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.texto}</h4>
                        <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>Movimentação detectada</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    );
  }

  // ===================================================
  // 💻 INTERFACE DESKTOP RENDERIZADA
  // ===================================================
  
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ⚡ CABEÇALHO PERSONALIZADO DESKTOP */}
      <div style={{ marginBottom: '32px', paddingTop: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Olá, Rayane! <span style={{ fontSize: '28px' }}>👋</span>
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '15px', color: '#64748b' }}>
          Acompanhe seus produtos e economize com inteligência.
        </p>
      </div>

      {/* Cards Indicadores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f3e8ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiTag size={22} color="#a855f7" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{produtos.length}</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Produtos monitorados</p>
            <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700' }}>+2 este mês</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0fdf4', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiTrendingDown size={22} color="#16a34a" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{totalAlertasAtivos}</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Alertas ativos</p>
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700' }}>Monitorando</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#fff7ed', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiDollarSign size={22} color="#ea580c" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>R$ {totalEconomizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total economizado</p>
            <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: '700' }}>este mês</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#eff6ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiPieChart size={22} color="#2563eb" /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>{alertasDisparados}</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Alertas disparados</p>
            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>este mês</span>
          </div>
        </div>
      </div>

      {/* Grid Central */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.1fr', gap: '24px', marginBottom: '32px', alignItems: 'start' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Quedas de preço recentes</h2>
            <span onClick={() => navigate('/produtos')} style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>Ver todas</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {produtosFiltrados
              .map((p: any) => {
                const valores = getValoresDoProduto(p);
                return { ...p, ...valores };
              })
              .sort((a, b) => b.porcentagemDesconto - a.porcentagemDesconto)
              .slice(0, 4)
              .map((p: any) => {

             return (
                  <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 64px) minmax(0, 1fr) auto minmax(0, 55px) auto', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: '1px solid #f8fafc', cursor: 'pointer' }}>
                      <div style={{ width: '64px', height: '64px', backgroundColor: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                        {p.imagem ? <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : null}
                      </div>
                      <div style={{ minWidth: 0, paddingRight: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.nome}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}><span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{p.loja}</span></div>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '85px', whiteSpace: 'nowrap' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>
                          {p.precoAntigo > p.precoAtual ? `R$ ${p.precoAntigo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '\u00A0'}
                        </p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '15px', fontWeight: '800', color: '#16a34a' }}>R$ {p.precoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div style={{ minWidth: '55px', display: 'flex', justifyContent: 'flex-end' }}>
                        {p.porcentagemDesconto > 0 && (
                          <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>↓ {p.porcentagemDesconto}%</span>
                        )}
                      </div>
                    
                      <button 
                        onClick={(e) => { e.preventDefault(); abrirPopupHome("Favoritos"); }} 
                        style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', flexShrink: 0, transition: 'all 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                      >
                        <FiStar size={16} />
                      </button>
                    </div>
                  </a>
                );
              })}

            <button
              onClick={() => navigate('/produtos')}
              style={{ 
                width: '100%', 
                padding: '14px 0', 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '12px', 
                color: '#334155', 
                fontSize: '14px', 
                fontWeight: '700', 
                cursor: 'pointer', 
                marginTop: '16px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = '#0f172a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#334155'; }}
            >
              Ver todos os produtos
            </button>

          </div>
        </div>

        {/* COLUNA DIREITA: ALERTAS ATIVOS REAIS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Ofertas das lojas</h2>
            <span onClick={() => navigate('/lojas')} style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>Ver todas</span>
          </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {produtosFiltrados.filter(p => notificacoes && notificacoes.some((n: any) => n.produtoId === p.id && !n.lida)).slice(0, 3).map((p: any) => {
                const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : 0;
                return (
                  <div key={`alerta-${p.id}`} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 48px) minmax(0, 1fr) auto auto', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '12px', flexShrink: 0, overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                      {p.imagem ? <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : null}
                    </div>
                    <div style={{ minWidth: 0, paddingRight: '4px' }}>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.nome}</h4>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', marginTop: '2px', display: 'inline-block' }}>{p.loja}</span>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '12px', whiteSpace: 'nowrap', minWidth: '80px' }}>
                      <p style={{ margin: 0, color: '#64748b' }}>Meta: <strong style={{ color: '#0f172a' }}>R$ {Math.round(p.precoAlvo).toLocaleString('pt-BR')}</strong></p>
                      <p style={{ margin: 0, color: '#64748b' }}>Atual: <strong style={{ color: '#16a34a' }}>R$ {Math.round(precoAtual).toLocaleString('pt-BR')}</strong></p>
                    </div>
                    <button onClick={() => limparAlertaDoItem(p.id)} style={{ backgroundColor: '#f0f5ff', border: 'none', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6366f1', flexShrink: 0 }}><FiBell size={16} /></button>
                  </div>
                );
              })}
              {produtosFiltrados.filter(p => notificacoes && notificacoes.some((n: any) => n.produtoId === p.id && !n.lida)).length === 0 && (
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', textAlign: 'center', padding: '20px 0' }}>Nenhum alerta ativo.</p>
              )}
            </div>
          </div>

          {/* Gráfico de Economia */}
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Economia nos últimos 6 meses</h2>
              <span style={{ fontSize: '16px', color: '#16a34a', fontWeight: '800' }}>R$ {totalEconomizado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div style={{ display: 'flex', position: 'relative', height: '130px', marginTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px', width: '50px', fontSize: '11px', color: '#64748b', textAlign: 'right', flexShrink: 0 }}><div>R$ 1.500</div><div>R$ 1.000</div><div>R$ 500</div><div>R$ 0</div></div>
              <div style={{ flex: 1, position: 'relative', height: '100px' }}>
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '0%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '33.3%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '66.6%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '100%' }} />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" /></linearGradient></defs>
                  <path d="M 0 90 L 20 75 L 40 60 L 60 45 L 80 30 L 100 20 L 100 100 L 0 100 Z" fill="url(#areaGrad)" />
                  <path d="M 0 90 L 20 75 L 40 60 L 60 45 L 80 30 L 100 20" fill="none" stroke="#6366f1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                {[ { x: 1.5, y: 90 }, { x: 20, y: 75 }, { x: 40, y: 60 }, { x: 60, y: 45 }, { x: 80, y: 30 }, { x: 100, y: 20 } ].map((pt, i) => (
                  <div key={i} style={{ position: 'absolute', left: `${pt.x}%`, top: `${pt.y}%`, width: '8px', height: '8px', backgroundColor: '#6366f1', border: '2px solid #fff', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                ))}
                <div style={{ position: 'absolute', top: '110px', left: 0,  width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}><span>Dez</span><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span></div>
              </div>
            </div>
          </div>
        </div> 
      </div>

      {/* Carrossel de Ofertas */}
      <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Ofertas das lojas</h2>
  <span 
    onClick={() => navigate('/lojas')} 
    style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}
  >
    Ver todas
  </span>
</div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {indiceCarrossel > 0 && <button onClick={moverCarrosselEsquerda} style={{ position: 'absolute', left: '-16px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><FiChevronLeft size={20} /></button>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', width: '100%' }}>
            {lojasOfertas.slice(indiceCarrossel, indiceCarrossel + 5).map((loja: any, idx: number) => (
              <div key={idx} style={{ border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: '6px' }}><img src={loja.logo} alt={loja.nome} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}><h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{loja.nome}</h4><span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 6px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', marginTop: '4px' }}>{loja.desconto}</span></div>
                </div>
                <button 
                  onClick={() => abrirPopupHome(`Ofertas da ${loja.nome}`)}
                  style={{ width: '100%', padding: '10px 0', border: '1px solid #e0e7ff', borderRadius: '10px', backgroundColor: '#fff', color: '#6366f1', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Ver ofertas
                </button>
              </div>
            ))}
          </div>
          {indiceCarrossel + 5 < lojasOfertas.length && <button onClick={moverCarrosselDireta} style={{ position: 'absolute', right: '-16px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><FiChevronRight size={20} /></button>}
        </div>
      </div>

      {/* RENDERIZAÇÃO DO MODAL DE "EM BREVE" DA HOME */}
      {mostrarPopupHome && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <FiInfo size={26} />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{itemPendenteHome}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Disponível em breve!</p>
            <button onClick={() => setMostrarPopupHome(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};