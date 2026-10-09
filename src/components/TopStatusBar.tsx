import React from 'react';
import { CheckCircle2, WifiOff, RefreshCw } from 'lucide-react';
import type { NetworkMode } from '../types';

interface TopStatusBarProps {
  networkMode: NetworkMode;
  pendingCount: number;
  onOpenSyncModal: () => void;
  onToggleNetwork?: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  networkMode,
  pendingCount,
  onOpenSyncModal,
  onToggleNetwork
}) => {
  return (
    <header className="top-status-bar">
      <div className="brand-badge" onClick={onToggleNetwork} title="Haz clic para simular alternar conexión Online/Offline" style={{ cursor: 'pointer' }}>
        <div className="brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span>MiCentral<span style={{ color: 'var(--color-accent)' }}>MX</span></span>
      </div>

      <div 
        onClick={onOpenSyncModal} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        title="Ver estado de sincronización"
      >
        {networkMode === 'online' && pendingCount === 0 && (
          <div className="status-badge success" style={{ padding: '4px 10px' }}>
            <CheckCircle2 size={15} color="var(--color-success)" strokeWidth={2.2} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Actualizado</span>
          </div>
        )}

        {networkMode === 'online' && pendingCount > 0 && (
          <div className="status-badge info" style={{ padding: '4px 10px' }}>
            <RefreshCw size={14} className="spin-icon" color="var(--color-info)" strokeWidth={2.2} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Sincronizando...</span>
          </div>
        )}

        {networkMode === 'offline' && (
          <div className="status-badge warning" style={{ padding: '4px 10px', backgroundColor: '#FEF3C7', color: '#734A0C' }}>
            <WifiOff size={14} color="#734A0C" strokeWidth={2.2} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Sin conexión</span>
          </div>
        )}

        {networkMode === 'syncing' && (
          <div className="status-badge info" style={{ padding: '4px 10px' }}>
            <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} color="var(--color-info)" strokeWidth={2.2} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Sincronizando…</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};
