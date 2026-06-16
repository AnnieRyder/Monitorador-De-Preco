import { FiHome, FiPlus, FiTag, FiUser } from 'react-icons/fi';
import { ImFire } from "react-icons/im";




export const TabBar = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'white',
      borderTop: '1px solid #f0f0f0',
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      position: 'relative',
      paddingBottom: '15px' 
    }}>
      
      {/* Item 1 - Início */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#3b82f6' }}>
        <FiHome size={22} style={{ marginBottom: '2px' }} />
        <span style={{ fontSize: '10px', fontWeight: '600' }}>Início</span>
      </div>

      {/* Item 2 - Produtos */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666' }}>
        <FiTag size={22} style={{ marginBottom: '2px' }} />
        <span style={{ fontSize: '10px', fontWeight: '500' }}>Produtos</span>
      </div>

      {/* Botão Central - Adicionar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          width: '56px',          
          height: '56px',         
          borderRadius: '50%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-45px',
          marginBottom: '4px',
          boxShadow: '0 4px 10px rgba(59, 130, 246, 0.4)', 
          cursor: 'pointer'
        }}>
          <FiPlus size={28} />
        </div>
        <span style={{ fontSize: '10px', fontWeight: '500', color: '#666' }}>Adicionar</span>
      </div>

      {/* Item 4 - Promoções (Agora usando o HiOutlineFire) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666' }}>
        <ImFire size={24} style={{ marginBottom: '2px' }} />
        <span style={{ fontSize: '10px', fontWeight: '500' }}>Promoções</span>
      </div>

      {/* Item 5 - Perfil */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666' }}>
        <FiUser size={22} style={{ marginBottom: '2px' }} />
        <span style={{ fontSize: '10px', fontWeight: '500' }}>Perfil</span>
      </div>

    </div>
  );
};