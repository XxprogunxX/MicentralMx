import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  Wallet, 
  ShoppingCart, 
  Pencil, 
  XCircle, 
  ShoppingBag, 
  X 
} from 'lucide-react';

interface HistorialAuditoriaViewProps {
  onBack: () => void;
}

export const HistorialAuditoriaView: React.FC<HistorialAuditoriaViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState<'todo' | 'ventas' | 'pagos' | 'inventario' | 'usuarios'>('todo');

  const logs = [
    {
      id: 'l-1',
      usuario: 'Ana H.',
      accion: 'registró un pago de $1,500 de Juan Pérez',
      hora: '16:20',
      modulo: 'Deudas',
      tipo: 'pagos',
      icon: <Wallet size={18} color="var(--color-primary)" />,
      bgColor: '#E4F3EB'
    },
    {
      id: 'l-2',
      usuario: 'Carlos M.',
      accion: 'registró la venta #000128 por $1,180',
      hora: '16:05',
      modulo: 'Ventas',
      tipo: 'ventas',
      icon: <ShoppingCart size={18} color="var(--color-success)" />,
      bgColor: 'var(--color-success-bg)'
    },
    {
      id: 'l-3',
      usuario: 'Ana H.',
      accion: 'cambió el precio de Jitomate Saladette Primera / Grande de $400 a $420',
      hora: '09:12',
      modulo: 'Inventario',
      tipo: 'inventario',
      icon: <Pencil size={18} color="var(--color-text-secondary)" />,
      bgColor: '#F1F5F9'
    },
    {
      id: 'l-4',
      usuario: 'Ana H.',
      accion: 'canceló la venta #000124',
      hora: '14:12',
      modulo: 'Ventas',
      tipo: 'ventas',
      icon: <XCircle size={18} color="var(--color-error)" />,
      bgColor: '#FDE8E8'
    },
    {
      id: 'l-5',
      usuario: 'Rodolfo H.',
      accion: 'registró la compra #C-0045 de Agrícola San Juan',
      hora: '06:20',
      modulo: 'Compras',
      tipo: 'compras',
      icon: <ShoppingBag size={18} color="var(--color-info)" />,
      bgColor: '#E3F0F9'
    }
  ];

  const filtered = logs.filter(l => {
    const text = `${l.usuario} ${l.accion} ${l.modulo}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (activeChip === 'ventas') return l.tipo === 'ventas';
    if (activeChip === 'pagos') return l.tipo === 'pagos';
    if (activeChip === 'inventario') return l.tipo === 'inventario';
    return true;
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '90px'
    }}>
      {/* Encabezado */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <button 
          onClick={onBack}
          style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-primary)' }}
        >
          <ArrowLeft size={22} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', marginLeft: '8px' }}>
          Historial
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Buscador */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en el historial"
              style={{ paddingLeft: '38px', paddingRight: searchTerm ? '36px' : '12px', height: '46px', fontSize: '15px' }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button className="btn-outline" style={{ height: '46px', padding: '0 14px' }}>
            <SlidersHorizontal size={18} />
            <span>Filtrar</span>
          </button>
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '18px' }}>
          {[
            { key: 'todo', label: 'Todo' },
            { key: 'ventas', label: 'Ventas' },
            { key: 'pagos', label: 'Pagos' },
            { key: 'inventario', label: 'Inventario' },
            { key: 'usuarios', label: 'Usuarios' }
          ].map(c => (
            <button
              key={c.key}
              onClick={() => setActiveChip(c.key as any)}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: activeChip === c.key ? '#E4F3EB' : 'var(--color-surface)',
                color: activeChip === c.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                border: activeChip === c.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Sección: HOY (Pág. 29) */}
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          letterSpacing: '0.6px', 
          color: 'var(--color-text-secondary)', 
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          Hoy
        </div>

        {/* Lista de eventos de auditoría */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '8px', 
                backgroundColor: item.bgColor, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: '1.4' }}>
                  <strong>{item.usuario}</strong> {item.accion}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {item.hora} · {item.modulo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
