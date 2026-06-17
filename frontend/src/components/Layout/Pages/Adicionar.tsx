// frontend/src/components/Layout/Pages/Adicionar.tsx
import { useState } from 'react';
import { 
  FiChevronLeft, 
  FiSearch, 
  FiMaximize, 
  FiBell, 
  FiLock, 
  FiPlus, 
  FiLink, 
  FiHelpCircle,
  FiClock,
  FiTrendingDown
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const Adicionar = () => {
  const navigate = useNavigate();
  const [tipoBusca, setTipoBusca] = useState('buscar'); // 'buscar' ou 'link'

  const sugestoes = [
    { id: 1, nome: "Headphone Sony WH-1000XM5", loja: "Amazon", preco: "R$ 3.299,00" },
    { id: 2, nome: "Air Fryer Philips Walita Série 3000", loja: "Magazine Luiza", preco: "R$ 449,90" },
    { id: 3, nome: "Smartwatch Xiaomi Redmi Watch 3", loja: "Mercado Livre", preco: "R$ 259,90" },
    { id: 4, nome: "iPhone 15 128GB", loja: "Amazon", preco: "R$ 5.999,00" }
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '160px' }}>
      
      {/* 1. HEADER */}
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
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Adicionar Produto</h1>
          <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Monitore preços e receba alertas</p>
        </div>
      </div>

      {/* 2. SWITCH TABS (Buscar produto / Adicionar link) */}
      <div style={{ display: 'flex', backgroundColor: '#fff', padding: '4px', borderRadius: '25px', border: '1px solid #f1f5f9', marginBottom: '20px' }}>
        <button 
          onClick={() => setTipoBusca('buscar')}
          style={{
            flex: 1, padding: '12px', border: 'none', borderRadius: '22px', fontSize: '13px', fontWeight: '600',
            backgroundColor: tipoBusca === 'buscar' ? '#2563eb' : 'transparent',
            color: tipoBusca === 'buscar' ? '#fff' : '#64748b',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
          }}
        >
          <FiSearch size={16} /> Buscar produto
        </button>
        <button 
          onClick={() => setTipoBusca('link')}
          style={{
            flex: 1, padding: '12px', border: 'none', borderRadius: '22px', fontSize: '13px', fontWeight: '600',
            backgroundColor: tipoBusca === 'link' ? '#2563eb' : 'transparent',
            color: tipoBusca === 'link' ? '#fff' : '#64748b',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
          }}
        >
          <FiLink size={16} /> Adicionar link
        </button>
      </div>

      {/* 3. INPUT DE BUSCA */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <FiSearch size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          placeholder={tipoBusca === 'buscar' ? "Buscar por nome do produto ou loja" : "Cole o link do produto aqui"}
          style={{
            width: '100%', boxSizing: 'border-box', padding: '14px 45px 14px 45px',
            borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', backgroundColor: '#fff'
          }}
        />
        <FiMaximize size={18} color="#475569" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
      </div>

      {/* 4. SUGESTÕES POPULARES */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Sugestões populares</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#2563eb', cursor: 'pointer' }}>Ver mais</span>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {sugestoes.map((prod) => (
          <div key={prod.id} style={{
            backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '12px',
            width: '130px', flexShrink: 0, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.01)'
          }}>
            <div style={{ width: '70px', height: '70px', backgroundColor: '#f3f4f6', borderRadius: '12px', margin: '0 auto 10px auto' }} />
            <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#0f172a', height: '32px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{prod.nome}</p>
            <p style={{ margin: '2px 0 6px 0', fontSize: '10px', color: '#94a3b8' }}>{prod.loja}</p>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{prod.preco}</p>
          </div>
        ))}
      </div>

      {/* 5. CARD: CONFIGURE SEU ALERTA */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
            <FiBell size={18} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Configure seu alerta</h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Defina o preço ideal para ser avisado</p>
          </div>
        </div>

        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Preço desejado (opcional)</label>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '6px 12px', marginBottom: '16px', backgroundColor: '#fff' }}>
          <input defaultValue="R$ 0,00" style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px', fontWeight: '500', color: '#475569' }} />
          <button style={{ backgroundColor: '#eff6ff', border: 'none', color: '#2563eb', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiHelpCircle size={14} /> Qual o melhor preço?
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Alerta quando</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FiTrendingDown size={14} color="#475569" style={{ position: 'absolute', left: '10px', zIndex: 1 }} />
              <select style={{ width: '100%', padding: '10px 10px 10px 30px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#1e293b', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', appearance: 'none' }}>
                <option>O preço cair</option>
              </select>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Frequência do alerta</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FiClock size={14} color="#475569" style={{ position: 'absolute', left: '10px', zIndex: 1 }} />
              <select style={{ width: '100%', padding: '10px 10px 10px 30px', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#1e293b', fontSize: '13px', outline: 'none', backgroundColor: '#f8fafc', appearance: 'none' }}>
                <option>Imediatamente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 6. BANNER DE SEGURANÇA */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px' }}>
        <FiLock size={16} color="#16a34a" style={{ marginRight: '10px', flexShrink: 0 }} />
        <div>
          <h5 style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#14532d' }}>Seus dados estão seguros</h5>
          <p style={{ margin: 0, fontSize: '11px', color: '#344239' }}>Não compartilhamos suas informações com terceiros.</p>
        </div>
      </div>

     {/* 7. BOTÃO NO FLUXO NORMAL (Abaixo de tudo) */}
<div style={{ marginTop: '32px', width: '100%', boxSizing: 'border-box' }}>
  <button style={{
    width: '100%', 
    backgroundColor: '#2563eb', 
    color: 'white', 
    border: 'none', 
    padding: '14px', 
    borderRadius: '14px',
    fontSize: '14px', 
    fontWeight: '700', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '8px',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)', 
    cursor: 'pointer'
  }}>
    <FiPlus size={18} /> Adicionar produto
  </button>
</div>

    </div>
  );
};