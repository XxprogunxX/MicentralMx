import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Pencil, 
  AlertTriangle, 
  CreditCard, 
  ShoppingCart, 
  Wallet, 
  Phone, 
  Store 
} from 'lucide-react';
import type { Cliente } from '../types';

interface ClienteDetalleViewProps {
  cliente: Cliente | null;
  onBack: () => void;
  onRegistrarPago: (cliente: Cliente) => void;
  onNuevaVenta: () => void;
}

export const ClienteDetalleView: React.FC<ClienteDetalleViewProps> = ({
  cliente,
  onBack,
  onRegistrarPago,
  onNuevaVenta
}) => {
  const [activeTab, setActiveTab] = useState<'movimientos' | 'deudas'>('movimientos');

  if (!cliente) return null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '40px'
    }}>
      {/* Encabezado */}
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
              {cliente.nombre}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Cliente desde 03/2025
            </div>
          </div>
        </div>

        <button style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-primary)' }}>
          <Pencil size={18} />
        </button>
      </div>

      {/* Contenido */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Tarjeta de Saldo y Estado */}
        <div className="card" style={{ padding: '18px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Saldo pendiente
              </div>
              <div className="amount-text" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                ${cliente.saldoPendiente.toLocaleString()}
              </div>
            </div>

            {cliente.estadoDeuda === 'Vencida' && (
              <div className="status-badge error-solid" style={{ padding: '4px 10px', fontSize: '12px' }}>
                <AlertTriangle size={13} />
                <span>Vencida</span>
              </div>
            )}
          </div>

          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px', marginBottom: '16px' }}>
            1 deuda · venció el 15/09/2026
          </div>

          {/* Botones de acción */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
            <button 
              onClick={() => onRegistrarPago(cliente)}
              className="btn-primary-action"
              style={{ height: '48px', fontSize: '14px', justifyContent: 'center' }}
            >
              <CreditCard size={18} />
              <span>Registrar pago</span>
            </button>

            <button 
              onClick={onNuevaVenta}
              className="btn-outline"
              style={{ height: '48px', fontSize: '14px', justifyContent: 'center' }}
            >
              <span>Nueva venta</span>
            </button>
          </div>
        </div>

        {/* Datos de contacto y negocio */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              <Phone size={16} />
              <span>Teléfono</span>
            </div>
            <a 
              href={`tel:${cliente.telefono}`}
              style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}
            >
              {cliente.telefono}
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              <Store size={16} />
              <span>Negocio</span>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {cliente.negocio}
            </span>
          </div>
        </div>

        {/* Tabs: Movimientos vs Deudas */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginTop: '8px' }}>
          <button
            onClick={() => setActiveTab('movimientos')}
            style={{
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: 700,
              color: activeTab === 'movimientos' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'movimientos' ? '2.5px solid var(--color-primary)' : 'none',
              marginBottom: '-1px'
            }}
          >
            Movimientos
          </button>

          <button
            onClick={() => setActiveTab('deudas')}
            style={{
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: 700,
              color: activeTab === 'deudas' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'deudas' ? '2.5px solid var(--color-primary)' : 'none',
              marginBottom: '-1px'
            }}
          >
            Deudas (1)
          </button>
        </div>

        {/* Listado de movimientos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCart size={18} color="var(--color-success)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Venta #000126
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Hoy 15:30 · Contado
                </div>
              </div>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              $2,450
            </div>
          </div>

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Pago a deuda #000098
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  10/09/2026 · Transferencia
                </div>
              </div>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>
              $1,000
            </div>
          </div>

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={18} color="#B7791F" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Venta #000098 · a crédito
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  01/09/2026
                </div>
              </div>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              $3,500
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
