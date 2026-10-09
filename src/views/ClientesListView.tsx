import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import type { Cliente } from '../types';

interface ClientesListViewProps {
  clientes: Cliente[];
  onSelectCliente: (clienteId: string) => void;
  onOpenAgregarCliente: () => void;
}

export const ClientesListView: React.FC<ClientesListViewProps> = ({
  clientes,
  onSelectCliente,
  onOpenAgregarCliente
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState<'todos' | 'con_saldo' | 'vencida'>('todos');

  const filteredClientes = clientes.filter(c => {
    const matchesSearch = 
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono.includes(searchTerm) ||
      c.negocio.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeChip === 'con_saldo') return c.saldoPendiente > 0;
    if (activeChip === 'vencida') return c.estadoDeuda === 'Vencida';
    return true;
  });

  return (
    <div style={{ padding: '16px', paddingBottom: '90px' }}>
      {/* Encabezado */}
      <div style={{ marginBottom: '14px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Clientes
        </h1>
        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          38 clientes registrados
        </div>
      </div>

      {/* Buscador */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <Search size={18} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar cliente o teléfono"
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

      {/* Chips de filtro */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px' }}>
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'con_saldo', label: 'Con saldo', count: 16 },
          { key: 'vencida', label: 'Con deuda vencida', icon: <AlertTriangle size={13} color="var(--color-error)" /> }
        ].map(chip => (
          <button
            key={chip.key}
            onClick={() => setActiveChip(chip.key as any)}
            style={{
              height: '38px',
              padding: '0 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: activeChip === chip.key ? '#E4F3EB' : 'var(--color-surface)',
              color: activeChip === chip.key ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
              border: activeChip === chip.key ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {chip.icon}
            <span>{chip.label}</span>
            {chip.count !== undefined && (
              <span style={{ 
                backgroundColor: activeChip === chip.key ? 'var(--color-primary)' : '#E2E8F0',
                color: activeChip === chip.key ? '#FFFFFF' : 'var(--color-text-primary)',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {chip.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lista de clientes (Página 21) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredClientes.map(cliente => {
          // Extraer iniciales para el avatar
          const initials = cliente.nombre
            .split(' ')
            .map(w => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

          return (
            <div 
              key={cliente.id}
              className="card"
              onClick={() => onSelectCliente(cliente.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Avatar con iniciales */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#EBEFEA',
                  color: 'var(--color-text-primary)',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {initials}
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {cliente.nombre}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    Última compra: {cliente.ultimaCompra}
                  </div>
                </div>
              </div>

              {/* Saldo y Badge de Estado */}
              <div style={{ textAlign: 'right' }}>
                {cliente.saldoPendiente > 0 ? (
                  <>
                    <div className="amount-text" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      ${cliente.saldoPendiente.toLocaleString()}
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      {cliente.estadoDeuda === 'Vencida' && (
                        <div className="status-badge error-solid" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          <AlertTriangle size={11} />
                          <span>Vencida</span>
                        </div>
                      )}
                      {cliente.estadoDeuda === 'Próxima' && (
                        <div className="status-badge warning" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          <Clock size={11} />
                          <span>Próxima</span>
                        </div>
                      )}
                      {cliente.estadoDeuda === 'Al corriente' && (
                        <div className="status-badge success" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          <CheckCircle2 size={11} />
                          <span>Al corriente</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    Sin saldo
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB Flotante + Agregar cliente */}
      <button 
        className="fab-button"
        onClick={onOpenAgregarCliente}
      >
        <UserPlus size={20} strokeWidth={2.4} />
        <span>Agregar cliente</span>
      </button>
    </div>
  );
};
