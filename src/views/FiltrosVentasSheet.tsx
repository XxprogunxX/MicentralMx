import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import type { Cliente } from '../types';

interface FiltrosVentasSheetProps {
  isOpen: boolean;
  onClose: () => void;
  clientes: Cliente[];
  onApplyFilters: (filters: {
    fecha: string;
    estado: string | null;
    tipoPago: string | null;
    clienteId: string | null;
  }) => void;
}

export const FiltrosVentasSheet: React.FC<FiltrosVentasSheetProps> = ({
  isOpen,
  onClose,
  clientes,
  onApplyFilters
}) => {
  const [fecha, setFecha] = useState<string>('Hoy');
  const [estado, setEstado] = useState<string | null>('Crédito pendiente');
  const [tipoPago, setTipoPago] = useState<string | null>('Crédito');
  const [clienteId, setClienteId] = useState<string | null>('');

  if (!isOpen) return null;

  const handleLimpiar = () => {
    setFecha('Hoy');
    setEstado(null);
    setTipoPago(null);
    setClienteId('');
  };

  const handleApply = () => {
    onApplyFilters({ fecha, estado, tipoPago, clienteId });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        {/* Encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Filtrar ventas</h2>
          <button 
            onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sección: Fecha */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
            Fecha
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {['Hoy', 'Ayer', 'Esta semana'].map((opt) => (
              <button
                key={opt}
                onClick={() => setFecha(opt)}
                style={{
                  height: '40px',
                  padding: '0 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: fecha === opt ? '#E4F3EB' : 'var(--color-surface)',
                  color: fecha === opt ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                  border: fecha === opt ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            style={{
              height: '40px',
              padding: '0 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: 500,
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={16} color="var(--color-text-secondary)" />
            <span>Elegir fechas</span>
          </button>
        </div>

        {/* Sección: Estado */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
            Estado
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'Completada', label: 'Completada', icon: '✓' },
              { id: 'Pendiente', label: 'Pendiente', icon: '⏱' },
              { id: 'Crédito pendiente', label: 'Crédito pendiente', icon: '⚠' },
              { id: 'Cancelada', label: 'Cancelada', icon: '✕' }
            ].map((st) => {
              const isSelected = estado === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setEstado(isSelected ? null : st.id)}
                  style={{
                    height: '40px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: isSelected ? '#E4F3EB' : 'var(--color-surface)',
                    color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                    border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  <span style={{ marginRight: '4px' }}>{st.icon}</span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sección: Tipo de pago */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
            Tipo de pago
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Contado', 'Crédito'].map((tipo) => {
              const isSelected = tipoPago === tipo;
              return (
                <button
                  key={tipo}
                  onClick={() => setTipoPago(isSelected ? null : tipo)}
                  style={{
                    height: '40px',
                    padding: '0 18px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: isSelected ? '#E4F3EB' : 'var(--color-surface)',
                    color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                    border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {tipo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sección: Cliente */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Cliente
          </label>
          <select 
            value={clienteId || ''} 
            onChange={(e) => setClienteId(e.target.value)}
            style={{ width: '100%', height: '48px', fontSize: '15px' }}
          >
            <option value="">Todos los clientes</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        {/* Acciones del pie */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleLimpiar}
            className="btn-outline"
            style={{ flex: '1', height: '48px', justifyContent: 'center' }}
          >
            Limpiar
          </button>
          <button 
            onClick={handleApply}
            className="btn-primary-action"
            style={{ flex: '2', height: '48px', justifyContent: 'center' }}
          >
            Ver 5 ventas
          </button>
        </div>
      </div>
    </div>
  );
};
