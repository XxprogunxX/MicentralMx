import React from 'react';
import type { TabKey } from './BottomNavBar';
import type { NetworkMode } from '../types';
import { 
  Store, 
  LayoutDashboard, 
  ShoppingBag, 
  Boxes, 
  Users, 
  CreditCard, 
  Truck, 
  ArrowDownToLine, 
  Receipt, 
  Scale, 
  BarChart3, 
  ShieldCheck, 
  History, 
  Settings, 
  Plus,
  Wifi,
  WifiOff,
  LogOut
} from 'lucide-react';

interface DesktopSidebarProps {
  activeTab: TabKey;
  activeSubSection: string | null;
  networkMode: NetworkMode;
  pendingSyncCount: number;
  onNavigateTab: (tab: TabKey) => void;
  onNavigateSubSection: (section: string) => void;
  onOpenNuevaVenta: () => void;
  onOpenSyncModal: () => void;
  onLogout: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  activeSubSection,
  networkMode,
  pendingSyncCount,
  onNavigateTab,
  onNavigateSubSection,
  onOpenNuevaVenta,
  onOpenSyncModal,
  onLogout
}) => {
  // Determinar si una sección secundaria está activa
  const isSectionActive = (sec: string) => activeSubSection === sec;
  const isTabActive = (tab: TabKey) => !activeSubSection && activeTab === tab;

  return (
    <aside className="desktop-sidebar">
      {/* Brand & Logo */}
      <div className="desktop-sidebar-brand">
        <div className="brand-badge" style={{ gap: '10px' }}>
          <div className="brand-icon" style={{ width: '32px', height: '32px', borderRadius: '8px' }}>
            <Store size={18} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
              MiCentral<span style={{ color: 'var(--color-accent)' }}>MX</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
              Bodega Hernández · Central
            </div>
          </div>
        </div>
      </div>

      {/* Botón CTA Principal: Nueva Venta */}
      <div style={{ padding: '0 16px 16px' }}>
        <button 
          onClick={onOpenNuevaVenta}
          className="btn-primary-action"
          style={{ 
            height: '46px', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            fontSize: '15px',
            boxShadow: '0 4px 14px rgba(23, 107, 91, 0.3)'
          }}
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Nueva Venta</span>
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="desktop-sidebar-nav">
        {/* Sección: Principal */}
        <div className="nav-group-title">GENERAL</div>
        <button 
          className={`sidebar-nav-item ${isTabActive('inicio') ? 'active' : ''}`}
          onClick={() => { onNavigateTab('inicio'); }}
        >
          <LayoutDashboard size={18} />
          <span>Inicio / Panel</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isTabActive('ventas') ? 'active' : ''}`}
          onClick={() => { onNavigateTab('ventas'); }}
        >
          <ShoppingBag size={18} />
          <span>Ventas</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isTabActive('inventario') ? 'active' : ''}`}
          onClick={() => { onNavigateTab('inventario'); }}
        >
          <Boxes size={18} />
          <span>Inventario & Tamaños</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isTabActive('clientes') ? 'active' : ''}`}
          onClick={() => { onNavigateTab('clientes'); }}
        >
          <Users size={18} />
          <span>Clientes</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('deudas') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('deudas'); }}
        >
          <CreditCard size={18} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span>Cuentas por Cobrar</span>
            <span style={{ 
              backgroundColor: '#C94C4C', 
              color: '#FFFFFF', 
              fontSize: '10px', 
              fontWeight: 700, 
              padding: '1px 6px', 
              borderRadius: '10px' 
            }}>
              3
            </span>
          </div>
        </button>

        {/* Sección: Operaciones */}
        <div className="nav-group-title" style={{ marginTop: '14px' }}>OPERACIÓN BODEGA</div>

        <button 
          className={`sidebar-nav-item ${isSectionActive('compras') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('compras'); }}
        >
          <ArrowDownToLine size={18} />
          <span>Compras (Entradas)</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('proveedores') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('proveedores'); }}
        >
          <Truck size={18} />
          <span>Proveedores</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('pagos') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('pagos'); }}
        >
          <Receipt size={18} />
          <span>Caja y Pagos</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('mermas') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('mermas'); }}
        >
          <Scale size={18} />
          <span>Mermas y Ajustes</span>
        </button>

        {/* Sección: Administración */}
        <div className="nav-group-title" style={{ marginTop: '14px' }}>ADMINISTRACIÓN</div>

        <button 
          className={`sidebar-nav-item ${isSectionActive('reportes') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('reportes'); }}
        >
          <BarChart3 size={18} />
          <span>Reportes y Balance</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('usuarios') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('usuarios'); }}
        >
          <ShieldCheck size={18} />
          <span>Usuarios y Roles</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('historial') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('historial'); }}
        >
          <History size={18} />
          <span>Auditoría</span>
        </button>

        <button 
          className={`sidebar-nav-item ${isSectionActive('configuracion') ? 'active' : ''}`}
          onClick={() => { onNavigateSubSection('configuracion'); }}
        >
          <Settings size={18} />
          <span>Configuración</span>
        </button>
      </nav>

      {/* Pie del Sidebar: Estado de Red y Usuario */}
      <div className="desktop-sidebar-footer">
        {/* Badge de Sincronización */}
        <button 
          onClick={onOpenSyncModal}
          style={{
            width: '100%',
            padding: '8px 10px',
            borderRadius: '8px',
            backgroundColor: networkMode === 'online' ? '#ECFDF5' : '#FEF3C7',
            border: `1px solid ${networkMode === 'online' ? '#A7F3D0' : '#FDE68A'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {networkMode === 'online' ? (
              <Wifi size={14} color="#059669" />
            ) : (
              <WifiOff size={14} color="#D97706" />
            )}
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              color: networkMode === 'online' ? '#065F46' : '#92400E' 
            }}>
              {networkMode === 'online' ? 'En línea' : 'Sin conexión'}
            </span>
          </div>

          {pendingSyncCount > 0 && (
            <span style={{
              fontSize: '10px',
              fontWeight: 800,
              backgroundColor: '#F59E0B',
              color: '#FFFFFF',
              padding: '2px 6px',
              borderRadius: '10px'
            }}>
              {pendingSyncCount} pendientes
            </span>
          )}
        </button>

        {/* Perfil del Operador */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#176B5B',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              AH
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', lineHeight: 1.1 }}>Ana Hernández</div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>Administrador</div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            title="Cerrar sesión"
            style={{ color: '#9CA3AF', padding: '6px' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
