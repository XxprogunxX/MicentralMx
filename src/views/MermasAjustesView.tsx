import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Package, 
  RefreshCw, 
  Check 
} from 'lucide-react';
import type { Producto } from '../types';

interface MermasAjustesViewProps {
  productos: Producto[];
  onBack: () => void;
  onRegistrarMerma: (data: {
    productoId: string;
    clasificacionId: string;
    cantidad: number;
    motivo: string;
    tipo: 'Merma' | 'Ajuste';
  }) => void;
}

export const MermasAjustesView: React.FC<MermasAjustesViewProps> = ({
  productos,
  onBack,
  onRegistrarMerma
}) => {
  const [tipo, setTipo] = useState<'Merma' | 'Ajuste'>('Merma');
  const [selectedProdId, setSelectedProdId] = useState<string>(productos[0]?.id || '');
  const [selectedClasId, setSelectedClasId] = useState<string>(productos[0]?.clasificaciones[1]?.id || '');
  const [cantidad, setCantidad] = useState<number>(3);
  const [motivo, setMotivo] = useState<string>('Producto dañado');

  const selectedProd = productos.find(p => p.id === selectedProdId) || productos[0];
  const selectedClas = selectedProd?.clasificaciones.find(c => c.id === selectedClasId) || selectedProd?.clasificaciones[0];
  
  const currentStock = selectedClas?.existencia || 0;
  const newStock = tipo === 'Merma' ? Math.max(0, currentStock - cantidad) : currentStock + cantidad;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegistrarMerma({
      productoId: selectedProd.id,
      clasificacionId: selectedClas.id,
      cantidad,
      motivo,
      tipo
    });
  };

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
          Mermas / Ajustes
        </h1>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Selector de Tipo: Merma vs Ajuste */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setTipo('Merma')}
            style={{
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              border: tipo === 'Merma' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: tipo === 'Merma' ? '#E4F3EB' : '#FFFFFF',
              color: tipo === 'Merma' ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              fontSize: '15px',
              fontWeight: 700,
              gap: '8px'
            }}
          >
            <Package size={18} />
            <span>Merma</span>
          </button>

          <button
            type="button"
            onClick={() => setTipo('Ajuste')}
            style={{
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              border: tipo === 'Ajuste' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: tipo === 'Ajuste' ? '#E4F3EB' : '#FFFFFF',
              color: tipo === 'Ajuste' ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              fontSize: '15px',
              fontWeight: 700,
              gap: '8px'
            }}
          >
            <RefreshCw size={17} />
            <span>Ajuste</span>
          </button>
        </div>

        {/* Producto */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Producto
          </label>
          <select 
            value={selectedProdId} 
            onChange={(e) => {
              setSelectedProdId(e.target.value);
              const p = productos.find(x => x.id === e.target.value);
              if (p && p.clasificaciones[0]) {
                setSelectedClasId(p.clasificaciones[0].id);
              }
            }}
            style={{ height: '48px', fontSize: '15px' }}
          >
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        {/* Clasificación */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Clasificación
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {selectedProd?.clasificaciones.map(clas => {
              const isSelected = selectedClasId === clas.id;
              return (
                <button
                  type="button"
                  key={clas.id}
                  onClick={() => setSelectedClasId(clas.id)}
                  style={{
                    height: '42px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 600,
                    backgroundColor: isSelected ? '#E4F3EB' : '#FFFFFF',
                    color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                >
                  {clas.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cantidad y Motivo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Cantidad ({selectedProd?.unidad}s)
            </label>
            <input 
              type="number" 
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 0))}
              style={{ height: '48px', fontSize: '16px', fontWeight: 700 }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Motivo
            </label>
            <select 
              value={motivo} 
              onChange={(e) => setMotivo(e.target.value)}
              style={{ height: '48px', fontSize: '14px' }}
            >
              <option value="Producto dañado">Producto dañado</option>
              <option value="Maduración excesiva">Maduración excesiva</option>
              <option value="Producto en mal estado">Producto en mal estado</option>
              <option value="Conteo físico">Conteo físico</option>
              <option value="Ajuste de inventario">Ajuste de inventario</option>
            </select>
          </div>
        </div>

        {/* Recuadro de Previsualización de Existencias (Pág. 20) */}
        <div style={{
          backgroundColor: '#FEF3C7',
          border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#734A0C' }}>
              Existencia de {selectedClas?.nombre}
            </div>
          </div>
          <div className="amount-text" style={{ fontSize: '18px', fontWeight: 800, color: '#734A0C' }}>
            {currentStock} → {newStock} {selectedProd?.unidad}s
          </div>
        </div>

        {/* Sección: REGISTRADAS RECIENTEMENTE */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: 700, 
              letterSpacing: '0.6px', 
              color: 'var(--color-text-secondary)', 
              textTransform: 'uppercase' 
            }}>
              Registradas recientemente
            </div>
            <button type="button" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>
              Ver todas
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={18} color="#B7791F" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Aguacate Hass · Segunda
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    Ayer · Maduración excesiva
                  </div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-error)' }}>
                −2
              </div>
            </div>

            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E4F3EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RefreshCw size={18} color="var(--color-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Ajuste · Limón persa Primera
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    28/09/2026 · Conteo físico
                  </div>
                </div>
              </div>
              <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-success)' }}>
                +4
              </div>
            </div>
          </div>
        </div>

        {/* Botón Registrar Merma / Ajuste fijo al pie */}
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
            style={{ height: '52px', justifyContent: 'center', gap: '8px' }}
          >
            <Check size={18} strokeWidth={2.5} />
            <span>Registrar {tipo.toLowerCase()} de {cantidad} {selectedProd?.unidad}s</span>
          </button>
        </div>
      </form>
    </div>
  );
};
