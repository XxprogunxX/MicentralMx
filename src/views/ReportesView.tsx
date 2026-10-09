import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShoppingBag, 
  Boxes, 
  Wallet, 
  CircleDollarSign, 
  Package, 
  ChevronRight, 
  Calendar 
} from 'lucide-react';

interface ReportesViewProps {
  onBack: () => void;
  onNavigateDetail?: (seccion: string) => void;
}

export const ReportesView: React.FC<ReportesViewProps> = ({ onBack, onNavigateDetail }) => {
  const [periodo, setPeriodo] = useState<'hoy' | 'semana' | 'mes'>('semana');

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
          Reportes
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Pills de periodo */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '10px' }}>
          {[
            { key: 'hoy', label: 'Hoy' },
            { key: 'semana', label: 'Esta semana' },
            { key: 'mes', label: 'Este mes' }
          ].map(p => (
            <button
              key={p.key}
              onClick={() => setPeriodo(p.key as any)}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: periodo === p.key ? '#E4F3EB' : 'var(--color-surface)',
                color: periodo === p.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                border: periodo === p.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
              }}
            >
              {p.label}
            </button>
          ))}

          <button
            style={{
              height: '38px',
              padding: '0 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={14} color="var(--color-text-secondary)" />
            <span>Elegir</span>
          </button>
        </div>

        {/* Subtexto con el rango de fechas (Pág. 27) */}
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Del 28/09/2026 al 01/10/2026
        </div>

        {/* Lista de Métricas del Negocio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Ventas */}
          <div 
            className="card"
            onClick={() => onNavigateDetail && onNavigateDetail('ventas')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingCart size={20} color="var(--color-success)" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Ventas
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  112 ventas · 18 a crédito
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                $84,920
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Compras */}
          <div 
            className="card"
            onClick={() => onNavigateDetail && onNavigateDetail('compras')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#E3F0F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={20} color="var(--color-info)" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Compras
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  14 compras · 5 proveedores
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                $61,300
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Inventario */}
          <div 
            className="card"
            onClick={() => onNavigateDetail && onNavigateDetail('inventario')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Boxes size={20} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Inventario
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  3 con inventario bajo
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                42 productos
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Pagos */}
          <div 
            className="card"
            onClick={() => onNavigateDetail && onNavigateDetail('pagos')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Pagos
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Ingresos $38,200 · Egresos $28,500
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-success)' }}>
                +$9,700
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Deudas */}
          <div 
            className="card"
            onClick={() => onNavigateDetail && onNavigateDetail('deudas')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircleDollarSign size={20} color="#B7791F" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Deudas
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Por cobrar · $9,800 vencido
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                $48,350
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Mermas */}
          <div 
            className="card"
            onClick={() => onNavigateDetail && onNavigateDetail('mermas')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FDE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={20} color="var(--color-error)" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  Mermas
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Valor aproximado $4,960
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                17 cajas
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
