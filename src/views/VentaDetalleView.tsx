import React from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  AlertTriangle, 
  CreditCard, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';
import type { Venta } from '../types';

interface VentaDetalleViewProps {
  venta: Venta | null;
  onBack: () => void;
  onVerDeuda?: () => void;
  onRegistrarPago?: () => void;
}

export const VentaDetalleView: React.FC<VentaDetalleViewProps> = ({
  venta,
  onBack,
  onVerDeuda,
  onRegistrarPago
}) => {
  if (!venta) return null;

  const pagadoRatio = venta.total > 0 ? (venta.pagado / venta.total) * 100 : 100;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '90px'
    }}>
      {/* Encabezado con navegación de regreso */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={onBack}
            style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-primary)' }}
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Venta {venta.folio}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {venta.fecha} · {venta.hora}
            </div>
          </div>
        </div>

        <button style={{ width: '36px', height: '36px', borderRadius: '50%', color: 'var(--color-text-secondary)' }}>
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Contenido */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Tarjeta de Resumen Financiero */}
        <div className="card" style={{ padding: '18px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Total de la venta
              </div>
              <div className="amount-text" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                ${venta.total.toLocaleString()}
              </div>
            </div>

            {venta.estado === 'Crédito pendiente' ? (
              <div className="status-badge warning" style={{ padding: '4px 10px' }}>
                <AlertTriangle size={14} />
                <span>Crédito pendiente</span>
              </div>
            ) : (
              <div className="status-badge success" style={{ padding: '4px 10px' }}>
                <CheckCircle2 size={14} />
                <span>Completada</span>
              </div>
            )}
          </div>

          {/* Barra de progreso de pago */}
          {venta.tipoPago === 'Crédito' && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${pagadoRatio}%`, height: '100%', backgroundColor: 'var(--color-primary)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                <span style={{ color: 'var(--color-primary)' }}>Pagado ${venta.pagado.toLocaleString()}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>Saldo ${venta.saldo.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Detalles generales */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Cliente</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary)' }}>
                {venta.clienteNombre}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Forma de pago</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {venta.tipoPago}
              </span>
            </div>

            {venta.fechaVencimiento && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Vence</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {venta.fechaVencimiento} · en {venta.diasParaVencer || 5} días
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Registró</span>
              <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                {venta.registradoPor}
              </span>
            </div>
          </div>
        </div>

        {/* Sección: QUÉ SE VENDIÓ */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Qué se vendió
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {venta.items.map((it, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {it.productoNombre}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {it.clasificacionNombre} · {it.cantidad} {it.unidad} × ${it.precioUnitario}
                  </div>
                </div>

                <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  ${it.subtotal.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de Acciones del Pie */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: '440px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border)',
        padding: '12px 16px',
        display: 'flex',
        gap: '12px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        zIndex: 30
      }}>
        <button 
          onClick={onVerDeuda || (() => alert(`Consultando estado de cuenta de ${venta.clienteNombre}`))}
          className="btn-outline" 
          style={{ flex: 1, height: '48px', justifyContent: 'center' }}
        >
          <Eye size={16} />
          <span>Ver deuda</span>
        </button>

        <button 
          onClick={onRegistrarPago || (() => alert(`Registrar abono para venta ${venta.folio}`))}
          className="btn-primary-action" 
          style={{ flex: 1.2, height: '48px', justifyContent: 'center' }}
        >
          <CreditCard size={18} />
          <span>Registrar pago</span>
        </button>
      </div>
    </div>
  );
};
