import React from 'react';
import { 
  ArrowLeft, 
  Pencil, 
  MoreVertical, 
  AlertTriangle, 
  ShoppingCart, 
  ShoppingBag, 
  Package 
} from 'lucide-react';
import type { Producto } from '../types';

interface ProductoDetalleViewProps {
  producto: Producto | null;
  onBack: () => void;
  onEdit: () => void;
  onNuevaVenta: () => void;
  onRegistrarCompra?: () => void;
}

export const ProductoDetalleView: React.FC<ProductoDetalleViewProps> = ({
  producto,
  onBack,
  onEdit,
  onNuevaVenta,
  onRegistrarCompra
}) => {
  if (!producto) return null;

  const existenciaTotal = producto.clasificaciones.reduce((acc, c) => acc + c.existencia, 0);

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
              {producto.nombre}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Se vende por {producto.unidad}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={onEdit}
            style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-primary)' }}
            title="Editar producto"
          >
            <Pencil size={18} />
          </button>
          <button style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-secondary)' }}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Métricas: Existencia total & Aviso bajo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
          <div className="card">
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Existencia total
            </div>
            <div className="amount-text" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '4px' }}>
              {existenciaTotal} {producto.unidad}s
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Aviso de inventario bajo
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '6px' }}>
              {producto.avisoInventarioBajo} {producto.unidad}s o menos
            </div>
          </div>
        </div>

        {/* Sección: CLASIFICACIONES */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Clasificaciones
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {producto.clasificaciones.map(clas => (
              <div 
                key={clas.id} 
                className="card" 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {clas.nombre}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                      {clas.existencia} {producto.unidad}s
                    </span>
                    {clas.avisoBajo && (
                      <span className="status-badge warning" style={{ padding: '2px 8px', fontSize: '11px' }}>
                        <AlertTriangle size={11} />
                        <span>Inventario bajo</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="amount-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  ${clas.precio}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: MOVIMIENTOS RECIENTES */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Movimientos recientes
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Movimiento 1: Venta */}
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingCart size={18} color="var(--color-success)" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Venta #000126
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Hoy 15:30 · Segunda / Mediano
                  </div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-error)' }}>
                −5
              </div>
            </div>

            {/* Movimiento 2: Compra */}
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E3F0F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={18} color="var(--color-info)" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Compra #C-0045
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Hoy 06:20 · Primera / Grande
                  </div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>
                +60
              </div>
            </div>

            {/* Movimiento 3: Merma */}
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={18} color="#B7791F" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Merma · producto dañado
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Ayer · Segunda / Mediano
                  </div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-error)' }}>
                −3
              </div>
            </div>
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
          onClick={onRegistrarCompra || (() => alert(`Registrar compra para ${producto.nombre}`))}
          className="btn-outline" 
          style={{ flex: 1, height: '48px', justifyContent: 'center' }}
        >
          <ShoppingBag size={18} />
          <span>Registrar compra</span>
        </button>

        <button 
          onClick={onNuevaVenta}
          className="btn-primary-action" 
          style={{ flex: 1, height: '48px', justifyContent: 'center' }}
        >
          <ShoppingCart size={18} />
          <span>Nueva venta</span>
        </button>
      </div>
    </div>
  );
};
