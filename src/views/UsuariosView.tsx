import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  UserPlus 
} from 'lucide-react';

interface UsuariosViewProps {
  onBack: () => void;
}

export const UsuariosView: React.FC<UsuariosViewProps> = ({ onBack }) => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 'u-1',
      iniciales: 'RH',
      nombre: 'Rodolfo Hernández',
      subtexto: 'Dueño',
      rol: 'Superadmin',
      rolColor: '#B7791F'
    },
    {
      id: 'u-2',
      iniciales: 'AH',
      nombre: 'Ana Hernández',
      subtexto: 'Activa ahora',
      rol: 'Administrador',
      rolColor: 'var(--color-info)'
    },
    {
      id: 'u-3',
      iniciales: 'CM',
      nombre: 'Carlos Mendoza',
      subtexto: 'Activo hace 10 min',
      rol: 'Trabajador',
      rolColor: 'var(--color-text-secondary)'
    },
    {
      id: 'u-4',
      iniciales: 'LG',
      nombre: 'Luis García',
      subtexto: 'Activo ayer',
      rol: 'Trabajador',
      rolColor: 'var(--color-text-secondary)'
    }
  ]);

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
          Usuarios
        </h1>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Lista de usuarios */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {usuarios.map(u => (
            <div 
              key={u.id}
              className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                  {u.iniciales}
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {u.nombre}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {u.subtexto}
                  </div>
                </div>
              </div>

              {/* Badge del Rol */}
              <div style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${u.rolColor}`,
                color: u.rolColor,
                fontSize: '12px',
                fontWeight: 700
              }}>
                {u.rol}
              </div>
            </div>
          ))}
        </div>

        {/* Tarjeta: Qué puede hacer un Trabajador (Pág. 28) */}
        <div className="card" style={{ padding: '18px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Qué puede hacer un Trabajador
            </h3>
            <button 
              onClick={() => alert('Editor de matriz de permisos por rol')}
              style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)' }}
            >
              Editar
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Permisos Permitidos */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <CheckCircle2 size={18} color="var(--color-success)" strokeWidth={2.4} />
              <span>Registrar ventas</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <CheckCircle2 size={18} color="var(--color-success)" strokeWidth={2.4} />
              <span>Registrar pagos de clientes</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <CheckCircle2 size={18} color="var(--color-success)" strokeWidth={2.4} />
              <span>Consultar inventario</span>
            </div>

            {/* Permisos Denegados */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              <XCircle size={18} color="var(--color-text-muted)" />
              <span>Cambiar precios</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              <XCircle size={18} color="var(--color-text-muted)" />
              <span>Ver reportes</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              <XCircle size={18} color="var(--color-text-muted)" />
              <span>Administrar usuarios</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAB Agregar Usuario */}
      <button 
        className="fab-button"
        onClick={() => {
          const nombre = prompt('Nombre completo del nuevo usuario:');
          if (nombre) {
            const initials = nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
            setUsuarios(prev => [...prev, {
              id: `u-${Date.now()}`,
              iniciales: initials || 'US',
              nombre,
              subtexto: 'Creado hoy',
              rol: 'Trabajador',
              rolColor: 'var(--color-text-secondary)'
            }]);
          }
        }}
      >
        <UserPlus size={20} strokeWidth={2.4} />
        <span>Agregar usuario</span>
      </button>
    </div>
  );
};
