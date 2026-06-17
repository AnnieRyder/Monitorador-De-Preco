// frontend/src/components/Layout/Pages/Promocoes.tsx
import { useState } from 'react';
import { 
  FiSearch, 
  FiSliders, 
  FiBell, 
  FiHeart, 
  FiClock, 
  FiChevronRight,
  FiTag,
  FiTv,
  FiHome,
  FiCpu,
  FiWatch,
  FiTrendingDown
} from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

export const Promocoes = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const categorias = [
    { id: 'Todas', label: 'Todas', qtd: 128, icon: <FiTag size={18} /> },
    { id: 'Eletrônicos', label: 'Eletrônicos', qtd: 45, icon: <FiTv size={18} /> },
    { id: 'Casa', label: 'Casa', qtd: 28, icon: <FiHome size={18} /> },
    { id: 'Informática', label: 'Informática', qtd: 18, icon: <FiCpu size={18} /> },
    { id: 'Moda', label: 'Moda', qtd: 15, icon: <FiWatch size={18} /> },
  ];

  const destaques = [
    { id: 1, nome: "Headphone Sony WH-1000XM5", loja: "Amazon", precoAtual: "R$ 2.299,00", precoAntigo: "R$ 3.299,00", desconto: "-30%", emAlta: true, statusPreco: "Menor preço histórico", tempo: "Termina em 2 dias", favoritado: true },
    { id: 2, nome: "Air Fryer Philips Walita Série 3000", loja: "Magazine Luiza", precoAtual: "R$ 449,90", precoAntigo: "R$ 599,90", desconto: "-25%", emAlta: false, statusPreco: "Menor preço hoje", tempo: "Termina em 5 dias", favoritado: false },
    { id: 3, nome: "Smartwatch Xiaomi Redmi Watch 3", loja: "Mercado Livre", precoAtual: "R$ 259,90", precoAntigo: "R$ 319,00", desconto: "-18%", emAlta: false, statusPreco: "Menor preço em 30 dias", tempo: "Termina em 1 dia", favoritado: false },
  ];

  const lojas = [
    { nome: "Amazon", desconto: "Até 40% OFF" },
    { nome: "Magazine Luiza", desconto: "Até 30% OFF" },
    { nome: "Mercado Livre", desconto: "Até 25% OFF" },
    { nome: "Kabum!", desconto: "Até 35% OFF" },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '100px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Promoções</h1>
          <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>As melhores ofertas para você</p>
        </div>
        <div style={{ position: 'relative', marginTop: '4px', cursor: 'pointer' }}>
          <FiBell size={24} color="#0f172a" />
          <div style={{ position: 'absolute', top: 1, right: 2, width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />
        </div>
      </div>

      {/* BARRA DE BUSCA E FILTRO */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <FiSearch size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            placeholder="Buscar promoções e lojas"
            style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px 12px 45px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', backgroundColor: '#fff' }}
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '13px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}>
          <FiSliders size={16} /> Filtros
        </button>
      </div>

      {/* HORIZONTAL CAROUSEL: CATEGORIAS */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {categorias.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => setCategoriaAtiva(cat.id)}
            style={{
              backgroundColor: '#fff', border: categoriaAtiva === cat.id ? '1px solid #3b82f6' : '1px solid #f1f5f9',
              borderRadius: '16px', padding: '12px', width: '75px', flexShrink: 0, textAlign: 'center', cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.01)', transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              width: '42px', height: '42px', borderRadius: '12px', margin: '0 auto 8px auto',
              backgroundColor: categoriaAtiva === cat.id ? '#eff6ff' : '#f8fafc',
              color: categoriaAtiva === cat.id ? '#3b82f6' : '#64748b',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {cat.icon}
            </div>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: categoriaAtiva === cat.id ? '#3b82f6' : '#1e293b' }}>{cat.label}</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{cat.qtd}</p>
          </div>
        ))}
      </div>

      {/* SEÇÃO: DESTAQUES PARA VOCÊ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Destaques para você</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6', cursor: 'pointer' }}>Ver todos</span>
      </div>

      {/* LISTA DE DESTAQUES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {destaques.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #f3f4f6', position: 'relative' }}>
            {/* Badge de Desconto */}
            <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '6px', zIndex: 2 }}>{item.desconto}</span>
            
            <div style={{ width: '75px', height: '75px', backgroundColor: '#f3f4f6', borderRadius: '16px', flexShrink: 0 }} />
            
            <div style={{ marginLeft: '16px', flex: 1, minWidth: 0, paddingRight: '4px' }}>
              {item.emAlta && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px', marginBottom: '4px' }}>
                  <HiOutlineFire size={11} /> EM ALTA
                </span>
              )}
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>{item.nome}</h4>
              <p style={{ margin: '2px 0 6px 0', fontSize: '11px', color: '#64748b' }}>{item.loja}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#f0fdf4', color: '#16a34a', padding: '2px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700' }}>
                <FiTrendingDown size={12} /> {item.statusPreco}
              </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
              <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: item.favoritado ? '#fef2f2' : '#f8fafc', display: 'flex', cursor: 'pointer' }}>
                <FiHeart size={14} color={item.favoritado ? '#ef4444' : '#94a3b8'} fill={item.favoritado ? '#ef4444' : 'none'} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>{item.precoAtual}</span>
              <span style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through' }}>{item.precoAntigo}</span>
              <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><FiClock size={11} /> {item.tempo}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CARD: OFERTAS RELÂMPAGO */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '14px', marginRight: '14px' }}>
          <HiOutlineFire size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Ofertas relâmpago</h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b' }}>Descontos por tempo limitado.</p>
        </div>
        {/* Cronômetro */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginRight: '8px' }}>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>05</span><span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '600' }}>hrs</span></div>
          <span style={{ color: '#2563eb', fontWeight: '700', marginBottom: '10px' }}>:</span>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>18</span><span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '600' }}>min</span></div>
          <span style={{ color: '#2563eb', fontWeight: '700', marginBottom: '10px' }}>:</span>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>42</span><span style={{ fontSize: '8px', color: '#94a3b8', fontWeight: '600' }}>seg</span></div>
        </div>
        <FiChevronRight size={18} color="#cbd5e1" />
      </div>

      {/* SEÇÃO: LOJAS COM MELHORES OFERTAS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Lojas com melhores ofertas</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b82f6', cursor: 'pointer' }}>Ver todas</span>
      </div>

      {/* CAROUSEL HORIZONTAL: LOJAS */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {lojas.map((loja, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '14px', width: '130px', flexShrink: 0, textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#f8fafc', borderRadius: '50%', margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '12px', color: '#334155', border: '1px solid #e2e8f0' }}>
              {loja.nome[0]}
            </div>
            <h5 style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>{loja.nome}</h5>
            <p style={{ margin: '4px 0 10px 0', fontSize: '10px', fontWeight: '700', color: '#16a34a' }}>{loja.desconto}</p>
            <button style={{ width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '6px 0', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Ver ofertas</button>
          </div>
        ))}
      </div>

    </div>
  );
};