import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  ChevronRight, 
  X
} from 'lucide-react';
import type { Producto } from '../types';

interface InventarioListViewProps {
  productos: Producto[];
  onSelectProducto: (productoId: string) => void;
  onOpenAgregarProducto: () => void;
}

export const InventarioListView: React.FC<InventarioListViewProps> = ({
  productos,
  onSelectProducto,
  onOpenAgregarProducto
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'todos' | 'bajo' | 'sin'>('todos');

  const filteredProductos = productos.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === 'bajo') {
      return p.clasificaciones.some(c => c.avisoBajo || c.existencia <= p.avisoInventarioBajo);
    }
    if (activeTab === 'sin') {
      return p.clasificaciones.some(c => c.existencia === 0);
    }
    return true;
  });

  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Encabezado */}
      <div style={{ marginBottom: '14px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Inventario
        </h1>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          42 productos registrados
        </div>
      </div>

      {/* Buscador */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto"
          style={{ paddingLeft: '38px', paddingRight: searchTerm ? '36px' : '12px', height: '46px', fontSize: '15px' }}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Tabs superiores */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px' }}>
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'bajo', label: 'Inventario bajo', count: 3, icon: <AlertTriangle size={14} color="#734A0C" /> },
          { key: 'sin', label: 'Sin existencia' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              height: '38px',
              padding: '0 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: activeTab === tab.key ? '#E4F3EB' : 'var(--color-surface)',
              color: activeTab === tab.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              border: activeTab === tab.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{ 
                backgroundColor: activeTab === tab.key ? 'var(--color-primary)' : '#E2E8F0',
                color: activeTab === tab.key ? '#FFFFFF' : 'var(--color-text-primary)',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Encabezado de columnas */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '0 12px 8px', 
        fontSize: '12px', 
        fontWeight: 600, 
        color: 'var(--color-text-secondary)' 
      }}>
        <span>Clasificación</span>
        <div style={{ display: 'flex', gap: '48px', marginRight: '8px' }}>
          <span>Existencia</span>
          <span>Precio</span>
        </div>
      </div>

      {/* Lista de productos y clasificaciones agrupadas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProductos.map(producto => (
          <div 
            key={producto.id} 
            className="card" 
            style={{ padding: '0', overflow: 'hidden' }}
          >
            {/* Cabecera del producto (Click para ver detalle) */}
            <div 
              onClick={() => onSelectProducto(producto.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '12px 16px', 
                borderBottom: '1px solid var(--color-border-light)',
                cursor: 'pointer',
                backgroundColor: '#FAFAF8'
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {producto.nombre}
              </span>
              <ChevronRight size={18} color="var(--color-text-secondary)" />
            </div>

            {/* Renglones de Clasificaciones */}
            <div>
              {producto.clasificaciones.map((clas, idx) => (
                <div 
                  key={clas.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '12px 16px',
                    borderBottom: idx < producto.clasificaciones.length - 1 ? '1px solid var(--color-border-light)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)', flex: 1 }}>
                    {clas.nombre}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                    <div style={{ textAlign: 'right', minWidth: '70px' }}>
                      <div className="amount-text" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {clas.existencia} {producto.unidad}s
                      </div>
                      {clas.avisoBajo && (
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '3px', 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: '#734A0C', 
                          backgroundColor: '#FEF3C7', 
                          padding: '1px 5px', 
                          borderRadius: '4px',
                          marginTop: '2px'
                        }}>
                          <AlertTriangle size={10} />
                          <span>Bajo</span>
                        </div>
                      )}
                    </div>

                    <div className="amount-text" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', minWidth: '50px', textAlign: 'right' }}>
                      ${clas.precio}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAB Flotante + Agregar producto */}
      <button 
        className="fab-button"
        onClick={onOpenAgregarProducto}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Agregar producto</span>
      </button>
    </div>
  );
};
