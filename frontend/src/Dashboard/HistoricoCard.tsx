// frontend/src/components/Layout/Card/HistoricoCard.tsx
interface HistoricoCardProps {
  nome: string;
  descricao: string;
  precoAtual: string;
  precoAntigo: string;
  
}
export const HistoricoCard = ({ nome, descricao, precoAtual, precoAntigo }: HistoricoCardProps) => ( 


  <div style={{ display: 'flex', alignItems: 'center', padding: '15px', background: 'white', borderRadius: '15px', marginBottom: '10px' }}>
    <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '10px', marginRight: '15px' }}>🛍️</div>
    <div style={{ flex: 1 }}>
      <h4 style={{ margin: 0, fontSize: '14px' }}>{nome}</h4>
      <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>{descricao}</p>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div style={{ color: '#16a34a', fontWeight: 'bold' }}>{precoAtual}</div>
      <div style={{ fontSize: '10px', textDecoration: 'line-through', color: '#999' }}>{precoAntigo}</div>
    </div>
  </div>
);
