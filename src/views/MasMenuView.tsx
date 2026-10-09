import React from 'react';
import { 
  CreditCard, 
  ShoppingBag, 
  Truck, 
  Wallet, 
  Package, 
  BarChart3, 
  Users, 
  History, 
  Settings, 
  ChevronRight 
} from 'lucide-react';

interface MasMenuViewProps {
  onNavigateSection: (section: string) => void;
}

export const MasMenuView: React.FC<MasMenuViewProps> = ({ onNavigateSection }) => {
  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Encabezado */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Más
        </h1>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          Operación y administración del negocio
        </div>
      </div>

      {/* SECCIÓN OPERACIÓN */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          letterSpacing: '0.6px', 
          color: 'var(--color-text-secondary)', 
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          Operación
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Deudas */}
          <div 
            className="card"
            onClick={() => onNavigateSection('deudas')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F0F8F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Deudas
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Por cobrar $48,350
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="status-badge error-solid" style={{ fontSize: '11px', padding: '3px 8px' }}>
                3 vencidas
              </div>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>
          </div>

          {/* Compras */}
          <div 
            className="card"
            onClick={() => onNavigateSection('compras')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#E3F0F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={18} color="var(--color-info)" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Compras
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>

          {/* Proveedores */}
          <div 
            className="card"
            onClick={() => onNavigateSection('proveedores')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F0F8F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Proveedores
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>

          {/* Pagos: Ingresos y egresos */}
          <div 
            className="card"
            onClick={() => onNavigateSection('pagos')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Pagos
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Ingresos y egresos
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>

          {/* Mermas / Ajustes */}
          <div 
            className="card"
            onClick={() => onNavigateSection('mermas')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={18} color="#B7791F" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Mermas / Ajustes
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>

      {/* SECCIÓN ADMINISTRACIÓN */}
      <div>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          letterSpacing: '0.6px', 
          color: 'var(--color-text-secondary)', 
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          Administración
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Reportes */}
          <div 
            className="card"
            onClick={() => onNavigateSection('reportes')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={18} color="#0284C7" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Reportes
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>

          {/* Usuarios */}
          <div 
            className="card"
            onClick={() => onNavigateSection('usuarios')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Usuarios
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  Roles y permisos
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>

          {/* Historial */}
          <div 
            className="card"
            onClick={() => onNavigateSection('historial')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <History size={18} color="var(--color-text-secondary)" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Historial
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>

          {/* Configuración */}
          <div 
            className="card"
            onClick={() => onNavigateSection('configuracion')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F0F8F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings size={18} color="var(--color-primary)" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Configuración
              </div>
            </div>
            <ChevronRight size={18} color="var(--color-text-secondary)" />
          </div>
        </div>
      </div>
    </div>
  );
};
