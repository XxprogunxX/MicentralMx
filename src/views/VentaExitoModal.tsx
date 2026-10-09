import React from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import type { Venta } from '../types';

interface VentaExitoModalProps {
  venta: Venta | null;
  onNuevaVenta: () => void;
  onVerDetalle: (folio: string) => void;
  onIrAVentas: () => void;
}

export const VentaExitoModal: React.FC<VentaExitoModalProps> = ({
  venta,
  onNuevaVenta,
  onVerDetalle,
  onIrAVentas
}) => {
  if (!venta) return null;

  const item = venta.items[0];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#FFFFFF',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '48px 20px 24px',
      maxWidth: '440px',
      margin: '0 auto'
    }}>
      {/* Contenido Central */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* Icono animado de éxito */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: '#E8F5EE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <CheckCircle2 size={40} color="var(--color-success)" strokeWidth={2.4} />
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px', lineHeight: '1.2' }}>
          Venta registrada<br />correctamente
        </h1>
        <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
          Venta {venta.folio} · {venta.hora}
        </div>

        {/* Tarjeta Resumen */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '20px 16px',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Producto</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {item ? item.productoNombre : 'Jitomate Saladette'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Clasificación</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {item ? item.clasificacionNombre : 'Segunda / Mediano'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Cantidad</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {item ? `${item.cantidad} ${item.unidad} × $${item.precioUnitario}` : '5 cajas × $340'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Cliente</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {venta.clienteNombre} · {venta.metodoPago}
            </span>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline', 
            paddingTop: '16px', 
            borderTop: '1px solid var(--color-border-light)' 
          }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>Total</span>
            <span className="amount-text" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              ${venta.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
        <button 
          onClick={onNuevaVenta}
          className="btn-primary-action"
          style={{ height: '52px', fontSize: '16px', justifyContent: 'center' }}
        >
          <Plus size={20} strokeWidth={2.4} />
          <span>Nueva venta</span>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button 
            onClick={() => onVerDetalle(venta.folio)}
            className="btn-outline"
            style={{ height: '48px', justifyContent: 'center' }}
          >
            Ver detalle
          </button>

          <button 
            onClick={onIrAVentas}
            className="btn-outline"
            style={{ height: '48px', justifyContent: 'center' }}
          >
            Ir a ventas
          </button>
        </div>
      </div>
    </div>
  );
};
