// frontend/src/components/Card/CardProduto.tsx
export const CardProduto = ({ nome, loja, precoAtual, desconto }: any) => {
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
      {/* Aqui entraria a foto do produto */}
      <div style={{ width: '60px', height: '60px', backgroundColor: '#ddd', borderRadius: '10px' }} />
      
      <div style={{ marginLeft: '15px', flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{nome}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{loja}</p>
        <p style={{ margin: '5px 0 0', fontWeight: 'bold', color: '#27ae60' }}>{precoAtual}</p>
      </div>

      <div style={{ backgroundColor: '#e8f6ef', padding: '5px 10px', borderRadius: '20px', color: '#27ae60', fontSize: '12px' }}>
        {desconto}
      </div>
    </div>
  );
};