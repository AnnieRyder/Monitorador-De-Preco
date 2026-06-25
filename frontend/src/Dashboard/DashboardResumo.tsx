// frontend/src/components/Dashboard/DashboardResumo.tsx
import { Link } from 'react-router-dom';
import { FiTag, FiShoppingBag, FiSettings, FiEye, FiArrowDown, FiBell } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useLayoutContext } from '../components/ResponsivoLayout';

export const DashboardResumo = () => {
  const context = useLayoutContext();
  const notificacoes = context?.notificacoes || [];
  
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    const carregarFeed = async () => {
      try {
        const apiUrl = `http://${window.location.hostname}:5000/api/produtos`;
        const resposta = await fetch(apiUrl);
        if (resposta.ok) {
          const dados = await resposta.json();
          setProdutos(dados);
        }
      } catch (erro) {
        console.error("Erro ao carregar dados do resumo:", erro);
      }
    };
    
    carregarFeed();
    const interval = setInterval(carregarFeed, 15000);
    return () => clearInterval(interval);
  }, []);

  // ⚡ CÁLCULOS REAIS PARA O MOBILE
  const totalProdutos = produtos.length;
  
  const totalComQueda = produtos.filter((p: any) => {
    const precoAtual = p.historico && p.historico.length > 0 ? p.historico[0].preco : (p.precoAtual || 0);
    const maiorPrecoHistorico = p.historico && p.historico.length > 0 ? Math.max(...p.historico.map((h: any) => h.preco)) : precoAtual;
    const precoAntigo = p.precoOriginalDaLoja || maiorPrecoHistorico;
    return precoAntigo > precoAtual && precoAtual > 0;
  }).length;

  const alertasNaoLidos = notificacoes.filter((n: any) => !n.lida).length;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      marginTop: '-30px', 
      position: 'relative',
      zIndex: 10,
      marginBottom: '20px', 
    }}>
      
      {/* 1. Ícones do Topo (Linkados com as páginas) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        
        {/* Meus Produtos */}
        <Link to="/produtos" style={{ textAlign: 'center', width: '22%', textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ background: '#eff6ff', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiTag size={22} color="#3b82f6" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '600', color: '#475569', margin: 0 }}>Meus Produtos</p>
        </Link>

        {/* Promoções */}
        <Link to="/promocoes" style={{ textAlign: 'center', width: '22%', textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ background: '#f0fdf4', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <HiOutlineFire size={24} color="#16a34a" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '600', color: '#475569', margin: 0 }}>Promoções</p>
        </Link>

        {/* Lojas */}
        <Link to="/lojas" style={{ textAlign: 'center', width: '22%', textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ background: '#faf5ff', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiShoppingBag size={22} color="#a855f7" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '600', color: '#475569', margin: 0 }}>Lojas</p>
        </Link>

        {/* Configurações */}
        <Link to="/configuracoes" style={{ textAlign: 'center', width: '22%', textDecoration: 'none', cursor: 'pointer' }}>
          <div style={{ background: '#fff7ed', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiSettings size={22} color="#ea580c" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '600', color: '#475569', margin: 0 }}>Configurações</p>
        </Link>

      </div>

      <h4 style={{ marginBottom: '15px', fontSize: '16px', color: '#1a1a1a', margin: '0 0 15px 0', fontWeight: '700' }}>Resumo</h4>

      {/* 2. Números com Linhas Divisórias (DADOS REAIS DA API) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
        
        {/* Bloco Produtos */}
        <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ background: '#eff6ff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiEye size={14} color="#3b82f6" />
          </div>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#0b1e36', fontWeight: '700' }}>{totalProdutos}</h4>
          <p style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', lineHeight: '1.2', fontWeight: '500' }}>Monitorando<br/>produtos</p>
        </div>

        {/* Bloco Quedas */}
        <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ background: '#f0fdf4', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiArrowDown size={14} color="#16a34a" />
          </div>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#0b1e36', fontWeight: '700' }}>{totalComQueda}</h4>
          <p style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', lineHeight: '1.2', fontWeight: '500' }}>Produtos com<br/>queda de preço</p>
        </div>

        {/* Bloco Alertas */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ background: '#fff7ed', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiBell size={14} color="#ea580c" />
          </div>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#0b1e36', fontWeight: '700' }}>{alertasNaoLidos}</h4>
          <p style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', lineHeight: '1.2', fontWeight: '500' }}>Alertas não<br/>lidos</p>
        </div>

      </div>
    </div>
  );
};