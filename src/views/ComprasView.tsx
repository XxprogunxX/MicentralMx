import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  CheckCircle2, 
  X, 
  Check, 
  Minus 
} from 'lucide-react';
import type { Producto } from '../types';

interface CompraItem {
  id: string;
  folio: string;
  hora: string;
  proveedor: string;
  monto: number;
  descripcion: string;
  estado: string;
}

interface ComprasViewProps {
  productos: Producto[];
  onBack: () => void;
  onConfirmNuevaCompra: (compra: {
    proveedor: string;
    productoId: string;
    clasificacionId: string;
    cantidad: number;
    costoUnitario: number;
    total: number;
  }) => void;
}

export const ComprasView: React.FC<ComprasViewProps> = ({
  productos,
  onBack,
  onConfirmNuevaCompra
}) => {
  const [isNuevaCompraOpen, setIsNuevaCompraOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [compras, setCompras] = useState<CompraItem[]>([
    {
      id: 'c-0045',
      folio: 'Compra #C-0045',
      hora: '06:20',
      proveedor: 'Agrícola San Juan',
      monto: 18000,
      descripcion: '60 cajas · Jitomate Saladette Primera / Grande',
      estado: 'Registrada'
    },
    {
      id: 'c-0044',
      folio: 'Compra #C-0044',
      hora: '05:45',
      proveedor: 'Cítricos del Golfo',
      monto: 4200,
      descripcion: '12 cajas · Limón persa Segunda / Mediano',
      estado: 'Registrada'
    },
    {
      id: 'c-0043',
      folio: 'Compra #C-0043',
      hora: '05:10',
      proveedor: 'Agrícola San Juan',
      monto: 2300,
      descripcion: '50 kg · Chile serrano Única',
      estado: 'Registrada'
    }
  ]);

  // Formulario Nueva Compra
  const [selectedProveedor, setSelectedProveedor] = useState('Agrícola San Juan');
  const [selectedProdId, setSelectedProdId] = useState(productos[0]?.id || '');
  const [selectedClasId, setSelectedClasId] = useState(productos[0]?.clasificaciones[0]?.id || '');
  const [cantidad, setCantidad] = useState(60);
  const [costoUnitario, setCostoUnitario] = useState(300);

  const selectedProd = productos.find(p => p.id === selectedProdId) || productos[0];
  const selectedClas = selectedProd?.clasificaciones.find(c => c.id === selectedClasId) || selectedProd?.clasificaciones[0];
  const currentStock = selectedClas?.existencia || 80;
  const newStock = currentStock + cantidad;
  const totalCompra = cantidad * costoUnitario;

  const handleSaveCompra = (e: React.FormEvent) => {
    e.preventDefault();
    const newFolio = `Compra #C-00${Math.floor(46 + Math.random() * 20)}`;
    const newCompra: CompraItem = {
      id: `c-${Date.now()}`,
      folio: newFolio,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      proveedor: selectedProveedor,
      monto: totalCompra,
      descripcion: `${cantidad} ${selectedProd?.unidad}s · ${selectedProd?.nombre} ${selectedClas?.nombre}`,
      estado: 'Registrada'
    };

    setCompras([newCompra, ...compras]);
    onConfirmNuevaCompra({
      proveedor: selectedProveedor,
      productoId: selectedProd.id,
      clasificacionId: selectedClas.id,
      cantidad,
      costoUnitario,
      total: totalCompra
    });
    setIsNuevaCompraOpen(false);
  };

  const filteredCompras = compras.filter(c => 
    c.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
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
          Compras
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Métrica de compras de hoy (Pág. 24) */}
        <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Compras de hoy
              </div>
              <div className="amount-text" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                $24,500
              </div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {compras.length} compras
            </div>
          </div>
        </div>

        {/* Buscador y filtro */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar compra o prove"
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

          <button className="btn-outline" style={{ height: '46px', padding: '0 14px' }}>
            <SlidersHorizontal size={18} />
            <span>Filtrar</span>
          </button>
        </div>

        {/* Lista de compras */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredCompras.map(compra => (
            <div key={compra.id} className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {compra.folio} · {compra.hora}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                    {compra.proveedor}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {compra.descripcion}
                  </div>
                </div>

                <div className="amount-text" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  ${compra.monto.toLocaleString()}
                </div>
              </div>

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border-light)' }}>
                <div className="status-badge success" style={{ padding: '3px 8px', fontSize: '12px' }}>
                  <CheckCircle2 size={13} />
                  <span>{compra.estado}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB Nueva Compra */}
      <button 
        className="fab-button"
        onClick={() => setIsNuevaCompraOpen(true)}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span>Nueva compra</span>
      </button>

      {/* PANTALLA/MODAL NUEVA COMPRA (PÁGINA 25) */}
      {isNuevaCompraOpen && (
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
          {/* Header */}
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
              onClick={() => setIsNuevaCompraOpen(false)}
              style={{ width: '40px', height: '40px', borderRadius: '50%', color: 'var(--color-text-primary)' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', marginLeft: '8px' }}>
              Nueva compra
            </h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSaveCompra} style={{ padding: '16px', paddingBottom: '120px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 1 PROVEEDOR */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Proveedor</span>
              </div>
              <select 
                value={selectedProveedor}
                onChange={(e) => setSelectedProveedor(e.target.value)}
                style={{ height: '48px', fontSize: '15px' }}
              >
                <option value="Agrícola San Juan">Agrícola San Juan</option>
                <option value="Huertas de Michoacán">Huertas de Michoacán</option>
                <option value="Cítricos del Golfo">Cítricos del Golfo</option>
                <option value="Productores Unidos de Puebla">Productores Unidos de Puebla</option>
              </select>
            </div>

            {/* 2 PRODUCTO */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Producto</span>
              </div>
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

            {/* 3 CLASIFICACIÓN */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Clasificación</span>
              </div>
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

            {/* 4 CANTIDAD Y 5 PRECIO POR CAJA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Cantidad ({selectedProd?.unidad}s)</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '52px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0 8px'
                }}>
                  <button type="button" onClick={() => setCantidad(Math.max(1, cantidad - 5))} style={{ width: '38px', height: '38px', borderRadius: '6px', backgroundColor: 'var(--color-bg)' }}>
                    <Minus size={18} />
                  </button>
                  <span className="tabular-numbers" style={{ fontSize: '20px', fontWeight: 700 }}>
                    {cantidad}
                  </span>
                  <button type="button" onClick={() => setCantidad(cantidad + 5)} style={{ width: '38px', height: '38px', borderRadius: '6px', backgroundColor: 'var(--color-bg)' }}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Precio por {selectedProd?.unidad}</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 700 }}>$</span>
                  <input 
                    type="number"
                    value={costoUnitario}
                    onChange={(e) => setCostoUnitario(Number(e.target.value) || 0)}
                    style={{ height: '52px', paddingLeft: '28px', fontSize: '18px', fontWeight: 700 }}
                  />
                </div>
              </div>
            </div>

            {/* Recuadro informativo: Incremento de existencias (Pág. 25) */}
            <div style={{
              padding: '14px 16px',
              backgroundColor: '#F0F8F4',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #CDE6DB',
              fontSize: '14px',
              color: 'var(--color-primary-dark)',
              fontWeight: 500,
              lineHeight: '1.4'
            }}>
              La existencia de <strong>{selectedClas?.nombre}</strong> pasará de <strong>{currentStock}</strong> a <strong>{newStock} {selectedProd?.unidad}s</strong>.
            </div>

            {/* Agregar otro producto */}
            <button 
              type="button"
              onClick={() => alert('Multi-producto: Puedes agregar otro renglón a la factura de compra.')}
              style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-primary)', alignSelf: 'flex-start', gap: '6px' }}
            >
              <Plus size={18} />
              <span>Agregar otro producto</span>
            </button>

            {/* Sticky footer con Total y Confirmar compra */}
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
                  Total · {cantidad} {selectedProd?.unidad}s
                </div>
                <div className="amount-text" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  ${totalCompra.toLocaleString()}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-action"
                style={{ height: '52px', width: 'auto', padding: '0 24px', gap: '8px' }}
              >
                <Check size={18} strokeWidth={2.5} />
                <span>Confirmar compra</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
