// frontend/src/Dashboard/HistoricoCard.tsx
export const HistoricoCard = ({ nome, descricao, precoAtual, precoAntigo, data }: any) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      border: '1px solid #eee',
      borderRadius: '15px',
      marginBottom: '10px',
      backgroundColor: '#fff'
    }}>
      {/* Ícone de Sacola (igual ao seu print) */}
      <div style={{ 
        width: '50px', height: '50px', 
        backgroundColor: '#f0fdf4', 
        borderRadius: '50%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#16a34a'
      }}>
        <span>🛍️</span>
      </div>
      
      <div style={{ marginLeft: '15px', flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{nome}</p>
        <p style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>{descricao}</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#999' }}>{data}</p>
      </div>

      {/* Preços com efeito riscado */}
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#16a34a', fontSize: '13px' }}>{precoAtual}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>
          {precoAntigo}
        </p>
      </div>

      {/* Seta de navegação */}
      <div style={{ marginLeft: '10px', color: '#ccc' }}>&gt;</div>
    </div>
  );
};