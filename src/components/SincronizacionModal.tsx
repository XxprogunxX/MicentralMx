import React from 'react';
import { X, RefreshCw, CheckCircle2, Info } from 'lucide-react';
import type { OperacionSync } from '../types';

interface SincronizacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncQueue: OperacionSync[];
  isSyncing: boolean;
  onSyncAll?: () => void;
}

export const SincronizacionModal: React.FC<SincronizacionModalProps> = ({
  isOpen,
  onClose,
  syncQueue,
  isSyncing
}) => {
  if (!isOpen) return null;

  const totalOps = syncQueue.length || 3;
  const completedOps = syncQueue.filter(op => op.estado === 'Enviada' || (op.estado as string) === 'Enviado').length;
  const progressPercent = Math.min(100, Math.round(((completedOps + (isSyncing ? 0.6 : 1)) / (totalOps || 1)) * 100));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh' }}>
        <div className="sheet-handle" />

        {/* Encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Sincronización</h2>
          <button 
            onClick={onClose}
            style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tarjeta de estado actual */}
        <div style={{ 
          backgroundColor: '#F0F7F4', 
          border: '1px solid #CDE6DB', 
          borderRadius: 'var(--radius-md)', 
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              backgroundColor: '#FFFFFF', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}>
              <RefreshCw size={18} color="var(--color-primary)" style={{ animation: isSyncing ? 'spin 1.2s linear infinite' : 'none' }} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isSyncing ? 'Sincronizando…' : 'Todo sincronizado'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {isSyncing 
                  ? `Enviando ${syncQueue.length} cambios guardados sin conexión`
                  : 'Todos tus movimientos del dispositivo están respaldados en el servidor.'}
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div style={{ marginTop: '14px', height: '6px', backgroundColor: '#D9E0DD', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${progressPercent}%`, 
                backgroundColor: 'var(--color-primary)', 
                transition: 'width 0.4s ease' 
              }} 
            />
          </div>
        </div>

        {/* Lista de operaciones en sincronización */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {syncQueue.map((op) => {
            const isDone = op.estado === 'Enviada' || (op.estado as string) === 'Enviado';
            const inProgress = op.estado === 'Enviando...';

            return (
              <div 
                key={op.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {isDone ? (
                    <CheckCircle2 size={20} color="var(--color-success)" strokeWidth={2.2} />
                  ) : (
                    <RefreshCw size={18} color="var(--color-info)" style={{ animation: inProgress ? 'spin 1.2s linear infinite' : 'none' }} />
                  )}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {op.descripcion}
                    </div>
                    <div style={{ fontSize: '12px', color: isDone ? 'var(--color-success-text)' : 'var(--color-info-text)' }}>
                      {op.estado}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {op.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Nota informativa */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--color-text-secondary)', 
          fontSize: '13px', 
          marginBottom: '20px' 
        }}>
          <Info size={16} />
          <span>Puedes seguir trabajando mientras termina.</span>
        </div>

        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="btn-outline"
          style={{ width: '100%', height: '48px', justifyContent: 'center' }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
