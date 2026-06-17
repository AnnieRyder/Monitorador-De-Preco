// frontend/src/components/Layout/Pages/Notificacoes.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiSettings, 
  FiArrowDown, 
  FiArrowUp, 
  FiTag, 
  FiBell, 
  FiChevronRight,
  FiVolume2
} from 'react-icons/fi';

export const Notificacoes = () => {
  const navigate = useNavigate();
  const [filtroAtivo, setFiltroAtivo] = useState('Todas');

  const filtros = [
    { id: 'Todas', label: 'Todas', qtd: 12 },
    { id: 'Caiu', label: 'Preço caiu', qtd: 8, icon: <FiArrowDown size={14} /> },
    { id: 'Subiu', label: 'Preço subiu', qtd: 2, icon: <FiArrowUp size={14} /> },
    { id: 'Outros', label: 'Outros', qtd: 2 },
  ];

  const notificacoesHoje = [
    { id: 1, tipo: 'caiu', titulo: 'Preço caiu!', desc: 'O preço do Headphone Sony WH-1000XM5 caiu de R$ 3.299,00 para R$ 2.699,00 na Amazon.', economia: 'Você economiza R$ 600,00', hora: '09:30', lido: false },
    { id: 2, tipo: 'caiu', titulo: 'Preço caiu!', desc: 'O preço da Air Fryer Philips Walita Série 3000 caiu de R$ 599,90 para R$ 449,90 na Magalu.', economia: 'Você economiza R$ 150,00', hora: '08:15', lido: false },
    { id: 3, tipo: 'caiu', titulo: 'Preço caiu!', desc: 'O preço do Smartwatch Xiaomi Redmi Watch 3 caiu de R$ 319,00 para R$ 259,90 no Mercado Livre.', economia: 'Você economiza R$ 59,10', hora: '07:45', lido: false },
  ];

  const notificacoesOntem = [
    { id: 4, tipo: 'nova_oferta', logo: 'A', titulo: 'Nova oferta disponível', desc: 'A Amazon publicou uma nova oferta no produto Kindle 11ª Geração.', hora: 'Ontem, 18:42', tagIcon: <FiTag size={14} color="#2563eb" />, iconBg: '#eff6ff' },
    { id: 5, tipo: 'subiu', logo: 'T', titulo: 'Preço subiu', desc: 'O preço da Camiseta Nike Sportswear subiu de R$ 129,90 para R$ 149,90 na Centauro.', hora: 'Ontem, 14:20', tagIcon: <FiArrowUp size={14} color="#ef4444" />, iconBg: '#fef2f2' },
    { id: 6, tipo: 'alerta_ativado', logo: 'B', titulo: 'Alerta activado', desc: 'Seu alerta de preço para o produto Console Xbox Series S foi ativado com sucesso.', hora: 'Ontem, 09:10', tagIcon: <FiBell size={14} color="#16a34a" />, iconBg: '#f0fdf4' },
  ];

  const notificacoesSemana = [
    { id: 7, tipo: 'promocao', logo: 'M', titulo: 'Promoção especial', desc: 'A Magazine Luiza está com até 30% OFF em produtos selecionados!', hora: 'Sex, 16:30', tagIcon: <FiVolume2 size={14} color="#a855f7" />, iconBg: '#faf5ff' },
    { id: 8, tipo: 'cupom', logo: 'S', titulo: 'Cupom disponível', desc: 'Cupom de 10% OFF na Shopee para produtos de Casa e Decoração.', hora: 'Qui, 11:05', tagIcon: <FiVolume2 size={14} color="#a855f7" />, iconBg: '#faf5ff' },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box', paddingBottom: '100px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0',
              backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', marginRight: '16px'
            }}
          >
            <FiChevronLeft size={20} color="#0f172a" />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>Notificações</h1>
            <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '13px' }}>Fique por dentro das mudanças de preço</p>
          </div>
        </div>
        <FiSettings size={22} color="#475569" style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => navigate('/configuracoes')} />
      </div>

      {/* FILTROS HORIZONTAIS */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {filtros.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltroAtivo(f.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px',
              border: '1px solid', borderColor: filtroAtivo === f.id ? '#e0effe' : '#e2e8f0',
              backgroundColor: filtroAtivo === f.id ? '#eff6ff' : '#fff',
              color: filtroAtivo === f.id ? '#2563eb' : '#475569',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s'
            }}
          >
            {f.icon && f.icon}
            {f.label}
            <span style={{ 
              fontSize: '11px', padding: '1px 6px', borderRadius: '8px', 
              backgroundColor: filtroAtivo === f.id ? '#3b82f6' : '#f1f5f9',
              color: filtroAtivo === f.id ? '#fff' : '#64748b', marginLeft: '2px'
            }}>{f.qtd}</span>
          </button>
        ))}
      </div>

      {/* SEÇÃO: HOJE */}
      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 12px 4px' }}>Hoje</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {notificacoesHoje.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item.hora}</span>
              {!item.lido && <div style={{ width: '6px', height: '6px', backgroundColor: '#3b82f6', borderRadius: '50%' }} />}
            </div>
            
            {/* Foto Produto Mock */}
            <div style={{ width: '64px', height: '64px', backgroundColor: '#f3f4f6', borderRadius: '12px', flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                <FiArrowDown size={12} color="#16a34a" />
              </div>
            </div>

            <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '20px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{item.titulo}</h4>
              <p style={{ margin: '3px 0 6px 0', fontSize: '12px', color: '#475569', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</p>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a' }}>{item.economia}</span>
            </div>
            <FiChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* SEÇÃO: ONTEM */}
      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 12px 4px' }}>Ontem</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {notificacoesOntem.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item.hora}</span>
            
            {/* Logo Circular Mock */}
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#0f172a', flexShrink: 0, position: 'relative' }}>
              {item.logo}
              <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                {item.tagIcon}
              </div>
            </div>

            <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '4px' }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{item.titulo}</h4>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{item.desc}</p>
            </div>
            <FiChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>

      {/* SEÇÃO: ESTA SEMANA */}
      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: '0 0 12px 4px' }}>Esta semana</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notificacoesSemana.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '14px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{item.hora}</span>
            
            {/* Logo Circular */}
            <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#0f172a', flexShrink: 0, position: 'relative' }}>
              {item.logo}
              <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                {item.tagIcon}
              </div>
            </div>

            <div style={{ marginLeft: '14px', flex: 1, minWidth: 0, paddingRight: '4px' }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{item.titulo}</h4>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{item.desc}</p>
            </div>
            <FiChevronRight size={16} color="#cbd5e1" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>

    </div>
  );
};