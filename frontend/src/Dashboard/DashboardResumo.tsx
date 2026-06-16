import { FiImage, FiTag, FiShoppingBag, FiSettings, FiEye, FiArrowDown, FiBell } from 'react-icons/fi';

export const DashboardResumo = () => {
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
      
      
      {/* 1. Ícones do Topo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        
        <div style={{ textAlign: 'center', width: '22%' }}>
          <div style={{ background: '#eff6ff', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiImage size={24} color="#3b82f6" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '500', color: '#444', margin: 0 }}>Meus Produtos</p>
        </div>

        <div style={{ textAlign: 'center', width: '22%' }}>
          <div style={{ background: '#f0fdf4', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiTag size={24} color="#22c55e" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '500', color: '#444', margin: 0 }}>Promoções</p>
        </div>

        <div style={{ textAlign: 'center', width: '22%' }}>
          <div style={{ background: '#faf5ff', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiShoppingBag size={24} color="#a855f7" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '500', color: '#444', margin: 0 }}>Lojas</p>
        </div>

        <div style={{ textAlign: 'center', width: '22%' }}>
          <div style={{ background: '#fff7ed', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiSettings size={24} color="#f97316" />
          </div>
          <p style={{ fontSize: '10px', fontWeight: '500', color: '#444', margin: 0 }}>Configurações</p>
        </div>

      </div>

      <h4 style={{ marginBottom: '15px', fontSize: '16px', color: '#1a1a1a', margin: '0 0 15px 0' }}>Resumo</h4>

      {/* 2. Números com Linhas Divisórias */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
        
        {/* Bloco 12 */}
        <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ background: '#eff6ff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiEye size={14} color="#3b82f6" />
          </div>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#0b1e36' }}>12</h4>
          <p style={{ fontSize: '10px', color: '#888', marginTop: '4px', lineHeight: '1.2' }}>Monitorando<br/>produtos</p>
        </div>

        {/* Bloco 5 */}
        <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiArrowDown size={18} color="#22c55e" />
          </div>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#0b1e36' }}>5</h4>
          <p style={{ fontSize: '10px', color: '#888', marginTop: '4px', lineHeight: '1.2' }}>Produtos com<br/>queda de preço</p>
        </div>

        {/* Bloco 2 */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <FiBell size={16} color="#f97316" />
          </div>
          <h4 style={{ margin: 0, fontSize: '18px', color: '#0b1e36' }}>2</h4>
          <p style={{ fontSize: '10px', color: '#888', marginTop: '4px', lineHeight: '1.2' }}>Alertas não<br/>lidos</p>
        </div>

      </div>
    </div>
  );
};