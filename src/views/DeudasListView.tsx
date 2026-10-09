import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ChevronRight, 
  X 
} from 'lucide-react';

interface DeudasListViewProps {
  onSelectDeuda: (clienteNombre: string, folioVenta: string) => void;
  onRegistrarPago: (clienteNombre: string, saldo: number) => void;
}

export const DeudasListView: React.FC<DeudasListViewProps> = ({
  onSelectDeuda,
  onRegistrarPago
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState<'atencion' | 'proximas' | 'pendientes'>('atencion');

  const deudasMock = [
    {
      cliente: 'Juan Pérez',
      ventaFolio: 'Venta #000098',
      saldo: 2500,
      vencimiento: '15/09/2026',
      diasVencido: 16,
      estado: 'Vencida'
    },
    {
      cliente: 'Fonda El Comal',
      ventaFolio: 'Venta #000104',
      saldo: 4100,
      vencimiento: '22/09/2026',
      diasVencido: 9,
      estado: 'Vencida'
    },
    {
      cliente: 'Frutería Los Arcos',
      ventaFolio: 'Venta #000112',
      saldo: 3200,
      vencimiento: '25/09/2026',
      diasVencido: 6,
      estado: 'Vencida'
    }
  ];

  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Encabezado */}
      <div style={{ marginBottom: '14px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Deudas
        </h1>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          16 clientes con saldo
        </div>
      </div>

      {/* Tarjeta Métricas de Cobranza (Pág. 11) */}
      <div className="card" style={{ padding: '18px 16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          Total por cobrar
        </div>
        <div className="amount-text" style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '4px 0 16px' }}>
          $48,350
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '8px', 
          paddingTop: '14px', 
          borderTop: '1px solid var(--color-border-light)' 
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              <AlertTriangle size={12} color="var(--color-error)" />
              <span>Vencidas</span>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-error)', marginTop: '2px' }}>
              $9,800
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              <Clock size={12} color="#B7791F" />
              <span>Próximas</span>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
              $12,400
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              <CheckCircle2 size={12} color="var(--color-success)" />
              <span>Pagadas</span>
            </div>
            <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-success)', marginTop: '2px' }}>
              $21,600
            </div>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '12px' }}>
          Próximas: vencen en los siguientes 7 días · Pagadas: este mes
        </div>
      </div>

      {/* Buscador */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cliente, operación o fe"
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

        <button className="btn-outline" style={{ height: '46px', padding: '0 14px' }}>
          <SlidersHorizontal size={18} />
          <span>Filtrar</span>
        </button>
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px' }}>
        {[
          { key: 'atencion', label: 'Requiere atención', count: 3, icon: <AlertTriangle size={13} color="var(--color-error)" /> },
          { key: 'proximas', label: 'Próximas', count: 4 },
          { key: 'pendientes', label: 'Pendientes' }
        ].map(chip => (
          <button
            key={chip.key}
            onClick={() => setActiveChip(chip.key as any)}
            style={{
              height: '38px',
              padding: '0 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: activeChip === chip.key ? '#E4F3EB' : 'var(--color-surface)',
              color: activeChip === chip.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              border: activeChip === chip.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {chip.icon}
            <span>{chip.label}</span>
            {chip.count !== undefined && (
              <span style={{ 
                backgroundColor: activeChip === chip.key ? 'var(--color-primary)' : '#E2E8F0',
                color: activeChip === chip.key ? '#FFFFFF' : 'var(--color-text-primary)',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {chip.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Listado con encabezado */}
      <div style={{ 
        fontSize: '12px', 
        fontWeight: 700, 
        letterSpacing: '0.6px', 
        color: 'var(--color-error)', 
        textTransform: 'uppercase',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <AlertTriangle size={13} />
        <span>Requiere atención · 3 vencidas</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {deudasMock.map((item, idx) => (
          <div key={idx} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {item.cliente}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  {item.ventaFolio}
                </div>
              </div>

              <div className="status-badge error-solid" style={{ padding: '3px 8px', fontSize: '11px' }}>
                <AlertTriangle size={11} />
                <span>Vencida</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Saldo pendiente</div>
                <div className="amount-text" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  ${item.saldo.toLocaleString()}
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                <div>Venció {item.vencimiento}</div>
                <div style={{ color: 'var(--color-error)', fontWeight: 600 }}>hace {item.diasVencido} días</div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginTop: '14px', 
              paddingTop: '12px', 
              borderTop: '1px solid var(--color-border-light)' 
            }}>
              <button 
                onClick={() => onRegistrarPago(item.cliente, item.saldo)}
                className="btn-primary-action"
                style={{ flex: 1.2, height: '42px', fontSize: '13px', justifyContent: 'center' }}
              >
                <CreditCard size={15} />
                <span>Registrar pago</span>
              </button>

              <button 
                onClick={() => onSelectDeuda(item.cliente, item.ventaFolio)}
                className="btn-outline"
                style={{ flex: 1, height: '42px', fontSize: '13px', justifyContent: 'center' }}
              >
                <span>Ver detalle</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
