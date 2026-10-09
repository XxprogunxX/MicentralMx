import React from 'react';
import { 
  ArrowLeft, 
  Store, 
  Users, 
  RefreshCw, 
  CheckCircle2, 
  User, 
  Lock, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';
import type { NetworkMode } from '../types';

interface ConfiguracionViewProps {
  onBack: () => void;
  networkMode: NetworkMode;
  onSyncManual: () => void;
  isSyncing: boolean;
  onLogout: () => void;
  onNavigateUsuarios: () => void;
}

export const ConfiguracionView: React.FC<ConfiguracionViewProps> = ({
  onBack,
  networkMode,
  onSyncManual,
  isSyncing,
  onLogout,
  onNavigateUsuarios
}) => {
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
          Configuración
        </h1>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* SECCIÓN NEGOCIO */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Negocio
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div 
              className="card"
              onClick={() => alert('Edición de datos fiscales y ubicación de la bodega')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Store size={18} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Datos del negocio
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    Bodega Hernández · Nave I
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>

            <div 
              className="card"
              onClick={onNavigateUsuarios}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="var(--color-primary)" />
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Usuarios y permisos
                </div>
              </div>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>
        </div>

        {/* SECCIÓN SINCRONIZACIÓN (Pág. 30) */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Sincronización
          </div>

          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Estado</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: 700, fontSize: '14px' }}>
                <CheckCircle2 size={16} />
                <span>{networkMode === 'offline' ? 'Pendiente por sincronizar' : 'Todo actualizado'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Última sincronización</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Hoy 16:12</span>
            </div>

            <button 
              onClick={onSyncManual}
              disabled={isSyncing}
              className="btn-outline"
              style={{ width: '100%', height: '46px', justifyContent: 'center', gap: '8px' }}
            >
              <RefreshCw size={16} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
              <span>{isSyncing ? 'Sincronizando…' : 'Sincronizar ahora'}</span>
            </button>
          </div>
        </div>

        {/* SECCIÓN MI CUENTA */}
        <div>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '0.6px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Mi cuenta
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div 
              className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Ana Hernández
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    Administrador
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>

            <div 
              className="card"
              onClick={() => alert('Cambio de contraseña')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={18} color="var(--color-text-secondary)" />
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Cambiar contraseña
                </div>
              </div>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>

            {/* Cerrar sesión */}
            <button 
              onClick={onLogout}
              className="btn-outline"
              style={{ 
                width: '100%', 
                height: '48px', 
                justifyContent: 'center', 
                gap: '8px',
                color: 'var(--color-error)',
                borderColor: '#FCA5A5',
                marginTop: '8px'
              }}
            >
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
