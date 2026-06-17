// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MobileContainer } from './components/Layout/MobileContainer';
import { TabBar } from './components/Layout/TabBar';
import Home from './components/Layout/Pages/Home'; 
import { Produtos } from './components/Layout/Pages/Produtos';
import { Adicionar } from './components/Layout/Pages/Adicionar';
import { Promocoes } from './components/Layout/Pages/Promocoes';
import { Perfil } from './components/Layout/Pages/Perfil';
import { Lojas } from './components/Layout/Pages/Lojas';
import { Configuracoes } from './components/Layout/Pages/Configuracoes'
import { Notificacoes } from './components/Layout/Pages/Notificacoes';


function App() {
  return (
    <Router>
      <MobileContainer>
        {/* Container principal */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
          
          {/* ÁREA DINÂMICA: É aqui que o React Router troca as páginas */}
          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: 'white' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/adicionar" element={<Adicionar />} /> 
              <Route path="/promocoes" element={<Promocoes />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/lojas" element={<Lojas />} />
              <Route path="/configuracoes" element={<Configuracoes/>} />
              <Route path="/notificacoes" element={<Notificacoes />} />
              
            </Routes>
          </div>

          {/* TABBAR FIXA: Fica fora das rotas para não sumir */}
          <TabBar />
          
        </div>
      </MobileContainer>
    </Router>
  );
}

export default App;