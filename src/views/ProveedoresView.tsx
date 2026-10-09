import React, { useState } from 'react';
import { ArrowLeft, Search, Truck, Plus, X } from 'lucide-react';

interface ProveedoresViewProps {
  onBack: () => void;
  onSelectProveedor?: (nombre: string) => void;
}

export const ProveedoresView: React.FC<ProveedoresViewProps> = ({ onBack, onSelectProveedor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proveedores, setProveedores] = useState([
    { id: 'prov-1', nombre: 'Agrícola San Juan', productos: 'Jitomate, chile serrano', ultimaCompra: 'Hoy' },
    { id: 'prov-2', nombre: 'Huertas de Michoacán', productos: 'Aguacate Hass', ultimaCompra: '29/09/2026' },
    { id: 'prov-3', nombre: 'Cítricos del Golfo', productos: 'Limón persa', ultimaCompra: '28/09/2026' },
    { id: 'prov-4', nombre: 'Productores Unidos de Puebla', productos: 'Cebolla, papa', ultimaCompra: '24/09/2026' }
  ]);

  const filtered = proveedores.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.productos.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Proveedores
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Buscador */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar proveedor"
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

        {/* Lista de Proveedores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(p => (
            <div 
              key={p.id}
              className="card"
              onClick={() => onSelectProveedor && onSelectProveedor(p.nombre)}
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
                  <Truck size={18} color="var(--color-info)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {p.nombre}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {p.productos}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Última compra</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {p.ultimaCompra}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB Agregar Proveedor */}
      <button 
        className="fab-button"
        onClick={() => {
          const nombre = prompt('Nombre del nuevo proveedor:');
          if (nombre) {
            setProveedores(prev => [{ id: `prov-${Date.now()}`, nombre, productos: 'Verduras y frutas varias', ultimaCompra: 'Hoy' }, ...prev]);
          }
        }}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Agregar proveedor</span>
      </button>
    </div>
  );
};
