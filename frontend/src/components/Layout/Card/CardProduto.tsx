// frontend/src/components/Card/CardProduto.tsx
export const CardProduto = ({ nome, loja, precoAtual, precoAntigo, desconto }: any) => {
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
      <div style={{ width: '60px', height: '60px', backgroundColor: '#ddd', borderRadius: '10px' }} />
      
      <div style={{ marginLeft: '15px', flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{nome}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{loja}</p>
        
        <div style={{ marginTop: '5px' }}>
          {/* Box Verde com o Preço Antigo dentro */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            backgroundColor: '#f0fdf4', 
            color: '#16a34a', 
            padding: '2px 8px', 
            borderRadius: '8px', 
            fontSize: '12px', 
            fontWeight: '600',
            marginBottom: '4px'
          }}>
            <span style={{ marginRight: '4px', marginTop: '-0.1rem' }}>↓</span>
            {precoAntigo}
          </div>
          

          {/* Texto Preço Atual */}
          <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
            Preço atual: {precoAtual}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#e8f6ef', padding: '5px 10px', borderRadius: '20px', color: '#27ae60', fontSize: '12px', fontWeight: '600' }}>
        {desconto}
      </div>
    </div>
  );
};