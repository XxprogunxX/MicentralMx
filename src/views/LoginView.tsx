import React, { useState } from 'react';
import { Eye, EyeOff, Wifi } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('55 1234 5678');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: '32px 20px 24px',
      backgroundColor: 'var(--color-surface)'
    }}>
      {/* Parte superior con branding */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div className="brand-icon" style={{ width: '36px', height: '36px', borderRadius: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>
            MiCentral<span style={{ color: 'var(--color-accent)' }}>MX</span>
          </span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Inicia sesión
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: '1.45', marginBottom: '32px' }}>
          Entra para registrar ventas, inventario y cobros de tu negocio.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Usuario o teléfono
            </label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ej. 55 1234 5678"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                style={{ paddingRight: '44px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-secondary)',
                  width: '32px',
                  height: '32px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary-action" 
            disabled={isLoading}
            style={{ marginTop: '12px', height: '52px', fontSize: '17px' }}
          >
            {isLoading ? 'Iniciando sesión…' : 'Entrar'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <a 
              href="#olvido" 
              onClick={(e) => { e.preventDefault(); alert('Se enviará un código de verificación por SMS o WhatsApp a tu teléfono registrado.'); }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>

      {/* Pill de conexión en el pie */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          backgroundColor: '#EBEFEA',
          borderRadius: 'var(--radius-full)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--color-text-secondary)'
        }}>
          <Wifi size={14} />
          <span>Conectado</span>
        </div>
      </div>
    </div>
  );
};
