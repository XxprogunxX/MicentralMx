import React from 'react';
import { Home, Boxes, ShoppingCart, Users, MoreHorizontal } from 'lucide-react';

export type TabKey = 'inicio' | 'inventario' | 'ventas' | 'clientes' | 'mas';

interface BottomNavBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bottom-nav">
      <button 
        className={`bottom-nav-item ${activeTab === 'inicio' ? 'active' : ''}`}
        onClick={() => onTabChange('inicio')}
      >
        <Home size={22} strokeWidth={activeTab === 'inicio' ? 2.4 : 1.8} />
        <span>Inicio</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === 'inventario' ? 'active' : ''}`}
        onClick={() => onTabChange('inventario')}
      >
        <Boxes size={22} strokeWidth={activeTab === 'inventario' ? 2.4 : 1.8} />
        <span>Inventario</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === 'ventas' ? 'active' : ''}`}
        onClick={() => onTabChange('ventas')}
      >
        <ShoppingCart size={22} strokeWidth={activeTab === 'ventas' ? 2.4 : 1.8} />
        <span>Ventas</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === 'clientes' ? 'active' : ''}`}
        onClick={() => onTabChange('clientes')}
      >
        <Users size={22} strokeWidth={activeTab === 'clientes' ? 2.4 : 1.8} />
        <span>Clientes</span>
      </button>

      <button 
        className={`bottom-nav-item ${activeTab === 'mas' ? 'active' : ''}`}
        onClick={() => onTabChange('mas')}
      >
        <MoreHorizontal size={22} strokeWidth={activeTab === 'mas' ? 2.4 : 1.8} />
        <span>Más</span>
      </button>
    </nav>
  );
};
