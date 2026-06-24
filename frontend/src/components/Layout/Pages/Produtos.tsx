// frontend/src/components/Layout/Pages/Produtos.tsx
import React, { useState, useEffect } from 'react';
import { 
  FiSearch, FiSliders, FiBarChart2, FiDownload, FiPlus, 
  FiGrid, FiList, FiBell, FiHeart, FiMoreVertical, FiChevronLeft, FiChevronRight, 
  FiInfo, FiX, FiLink, FiImage, FiDollarSign, FiTag, FiEdit2, FiTrash2 
} from 'react-icons/fi';
import { CardMeusProdutos } from '../Card/CardMeusProdutos'; 

export const Produtos = () => {
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [termoBuscaWeb, setTermoBuscaWeb] = useState("");
  const [abaAtivaWeb, setAbaAtivaWeb] = useState("todos");
  
  const [lojaSelecionada, setLojaSelecionada] = useState("Todas as lojas");
  const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState("Ordenar: Mais recentes");
  const [visualizacao, setVisualizacao] = useState<'grade' | 'lista'>('grade');

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [tituloPopup, setTituloPopup] = useState("");

  // ESTADOS DO MODAL E PRODUTO (NOVO/EDITAR)
  const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
  const [produtoEditandoId, setProdutoEditandoId] = useState<number | null>(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoLink, setNovoLink] = useState("");
  const [novaFoto, setNovaFoto] = useState("");
  const [novoPrecoAlvo, setNovoPrecoAlvo] = useState("");

  // ESTADO DO MENU DE 3 PONTINHOS
  const [menuAbertoId, setMenuAbertoId] = useState<number | null>(null);

  const [listaProdutos, setListaProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioIdReal, setUsuarioIdReal] = useState<string>("");

  const abrirPopupEmBreve = (titulo: string) => {
    setTituloPopup(titulo);
    setMostrarPopup(true);
    setMenuAbertoId(null);
  };

  const carregarProdutosDoBanco = async () => {
    try {
      const apiUrl = `http://${window.location.hostname}:5000/api/produtos`;
      const resposta = await fetch(apiUrl);
      if (!resposta.ok) throw new Error('Erro ao buscar produtos do Supabase');
      const dados = await resposta.json();

      if (dados && dados.length > 0 && dados[0].usuarioId) {
        setUsuarioIdReal(dados[0].usuarioId);
      }

      const produtosFormatados = dados.map((p: any) => {
        // PREÇO DO HISTÓRICO
        const precoAtualNumerico = p.historico && p.historico.length > 0 ? p.historico[0].preco : 0;
        
        // META DO USUÁRIO
        const precoMeta = p.precoAlvo || 0;
        
        // PREÇO ORIGINAL DA LOJA 
        const precoOriginalLoja = p.precoOriginalDaLoja || null; 
        
        const precoExibido = precoAtualNumerico > 0 
          ? `R$ ${precoAtualNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
          : `R$ ${precoMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

        // LÓGICA DE METAS E DESCONTOS
        const atingiuMeta = precoAtualNumerico > 0 && precoAtualNumerico <= precoMeta;
        
        const maiorPrecoHistorico = p.historico && p.historico.length > 0 
          ? Math.max(...p.historico.map((h: any) => h.preco)) 
          : precoAtualNumerico;

        const precoReferencia = precoOriginalLoja || maiorPrecoHistorico;
        
        const temQueda = precoReferencia > precoAtualNumerico && precoAtualNumerico > 0;
        const pctDesconto = temQueda ? Math.round(((precoReferencia - precoAtualNumerico) / precoReferencia) * 100) : 0;

        const progresso = precoAtualNumerico > 0 && precoMeta > 0
          ? Math.min(100, Math.round((precoMeta / precoAtualNumerico) * 100))
          : 0;

        // ⚡ EXTRAÇÃO DO HISTÓRICO EM ORDEM CRONOLÓGICA (Antigo para Novo)
        const historicoPrecos = p.historico && p.historico.length > 0 
          ? [...p.historico].reverse().map((h: any) => h.preco) 
          : [precoAtualNumerico];

        return {
          id: p.id,
          nome: p.nome,
          loja: p.loja || "Identificando...",
          precoAntigo: precoReferencia > precoAtualNumerico ? `R$ ${precoReferencia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "", 
          precoAtual: precoExibido,
          valorNumerico: precoAtualNumerico,
          descontoPorcentagem: pctDesconto,
          desconto: pctDesconto > 0 ? `↓ ${pctDesconto}%` : "", 
          metaPreco: `R$ ${precoMeta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          valorMetaNumerico: precoMeta,
          porcentagemProgressoMeta: progresso,
          atingiuMeta: atingiuMeta,
          statusPreco: atingiuMeta ? "🎉 Meta atingida!" : (precoAtualNumerico > 0 ? "Monitorando" : "Aguardando leitura..."),
          tempo: "Atualizado automático",
          favoritado: false,
          status: 'monitorando',
          imagemCustomizada: p.imagem || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=80&q=80",
          url: p.url,
          temHistoricoReal: p.historico && p.historico.length > 1,
          historicoPrecos: historicoPrecos
        };
      });
      setListaProdutos(produtosFormatados);
    } catch (erro) {
      console.error("Erro ao carregar produtos:", erro);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    carregarProdutosDoBanco();
    
    const intervaloDeAtualizacao = setInterval(() => {
      carregarProdutosDoBanco();
    }, 15000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervaloDeAtualizacao);
    };
  }, []);

  const handleAbrirEditar = (p: any) => {
    setMenuAbertoId(null);
    setProdutoEditandoId(p.id);
    setNovoNome(p.nome);
    setNovoLink(p.url);
    setNovaFoto(p.imagemCustomizada.includes('unsplash') ? '' : p.imagemCustomizada);
    setNovoPrecoAlvo(p.valorMetaNumerico.toString());
    setMostrarModalAdicionar(true);
  };

  const handleExcluir = async (id: number) => {
    setMenuAbertoId(null);
    setListaProdutos(prev => prev.filter(item => item.id !== id));
    try {
      await fetch(`http://${window.location.hostname}:5000/api/produtos/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.log("Erro ao excluir do banco:", err);
    }
  };

  const handleAdicionarOuEditarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    setMostrarModalAdicionar(false);

    const produtoTemporario = {
      id: produtoEditandoId || Date.now(),
      nome: novoNome,
      loja: "Identificando...", 
      precoAntigo: "",
      precoAtual: "R$ --,--",
      valorNumerico: 0,
      descontoPorcentagem: 0,
      desconto: "",
      metaPreco: `R$ ${parseFloat(novoPrecoAlvo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      statusPreco: "Aguardando atualização",
      atingiuMeta: false,
      tempo: "Agora",
      favoritado: false,
      status: 'monitorando',
      imagemCustomizada: novaFoto,
      url: novoLink,
      historicoPrecos: [0]
    };

    if (produtoEditandoId) {
      setListaProdutos(prev => prev.map(p => p.id === produtoEditandoId ? { ...p, ...produtoTemporario } : p));
      try {
        await fetch(`http://${window.location.hostname}:5000/api/produtos/${produtoEditandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: novoLink, precoAlvo: parseFloat(novoPrecoAlvo), nome: novoNome, imagem: novaFoto })
        });
        await carregarProdutosDoBanco();
      } catch (err) { console.log(err) }
    } else {
      setListaProdutos([produtoTemporario, ...listaProdutos]);
      try {
        await fetch(`http://${window.location.hostname}:5000/api/produtos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: novoLink, precoAlvo: parseFloat(novoPrecoAlvo), usuarioId: usuarioIdReal || "id-temporario", nome: novoNome, imagem: novaFoto })
        });
        await carregarProdutosDoBanco();
      } catch (err) { console.log(err) }
    }

    setNovoNome(""); setNovoLink(""); setNovaFoto(""); setNovoPrecoAlvo(""); setProdutoEditandoId(null);
  };

  const categoriasWeb = ["Todas as categorias", "Eletrônicos", "Eletrodomésticos", "Moda"];
  const lojasWeb = ["Todas as lojas", "Amazon", "Magazine Luiza", "Mercado Livre", "Shopee", "Kabum"];

  const produtosFiltradosMobile = listaProdutos.filter(p => {
    const atendeBusca = p.nome.toLowerCase().includes(termoBuscaWeb.toLowerCase());
    if (!atendeBusca) return false;
    if (abaAtiva === 'Queda') return p.atingiuMeta === true;
    return true;
  });

  const produtosFiltradosWeb = listaProdutos
    .filter(p => {
      const atendeBusca = p.nome.toLowerCase().includes(termoBuscaWeb.toLowerCase());
      const matchesLoja = lojaSelecionada === "Todas as lojas" || p.loja.toLowerCase().includes(lojaSelecionada.toLowerCase());
      let matchesAba = true;
      if (abaAtivaWeb === 'monitorando') matchesAba = p.status === 'monitorando';
      if (abaAtivaWeb === 'favoritos') matchesAba = p.favoritado === true;
      if (abaAtivaWeb === 'finalizados') matchesAba = p.status === 'finalizados';
      return atendeBusca && matchesLoja && matchesAba;
    })
    .sort((a, b) => {
      if (ordenacaoSelecionada === "Ordenar: Menor preço") return a.valorNumerico - b.valorNumerico;
      if (ordenacaoSelecionada === "Ordenar: Maior desconto") return b.descontoPorcentagem - a.descontoPorcentagem;
      return b.id - a.id; 
    });

  const alternarFavorito = (id: number) => {
    setListaProdutos(prev => prev.map(p => p.id === id ? { ...p, favoritado: !p.favoritado } : p));
  };

  // ⚡ FUNÇÃO QUE DESENHA O GRÁFICO (Sparkline)
  const renderSparkline = (precos: number[], atingiuMeta: boolean) => {
    const color = atingiuMeta ? '#10b981' : '#6366f1'; 
    if (!precos || precos.length < 2) {
       return (
         <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
           <path d="M 0 15 L 100 15" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" opacity="0.4" />
         </svg>
       );
    }
    const min = Math.min(...precos);
    const max = Math.max(...precos);
    const range = max - min === 0 ? 1 : max - min;

    const pts = precos.map((p, i) => {
       const x = (i / (precos.length - 1)) * 100;
       const y = 26 - (((p - min) / range) * 22); 
       return `${x},${y}`;
    });

    const lastX = pts[pts.length-1].split(',')[0];
    const lastY = pts[pts.length-1].split(',')[1];

    return (
       <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
         <path d={`M ${pts.join(' L ')}`} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
       </svg>
    );
  };

  // RENDER: GRID CARD
  const renderCardProdutoWeb = (p: any, idx: number) => {
    return (
      <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div style={{ 
          backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', display: 'flex', flexDirection: 'column', 
          justifyContent: 'space-between', height: '100%', boxSizing: 'border-box', position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#f8fafc', borderRadius: '12px', flexShrink: 0, overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p.imagemCustomizada ? <img src={p.imagemCustomizada} alt="Produto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : null}
            </div>
            
            <div style={{ flex: 1, minWidth: 0, minHeight: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.4', whiteSpace: 'normal' }}>
                {p.nome}
              </h4>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginTop: '4px', display: 'inline-block' }}>{p.loja}</span>
            </div>
          </div>

         {/* ⚡ CENTRAL: GRÁFICO E PREÇOS LADO A LADO */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px', minHeight: '84px' }}>
            
            {/* Gráfico Sparkline à esquerda */}
            <div style={{ flex: 1, paddingRight: '20px', paddingBottom: '8px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Variação</span>
              {renderSparkline(p.historicoPrecos, p.atingiuMeta)}
            </div>

            {/* Preços à direita */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', minWidth: '120px' }}>
              <div style={{ minHeight: '18px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {p.desconto && (
                  <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 6px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                    {p.desconto}
                  </span>
                )}
              </div>
              
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', lineHeight: '1', minHeight: '12px' }}>
                {p.precoAntigo && p.valorNumerico > 0 && parseFloat(p.precoAntigo.replace('R$ ', '').replace('.', '').replace(',', '.')) > p.valorNumerico ? p.precoAntigo : '\u00A0'}
              </p>
              
              <p style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: '800', color: p.atingiuMeta ? '#10b981' : '#16a34a', lineHeight: '1.2' }}>
                {p.precoAtual}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>
                  Meta: {p.metaPreco}
                </span>
              </div>

              <span style={{ fontSize: '10px', color: p.atingiuMeta ? '#10b981' : '#64748b', fontWeight: '700', marginTop: '4px' }}>
                {p.statusPreco}
              </span>
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '16px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '600' }}>Progresso até a meta</span>
              <span style={{ fontSize: '10px', color: p.atingiuMeta ? '#10b981' : '#6366f1', fontWeight: '700' }}>
                {p.porcentagemProgressoMeta}%
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${p.porcentagemProgressoMeta}%`, 
                  height: '100%', 
                  backgroundColor: p.atingiuMeta ? '#10b981' : '#6366f1', 
                  transition: 'width 0.8s ease-in-out' 
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
              {p.tempo || (idx === 0 ? '2 horas' : idx === 1 ? '5 horas' : '1 dia')}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={(e) => { e.preventDefault(); abrirPopupEmBreve(`Alertas para ${p.nome}`); }} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: '4px', display: 'flex' }}><FiBell size={16} /></button>
              <button onClick={(e) => { e.preventDefault(); alternarFavorito(p.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                <FiHeart size={16} fill={p.favoritado ? '#6366f1' : 'none'} color={p.favoritado ? '#6366f1' : '#64748b'} />
              </button>

              <div style={{ position: 'relative' }}>
                <button onClick={(e) => { e.preventDefault(); setMenuAbertoId(menuAbertoId === p.id ? null : p.id); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                  <FiMoreVertical size={16} />
                </button>

                {menuAbertoId === p.id && (
                  <div style={{ position: 'absolute', bottom: '100%', right: '0', marginBottom: '8px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, padding: '6px', width: '110px' }}>
                    <button onClick={(e) => { e.preventDefault(); handleAbrirEditar(p); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#334155', borderRadius: '6px', textAlign: 'left' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <FiEdit2 size={14} /> Editar
                    </button>
                    <button onClick={(e) => { e.preventDefault(); handleExcluir(p.id); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#ef4444', borderRadius: '6px', textAlign: 'left' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <FiTrash2 size={14} /> Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  };

  // RENDER: LISTA WEB
  const renderListaProdutoWeb = (p: any, idx: number) => {
    return (
      <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div style={{ 
          backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 2, minWidth: 0 }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '8px', flexShrink: 0, overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p.imagemCustomizada ? <img src={p.imagemCustomizada} alt="Produto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : null}
            </div>
            <div style={{ minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</h4>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{p.loja}</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>Meta: {p.metaPreco}</span>
            {p.atingiuMeta && <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700' }}>🎉 Atingida!</span>}
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            {p.precoAntigo && <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through' }}>{p.precoAntigo}</p>}
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: p.atingiuMeta ? '#10b981' : '#16a34a' }}>{p.precoAtual}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
            <button onClick={(e) => { e.preventDefault(); abrirPopupEmBreve(`Alertas para ${p.nome}`); }} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', display: 'flex' }}><FiBell size={16} /></button>
            <button onClick={(e) => { e.preventDefault(); alternarFavorito(p.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <FiHeart size={16} fill={p.favoritado ? '#6366f1' : 'none'} color={p.favoritado ? '#6366f1' : '#64748b'} />
            </button>
            
            <div style={{ position: 'relative' }}>
                <button onClick={(e) => { e.preventDefault(); setMenuAbertoId(menuAbertoId === p.id ? null : p.id); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                  <FiMoreVertical size={16} />
                </button>
                {menuAbertoId === p.id && (
                  <div style={{ position: 'absolute', bottom: '100%', right: '0', marginBottom: '8px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, padding: '6px', width: '110px' }}>
                    <button onClick={(e) => { e.preventDefault(); handleAbrirEditar(p); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#334155', borderRadius: '6px', textAlign: 'left' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><FiEdit2 size={14} /> Editar</button>
                    <button onClick={(e) => { e.preventDefault(); handleExcluir(p.id); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#ef4444', borderRadius: '6px', textAlign: 'left' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><FiTrash2 size={14} /> Excluir</button>
                  </div>
                )}
              </div>
          </div>
        </div>
      </a>
    );
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', fontWeight: 'bold' }}>Sincronizando com Supabase...</div>;
  }

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div style={{ padding: '24px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Meus Produtos</h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>{produtosFiltradosMobile.length} produtos exibidos</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#334155', marginTop: '4px' }}>
            <FiSliders size={22} onClick={() => abrirPopupEmBreve("Filtros Avançados")} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input type="text" placeholder="Buscar nos meus produtos..." value={termoBuscaWeb} onChange={(e) => setTermoBuscaWeb(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '12px 12px 12px 42px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '14px', marginBottom: '24px' }}>
          {[{ id: 'Todos', label: 'Todos' }, { id: 'Queda', label: '↓ Com queda' }, { id: 'SemAlteracao', label: 'Sem alteração' }].map((aba) => (
            <button key={aba.id} onClick={() => setAbaAtiva(aba.id)} style={{ flex: 1, padding: '10px 4px', border: 'none', borderRadius: '10px', fontSize: '12px', backgroundColor: abaAtiva === aba.id ? '#1e293b' : 'transparent', color: abaAtiva === aba.id ? '#fff' : '#64748b', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>{aba.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {produtosFiltradosMobile.map((produto) => <CardMeusProdutos key={produto.id} {...produto} />)}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '16px', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '14px' }}>
            <FiBarChart2 size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1e3a8a' }}>Dica: Defina metas de preço</h5>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#60a5fa', lineHeight: '1.4' }}>
              Você será avisado quando o preço atingir ou ficar abaixo da sua meta.
            </p>
          </div>
          <button onClick={() => abrirPopupEmBreve("Definir Metas Mobile")} style={{ backgroundColor: 'transparent', border: '1px solid #bfdbfe', color: '#2563eb', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
            Definir metas
          </button>
        </div>

        {mostrarPopup && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><FiInfo size={26} /></div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{tituloPopup}</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b' }}>Disponível em breve!</p>
              <button onClick={() => setMostrarPopup(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700' }}>Entendido</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DESKTOP VIEW
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      <div onClick={() => { if(menuAbertoId) setMenuAbertoId(null) }} style={{ minHeight: '100%' }}>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>Produtos</h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Acompanhe e compare os preços dos produtos que você monitora.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => abrirPopupEmBreve("Exportar Relatório")} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#334155', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              <FiDownload size={16} /> Exportar
            </button>
            <button onClick={() => { setProdutoEditandoId(null); setNovoNome(""); setNovoLink(""); setNovaFoto(""); setNovoPrecoAlvo(""); setMostrarModalAdicionar(true); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#6366f1', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>
              <FiPlus size={16} /> Adicionar produto
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[ { id: 'todos', label: 'Todos os produtos' }, { id: 'monitorando', label: 'Monitorando' }, { id: 'favoritos', label: 'Favoritos' }, { id: 'finalizados', label: 'Finalizados' } ].map((aba) => (
            <button key={aba.id} onClick={() => setAbaAtivaWeb(aba.id)} style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: abaAtivaWeb === aba.id ? '#f0f3ff' : 'transparent', color: abaAtivaWeb === aba.id ? '#6366f1' : '#64748b', transition: 'all 0.15s ease' }}>{aba.label}</button>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '260px' }}>
            <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Buscar nos meus produtos..." value={termoBuscaWeb} onChange={(e) => setTermoBuscaWeb(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px 10px 40px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
          </div>
          <select style={{ padding: '10px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#334155', fontWeight: '500', outline: 'none' }}>{categoriasWeb.map((c, i) => <option key={i}>{c}</option>)}</select>
          <select value={lojaSelecionada} onChange={(e) => setLojaSelecionada(e.target.value)} style={{ padding: '10px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#334155', fontWeight: '500', outline: 'none' }}>{lojasWeb.map((l, i) => <option key={i} value={l}>{l}</option>)}</select>
          <select value={ordenacaoSelecionada} onChange={(e) => setOrdenacaoSelecionada(e.target.value)} style={{ padding: '10px 12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', color: '#334155', fontWeight: '500', outline: 'none', flex: 1, maxWidth: '200px' }}>
            <option value="Ordenar: Mais recentes">Ordenar: Mais recentes</option>
            <option value="Ordenar: Maior desconto">Ordenar: Maior desconto</option>
            <option value="Ordenar: Menor preço">Ordenar: Menor preço</option>
          </select>
          <button onClick={() => abrirPopupEmBreve("Painel de Filtros")} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#334155', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}><FiSliders size={14} /> Filtros</button>
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '10px', marginLeft: 'auto' }}>
            <button onClick={() => setVisualizacao('grade')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: '8px', backgroundColor: visualizacao === 'grade' ? '#fff' : 'transparent', color: visualizacao === 'grade' ? '#6366f1' : '#64748b', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}><FiGrid size={14} /> Grade</button>
            <button onClick={() => setVisualizacao('lista')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: 'none', borderRadius: '8px', backgroundColor: visualizacao === 'lista' ? '#fff' : 'transparent', color: visualizacao === 'lista' ? '#6366f1' : '#64748b', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}><FiList size={14} /> Lista</button>
          </div>
        </div>

        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>{produtosFiltradosWeb.length} produtos encontrados</p>

        {visualizacao === 'grade' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {produtosFiltradosWeb.map((produto, idx) => renderCardProdutoWeb(produto, idx))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            {produtosFiltradosWeb.map((produto, idx) => renderListaProdutoWeb(produto, idx))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '32px' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', cursor: 'default', opacity: 0.6 }}><FiChevronLeft size={18} /></button>
          <button style={{ width: '36px', height: '36px', backgroundColor: '#f0f3ff', border: 'none', borderRadius: '10px', color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>1</button>
          <button style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', fontWeight: '600', cursor: 'default', opacity: 0.5 }}>2</button>
          <button style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', fontWeight: '600', cursor: 'default', opacity: 0.5 }}>3</button>
          <span style={{ color: '#94a3b8', padding: '0 4px' }}>...</span>
          <button style={{ width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', fontWeight: '600', cursor: 'default', opacity: 0.5 }}>6</button>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', color: '#94a3b8', cursor: 'default', opacity: 0.6 }}><FiChevronRight size={18} /></button>
        </div>

      </div>

      {/* MODAL ADICIONAR OU EDITAR PRODUTO */}
      {mostrarModalAdicionar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(6px)' }}>
          <form onSubmit={handleAdicionarOuEditarProduto} style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '440px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                  {produtoEditandoId ? "Editar Monitoramento" : "Novo Monitoramento"}
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>Insira os dados para o robô acompanhar</p>
              </div>
              <button type="button" onClick={() => setMostrarModalAdicionar(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}><FiX size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Nome de identificação</label>
                <div style={{ position: 'relative' }}>
                  <FiTag style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input required type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} placeholder="Ex: Placa de Vídeo RTX 4060" style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outlineColor: '#6366f1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Link da página da loja</label>
                <div style={{ position: 'relative' }}>
                  <FiLink style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input required type="url" value={novoLink} onChange={(e) => setNovoLink(e.target.value)} placeholder="https://www.amazon.com.br/produto..." style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outlineColor: '#6366f1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Link da imagem (Opcional)</label>
                <div style={{ position: 'relative' }}>
                  <FiImage style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="url" value={novaFoto} onChange={(e) => setNovaFoto(e.target.value)} placeholder="https://link-da-imagem.jpg" style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outlineColor: '#6366f1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>Qual sua meta de preço? (Avisar abaixo de)</label>
                <div style={{ position: 'relative' }}>
                  <FiDollarSign style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input required type="number" step="0.01" value={novoPrecoAlvo} onChange={(e) => setNovoPrecoAlvo(e.target.value)} placeholder="1500.00" style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', outlineColor: '#6366f1' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <button type="button" onClick={() => setMostrarModalAdicionar(false)} style={{ flex: 1, padding: '14px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '12px', color: '#475569', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Cancelar</button>
              <button type="submit" style={{ flex: 2, padding: '14px', backgroundColor: '#6366f1', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)' }}>Salvar e Monitorar</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Em Breve */}
      {mostrarPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '32px', width: '85%', maxWidth: '380px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#f0f3ff', color: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><FiInfo size={26} /></div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{tituloPopup}</h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Esta funcionalidade estará disponível em breve!</p>
            <button onClick={() => setMostrarPopup(false)} style={{ width: '100%', padding: '12px 0', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}

    </div>
  );
};