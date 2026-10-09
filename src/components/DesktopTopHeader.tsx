import React from 'react';
import type { NetworkMode } from '../types';
import { 
  Monitor, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Calendar,
  LogIn
} from 'lucide-react';

interface DesktopTopHeaderProps {
  title: string;
  subtitle?: string;
  viewMode: 'web' | 'mobile';
  networkMode: NetworkMode;
  pendingSyncCount: number;
  onToggleViewMode: (mode: 'web' | 'mobile') => void;
  onToggleNetwork: () => void;
  onOpenSyncModal: () => void;
  onShowLogin: () => void;
}

export const DesktopTopHeader: React.FC<DesktopTopHeaderProps> = ({
  title,
  subtitle,
  viewMode,
  networkMode,
  pendingSyncCount,
  onToggleViewMode,
  onToggleNetwork,
  onOpenSyncModal,
  onShowLogin
}) => {
  return (
    <header className="desktop-top-header">
      {/* Título de la página */}
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '2px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Controles de la barra superior */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Fecha */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: '#64748B',
          padding: '6px 12px',
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
        }}>
          <Calendar size={14} />
          <span>Jueves, 01 Oct 2026</span>
        </div>

        {/* Selector de Modo: Web Fullscreen vs Celular Android */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F1F5F9',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #CBD5E1'
        }}>
          <button
            onClick={() => onToggleViewMode('web')}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: viewMode === 'web' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'web' ? 'var(--color-primary)' : '#64748B',
              boxShadow: viewMode === 'web' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              gap: '5px'
            }}
            title="Vista completa de escritorio para PC y Laptops"
          >
            <Monitor size={14} />
            <span>Web (Pantalla Completa)</span>
          </button>

          <button
            onClick={() => onToggleViewMode('mobile')}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: viewMode === 'mobile' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'mobile' ? 'var(--color-primary)' : '#64748B',
              boxShadow: viewMode === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              gap: '5px'
            }}
            title="Vista móvil para Android y Celulares"
          >
            <Smartphone size={14} />
            <span>Móvil (Android)</span>
          </button>
        </div>

        {/* Toggle de Red */}
        <button
          onClick={onToggleNetwork}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            backgroundColor: networkMode === 'online' ? '#ECFDF5' : '#FEF3C7',
            color: networkMode === 'online' ? '#047857' : '#B45309',
            border: `1px solid ${networkMode === 'online' ? '#6EE7B7' : '#FCD34D'}`,
            gap: '6px'
          }}
        >
          {networkMode === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{networkMode === 'online' ? 'En línea' : 'Sin internet'}</span>
        </button>

        {/* Botón Sincronización */}
        <button
          onClick={onOpenSyncModal}
          className="btn-outline"
          style={{
            height: '34px',
            padding: '0 12px',
            fontSize: '12px',
            borderRadius: '8px',
            gap: '6px'
          }}
        >
          <RefreshCw size={14} />
          <span>Sincronizar {pendingSyncCount > 0 ? `(${pendingSyncCount})` : ''}</span>
        </button>

        {/* Ver Login */}
        <button
          onClick={onShowLogin}
          style={{
            padding: '6px 10px',
            fontSize: '12px',
            color: '#64748B',
            borderRadius: '8px',
            gap: '4px'
          }}
          title="Ver pantalla de login"
        >
          <LogIn size={14} />
          <span>Login</span>
        </button>
      </div>
    </header>
  );
};
