// frontend/src/components/Layout/Pages/Home.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiBell, FiTag, FiTrendingDown, FiDollarSign, 
  FiPieChart, FiStar, FiChevronRight
} from 'react-icons/fi';

// Seus imports mobiles originais
import { CardProduto } from '../Card/CardProduto';
import { DashboardResumo } from '../../../Dashboard/DashboardResumo';
import { HistoricoCard } from '../../../Dashboard/HistoricoCard';
import listaProdutos from '../../../data/produtos.json';

export const Home = () => {
  const navigate = useNavigate();
  const [produtos] = useState(listaProdutos);
  const [termoBusca, setTermoBusca] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const produtosFiltrados = produtos.filter((p: any) => 
    p.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
    p.loja.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const lojasOfertas = [
    { nome: 'Amazon', desconto: 'Até 40% OFF', logo: 'A' },
    { nome: 'Magazine Luiza', desconto: 'Até 30% OFF', logo: 'M' },
    { nome: 'Mercado Livre', desconto: 'Até 25% OFF', logo: 'M' },
    { nome: 'Shopee', desconto: 'Até 50% OFF', logo: 'S' },
    { nome: 'KaBuM!', desconto: 'Até 35% OFF', logo: 'K' },
  ];

  // ===================================================
  // 📱 VERSÃO MOBILE: Seu layout original restaurado
  // ===================================================
  if (isMobile) {
    return (
      <div style={{ paddingBottom: '40px' }}>
        
        {/* Header Azul Mobile */}
        <div style={{ 
          backgroundColor: '#0b1e36', 
          color: 'white', 
          padding: '30px 20px 80px',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Olá, Bem Vindo! 👋</h2>
              <p style={{ opacity: 0.8, fontSize: '12px', margin: '4px 0 0 0' }}>
                Monitore seus produtos e receba <br />alertas quando o preço cair
              </p>
            </div>
            
            <div 
              onClick={() => navigate('/notificacoes')}
              style={{ position: 'relative', marginTop: '5px', cursor: 'pointer' }}
            >
              <FiBell size={24} color="white" />
              <div style={{ 
                position: 'absolute', top: 0, right: 2, 
                width: '7px', height: '7px', 
                backgroundColor: '#f97316', 
                borderRadius: '50%', 
                border: '2px solid #0b1e36' 
              }} />
            </div>
          </div>
          
          <div style={{ position: 'relative', marginTop: '15px' }}>
            <FiSearch 
              size={20} 
              color="#999" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              placeholder="Buscar produto ou loja" 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              style={{ 
                width: '100%',             
                boxSizing: 'border-box',   
                padding: '14px 20px 14px 45px', 
                borderRadius: '25px',      
                border: 'none',            
                display: 'block',
                outline: 'none',
              }} 
            />
          </div>
        </div>

        {/* Dashboard Resumo Original */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '30px 30px 0 0', 
          marginTop: '-60px',          
          paddingTop: '30px',          
        }}>
          <DashboardResumo />
        </div>

        {/* Listas Originais Mobile */}
        <div style={{ marginTop: '32px', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', margin: 0, color: '#1a1a1a', fontWeight: '700' }}>Alertas de preço</h3>
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Ver todos</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {produtosFiltrados.map((p: any) => (
              <CardProduto 
                key={p.id} 
                nome={p.nome} 
                loja={p.loja} 
                precoAtual={p.precoAtual} 
                precoAntigo={p.precoAntigo} 
                desconto={p.desconto} 
              />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '36px' }}>
            <h3 style={{ fontSize: '16px', margin: 0, color: '#1a1a1a', fontWeight: '700' }}>Histórico de alertas</h3>
            <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Ver todos</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <HistoricoCard 
              nome="Notebook Dell Inspiron i15" 
              descricao="Queda de preço detectada" 
              precoAtual="R$ 2.799,00" 
              precoAntigo="R$ 3.199,00" 
            />
          </div>
        </div>

      </div>
    );
  }

  // ===================================================
  // 💻 VERSÃO DESKTOP: O painel em grid que você escolheu
  // ===================================================
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 10px 40px 10px', boxSizing: 'border-box' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>Olá, Rayane! 👋</h1>
        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Acompanhe seus produtos e economize com inteligência.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        
        {/* Card 1: Produtos Monitorados */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f3e8ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiTag size={22} color="#a855f7" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>32</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Produtos monitorados</p>
            <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '700' }}>+5 este mês</span>
          </div>
        </div>

        {/* Card 2: Alertas Ativos */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#f0fdf4', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiTrendingDown size={22} color="#16a34a" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>7</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Alertas ativos</p>
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700' }}>2 novos</span>
          </div>
        </div>

        {/* Card 3: Total Economizado */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#fff7ed', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiDollarSign size={22} color="#ea580c" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>R$ 1.273,45</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total economizado</p>
            <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: '700' }}>este mês</span>
          </div>
        </div>

        {/* Card 4: Alertas Disparados */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: '#eff6ff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FiPieChart size={22} color="#2563eb" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>14</h3>
            <p style={{ margin: '2px 0 6px 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Alertas disparados</p>
            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700' }}>este mês</span>
          </div>
        </div>

      </div>

      {/* Grid Central */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.1fr', gap: '24px', marginBottom: '32px', alignItems: 'start' }}>
        
        {/* ================= COLUNA ESQUERDA ================= */}
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Quedas de preço recentes</h2>
            <span style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>Ver todas</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Item 1: Headphone Sony */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
              <div style={{ marginLeft: '16px', flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Headphone Sony WH-1000XM5</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Amazon</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '24px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>R$ 3.299,00</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>R$ 2.699,00</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginRight: '24px', minWidth: '70px' }}>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>↓ 18%</span>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Há 2 horas</span>
              </div>
              <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                <FiStar size={16} />
              </button>
            </div>

            {/* Item 2: Air Fryer */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
              <div style={{ marginLeft: '16px', flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Air Fryer Philips Walita Série 3000</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Magalu</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '24px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>R$ 599,90</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>R$ 449,90</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginRight: '24px', minWidth: '70px' }}>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>↓ 25%</span>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Há 5 horas</span>
              </div>
              <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                <FiStar size={16} />
              </button>
            </div>

            {/* Item 3: Smartwatch Xiaomi */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f8fafc' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
              <div style={{ marginLeft: '16px', flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Smartwatch Xiaomi Redmi Watch 3</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Mercado Livre</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '24px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>R$ 319,00</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>R$ 259,90</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginRight: '24px', minWidth: '70px' }}>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>↓ 18%</span>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Há 1 dia</span>
              </div>
              <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                <FiStar size={16} />
              </button>
            </div>

            {/* Item 4: Kindle */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
              <div style={{ marginLeft: '16px', flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Kindle 11ª Geração</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Amazon</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '24px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>R$ 899,00</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>R$ 719,00</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginRight: '24px', minWidth: '70px' }}>
                <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>↓ 20%</span>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Há 1 dia</span>
              </div>
              <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                <FiStar size={16} />
              </button>
            </div>

          </div>
          
          {/* BOTÃO CENTRALIZADO: Ver todos os produtos */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', borderTop: '1px solid #f8fafc', paddingTop: '16px' }}>
            <button 
              onClick={() => navigate('/produtos')}
              style={{ 
                padding: '10px 24px', border: 'none', borderRadius: '12px', backgroundColor: 'transparent', 
                color: '#334155', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
            >
              Ver todos os produtos
            </button>
          </div>

        </div>

        {/* ================= COLUNA DIREITA (WRAPPER RESTAURADO) ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Alertas ativos</h2>
              <span 
                onClick={() => navigate('/notificacoes')}
                style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}
              >
                Ver todos
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Item 1: Sony Headphone */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#f8fafc', borderRadius: '12px', flexShrink: 0 }} />
                <div style={{ marginLeft: '16px', flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Headphone Sony WH-1000XM5</h4>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginTop: '2px', display: 'inline-block' }}>Amazon</span>
                </div>
                <div style={{ textAlign: 'right', marginRight: '20px', fontSize: '14px', lineHeight: '1.5' }}>
                  <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>Meta: <strong style={{ color: '#0f172a', fontWeight: '700' }}>R$ 2.500,00</strong></p>
                  <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>Atual: <strong style={{ color: '#16a34a', fontWeight: '700' }}>R$ 2.699,00</strong></p>
                </div>
                <button style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6366f1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <FiBell size={18} />
                </button>
              </div>

              {/* Item 2: Smart TV LG */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#f8fafc', borderRadius: '12px', flexShrink: 0 }} />
                <div style={{ marginLeft: '16px', flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Smart TV LG 55" OLED C3</h4>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginTop: '2px', display: 'inline-block' }}>Magalu</span>
                </div>
                <div style={{ textAlign: 'right', marginRight: '20px', fontSize: '14px', lineHeight: '1.5' }}>
                  <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>Meta: <strong style={{ color: '#0f172a', fontWeight: '700' }}>R$ 4.000,00</strong></p>
                  <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>Atual: <strong style={{ color: '#16a34a', fontWeight: '700' }}>R$ 4.299,00</strong></p>
                </div>
                <button style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6366f1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <FiBell size={18} />
                </button>
              </div>

              {/* Item 3: PlayStation 5 */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#f8fafc', borderRadius: '12px', flexShrink: 0 }} />
                <div style={{ marginLeft: '16px', flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>PlayStation 5</h4>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginTop: '2px', display: 'inline-block' }}>Amazon</span>
                </div>
                <div style={{ textAlign: 'right', marginRight: '20px', fontSize: '14px', lineHeight: '1.5' }}>
                  <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>Meta: <strong style={{ color: '#0f172a', fontWeight: '700' }}>R$ 2.400,00</strong></p>
                  <p style={{ margin: 0, color: '#64748b', fontWeight: '500' }}>Atual: <strong style={{ color: '#16a34a', fontWeight: '700' }}>R$ 2.749,00</strong></p>
                </div>
                <button style={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6366f1', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                  <FiBell size={18} />
                </button>
              </div>

            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Economia nos últimos 6 meses</h2>
              <span style={{ fontSize: '16px', color: '#16a34a', fontWeight: '800' }}>R$ 1.273,45</span>
            </div>

            {/* Container da Área do Gráfico */}
            <div style={{ display: 'flex', position: 'relative', height: '160px', marginTop: '10px' }}>
              
              {/* Eixo Y (Valores à esquerda) */}
              <div style={{ 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
                height: '130px', width: '60px', fontSize: '12px', color: '#64748b', 
                fontWeight: '600', paddingRight: '10px', boxSizing: 'border-box', textAlign: 'right'
              }}>
                <div>R$ 1.500</div>
                <div>R$ 1.000</div>
                <div>R$ 500</div>
                <div>R$ 0</div>
              </div>

              {/* Área das Linhas de Grade e Linha de Tendência */}
              <div style={{ flex: 1, position: 'relative', height: '130px' }}>
                
                {/* Linhas Horizontais de Fundo (Grid) */}
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '0%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '33.3%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '66.6%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#f1f5f9', top: '100%' }} />

                {/* Gráfico Desenhado em SVG para precisão absoluta */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path d="M 20 120 L 90 95 L 160 80 L 230 60 L 300 40 L 370 30 L 370 130 L 20 130 Z" fill="url(#areaGrad)" />
                  <path d="M 20 120 L 90 95 L 160 80 L 230 60 L 300 40 L 370 30" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />

                  <circle cx="20" cy="120" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                  <circle cx="90" cy="95" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                  <circle cx="160" cy="80" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                  <circle cx="230" cy="60" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                  <circle cx="300" cy="40" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                  <circle cx="370" cy="30" r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />
                </svg>

                {/* Eixo X (Meses) */}
                <div style={{ position: 'absolute', top: '144px', left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10px 0 12px', boxSizing: 'border-box', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                  <span>Dez</span>
                  <span>Jan</span>
                  <span>Fev</span>
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>Mai</span>
                </div>

              </div>
            </div>
          </div>

        </div> 
        {/* ================= FIM DA COLUNA DIREITA ================= */}

      </div> 
      {/* ================= FIM DO GRID CENTRAL ================= */}

      {/* Ofertas das lojas */}
    <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>Ofertas das lojas</h2>
          <span 
            onClick={() => navigate('/lojas')}
            style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}
          >
            Ver todas
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {lojasOfertas.map((loja: any, idx: number) => (
              <div key={idx} style={{ border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                
                {/* Topo do Card: Logo na esquerda, Textos na direita */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: '#0f172a', flexShrink: 0 }}>
                    {loja.logo}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{loja.nome}</h4>
                    <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', marginTop: '4px' }}>
                      {loja.desconto}
                    </span>
                  </div>
                </div>

                {/* Botão Ver ofertas */}
                <button 
                  style={{ 
                    width: '100%', padding: '10px 0', border: '1px solid #e0e7ff', 
                    borderRadius: '10px', backgroundColor: '#fff', color: '#6366f1', 
                    fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' 
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                >
                  Ver ofertas
                </button>
              </div>
            ))}
          </div>

       {/* Seta Direita Flutuante */}
        <button style={{ 
          position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)', 
          width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', 
          border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0f172a' 
        }}>
          <FiChevronRight size={20} />
    </button>
      </div>

    </div>

  </div>
  );
};