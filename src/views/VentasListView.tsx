import React, { useState } from 'react';
import { 
  WifiOff, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ChevronRight, 
  X, 
  ShoppingCart, 
  CreditCard 
} from 'lucide-react';
import type { Venta, NetworkMode } from '../types';

interface VentasListViewProps {
  ventas: Venta[];
  networkMode: NetworkMode;
  pendingCount: number;
  onOpenSyncModal: () => void;
  onOpenNuevaVenta: () => void;
  onSelectVentaDetalle: (folio: string) => void;
  onOpenFiltros: () => void;
}

export const VentasListView: React.FC<VentasListViewProps> = ({
  ventas,
  networkMode,
  pendingCount,
  onOpenSyncModal,
  onOpenNuevaVenta,
  onSelectVentaDetalle,
  onOpenFiltros
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState<'hoy' | 'todas' | 'credito' | 'pendientes'>('hoy');
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);

  // Filtrado reactivo de ventas
  const filteredVentas = ventas.filter(v => {
    // Filtro por término de búsqueda
    const matchesSearch = 
      v.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.fecha.includes(searchTerm);

    if (!matchesSearch) return false;

    // Filtro por chip
    if (activeChip === 'credito') return v.tipoPago === 'Crédito';
    if (activeChip === 'pendientes') return v.estado === 'Crédito pendiente' || !v.sincronizada;
    return true;
  });

  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Título de la pantalla */}
      <div style={{ marginBottom: '14px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Ventas
        </h1>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          Jueves 01/10/2026
        </div>
      </div>

      {/* Banner Sin Conexión (Página 4 del PDF) */}
      {networkMode === 'offline' && (
        <div 
          onClick={onOpenSyncModal}
          style={{
            backgroundColor: '#FEF3C7',
            border: '1px solid #FCD34D',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            marginBottom: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <WifiOff size={20} color="#734A0C" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#734A0C' }}>
                Sin conexión
              </div>
              <div style={{ fontSize: '13px', color: '#92400E', marginTop: '2px', lineHeight: '1.4' }}>
                Los cambios se guardarán y se sincronizarán cuando vuelva Internet.
              </div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                marginTop: '8px', 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#734A0C' 
              }}>
                <RefreshCw size={14} />
                <span>{pendingCount || 3} cambios pendientes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Métricas de Ventas del día (Página 6 del PDF cuando está en línea) */}
      {networkMode === 'online' && (
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          border: '1px solid var(--color-border)', 
          borderRadius: 'var(--radius-md)', 
          padding: '16px', 
          marginBottom: '16px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Ventas de hoy
              </div>
              <div className="amount-text" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                $18,740
              </div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              23 ventas registradas
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            paddingTop: '12px', 
            borderTop: '1px solid var(--color-border-light)' 
          }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Ventas a crédito</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>5</div>
            </div>
            <div style={{ textAlign: 'right', cursor: 'pointer' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Pendiente por cobrar</div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', display: 'inline-flex', alignItems: 'center' }}>
                $6,320 <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buscador y Botón de Filtros */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Número, cliente o fech"
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

        <button 
          onClick={onOpenFiltros}
          className="btn-outline" 
          style={{ height: '46px', padding: '0 14px', gap: '6px' }}
        >
          <SlidersHorizontal size={18} />
          <span>Filtrar</span>
        </button>
      </div>

      {/* Chips Rápidos de Filtrado */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
        {[
          { key: 'hoy', label: 'Hoy', icon: '📅' },
          { key: 'todas', label: 'Todas' },
          { key: 'credito', label: 'Crédito  5' },
          { key: 'pendientes', label: 'Pendientes' }
        ].map(chip => (
          <button
            key={chip.key}
            onClick={() => setActiveChip(chip.key as any)}
            style={{
              height: '36px',
              padding: '0 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: activeChip === chip.key ? '#E4F3EB' : 'var(--color-surface)',
              color: activeChip === chip.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              border: activeChip === chip.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)'
            }}
          >
            {chip.icon && <span style={{ marginRight: '4px' }}>{chip.icon}</span>}
            {chip.label}
          </button>
        ))}
      </div>

      {/* Control para simular vista esqueleto / carga (Página 35 del PDF) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
        <button 
          onClick={() => setIsLoadingSkeleton(!isLoadingSkeleton)}
          style={{ fontSize: '11px', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
        >
          {isLoadingSkeleton ? 'Mostrar datos reales' : 'Simular carga (Skeleton)'}
        </button>
      </div>

      {/* Vista de Carga Skeleton (Página 35 del PDF) */}
      {isLoadingSkeleton ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="card" style={{ padding: '16px' }}>
              <div className="skeleton" style={{ height: '14px', width: '35%', marginBottom: '10px' }} />
              <div className="skeleton" style={{ height: '18px', width: '60%', marginBottom: '8px' }} />
              <div className="skeleton" style={{ height: '14px', width: '40%' }} />
            </div>
          ))}
          <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '12px' }}>
            Cargando ventas…
          </div>
        </div>
      ) : filteredVentas.length === 0 ? (
        /* Vistas vacías (Página 31 y 32 del PDF) */
        searchTerm ? (
          /* Página 32: No encontramos ventas */
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '16px' }}>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '50%', 
              backgroundColor: '#F7F8F6', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Search size={26} color="var(--color-text-secondary)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              No encontramos ventas
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              No hay ventas de “{searchTerm}” que coincidan con los filtros aplicados.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button 
                onClick={() => setSearchTerm('')} 
                className="btn-outline" 
                style={{ height: '42px', fontSize: '14px' }}
              >
                Limpiar búsqueda
              </button>
            </div>
          </div>
        ) : (
          /* Página 31: No tienes ventas todavía */
          <div className="card" style={{ textAlign: 'center', padding: '48px 20px', marginTop: '16px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <ShoppingCart size={30} color="var(--color-primary)" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              No tienes ventas todavía
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Las ventas que registres aparecerán aquí.
            </p>
            <button 
              onClick={onOpenNuevaVenta}
              className="btn-standard" 
              style={{ height: '48px', padding: '0 24px', margin: '0 auto' }}
            >
              <Plus size={18} />
              <span>Nueva venta</span>
            </button>
          </div>
        )
      ) : (
        /* Listado de Tarjetas de Ventas */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredVentas.map(venta => (
            <div 
              key={venta.id} 
              className="card" 
              style={{ padding: '14px 16px' }}
            >
              {/* Línea 1: Folio, hora y monto */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    Venta {venta.folio} · {venta.hora}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                    {venta.clienteNombre}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {venta.tipoPago} · {venta.metodoPago}
                    {venta.tipoPago === 'Crédito' && venta.fechaVencimiento && (
                      <span style={{ color: '#B7791F', fontWeight: 600 }}> · vence {venta.fechaVencimiento}</span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="amount-text" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                    ${venta.total.toLocaleString()}
                  </div>
                  {!venta.sincronizada && (
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      marginTop: '4px',
                      padding: '2px 8px', 
                      borderRadius: 'var(--radius-full)', 
                      backgroundColor: 'var(--color-info-bg)', 
                      color: 'var(--color-info-text)', 
                      fontSize: '11px', 
                      fontWeight: 600 
                    }}>
                      <RefreshCw size={11} />
                      <span>Sin sincronizar</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Badges de Estado y Acciones de pie */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginTop: '12px', 
                paddingTop: '10px', 
                borderTop: '1px solid var(--color-border-light)' 
              }}>
                <div>
                  {venta.estado === 'Completada' && (
                    <div className="status-badge success" style={{ padding: '3px 8px', fontSize: '12px' }}>
                      <CheckCircle2 size={13} />
                      <span>Completada</span>
                    </div>
                  )}
                  {venta.estado === 'Crédito pendiente' && (
                    <div className="status-badge warning" style={{ padding: '3px 8px', fontSize: '12px' }}>
                      <AlertTriangle size={13} />
                      <span>Crédito pendiente</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {venta.tipoPago === 'Crédito' && venta.saldo > 0 && (
                    <button 
                      onClick={() => alert(`Abonar a ${venta.clienteNombre} por deuda de venta ${venta.folio}`)}
                      className="btn-outline"
                      style={{ height: '36px', padding: '0 10px', fontSize: '13px', color: 'var(--color-primary)' }}
                    >
                      <CreditCard size={14} />
                      <span>Registrar pago</span>
                    </button>
                  )}
                  <button 
                    onClick={() => onSelectVentaDetalle(venta.folio)}
                    style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                  >
                    <span>Ver detalle</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB Flotante + Nueva venta */}
      <button 
        className="fab-button"
        onClick={onOpenNuevaVenta}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Nueva venta</span>
      </button>
    </div>
  );
};
