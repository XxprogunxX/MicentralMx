import React, { useState } from 'react';
import { X, Plus, Trash2, Info } from 'lucide-react';
import type { Producto } from '../types';

interface EditarProductoModalProps {
  isOpen: boolean;
  producto: Producto | null;
  onClose: () => void;
  onSave: (updated: Producto) => void;
  onDelete: (productoId: string) => void;
}

export const EditarProductoModal: React.FC<EditarProductoModalProps> = ({
  isOpen,
  producto,
  onClose,
  onSave,
  onDelete
}) => {
  if (!isOpen || !producto) return null;

  const [nombre, setNombre] = useState(producto.nombre);
  const [unidad, setUnidad] = useState(producto.unidad);
  const [avisoBajo, setAvisoBajo] = useState(producto.avisoInventarioBajo);
  const [clasificaciones, setClasificaciones] = useState(producto.clasificaciones);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePriceChange = (id: string, newPrice: number) => {
    setClasificaciones(prev => prev.map(c => c.id === id ? { ...c, precio: newPrice } : c));
  };

  const handleNombreClasChange = (id: string, newName: string) => {
    setClasificaciones(prev => prev.map(c => c.id === id ? { ...c, nombre: newName } : c));
  };

  const handleAddClas = () => {
    setClasificaciones(prev => [
      ...prev,
      {
        id: `clas-${Date.now()}`,
        nombre: 'Nueva clasificación',
        existencia: 0,
        precio: 300
      }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...producto,
      nombre,
      unidad,
      avisoInventarioBajo: avisoBajo,
      clasificaciones
    });
    onClose();
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
          Editar producto
        </h2>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ padding: '16px', paddingBottom: '110px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Nombre del producto
          </label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ height: '48px', fontSize: '15px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Se vende por
            </label>
            <select 
              value={unidad} 
              onChange={(e) => setUnidad(e.target.value as any)}
              style={{ height: '48px', fontSize: '15px' }}
            >
              <option value="caja">Caja</option>
              <option value="kg">Kilo (kg)</option>
              <option value="pieza">Pieza</option>
              <option value="costal">Costal</option>
              <option value="tara">Tara</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Aviso inventario bajo
            </label>
            <input 
              type="number" 
              value={avisoBajo}
              onChange={(e) => setAvisoBajo(Number(e.target.value) || 0)}
              style={{ height: '48px', fontSize: '15px' }}
            />
          </div>
        </div>

        {/* Sección: CLASIFICACIONES */}
        <div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.6px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Clasificaciones
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Cada clasificación tiene su propia existencia y precio.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {clasificaciones.map((clas) => (
              <div 
                key={clas.id}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  backgroundColor: '#FAFAF9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Clasificación
                  </label>
                  {clasificaciones.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => setClasificaciones(prev => prev.filter(c => c.id !== clas.id))}
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <input 
                  type="text" 
                  value={clas.nombre}
                  onChange={(e) => handleNombreClasChange(clas.id, e.target.value)}
                  style={{ height: '44px', marginBottom: '12px', fontSize: '14px' }}
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      Existencia
                    </label>
                    <div style={{ 
                      height: '44px', 
                      backgroundColor: '#EBEFEA', 
                      borderRadius: 'var(--radius-sm)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '0 12px',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)'
                    }}>
                      {clas.existencia} {unidad}s
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      Precio por {unidad}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700 }}>$</span>
                      <input 
                        type="number" 
                        value={clas.precio}
                        onChange={(e) => handlePriceChange(clas.id, Number(e.target.value))}
                        style={{ height: '44px', paddingLeft: '24px', fontSize: '15px' }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button"
              onClick={handleAddClas}
              className="btn-outline"
              style={{ height: '44px', justifyContent: 'center', marginTop: '4px' }}
            >
              <Plus size={16} />
              <span>Agregar clasificación</span>
            </button>
          </div>
        </div>

        {/* Nota informativa sobre existencias */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '8px', 
          padding: '12px', 
          backgroundColor: '#F7F8F6', 
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.4'
        }}>
          <Info size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
          <span>La existencia se ajusta desde <strong>Compras</strong> o <strong>Mermas / Ajustes</strong> para conservar el historial inmutable.</span>
        </div>

        {/* Botón Eliminar Producto (Abre Modal Pág. 36) */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button 
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            style={{ color: 'var(--color-error)', fontSize: '15px', fontWeight: 600, gap: '6px' }}
          >
            <Trash2 size={16} />
            <span>Eliminar producto</span>
          </button>
        </div>

        {/* Botón Guardar cambios fijo */}
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
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
          zIndex: 30
        }}>
          <button 
            type="submit"
            className="btn-primary-action"
            style={{ height: '52px', justifyContent: 'center' }}
          >
            Guardar cambios
          </button>
        </div>
      </form>

      {/* Modal de confirmación de eliminación (Página 36 del PDF) */}
      {showDeleteConfirm && (
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
              <Trash2 size={28} color="var(--color-error)" strokeWidth={2.2} />
            </div>

            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              ¿Eliminar este producto?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: '1.45' }}>
              Se eliminará <strong>{producto.nombre}</strong> y sus {producto.clasificaciones.length} clasificaciones. Esta acción no se puede deshacer.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-outline"
                style={{ height: '48px', justifyContent: 'center' }}
              >
                Cancelar
              </button>

              <button 
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete(producto.id);
                  onClose();
                }}
                className="btn-danger btn-compact"
                style={{ height: '48px', justifyContent: 'center', gap: '6px' }}
              >
                <Trash2 size={16} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
