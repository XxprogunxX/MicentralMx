import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Producto, ClasificacionProducto } from '../types';

interface AgregarProductoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProducto: (producto: Producto) => void;
}

export const AgregarProductoModal: React.FC<AgregarProductoModalProps> = ({
  isOpen,
  onClose,
  onSaveProducto
}) => {
  const [nombre, setNombre] = useState('');
  const [unidad, setUnidad] = useState<'caja' | 'kg' | 'pieza' | 'costal' | 'tara'>('caja');
  const [avisoBajo, setAvisoBajo] = useState<number>(15);
  const [clasificaciones, setClasificaciones] = useState<Array<{ nombre: string; existencia: number; precio: number }>>([
    { nombre: 'Primera / Grande', existencia: 50, precio: 400 },
    { nombre: 'Segunda / Mediano', existencia: 20, precio: 320 }
  ]);

  if (!isOpen) return null;

  const handleAddClasificacion = () => {
    setClasificaciones([
      ...clasificaciones,
      { nombre: '', existencia: 0, precio: 0 }
    ]);
  };

  const handleRemoveClasificacion = (index: number) => {
    if (clasificaciones.length <= 1) return;
    setClasificaciones(clasificaciones.filter((_, i) => i !== index));
  };

  const handleClasChange = (index: number, field: string, value: any) => {
    const updated = [...clasificaciones];
    updated[index] = { ...updated[index], [field]: value };
    setClasificaciones(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const newProd: Producto = {
      id: `prod-${Date.now()}`,
      nombre: nombre.trim(),
      unidad,
      avisoInventarioBajo: avisoBajo || 10,
      clasificaciones: clasificaciones.map((c, i) => ({
        id: `clas-${Date.now()}-${i}`,
        nombre: c.nombre || `Clasificación ${i + 1}`,
        existencia: Number(c.existencia) || 0,
        precio: Number(c.precio) || 0,
        avisoBajo: (Number(c.existencia) || 0) <= (avisoBajo || 10)
      })) as ClasificacionProducto[]
    };

    onSaveProducto(newProd);
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
          Agregar producto
        </h2>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ padding: '16px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Nombre del producto
          </label>
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Jitomate Saladette"
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
              placeholder="Ej. 15"
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
            {clasificaciones.map((clas, idx) => (
              <div 
                key={idx}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  backgroundColor: '#FAFAF9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Nombre de la clasificación
                  </label>
                  {clasificaciones.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveClasificacion(idx)}
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <input 
                  type="text" 
                  value={clas.nombre}
                  onChange={(e) => handleClasChange(idx, 'nombre', e.target.value)}
                  placeholder="Ej. Primera / Grande"
                  style={{ height: '44px', marginBottom: '10px', fontSize: '14px' }}
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      Existencia inicial
                    </label>
                    <input 
                      type="number" 
                      value={clas.existencia}
                      onChange={(e) => handleClasChange(idx, 'existencia', Number(e.target.value))}
                      style={{ height: '44px', fontSize: '15px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                      Precio
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700 }}>$</span>
                      <input 
                        type="number" 
                        value={clas.precio}
                        onChange={(e) => handleClasChange(idx, 'precio', Number(e.target.value))}
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
              onClick={handleAddClasificacion}
              className="btn-outline"
              style={{ height: '44px', justifyContent: 'center', marginTop: '4px' }}
            >
              <Plus size={16} />
              <span>Agregar clasificación</span>
            </button>
          </div>
        </div>

        {/* Botón Guardar fijo al pie */}
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
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
};
