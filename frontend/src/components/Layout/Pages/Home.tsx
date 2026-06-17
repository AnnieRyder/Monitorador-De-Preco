// frontend/src/components/Layout/Pages/Home.tsx
import { useState } from 'react';
import { CardProduto } from '../Card/CardProduto';
import { DashboardResumo } from '../../../Dashboard/DashboardResumo';
import { HistoricoCard } from '../../../Dashboard/HistoricoCard';
import { FiSearch, FiBell } from 'react-icons/fi';
import listaProdutos from '../../../data/produtos.json';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  const [produtos] = useState(listaProdutos);
  const [termoBusca, setTermoBusca] = useState("");
  
  const produtosFiltrados = produtos.filter((p) => 
    p.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
    p.loja.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* Header Azul */}
      <div style={{ 
        backgroundColor: '#0b1e36', 
        color: 'white', 
        padding: '30px 20px 80px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: 0 }}>Olá, Bem Vindo! 👋</h2>
            <p style={{ opacity: 0.8, fontSize: '12px'}}>Monitore seus produtos e receba
              <br />alertas quando o preço cair
            </p>
          </div>
          
          <div onClick={() => navigate('/notificacoes')}
          style={{ position: 'relative', marginTop: '5px', cursor: 'pointer' }}>
            <FiBell size={24} color="white" />
            <div style={{ 
              position: 'absolute', top: 0, right: 2, 
              width: '7px', height: '7px', 
              backgroundColor: '#f97316', 
              borderRadius: '50%', 
              border: '2px solid #0b1e36' 
            }} />
          </div>
        </div>
        
        <div style={{ position: 'relative', marginTop: '15px' }}>
          <FiSearch 
            size={20} 
            color="#999" 
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input 
            placeholder="Buscar produto ou loja" 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ 
              width: '100%',             
              boxSizing: 'border-box',   
              padding: '14px 20px 14px 45px', 
              borderRadius: '25px',       
              border: 'none',             
              display: 'block',
              outline: 'none',
              marginTop: '-0.80rem',
            }} 
          />
        </div>
      </div>

      {/* Dashboard Resumo Flutuante */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '30px 30px 0 0', 
        marginTop: '-60px',           
        paddingTop: '30px',           
      }}>
        <DashboardResumo />
      </div>

      {/* Área de Listas */}
      <div style={{ padding: '0 20px', marginTop: '20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '16px', margin: 0, color: '#1a1a1a' }}>Alertas de preço</h3>
          <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Ver todos</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {produtosFiltrados.map((p) => (
            <CardProduto 
              key={p.id} 
              nome={p.nome} 
              loja={p.loja} 
              precoAtual={p.precoAtual} 
              precoAntigo={p.precoAntigo} 
              desconto={p.desconto} 
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', marginTop: '30px', padding: '0 20px' }}>
          <h3 style={{ fontSize: '16px', margin: 0, color: '#1a1a1a' }}>Histórico de alertas</h3>
          <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Ver todos</span>
        </div>

        <HistoricoCard 
          nome="Notebook Dell Inspiron i15" 
          descricao="Queda de preço detectada" 
          precoAtual="R$ 2.799,00" 
          precoAntigo="R$ 3.199,00" 
        />
        
      </div>
    </div>
  );
};

export default Home;