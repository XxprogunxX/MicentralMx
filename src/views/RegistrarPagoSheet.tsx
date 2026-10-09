import React, { useState } from 'react';
import { X, CreditCard, Check } from 'lucide-react';
import type { MetodoPago } from '../types';

interface RegistrarPagoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  clienteNombre: string;
  saldoActual: number;
  onConfirmPago: (monto: number, metodo: MetodoPago, nota: string) => void;
}

export const RegistrarPagoSheet: React.FC<RegistrarPagoSheetProps> = ({
  isOpen,
  onClose,
  clienteNombre,
  saldoActual,
  onConfirmPago
}) => {
  const [monto, setMonto] = useState<number>(1500);
  const [metodo, setMetodo] = useState<MetodoPago>('Efectivo');
  const [nota, setNota] = useState<string>('Pagó en bodega');

  if (!isOpen) return null;

  const saldoRestante = Math.max(0, saldoActual - monto);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (monto <= 0) return;
    onConfirmPago(monto, metodo, nota);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        {/* Encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Registrar pago
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {clienteNombre} · Saldo ${saldoActual.toLocaleString()}
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Monto recibido */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Cantidad recibida
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                $
              </span>
              <input 
                type="number"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value) || 0)}
                style={{ 
                  height: '60px', 
                  fontSize: '28px', 
                  fontWeight: 800, 
                  paddingLeft: '38px',
                  color: 'var(--color-primary-dark)',
                  backgroundColor: '#F0F8F4',
                  borderColor: 'var(--color-primary)'
                }}
                required
              />
            </div>
          </div>

          {/* Chips presets de liquidación rápida (Pág. 13) */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setMonto(saldoActual)}
              className="btn-outline"
              style={{ flex: 1, height: '42px', fontSize: '13px', fontWeight: 700 }}
            >
              Liquidar ${saldoActual.toLocaleString()}
            </button>

            <button
              type="button"
              onClick={() => setMonto(Math.round(saldoActual / 2))}
              className="btn-outline"
              style={{ flex: 1, height: '42px', fontSize: '13px', fontWeight: 700 }}
            >
              Mitad ${Math.round(saldoActual / 2).toLocaleString()}
            </button>
          </div>

          {/* Método de pago */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Método de pago
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '8px' }}>
              {(['Efectivo', 'Transferencia', 'Otro'] as MetodoPago[]).map((met) => {
                const isSelected = metodo === met;
                return (
                  <button
                    key={met}
                    type="button"
                    onClick={() => setMetodo(met)}
                    style={{
                      height: '44px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 700,
                      backgroundColor: isSelected ? '#E4F3EB' : 'var(--color-surface)',
                      color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                      border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      gap: '4px'
                    }}
                  >
                    {met === 'Efectivo' && <CreditCard size={14} />}
                    <span>{met}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nota opcional */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
              Nota (opcional)
            </label>
            <input 
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Ej. Pagó en bodega"
              style={{ height: '46px', fontSize: '14px' }}
            />
          </div>

          {/* Previsualización del Saldo Después del Pago */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px',
            backgroundColor: '#F7F8F6',
            borderRadius: 'var(--radius-sm)',
            marginTop: '4px'
          }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              Saldo después del pago
            </span>
            <span className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              ${saldoRestante.toLocaleString()}
            </span>
          </div>

          {/* Botones de acción */}
          <button 
            type="submit"
            className="btn-primary-action"
            style={{ height: '52px', marginTop: '6px', justifyContent: 'center', gap: '8px' }}
          >
            <Check size={18} strokeWidth={2.5} />
            <span>Registrar pago de ${monto.toLocaleString()}</span>
          </button>

          <button 
            type="button"
            onClick={onClose}
            style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 600, padding: '8px' }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};
