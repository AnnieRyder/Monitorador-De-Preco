// frontend/src/components/Layout/TabBar.tsx
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiTag, FiPlus, FiUser } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

export const TabBar = () => {
  const location = useLocation();

  const getLinkColor = (path: string) => {
    return location.pathname === path ? '#3b82f6' : '#64748b';
  };

  const linkStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    flex: 1,
    paddingBottom: '8px',
    zIndex: 2,
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'white',
      padding: '0 0 12px 0',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      position: 'relative',
      height: '65px',
      // Criando a sombra suave na barra branca superior, exceto onde a onda sobe
      boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)',
    }}>
      
      {/* 1. O SEGREDO DA ONDA ATRÁS DO BOTÃO */}
      <div style={{
        position: 'absolute',
        top: '-18px', // Sobe a onda branca para fazer o relevo do print
        left: '50%',
        transform: 'translateX(-50%)',
        width: '74px',
        height: '78px',
        backgroundColor: 'white',
        borderRadius: '100% 100%', // Cria o domo redondo atrás do botão
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.03)', // Sombra acompanhando a curva
        zIndex: 1,
      }} />

      {/* Item 1 - Início */}
      <Link to="/" style={{ ...linkStyle, color: getLinkColor('/') }}>
        <FiHome size={22} style={{ marginBottom: '4px' }} />
        <span style={{ fontSize: '10px', fontWeight: location.pathname === '/' ? '600' : '500' }}>Início</span>
      </Link>

      {/* Item 2 - Produtos */}
      <Link to="/produtos" style={{ ...linkStyle, color: getLinkColor('/produtos') }}>
        <FiTag size={22} style={{ marginBottom: '4px' }} />
        <span style={{ fontSize: '10px', fontWeight: location.pathname === '/produtos' ? '600' : '500' }}>Produtos</span>
      </Link>

      {/* Botão Central Elevado - Adicionar */}
      <Link to="/adicionar" style={{ ...linkStyle, flex: 'initial', position: 'relative', zIndex: 3, paddingBottom: '0px' }}>
        <div style={{ 
          backgroundColor: '#3b82f6', // O azul vivo do seu print
          color: 'white', 
          width: '52px',          
          height: '52px',         
          borderRadius: '50%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-24px)', // Joga o botão perfeitamente no centro da onda elevada
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)', // Sombra suave abaixo do botão azul
        }}>
          <FiPlus size={26} />
        </div>
        <span style={{ 
          fontSize: '10px', 
          fontWeight: getLinkColor('/adicionar') === '#3b82f6' ? '600' : '500', 
          color: getLinkColor('/adicionar'),
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap'
        }}>
          Adicionar
        </span>
      </Link>

      {/* Item 4 - Promoções */}
      <Link to="/promocoes" style={{ ...linkStyle, color: getLinkColor('/promocoes') }}>
        <HiOutlineFire size={24} style={{ marginBottom: '3px' }} />
        <span style={{ fontSize: '10px', fontWeight: location.pathname === '/promocoes' ? '600' : '500' }}>Promoções</span>
      </Link>

      {/* Item 5 - Perfil */}
      <Link to="/perfil" style={{ ...linkStyle, color: getLinkColor('/perfil') }}>
        <FiUser size={22} style={{ marginBottom: '4px' }} />
        <span style={{ fontSize: '10px', fontWeight: location.pathname === '/perfil' ? '600' : '500' }}>Perfil</span>
      </Link>

    </div>
  );
};