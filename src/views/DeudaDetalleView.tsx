import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  AlertTriangle, 
  CheckCircle2, 
  CreditCard, 
  History, 
  Check, 
  Calendar 
} from 'lucide-react';

interface DeudaDetalleViewProps {
  clienteNombre: string;
  ventaFolio: string;
  onBack: () => void;
  onOpenRegistrarPago: (saldo: number) => void;
  pagoReciente?: {
    monto: number;
    metodo: string;
  } | null;
}

export const DeudaDetalleView: React.FC<DeudaDetalleViewProps> = ({
  clienteNombre,
  ventaFolio,
  onBack,
  onOpenRegistrarPago,
  pagoReciente
}) => {
  const [viewMode, setViewMode] = useState<'detalle' | 'timeline'>('detalle');

  const totalOriginal = 3500;
  const pagado = pagoReciente ? 1000 + pagoReciente.monto : 1000;
  const saldoPendiente = totalOriginal - pagado;
  const progressRatio = (pagado / totalOriginal) * 100;

  // Si está en la vista de Historial Completo de la deuda (Página 15)
  if (viewMode === 'timeline') {
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
          padding: '16px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <button 
            onClick={() => setViewMode('detalle')}
            style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-primary)' }}
          >
            <ArrowLeft size={22} />
          </button>
          <div style={{ marginLeft: '8px' }}>
            <h1 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Historial de la deuda
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {clienteNombre} · {ventaFolio}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Métricas: Total original / Pagado / Saldo */}
          <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center', padding: '16px 12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Total original</div>
              <div className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                ${totalOriginal.toLocaleString()}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Pagado</div>
              <div className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)', marginTop: '2px' }}>
                ${pagado.toLocaleString()}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Saldo</div>
              <div className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-error)', marginTop: '2px' }}>
                ${saldoPendiente.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Eventos cronológicos (Pág. 15) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pagoReciente && (
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={18} color="var(--color-success)" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>01/10/2026 · 16:20</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Pago recibido · {pagoReciente.metodo}</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                      Saldo restante: ${saldoPendiente.toLocaleString()} · Registró Ana H.
                    </div>
                  </div>
                </div>
                <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>
                  +${pagoReciente.monto.toLocaleString()}
                </div>
              </div>
            )}

            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 16px', backgroundColor: '#FFFBF5', borderColor: '#FDE68A' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={18} color="#B7791F" strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>16/09/2026</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#734A0C' }}>La deuda venció</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Saldo en ese momento: $2,500</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={18} color="var(--color-success)" strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>10/09/2026 · 11:02</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Pago recibido · Transferencia</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Saldo restante: $2,500 · Registró Carlos M.</div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>
                +$1,000
              </div>
            </div>

            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} color="var(--color-text-secondary)" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>01/09/2026 · 09:40</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Deuda creada · {ventaFolio}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Vencimiento: 15/09/2026</div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                $3,500
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista Detalle Principal (Páginas 12 y 14)
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '90px'
    }}>
      {/* Banner de confirmación de pago registrado (Página 14 del PDF) */}
      {pagoReciente && (
        <div style={{
          backgroundColor: '#1E293B',
          color: '#FFFFFF',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '2px solid var(--color-success)'
        }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>Pago registrado correctamente</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              ${pagoReciente.monto.toLocaleString()} en {pagoReciente.metodo.toLowerCase()} · saldo actualizado
            </div>
          </div>
        </div>
      )}

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
              {clienteNombre}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Deuda · {ventaFolio}
            </div>
          </div>
        </div>

        <button style={{ width: '38px', height: '38px', borderRadius: '50%', color: 'var(--color-text-secondary)' }}>
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Contenido */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Tarjeta de Saldo Pendiente y Barra */}
        <div className="card" style={{ padding: '18px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Saldo pendiente
              </div>
              <div className="amount-text" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                ${saldoPendiente.toLocaleString()}
              </div>
            </div>

            <div className="status-badge error-solid" style={{ padding: '4px 10px', fontSize: '12px' }}>
              <AlertTriangle size={13} />
              <span>Vencida</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px', marginBottom: '14px' }}>
            <Calendar size={14} />
            <span>Venció el 15/09/2026 · hace 16 días</span>
          </div>

          {/* Barra de progreso */}
          <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ width: `${progressRatio}%`, height: '100%', backgroundColor: 'var(--color-primary)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
            <span style={{ color: 'var(--color-primary)' }}>Pagado ${pagado.toLocaleString()}</span>
            <span style={{ color: 'var(--color-text-primary)' }}>Total original ${totalOriginal.toLocaleString()}</span>
          </div>

          {/* Detalles generales */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Cliente</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-primary)' }}>{clienteNombre}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Operación</span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{ventaFolio}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Fecha</span>
              <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-primary)' }}>01/09/2026</span>
            </div>
          </div>
        </div>

        {/* Sección: HISTORIAL DE PAGOS */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 700, 
              letterSpacing: '0.6px', 
              color: 'var(--color-text-secondary)', 
              textTransform: 'uppercase' 
            }}>
              Historial de pagos
            </div>
            <button 
              onClick={() => setViewMode('timeline')}
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              Ver todo
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pagoReciente && (
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={18} color="var(--color-success)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>01/10/2026 · 16:20</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      Pago recibido · {pagoReciente.metodo}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      Saldo restante: ${saldoPendiente.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  ${pagoReciente.monto.toLocaleString()}
                </div>
              </div>
            )}

            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={18} color="var(--color-success)" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>10/09/2026 · 11:02</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Pago recibido · Transferencia
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Saldo restante: $2,500
                  </div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                $1,000
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
          onClick={() => setViewMode('timeline')}
          className="btn-outline" 
          style={{ flex: 1, height: '48px', justifyContent: 'center', gap: '6px' }}
        >
          <History size={18} />
          <span>Historial</span>
        </button>

        <button 
          onClick={() => onOpenRegistrarPago(saldoPendiente)}
          className="btn-primary-action" 
          style={{ flex: 1.2, height: '48px', justifyContent: 'center', gap: '8px' }}
        >
          <CreditCard size={18} />
          <span>Registrar pago</span>
        </button>
      </div>
    </div>
  );
};
