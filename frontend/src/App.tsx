// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Layout/Pages/Home';
import { Produtos } from './components/Layout/Pages/Produtos';
import { Adicionar } from './components/Layout/Pages/Adicionar';
import { Promocoes } from './components/Layout/Pages/Promocoes';
import { Perfil } from './components/Layout/Pages/Perfil';
import { Lojas } from './components/Layout/Pages/Lojas';
import { Configuracoes } from './components/Layout/Pages/Configuracoes';
import { Notificacoes } from './components/Layout/Pages/Notificacoes';
import { ResponsiveLayout } from './components/ResponsivoLayout';
import { TabBar } from './components/Layout/TabBar';

function App() {
  return (
    <Router>
      {/* 1. O ResponsiveLayout fica no topo para decidir se mostra a Sidebar ou o modo Mobile */}
      <ResponsiveLayout>
        
        {/* Container que gerencia a área das páginas */}
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/adicionar" element={<Adicionar />} /> 
            <Route path="/promocoes" element={<Promocoes />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/lojas" element={<Lojas />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/notificacoes" element={<Notificacoes />} />
          </Routes>
        </div>

        {/* 2. Deixamos a TabBar aqui embaixo, pois o ResponsiveLayout já vai escondê-la automaticamente no Desktop via CSS! */}
        <TabBar />
        
      </ResponsiveLayout>
    </Router>
  );
}

export default App;