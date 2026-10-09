import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Plus, 
  X, 
  Check 
} from 'lucide-react';

interface MovimientoCaja {
  id: string;
  titulo: string;
  detalle: string;
  monto: number;
  tipo: 'Ingreso' | 'Egreso';
}

interface PagosMovimientosViewProps {
  onBack: () => void;
}

export const PagosMovimientosView: React.FC<PagosMovimientosViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'ingresos' | 'egresos'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [movimientos, setMovimientos] = useState<MovimientoCaja[]>([
    {
      id: 'mov-1',
      titulo: 'Pago de cliente · Juan Pérez',
      detalle: 'Hoy 16:20 · Efectivo · Deuda #000098',
      monto: 1500,
      tipo: 'Ingreso'
    },
    {
      id: 'mov-2',
      titulo: 'Pago a proveedor · Agrícola San Juan',
      detalle: 'Hoy 06:30 · Transferencia',
      monto: 4000,
      tipo: 'Egreso'
    },
    {
      id: 'mov-3',
      titulo: 'Pago de cliente · Fonda El Comal',
      detalle: 'Hoy 12:10 · Transferencia',
      monto: 980,
      tipo: 'Ingreso'
    },
    {
      id: 'mov-4',
      titulo: 'Flete de mercancía',
      detalle: 'Hoy 06:00 · Efectivo',
      monto: 800,
      tipo: 'Egreso'
    },
    {
      id: 'mov-5',
      titulo: 'Ingreso · Renta de diablitos',
      detalle: 'Ayer · Efectivo',
      monto: 300,
      tipo: 'Ingreso'
    }
  ]);

  // Formulario nuevo movimiento
  const [nuevoConcepto, setNuevoConcepto] = useState('');
  const [nuevoMonto, setNuevoMonto] = useState<number>(500);
  const [nuevoTipo, setNuevoTipo] = useState<'Ingreso' | 'Egreso'>('Egreso');

  const handleAddMovimiento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoConcepto.trim() || nuevoMonto <= 0) return;

    const newMov: MovimientoCaja = {
      id: `mov-${Date.now()}`,
      titulo: nuevoConcepto,
      detalle: `Hoy ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Efectivo`,
      monto: nuevoMonto,
      tipo: nuevoTipo
    };

    setMovimientos([newMov, ...movimientos]);
    setIsModalOpen(false);
    setNuevoConcepto('');
  };

  const filtered = movimientos.filter(m => {
    if (activeTab === 'ingresos') return m.tipo === 'Ingreso';
    if (activeTab === 'egresos') return m.tipo === 'Egreso';
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
          Pagos
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Métricas: Ingresos hoy & Egresos hoy (Pág. 26) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              <ArrowDownLeft size={16} color="var(--color-success)" />
              <span>Ingresos hoy</span>
            </div>
            <div className="amount-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '4px' }}>
              $12,300
            </div>
          </div>

          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              <ArrowUpRight size={16} color="var(--color-error)" />
              <span>Egresos hoy</span>
            </div>
            <div className="amount-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '4px' }}>
              $4,800
            </div>
          </div>
        </div>

        {/* Tabs: Todos / Ingresos / Egresos */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {[
            { key: 'todos', label: 'Todos' },
            { key: 'ingresos', label: 'Ingresos' },
            { key: 'egresos', label: 'Egresos' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                height: '38px',
                padding: '0 18px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: activeTab === tab.key ? '#E4F3EB' : 'var(--color-surface)',
                color: activeTab === tab.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                border: activeTab === tab.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista de movimientos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(mov => (
            <div key={mov.id} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '8px', 
                    backgroundColor: mov.tipo === 'Ingreso' ? 'var(--color-success-bg)' : '#FDE8E8', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    {mov.tipo === 'Ingreso' ? (
                      <ArrowDownLeft size={18} color="var(--color-success)" />
                    ) : (
                      <ArrowUpRight size={18} color="var(--color-error)" />
                    )}
                  </div>

                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {mov.titulo}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {mov.detalle}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: mov.tipo === 'Ingreso' ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                    {mov.tipo === 'Ingreso' ? `+$${mov.monto.toLocaleString()}` : `−$${mov.monto.toLocaleString()}`}
                  </div>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '3px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: mov.tipo === 'Ingreso' ? 'var(--color-success-text)' : 'var(--color-error-text)',
                    marginTop: '4px' 
                  }}>
                    {mov.tipo === 'Ingreso' ? <ArrowDownLeft size={11} /> : <ArrowUpRight size={11} />}
                    <span>{mov.tipo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB Registrar Movimiento */}
      <button 
        className="fab-button"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Registrar movimiento</span>
      </button>

      {/* Modal Registrar Movimiento */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Registrar movimiento de caja</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--color-text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMovimiento} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setNuevoTipo('Ingreso')}
                  style={{
                    height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    border: nuevoTipo === 'Ingreso' ? '2px solid var(--color-success)' : '1px solid var(--color-border)',
                    backgroundColor: nuevoTipo === 'Ingreso' ? 'var(--color-success-bg)' : '#FFFFFF',
                    color: nuevoTipo === 'Ingreso' ? 'var(--color-success-text)' : 'var(--color-text-primary)',
                    fontWeight: 700
                  }}
                >
                  + Ingreso
                </button>

                <button
                  type="button"
                  onClick={() => setNuevoTipo('Egreso')}
                  style={{
                    height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    border: nuevoTipo === 'Egreso' ? '2px solid var(--color-error)' : '1px solid var(--color-border)',
                    backgroundColor: nuevoTipo === 'Egreso' ? '#FDE8E8' : '#FFFFFF',
                    color: nuevoTipo === 'Egreso' ? 'var(--color-error-text)' : 'var(--color-text-primary)',
                    fontWeight: 700
                  }}
                >
                  − Egreso
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Concepto</label>
                <input 
                  type="text" 
                  value={nuevoConcepto}
                  onChange={(e) => setNuevoConcepto(e.target.value)}
                  placeholder="Ej. Flete, Diablitos, Gasto de bodega..."
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Monto ($)</label>
                <input 
                  type="number" 
                  value={nuevoMonto}
                  onChange={(e) => setNuevoMonto(Number(e.target.value) || 0)}
                  style={{ fontSize: '20px', fontWeight: 700 }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary-action" style={{ height: '48px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Guardar movimiento</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
