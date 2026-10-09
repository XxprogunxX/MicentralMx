import React, { useState } from 'react';
import { 
  X, 
  Box, 
  Minus, 
  Plus, 
  AlertTriangle, 
  CreditCard, 
  User, 
  RefreshCw, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import type { Producto, Cliente, Venta, TipoPago } from '../types';

interface NuevaVentaModalProps {
  isOpen: boolean;
  onClose: () => void;
  productos: Producto[];
  clientes: Cliente[];
  onConfirmVenta: (venta: Venta) => void;
}

export const NuevaVentaModal: React.FC<NuevaVentaModalProps> = ({
  isOpen,
  onClose,
  productos,
  clientes,
  onConfirmVenta
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Producto>(productos[0] || {} as Producto);
  const [selectedClasId, setSelectedClasId] = useState<string>(productos[0]?.clasificaciones[1]?.id || '');
  const [cantidad, setCantidad] = useState<number>(5);
  const [precioUnitario, setPrecioUnitario] = useState<number>(340);
  const [tipoPago, setTipoPago] = useState<TipoPago>('Contado');
  const [selectedClienteId, setSelectedClienteId] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showProductPicker, setShowProductPicker] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentClas = selectedProduct?.clasificaciones?.find(c => c.id === selectedClasId) || selectedProduct?.clasificaciones?.[0];
  const maxStock = currentClas?.existencia || 0;
  const isStockExceeded = cantidad > maxStock;
  const totalVenta = cantidad * precioUnitario;

  const handleClasChange = (clasId: string) => {
    setSelectedClasId(clasId);
    const clas = selectedProduct.clasificaciones.find(c => c.id === clasId);
    if (clas) {
      setPrecioUnitario(clas.precio);
    }
  };

  const handleConfirmar = () => {
    if (isStockExceeded) return;

    // Generar nueva venta con folio
    const randomFolio = `#000${Math.floor(130 + Math.random() * 50)}`;
    const clienteObj = clientes.find(c => c.id === selectedClienteId);

    const nuevaVenta: Venta = {
      id: `v-${Date.now()}`,
      folio: randomFolio,
      fecha: '01/10/2026',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      clienteNombre: tipoPago === 'Contado' ? 'Venta de mostrador' : (clienteObj?.nombre || 'Cliente general'),
      clienteId: tipoPago === 'Crédito' ? clienteObj?.id : undefined,
      tipoPago,
      metodoPago: tipoPago === 'Contado' ? 'Efectivo' : 'Efectivo',
      total: totalVenta,
      pagado: tipoPago === 'Contado' ? totalVenta : 0,
      saldo: tipoPago === 'Crédito' ? totalVenta : 0,
      estado: tipoPago === 'Contado' ? 'Completada' : 'Crédito pendiente',
      fechaVencimiento: tipoPago === 'Crédito' ? '06/10/2026' : undefined,
      diasParaVencer: tipoPago === 'Crédito' ? 5 : undefined,
      sincronizada: false,
      registradoPor: 'Ana H.',
      items: [
        {
          productoId: selectedProduct.id,
          productoNombre: selectedProduct.nombre,
          clasificacionId: currentClas.id,
          clasificacionNombre: currentClas.nombre,
          cantidad,
          precioUnitario,
          subtotal: totalVenta,
          unidad: selectedProduct.unidad === 'caja' ? 'cajas' : 'kg'
        }
      ]
    };

    onConfirmVenta(nuevaVenta);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#FFFFFF',
      zIndex: 150,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '440px',
      margin: '0 auto',
      overflowY: 'auto'
    }}>
      {/* Encabezado fijo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <button 
          onClick={onClose}
          style={{ width: '40px', height: '40px', borderRadius: '50%', color: 'var(--color-text-primary)' }}
        >
          <X size={24} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', marginLeft: '8px' }}>
          Nueva venta
        </h2>
      </div>

      {/* Contenido con scroll */}
      <div style={{ padding: '16px', paddingBottom: '120px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* PASO 1: PRODUCTO */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ 
              width: '22px', 
              height: '22px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary)', 
              color: '#FFFFFF', 
              fontSize: '12px', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              1
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Producto
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={20} color="var(--color-primary)" />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {selectedProduct.nombre}
              </span>
            </div>

            <button 
              onClick={() => setShowProductPicker(true)}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              Cambiar
            </button>
          </div>
        </div>

        {/* PASO 2: CLASIFICACIÓN */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ 
              width: '22px', 
              height: '22px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary)', 
              color: '#FFFFFF', 
              fontSize: '12px', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              2
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Clasificación
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedProduct.clasificaciones.map((clas) => {
              const isSelected = selectedClasId === clas.id;

              return (
                <div
                  key={clas.id}
                  onClick={() => handleClasChange(clas.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    backgroundColor: isSelected ? '#F0F8F4' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid var(--color-primary)' : '2px solid var(--color-border)',
                      backgroundColor: '#FFFFFF'
                    }} />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {clas.nombre}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                          {clas.existencia} {selectedProduct.unidad}s disponibles
                        </span>
                        {clas.avisoBajo && (
                          <span className="status-badge warning" style={{ padding: '1px 6px', fontSize: '11px' }}>
                            <AlertTriangle size={11} />
                            <span>Bajo</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="amount-text" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    ${clas.precio}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PASO 3 Y 4: CANTIDAD Y PRECIO POR CAJA */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
            {/* 3: Cantidad */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  3
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Cantidad ({selectedProduct.unidad}s)
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '52px',
                backgroundColor: isStockExceeded ? '#FEF2F2' : '#FFFFFF',
                border: isStockExceeded ? '2px solid var(--color-error)' : '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 8px'
              }}>
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  style={{ width: '38px', height: '38px', borderRadius: '6px', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}
                >
                  <Minus size={18} />
                </button>
                <span className="tabular-numbers" style={{ fontSize: '20px', fontWeight: 700, color: isStockExceeded ? 'var(--color-error)' : 'var(--color-text-primary)' }}>
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  style={{ width: '38px', height: '38px', borderRadius: '6px', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* 4: Precio por unidad (editable según la hora del día en la central) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  4
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Precio por {selectedProduct.unidad}
                </span>
              </div>

              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  $
                </span>
                <input
                  type="number"
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(Number(e.target.value) || 0)}
                  style={{ height: '52px', paddingLeft: '28px', fontSize: '18px', fontWeight: 700 }}
                />
              </div>
            </div>
          </div>

          {/* Alerta de exceso de inventario (Página 33 del PDF) */}
          {isStockExceeded && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-error)', fontSize: '13px', fontWeight: 600, marginTop: '8px' }}>
              <X size={15} />
              <span>Solo hay {maxStock} {selectedProduct.unidad}s de {currentClas?.nombre}.</span>
            </div>
          )}
        </div>

        {/* PASO 5: CLIENTE */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ 
              width: '22px', 
              height: '22px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary)', 
              color: '#FFFFFF', 
              fontSize: '12px', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              5
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Cliente
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
            <button
              onClick={() => setTipoPago('Contado')}
              style={{
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                border: tipoPago === 'Contado' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: tipoPago === 'Contado' ? '#E4F3EB' : '#FFFFFF',
                color: tipoPago === 'Contado' ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CreditCard size={18} />
              <span>Contado</span>
            </button>

            <button
              onClick={() => setTipoPago('Crédito')}
              style={{
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                border: tipoPago === 'Crédito' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: tipoPago === 'Crédito' ? '#E4F3EB' : '#FFFFFF',
                color: tipoPago === 'Crédito' ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <User size={18} />
              <span>A un cliente</span>
            </button>
          </div>

          {tipoPago === 'Crédito' ? (
            <div style={{ marginTop: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                Seleccionar cliente para venta a crédito:
              </label>
              <select 
                value={selectedClienteId} 
                onChange={(e) => setSelectedClienteId(e.target.value)}
                style={{ height: '48px', fontSize: '15px' }}
              >
                <option value="">Selecciona un cliente…</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre} ({c.negocio})</option>
                ))}
              </select>
            </div>
          ) : (
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Elige “A un cliente” para registrarla a crédito.
            </div>
          )}
        </div>

        {/* Botón para agregar otro producto */}
        <button 
          onClick={() => alert('Función multi-producto: Se agregará otro renglón al ticket de venta.')}
          style={{ 
            fontSize: '15px', 
            fontWeight: 700, 
            color: 'var(--color-primary)', 
            alignSelf: 'flex-start',
            gap: '6px',
            marginTop: '4px' 
          }}
        >
          <Plus size={18} />
          <span>Agregar otro producto</span>
        </button>

        {/* Botón para probar simulación de error (Página 34 del PDF) */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button 
            onClick={() => setShowErrorModal(true)}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
          >
            Simular error al guardar (Pág. 34)
          </button>
        </div>
      </div>

      {/* Barra fija inferior con Total y Confirmar venta */}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        zIndex: 30
      }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Total · {cantidad} {selectedProduct.unidad}s
          </div>
          <div className="amount-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            ${totalVenta.toLocaleString()}
          </div>
        </div>

        <button
          onClick={handleConfirmar}
          disabled={isStockExceeded}
          style={{
            height: '52px',
            padding: '0 24px',
            backgroundColor: isStockExceeded ? '#CBD5E1' : 'var(--color-primary)',
            color: isStockExceeded ? '#64748B' : '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '16px',
            fontWeight: 700,
            cursor: isStockExceeded ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Check size={18} strokeWidth={2.5} />
          <span>Confirmar venta</span>
        </button>
      </div>

      {/* Modal de Error de Conexión (Página 34 del PDF) */}
      {showErrorModal && (
        <div className="modal-overlay" style={{ alignItems: 'center' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            width: '90%',
            maxWidth: '380px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-float)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FDE8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <X size={28} color="var(--color-error)" strokeWidth={2.5} />
            </div>

            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              No pudimos guardar la venta
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: '1.45' }}>
              Comprueba tu conexión e inténtalo nuevamente. Tus datos siguen en el formulario.
            </p>

            <button 
              onClick={() => setShowErrorModal(false)}
              className="btn-primary-action"
              style={{ height: '48px', marginBottom: '10px', justifyContent: 'center' }}
            >
              <RefreshCw size={16} />
              <span>Intentar nuevamente</span>
            </button>

            <button 
              onClick={() => setShowErrorModal(false)}
              style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-secondary)', padding: '8px' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal selector de Producto */}
      {showProductPicker && (
        <div className="modal-overlay" onClick={() => setShowProductPicker(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Seleccionar producto</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {productos.map(p => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setSelectedClasId(p.clasificaciones[0]?.id || '');
                    setPrecioUnitario(p.clasificaciones[0]?.precio || 0);
                    setShowProductPicker(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>{p.nombre}</span>
                  <ChevronRight size={18} color="var(--color-text-secondary)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
