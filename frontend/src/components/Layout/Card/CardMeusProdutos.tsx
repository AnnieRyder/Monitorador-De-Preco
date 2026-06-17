// frontend/src/components/Layout/Card/CardMeusProdutos.tsx
import { FiHeart, FiBell, FiChevronRight } from 'react-icons/fi';

export const CardMeusProdutos = ({ nome, loja, precoAntigo, desconto, metaPreco, statusPreco, favoritado }: any) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '20px',
      backgroundColor: '#fff',
      marginBottom: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      border: '1px solid #f3f4f6',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* 1. FOTO DO PRODUTO (Fixo na esquerda) */}
      <div style={{ width: '75px', height: '75px', backgroundColor: '#f3f4f6', borderRadius: '16px', flexShrink: 0 }} />

      {/* 2. TEXTOS DA ESQUERDA (Ocupa o centro e controla o espaço) */}
      <div style={{ marginLeft: '16px', flex: 1, minWidth: 0 }}>
        <h4 style={{ 
          margin: 0, 
          fontSize: '14px', 
          fontWeight: '700', 
          color: '#0f172a', 
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>{nome}</h4>
        
        <p style={{ margin: '2px 0 8px 0', fontSize: '12px', color: '#64748b' }}>{loja}</p>
        
        {/* Bloco Meta Definida (Perfeitamente alinhado abaixo) */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#1e293b', position: 'relative', top: '3px' }}>
          <FiBell size={14} style={{ marginRight: '6px', flexShrink: 0, position: 'relative', top: '-6px'}} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap' }}>{metaPreco}</span>
            <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px', whiteSpace: 'nowrap' }}>Meta definida</span>
          </div>
        </div>
      </div>

      {/* 3. BLOCO DOS PREÇOS (Isolado totalmente na direita) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',  
        marginLeft: '19px', // Garante uma distância mínima dos textos do centro
        flexShrink: 0 
      }}>
        
        {/* Coluna de preços empilhada de forma limpa */}
        <div style={{ 
          textAlign: 'right', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end',
          gap: '20px' // Cria um espaçamento fixo vertical entre os elementos, sem encavalar
        }}>
          {/* Tag preço antigo comparativo */}
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', 
            backgroundColor: '#f0fdf4', color: '#16a34a', 
            padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ marginRight: '2px' }}>↓</span> {precoAntigo}
          </div>
          
          {/* Porcentagem */}
          <span style={{ 
            fontSize: '11px', 
            fontWeight: '700', 
            color: '#16a34a',
            backgroundColor: '#f0fdf4',
            padding: '2px 6px',
            borderRadius: '6px',
            whiteSpace: 'nowrap'
          }}>
            {desconto}
          </span>
          
     {/* Status temporal (Movido isoladamente para a direita) */}
<span style={{ 
  fontSize: '11px', 
  color: '#94a3b8', 
  whiteSpace: 'nowrap', 
  marginTop: '4px',
  position: 'relative',
  left: '29px' // <-- Aumente ou diminua esse número para ajustar a distância exata que você quer empurrar
}}>
  {statusPreco}
</span>
        </div>

        {/* Botão de Favorito (Coraçãozinho) */}
        <div style={{ 
          backgroundColor: favoritado ? '#fef2f2' : '#f8fafc', 
          padding: '8px', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0
        }}>
          <FiHeart size={16} color={favoritado ? '#ef4444' : '#94a3b8'} fill={favoritado ? '#ef4444' : 'none'} />
        </div>

        {/* Seta */}
        <FiChevronRight size={18} color="#cbd5e1" style={{ flexShrink: 0 }} />
      </div>

    </div>
  );
};