import React from 'react';
import { 
  Plus, 
  AlertTriangle, 
  Package, 
  ChevronRight, 
  Wallet, 
  Box, 
  ShoppingBag, 
  UserPlus, 
  ShoppingCart 
} from 'lucide-react';
import type { TabKey } from '../components/BottomNavBar';

interface HomeDashboardViewProps {
  onOpenNuevaVenta: () => void;
  onNavigateTab: (tab: TabKey) => void;
  onSelectVentaDetalle: (folio: string) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  onOpenNuevaVenta,
  onNavigateTab,
  onSelectVentaDetalle
}) => {
  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Saludo y Fecha */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          Jueves 01/10/2026
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
          Hola, Ana
        </h1>
      </div>

      {/* Botón Principal + Nueva Venta */}
      <button 
        className="btn-primary-action" 
        onClick={onOpenNuevaVenta}
        style={{ marginBottom: '20px', gap: '8px' }}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Nueva venta</span>
      </button>

      {/* Tarjetas Métricas: Ventas de hoy & Por cobrar */}
      <div className="dashboard-metrics-grid">
        <div className="card" onClick={() => onNavigateTab('ventas')} style={{ cursor: 'pointer' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Ventas de hoy
          </div>
          <div className="amount-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '4px 0' }}>
            $18,740
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            23 ventas
          </div>
        </div>

        <div className="card" onClick={() => onNavigateTab('clientes')} style={{ cursor: 'pointer' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Por cobrar
          </div>
          <div className="amount-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '4px 0' }}>
            $48,350
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            16 clientes
          </div>
        </div>
      </div>

      {/* Sección: NECESITA ATENCIÓN */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          letterSpacing: '0.6px', 
          color: 'var(--color-text-secondary)', 
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          Necesita atención
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Card 1: Deudas vencidas */}
          <div 
            className="card" 
            onClick={() => onNavigateTab('clientes')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                backgroundColor: '#FDE8E8', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <AlertTriangle size={20} color="var(--color-error)" strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  3 deudas vencidas
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Juan Pérez, Fonda El Comal y 1 más
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                $9,800
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Card 2: Inventario bajo */}
          <div 
            className="card" 
            onClick={() => onNavigateTab('inventario')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                backgroundColor: '#FEF3C7', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Package size={20} color="var(--color-warning)" strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  3 productos con inventario bajo
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Jitomate Tercera, Aguacate Segunda…
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* Sección: ACCESOS RÁPIDOS */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          letterSpacing: '0.6px', 
          color: 'var(--color-text-secondary)', 
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          Accesos rápidos
        </div>

        <div className="dashboard-actions-grid">
          <button 
            className="card"
            onClick={() => onNavigateTab('clientes')}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              gap: '12px', 
              padding: '14px', 
              textAlign: 'left'
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Wallet size={20} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: '1.2' }}>
              Registrar pago
            </span>
          </button>

          <button 
            className="card"
            onClick={() => onNavigateTab('inventario')}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              gap: '12px', 
              padding: '14px', 
              textAlign: 'left' 
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Box size={20} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: '1.2' }}>
              Agregar producto
            </span>
          </button>

          <button 
            className="card"
            onClick={() => onNavigateTab('mas')}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              gap: '12px', 
              padding: '14px', 
              textAlign: 'left' 
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ShoppingBag size={20} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: '1.2' }}>
              Registrar compra
            </span>
          </button>

          <button 
            className="card"
            onClick={() => onNavigateTab('clientes')}
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              gap: '12px', 
              padding: '14px', 
              textAlign: 'left' 
            }}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <UserPlus size={20} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: '1.2' }}>
              Agregar cliente
            </span>
          </button>
        </div>
      </div>

      {/* Sección: MOVIMIENTOS RECIENTES */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase' 
          }}>
            Movimientos recientes
          </div>
          <button 
            onClick={() => onNavigateTab('ventas')}
            style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}
          >
            Ver todo
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Venta #000128 */}
          <div 
            className="card" 
            onClick={() => onSelectVentaDetalle('#000128')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '8px', 
                backgroundColor: 'var(--color-success-bg)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <ShoppingCart size={18} color="var(--color-success)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Venta #000128 · Mostrador
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  16:05 · Contado
                </div>
              </div>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>
              +$1,180
            </div>
          </div>

          {/* Compra #C-0045 */}
          <div 
            className="card" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '8px', 
                backgroundColor: '#E3F0F9', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <ShoppingBag size={18} color="var(--color-info)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Compra #C-0045 · Agrícola San Juan
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  06:20 · 60 cajas Jitomate
                </div>
              </div>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              −$18,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
