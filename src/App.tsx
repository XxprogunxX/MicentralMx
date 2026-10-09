import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { TopStatusBar } from './components/TopStatusBar';
import { BottomNavBar, type TabKey } from './components/BottomNavBar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopTopHeader } from './components/DesktopTopHeader';
import { SincronizacionModal } from './components/SincronizacionModal';
import { LoginView } from './views/LoginView';
import { HomeDashboardView } from './views/HomeDashboardView';
import { VentasListView } from './views/VentasListView';
import { NuevaVentaModal } from './views/NuevaVentaModal';
import { VentaExitoModal } from './views/VentaExitoModal';
import { VentaDetalleView } from './views/VentaDetalleView';
import { FiltrosVentasSheet } from './views/FiltrosVentasSheet';
import { InventarioListView } from './views/InventarioListView';
import { ProductoDetalleView } from './views/ProductoDetalleView';
import { AgregarProductoModal } from './views/AgregarProductoModal';
import { EditarProductoModal } from './views/EditarProductoModal';
import { MermasAjustesView } from './views/MermasAjustesView';
import { ClientesListView } from './views/ClientesListView';
import { ClienteDetalleView } from './views/ClienteDetalleView';
import { DeudasListView } from './views/DeudasListView';
import { DeudaDetalleView } from './views/DeudaDetalleView';
import { RegistrarPagoSheet } from './views/RegistrarPagoSheet';
import { MasMenuView } from './views/MasMenuView';
import { ProveedoresView } from './views/ProveedoresView';
import { ComprasView } from './views/ComprasView';
import { PagosMovimientosView } from './views/PagosMovimientosView';
import { ReportesView } from './views/ReportesView';
import { UsuariosView } from './views/UsuariosView';
import { HistorialAuditoriaView } from './views/HistorialAuditoriaView';
import { ConfiguracionView } from './views/ConfiguracionView';

import { 
  INITIAL_PRODUCTOS, 
  INITIAL_CLIENTES, 
  INITIAL_VENTAS, 
  INITIAL_SYNC_QUEUE 
} from './data/mockData';
import type { Venta, NetworkMode, OperacionSync, Producto, Cliente, MetodoPago } from './types';

export function App() {
  // Detección de plataforma nativa Android vs Web
  const isNativeAndroid = Capacitor.isNativePlatform() || Capacitor.getPlatform() === 'android';

  // Modo de visualización: 'web' (Pantalla completa / ERP) o 'mobile' (Android / Celular)
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>(() => {
    if (isNativeAndroid) return 'mobile';
    if (typeof window !== 'undefined' && window.innerWidth >= 900) return 'web';
    return 'mobile';
  });

  // Estado de sesión
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabKey>('inicio');

  // Estado de red y sincronización (Simulador Offline-First)
  const [networkMode, setNetworkMode] = useState<NetworkMode>('online');
  const [syncQueue, setSyncQueue] = useState<OperacionSync[]>(INITIAL_SYNC_QUEUE);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Datos principales
  const [ventas, setVentas] = useState<Venta[]>(INITIAL_VENTAS);
  const [productos, setProductos] = useState<Producto[]>(INITIAL_PRODUCTOS);
  const [clientes, setClientes] = useState<Cliente[]>(INITIAL_CLIENTES);

  // Estados de modales y vistas detalladas
  const [isNuevaVentaOpen, setIsNuevaVentaOpen] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isFiltrosOpen, setIsFiltrosOpen] = useState<boolean>(false);
  const [ventaExitosa, setVentaExitosa] = useState<Venta | null>(null);
  const [selectedVentaFolio, setSelectedVentaFolio] = useState<string | null>(null);

  // Estados de Inventario, Mermas, Clientes y Deudas
  const [selectedProductoId, setSelectedProductoId] = useState<string | null>(null);
  const [isAgregarProductoOpen, setIsAgregarProductoOpen] = useState<boolean>(false);
  const [isEditarProductoOpen, setIsEditarProductoOpen] = useState<boolean>(false);
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [selectedDeuda, setSelectedDeuda] = useState<{ clienteNombre: string; ventaFolio: string } | null>(null);
  const [pagoReciente, setPagoReciente] = useState<{ monto: number; metodo: string } | null>(null);
  const [pagoModalData, setPagoModalData] = useState<{ clienteNombre: string; saldoActual: number } | null>(null);

  // Secciones secundarias de Operación y Administración
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  // Limpiar vistas de detalle al navegar
  const clearDetailViews = () => {
    setSelectedVentaFolio(null);
    setSelectedProductoId(null);
    setSelectedClienteId(null);
    setSelectedDeuda(null);
  };

  // Alternar conexión Online / Offline
  const handleToggleNetwork = () => {
    if (networkMode === 'online') {
      setNetworkMode('offline');
    } else {
      setNetworkMode('syncing');
      setIsSyncing(true);
      setTimeout(() => {
        setSyncQueue(prev => prev.map(op => ({ ...op, estado: 'Enviada' })));
        setVentas(prev => prev.map(v => ({ ...v, sincronizada: true })));
        setIsSyncing(false);
        setNetworkMode('online');
      }, 1500);
    }
  };

  // Confirmar nueva venta
  const handleConfirmVenta = (nuevaVenta: Venta) => {
    setIsNuevaVentaOpen(false);

    if (networkMode === 'offline') {
      nuevaVenta.sincronizada = false;
      const nuevaOp: OperacionSync = {
        id: `op-${Date.now()}`,
        tipo: 'Venta',
        descripcion: `Venta ${nuevaVenta.folio} · $${nuevaVenta.total.toLocaleString()}`,
        monto: nuevaVenta.total,
        estado: 'Pendiente',
        timestamp: nuevaVenta.hora
      };
      setSyncQueue(prev => [nuevaOp, ...prev]);
    } else {
      nuevaVenta.sincronizada = true;
    }

    setVentas(prev => [nuevaVenta, ...prev]);
    setVentaExitosa(nuevaVenta);
  };

  // Guardar nuevo producto
  const handleSaveProducto = (newProd: Producto) => {
    setProductos(prev => [newProd, ...prev]);
  };

  // Actualizar producto
  const handleUpdateProducto = (updated: Producto) => {
    setProductos(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Eliminar producto
  const handleDeleteProducto = (id: string) => {
    setProductos(prev => prev.filter(p => p.id !== id));
    setSelectedProductoId(null);
  };

  // Registrar merma o ajuste
  const handleRegistrarMerma = (data: {
    productoId: string;
    clasificacionId: string;
    cantidad: number;
    motivo: string;
    tipo: 'Merma' | 'Ajuste';
  }) => {
    setProductos(prev => prev.map(prod => {
      if (prod.id !== data.productoId) return prod;
      return {
        ...prod,
        clasificaciones: prod.clasificaciones.map(c => {
          if (c.id !== data.clasificacionId) return c;
          const newStock = data.tipo === 'Merma' 
            ? Math.max(0, c.existencia - data.cantidad)
            : c.existencia + data.cantidad;
          return { ...c, existencia: newStock, avisoBajo: newStock <= prod.avisoInventarioBajo };
        })
      };
    }));

    if (networkMode === 'offline') {
      const op: OperacionSync = {
        id: `op-${Date.now()}`,
        tipo: 'Merma',
        descripcion: `${data.tipo} · ${data.motivo} (${data.cantidad})`,
        estado: 'Pendiente',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSyncQueue(prev => [op, ...prev]);
    }

    alert(`${data.tipo} registrada correctamente. Inventario actualizado.`);
    setActiveSubSection(null);
  };

  // Confirmar nueva compra (aumenta stock)
  const handleConfirmNuevaCompra = (compra: {
    proveedor: string;
    productoId: string;
    clasificacionId: string;
    cantidad: number;
    costoUnitario: number;
    total: number;
  }) => {
    setProductos(prev => prev.map(prod => {
      if (prod.id !== compra.productoId) return prod;
      return {
        ...prod,
        clasificaciones: prod.clasificaciones.map(c => {
          if (c.id !== compra.clasificacionId) return c;
          const newStock = c.existencia + compra.cantidad;
          return { ...c, existencia: newStock, avisoBajo: newStock <= prod.avisoInventarioBajo };
        })
      };
    }));

    alert(`Compra confirmada. Se agregaron ${compra.cantidad} unidades al inventario.`);
  };

  // Confirmar pago/abono de deuda
  const handleConfirmPago = (monto: number, metodo: MetodoPago) => {
    setPagoModalData(null);
    setPagoReciente({ monto, metodo });

    if (selectedClienteId) {
      setClientes(prev => prev.map(c => {
        if (c.id !== selectedClienteId) return c;
        const nuevoSaldo = Math.max(0, c.saldoPendiente - monto);
        return {
          ...c,
          saldoPendiente: nuevoSaldo,
          estadoDeuda: nuevoSaldo === 0 ? 'Sin saldo' : 'Al corriente'
        };
      }));
    }

    if (networkMode === 'offline') {
      const op: OperacionSync = {
        id: `op-${Date.now()}`,
        tipo: 'Pago',
        descripcion: `Pago de ${pagoModalData?.clienteNombre || 'Cliente'} · $${monto.toLocaleString()}`,
        monto,
        estado: 'Pendiente',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSyncQueue(prev => [op, ...prev]);
    }
  };

  // Si no está autenticado, mostrar pantalla de Login (Página 1)
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: viewMode === 'web' ? '#F1F5F9' : 'var(--color-bg)',
        padding: viewMode === 'web' ? '24px' : '0'
      }}>
        <div style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: viewMode === 'web' ? '24px' : '0',
          boxShadow: viewMode === 'web' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' : 'none',
          overflow: 'hidden',
          border: viewMode === 'web' ? '1px solid var(--color-border)' : 'none'
        }}>
          <LoginView onLoginSuccess={() => setIsAuthenticated(true)} />
        </div>
      </div>
    );
  }

  // Detalle de Producto activo
  const currentProducto = selectedProductoId 
    ? productos.find(p => p.id === selectedProductoId) || null 
    : null;

  // Detalle de Cliente activo
  const currentCliente = selectedClienteId 
    ? clientes.find(c => c.id === selectedClienteId) || null 
    : null;

  // Detalle de Venta activo
  const currentVentaDetalle = selectedVentaFolio 
    ? ventas.find(v => v.folio === selectedVentaFolio) || null 
    : null;

  const isAnyDetailViewOpen = 
    Boolean(selectedVentaFolio) || 
    Boolean(selectedProductoId) || 
    Boolean(selectedClienteId) || 
    Boolean(selectedDeuda) || 
    Boolean(activeSubSection);

  // Título e información para el Desktop Header
  const getPageHeaderInfo = () => {
    if (selectedVentaFolio) return { title: `Detalle de Venta ${selectedVentaFolio}`, subtitle: 'Desglose del ticket y cobro' };
    if (selectedProductoId) return { title: currentProducto ? currentProducto.nombre : 'Detalle de Producto', subtitle: 'Existencias por clasificación y precios' };
    if (selectedClienteId) return { title: currentCliente ? currentCliente.nombre : 'Detalle de Cliente', subtitle: 'Información comercial y saldo' };
    if (selectedDeuda) return { title: `Cuenta por Cobrar · ${selectedDeuda.clienteNombre}`, subtitle: `Venta ${selectedDeuda.ventaFolio}` };

    if (activeSubSection === 'deudas') return { title: 'Cuentas por Cobrar', subtitle: 'Control y cobranza de cartera vencida' };
    if (activeSubSection === 'compras') return { title: 'Compras y Entradas', subtitle: 'Recepción de mercancía a proveedores' };
    if (activeSubSection === 'proveedores') return { title: 'Proveedores', subtitle: 'Directorio de productores y mayoristas' };
    if (activeSubSection === 'pagos') return { title: 'Caja y Movimientos', subtitle: 'Control de ingresos y egresos diarios' };
    if (activeSubSection === 'mermas') return { title: 'Mermas y Ajustes', subtitle: 'Registro de mermas naturales y ajustes físicos' };
    if (activeSubSection === 'reportes') return { title: 'Reportes y Métricas', subtitle: 'Balance operativo y financiero del negocio' };
    if (activeSubSection === 'usuarios') return { title: 'Usuarios y Permisos', subtitle: 'Roles y accesos del personal' };
    if (activeSubSection === 'historial') return { title: 'Historial de Auditoría', subtitle: 'Registro de movimientos y actividades' };
    if (activeSubSection === 'configuracion') return { title: 'Configuración', subtitle: 'Datos del negocio, impresora y sincronización' };

    if (activeTab === 'inicio') return { title: 'Panel Principal', subtitle: 'Resumen operativo del día · Bodega Hernández' };
    if (activeTab === 'ventas') return { title: 'Ventas Realizadas', subtitle: 'Historial de tickets, cobranza y facturación' };
    if (activeTab === 'inventario') return { title: 'Inventario y Clasificaciones', subtitle: 'Control de existencias por calidades y tamaños' };
    if (activeTab === 'clientes') return { title: 'Cartera de Clientes', subtitle: 'Clientes frecuentes y límites de crédito' };
    return { title: 'Más Opciones', subtitle: 'Operación y administración' };
  };

  const headerInfo = getPageHeaderInfo();

  // Renderizador unificado del contenido central
  const renderMainContent = () => {
    if (selectedVentaFolio) {
      return (
        <VentaDetalleView 
          venta={currentVentaDetalle}
          onBack={() => setSelectedVentaFolio(null)}
          onVerDeuda={() => {
            setSelectedVentaFolio(null);
            setActiveSubSection('deudas');
          }}
          onRegistrarPago={() => {
            if (currentVentaDetalle) {
              setPagoModalData({
                clienteNombre: currentVentaDetalle.clienteNombre,
                saldoActual: currentVentaDetalle.saldo
              });
            }
          }}
        />
      );
    }

    if (selectedDeuda) {
      return (
        <DeudaDetalleView 
          clienteNombre={selectedDeuda.clienteNombre}
          ventaFolio={selectedDeuda.ventaFolio}
          pagoReciente={pagoReciente}
          onBack={() => {
            setSelectedDeuda(null);
            setPagoReciente(null);
          }}
          onOpenRegistrarPago={(saldo: number) => {
            setPagoModalData({
              clienteNombre: selectedDeuda.clienteNombre,
              saldoActual: saldo
            });
          }}
        />
      );
    }

    if (activeSubSection === 'deudas') {
      return (
        <div>
          <div style={{ padding: '12px 16px', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', marginBottom: '12px', borderRadius: '8px' }}>
            <button 
              onClick={() => setActiveSubSection(null)}
              className="btn-outline" 
              style={{ height: '36px', fontSize: '13px' }}
            >
              ← Volver
            </button>
          </div>
          <DeudasListView 
            onSelectDeuda={(cliente, ventaFolio) => setSelectedDeuda({ clienteNombre: cliente, ventaFolio })}
            onRegistrarPago={(cliente, saldo) => {
              setPagoModalData({ clienteNombre: cliente, saldoActual: saldo });
            }}
          />
        </div>
      );
    }

    if (activeSubSection === 'compras') {
      return (
        <ComprasView 
          productos={productos}
          onBack={() => setActiveSubSection(null)}
          onConfirmNuevaCompra={handleConfirmNuevaCompra}
        />
      );
    }

    if (activeSubSection === 'proveedores') {
      return (
        <ProveedoresView 
          onBack={() => setActiveSubSection(null)}
          onSelectProveedor={(_nombre) => {
            setActiveSubSection('compras');
          }}
        />
      );
    }

    if (activeSubSection === 'pagos') {
      return (
        <PagosMovimientosView 
          onBack={() => setActiveSubSection(null)}
        />
      );
    }

    if (activeSubSection === 'mermas') {
      return (
        <MermasAjustesView 
          productos={productos}
          onBack={() => setActiveSubSection(null)}
          onRegistrarMerma={handleRegistrarMerma}
        />
      );
    }

    if (activeSubSection === 'reportes') {
      return (
        <ReportesView 
          onBack={() => setActiveSubSection(null)}
          onNavigateDetail={(seccion) => {
            if (seccion === 'ventas') { setActiveSubSection(null); setActiveTab('ventas'); }
            else if (seccion === 'inventario') { setActiveSubSection(null); setActiveTab('inventario'); }
            else if (seccion === 'deudas') { setActiveSubSection('deudas'); }
            else if (seccion === 'compras') { setActiveSubSection('compras'); }
            else if (seccion === 'pagos') { setActiveSubSection('pagos'); }
            else if (seccion === 'mermas') { setActiveSubSection('mermas'); }
          }}
        />
      );
    }

    if (activeSubSection === 'usuarios') {
      return (
        <UsuariosView 
          onBack={() => setActiveSubSection(null)}
        />
      );
    }

    if (activeSubSection === 'historial') {
      return (
        <HistorialAuditoriaView 
          onBack={() => setActiveSubSection(null)}
        />
      );
    }

    if (activeSubSection === 'configuracion') {
      return (
        <ConfiguracionView 
          onBack={() => setActiveSubSection(null)}
          networkMode={networkMode}
          isSyncing={isSyncing}
          onSyncManual={handleToggleNetwork}
          onLogout={() => setIsAuthenticated(false)}
          onNavigateUsuarios={() => setActiveSubSection('usuarios')}
        />
      );
    }

    if (selectedProductoId) {
      return (
        <ProductoDetalleView 
          producto={currentProducto}
          onBack={() => setSelectedProductoId(null)}
          onEdit={() => setIsEditarProductoOpen(true)}
          onNuevaVenta={() => setIsNuevaVentaOpen(true)}
          onRegistrarCompra={() => setActiveSubSection('compras')}
        />
      );
    }

    if (selectedClienteId) {
      return (
        <ClienteDetalleView 
          cliente={currentCliente}
          onBack={() => setSelectedClienteId(null)}
          onRegistrarPago={(c) => {
            setPagoModalData({ clienteNombre: c.nombre, saldoActual: c.saldoPendiente });
          }}
          onNuevaVenta={() => setIsNuevaVentaOpen(true)}
        />
      );
    }

    if (activeTab === 'inicio') {
      return (
        <HomeDashboardView 
          onOpenNuevaVenta={() => setIsNuevaVentaOpen(true)}
          onNavigateTab={(tab) => {
            setActiveSubSection(null);
            setActiveTab(tab);
          }}
          onSelectVentaDetalle={(folio) => setSelectedVentaFolio(folio)}
        />
      );
    }

    if (activeTab === 'ventas') {
      return (
        <VentasListView 
          ventas={ventas}
          networkMode={networkMode}
          pendingCount={syncQueue.filter(op => op.estado !== 'Enviada').length}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
          onOpenNuevaVenta={() => setIsNuevaVentaOpen(true)}
          onSelectVentaDetalle={(folio) => setSelectedVentaFolio(folio)}
          onOpenFiltros={() => setIsFiltrosOpen(true)}
        />
      );
    }

    if (activeTab === 'inventario') {
      return (
        <InventarioListView 
          productos={productos}
          onSelectProducto={(id) => setSelectedProductoId(id)}
          onOpenAgregarProducto={() => setIsAgregarProductoOpen(true)}
        />
      );
    }

    if (activeTab === 'clientes') {
      return (
        <ClientesListView 
          clientes={clientes}
          onSelectCliente={(id) => setSelectedClienteId(id)}
          onOpenAgregarCliente={() => alert('Formulario Agregar Cliente')}
        />
      );
    }

    return (
      <MasMenuView 
        onNavigateSection={(sec) => setActiveSubSection(sec)}
      />
    );
  };

  // VISTA 1: MODO WEB ESCRITORIO (PANTALLA COMPLETA)
  if (viewMode === 'web') {
    return (
      <div className="app-web-container">
        {/* Sidebar Lateral Izquierdo */}
        <DesktopSidebar 
          activeTab={activeTab}
          activeSubSection={activeSubSection}
          networkMode={networkMode}
          pendingSyncCount={syncQueue.filter(op => op.estado !== 'Enviada').length}
          onNavigateTab={(tab) => {
            clearDetailViews();
            setActiveSubSection(null);
            setActiveTab(tab);
          }}
          onNavigateSubSection={(sec) => {
            clearDetailViews();
            setActiveSubSection(sec);
          }}
          onOpenNuevaVenta={() => setIsNuevaVentaOpen(true)}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
          onLogout={() => setIsAuthenticated(false)}
        />

        {/* Área Central Principal */}
        <div className="desktop-main-area">
          <DesktopTopHeader 
            title={headerInfo.title}
            subtitle={headerInfo.subtitle}
            viewMode={viewMode}
            networkMode={networkMode}
            pendingSyncCount={syncQueue.filter(op => op.estado !== 'Enviada').length}
            onToggleViewMode={setViewMode}
            onToggleNetwork={handleToggleNetwork}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            onShowLogin={() => setIsAuthenticated(false)}
          />

          <main className="desktop-content-container">
            {renderMainContent()}
          </main>
        </div>

        {/* MODALES GLOBALES */}
        <NuevaVentaModal 
          isOpen={isNuevaVentaOpen}
          onClose={() => setIsNuevaVentaOpen(false)}
          productos={productos}
          clientes={clientes}
          onConfirmVenta={handleConfirmVenta}
        />

        <VentaExitoModal 
          venta={ventaExitosa}
          onNuevaVenta={() => {
            setVentaExitosa(null);
            setIsNuevaVentaOpen(true);
          }}
          onVerDetalle={(folio) => {
            setVentaExitosa(null);
            setSelectedVentaFolio(folio);
          }}
          onIrAVentas={() => {
            setVentaExitosa(null);
            setActiveSubSection(null);
            setActiveTab('ventas');
          }}
        />

        <AgregarProductoModal 
          isOpen={isAgregarProductoOpen}
          onClose={() => setIsAgregarProductoOpen(false)}
          onSaveProducto={handleSaveProducto}
        />

        <EditarProductoModal 
          isOpen={isEditarProductoOpen}
          producto={currentProducto}
          onClose={() => setIsEditarProductoOpen(false)}
          onSave={handleUpdateProducto}
          onDelete={handleDeleteProducto}
        />

        {pagoModalData && (
          <RegistrarPagoSheet 
            isOpen={Boolean(pagoModalData)}
            onClose={() => setPagoModalData(null)}
            clienteNombre={pagoModalData.clienteNombre}
            saldoActual={pagoModalData.saldoActual}
            onConfirmPago={handleConfirmPago}
          />
        )}

        <SincronizacionModal 
          isOpen={isSyncModalOpen}
          onClose={() => setIsSyncModalOpen(false)}
          syncQueue={syncQueue}
          isSyncing={isSyncing}
        />

        <FiltrosVentasSheet 
          isOpen={isFiltrosOpen}
          onClose={() => setIsFiltrosOpen(false)}
          clientes={clientes}
          onApplyFilters={(f) => console.log(f)}
        />
      </div>
    );
  }

  // VISTA 2: MODO MÓVIL (ANDROID / PWA / CELULAR)
  return (
    <div className={`app-mobile-wrapper ${isNativeAndroid ? 'native-android' : 'simulated-frame'}`}>
      {/* Botón flotante para volver a Web cuando se simula en PC */}
      {!isNativeAndroid && (
        <div style={{
          width: '100%',
          maxWidth: '440px',
          margin: '0 auto 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 10px'
        }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Vista Móvil (Android)</span>
          <button 
            onClick={() => setViewMode('web')}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              backgroundColor: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            🖥️ Cambiar a Pantalla Completa (Web)
          </button>
        </div>
      )}

      <div className="app-viewport">
        {/* Encabezado móvil */}
        {!isAnyDetailViewOpen && (
          <TopStatusBar 
            networkMode={networkMode}
            pendingCount={syncQueue.filter(op => op.estado !== 'Enviada').length}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            onToggleNetwork={handleToggleNetwork}
          />
        )}

        {renderMainContent()}

        {/* Barra de navegación inferior móvil (Fija) */}
        {!isAnyDetailViewOpen && (
          <BottomNavBar 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveSubSection(null);
              setActiveTab(tab);
            }} 
          />
        )}
      </div>

      {/* MODALES GLOBALES */}
      <NuevaVentaModal 
        isOpen={isNuevaVentaOpen}
        onClose={() => setIsNuevaVentaOpen(false)}
        productos={productos}
        clientes={clientes}
        onConfirmVenta={handleConfirmVenta}
      />

      <VentaExitoModal 
        venta={ventaExitosa}
        onNuevaVenta={() => {
          setVentaExitosa(null);
          setIsNuevaVentaOpen(true);
        }}
        onVerDetalle={(folio) => {
          setVentaExitosa(null);
          setSelectedVentaFolio(folio);
        }}
        onIrAVentas={() => {
          setVentaExitosa(null);
          setActiveSubSection(null);
          setActiveTab('ventas');
        }}
      />

      <AgregarProductoModal 
        isOpen={isAgregarProductoOpen}
        onClose={() => setIsAgregarProductoOpen(false)}
        onSaveProducto={handleSaveProducto}
      />

      <EditarProductoModal 
        isOpen={isEditarProductoOpen}
        producto={currentProducto}
        onClose={() => setIsEditarProductoOpen(false)}
        onSave={handleUpdateProducto}
        onDelete={handleDeleteProducto}
      />

      {pagoModalData && (
        <RegistrarPagoSheet 
          isOpen={Boolean(pagoModalData)}
          onClose={() => setPagoModalData(null)}
          clienteNombre={pagoModalData.clienteNombre}
          saldoActual={pagoModalData.saldoActual}
          onConfirmPago={handleConfirmPago}
        />
      )}

      <SincronizacionModal 
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        syncQueue={syncQueue}
        isSyncing={isSyncing}
      />

      <FiltrosVentasSheet 
        isOpen={isFiltrosOpen}
        onClose={() => setIsFiltrosOpen(false)}
        clientes={clientes}
        onApplyFilters={(f) => console.log(f)}
      />
    </div>
  );
}

export default App;
