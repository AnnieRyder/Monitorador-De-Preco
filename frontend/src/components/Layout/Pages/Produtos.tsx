// frontend/src/components/Layout/Pages/Produtos.tsx
import { useState } from 'react';
import { FiSearch, FiSliders, FiBarChart2 } from 'react-icons/fi';
import { CardMeusProdutos } from '../Card/CardMeusProdutos';

export const Produtos = () => {
  const [abaAtiva, setAbaAtiva] = useState('Todos');

  // Dados mockados simulando exatamente as metas e status do seu design
  const mockProdutos = [
    { id: 1, nome: "Headphone Sony WH-1000XM5", loja: "Amazon", precoAntigo: "R$ 3.299,00", precoAtual: "R$ 2.299,00", desconto: "-30%", metaPreco: "R$ 3.499,00", statusPreco: "Menor preço hoje", favoritado: true },
    { id: 2, nome: "Air Fryer Philips Walita Série 3000", loja: "Magazine Luiza", precoAntigo: "R$ 449,90", precoAtual: "R$ 449,90", desconto: "-25%", metaPreco: "R$ 599,90", statusPreco: "Menor preço ontem", favoritado: false },
    { id: 3, nome: "Smartwatch Xiaomi Redmi Watch 3", loja: "Mercado Livre", precoAntigo: "R$ 259,90", precoAtual: "R$ 259,90", desconto: "-18%", metaPreco: "R$ 299,90", statusPreco: "Menor preço há 2 dias", favoritado: false }
  ];

  return (
    <div style={{ padding: '24px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* Topo: Título e Ícones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Meus Produtos</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>12 produtos monitorados</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', color: '#334155', marginTop: '4px' }}>
          <FiSearch size={22} style={{ cursor: 'pointer' }} />
          <FiSliders size={22} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Tabs / Segmented Control */}
      <div style={{ 
        display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '14px', marginBottom: '24px' 
      }}>
        {[
          { id: 'Todos', label: 'Todos (12)' },
          { id: 'Queda', label: '↓ Com queda (5)' },
          { id: 'SemAlteracao', label: 'Sem alteração (7)' }
        ].map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            style={{
              flex: 1, padding: '10px 4px', border: 'none', borderRadius: '10px', fontSize: '12px',
              backgroundColor: abaAtiva === aba.id ? '#1e293b' : 'transparent',
              color: abaAtiva === aba.id ? '#fff' : '#64748b',
              fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            {aba.label}
          </button>
        ))}
      </div>

      {/* Sub-Header da Lista: Ordenação */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Meus produtos</span>
        <div style={{ fontSize: '12px', color: '#64748b', cursor: 'pointer' }}>
          Ordenar <span style={{ fontWeight: '700', color: '#1e293b' }}>Mais recentes ∨</span>
        </div>
      </div>

      {/* Mapeamento da Lista usando o componente novo */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {mockProdutos.map((produto) => (
          <CardMeusProdutos key={produto.id} {...produto} />
        ))}
      </div>

      {/* Banner de Dica Inferior */}
      <div style={{
        display: 'flex', alignItems: 'center', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
        borderRadius: '16px', padding: '16px', marginTop: '20px'
      }}>
        <div style={{ 
          backgroundColor: '#dbeafe', color: '#1e40af', padding: '10px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '14px'
        }}>
          <FiBarChart2 size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1e3a8a' }}>Dica: Defina metas de preço</h5>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#60a5fa', lineHeight: '1.4' }}>
            Você será avisado quando o preço atingir ou ficar abaixo da sua meta.
          </p>
        </div>
        <button style={{
          backgroundColor: 'transparent', border: '1px solid #bfdbfe', color: '#2563eb',
          padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer'
        }}>
          Definir metas
        </button>
      </div>

    </div>
  );
};