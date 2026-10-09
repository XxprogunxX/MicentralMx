export type TipoPago = 'Contado' | 'Crédito';
export type MetodoPago = 'Efectivo' | 'Transferencia' | 'Otro';
export type EstadoVenta = 'Completada' | 'Crédito pendiente' | 'Pendiente' | 'Cancelada';

export interface ClasificacionProducto {
  id: string;
  nombre: string; // ej. "Primera / Grande", "Segunda / Mediano", "Tercera / Chico"
  existencia: number;
  precio: number;
  avisoBajo?: boolean;
}

export interface Producto {
  id: string;
  nombre: string;
  unidad: 'caja' | 'kg' | 'pieza' | 'costal' | 'tara';
  avisoInventarioBajo: number;
  clasificaciones: ClasificacionProducto[];
}

export interface ItemVenta {
  productoId: string;
  productoNombre: string;
  clasificacionId: string;
  clasificacionNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  unidad: string;
}

export interface Venta {
  id: string;
  folio: string; // ej. "#000129"
  fecha: string;
  hora: string;
  clienteNombre: string;
  clienteId?: string;
  tipoPago: TipoPago;
  metodoPago: MetodoPago;
  items: ItemVenta[];
  total: number;
  pagado: number;
  saldo: number;
  estado: EstadoVenta;
  fechaVencimiento?: string;
  diasParaVencer?: number;
  sincronizada: boolean;
  registradoPor: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  negocio: string;
  saldoPendiente: number;
  estadoDeuda: 'Vencida' | 'Próxima' | 'Al corriente' | 'Sin saldo';
  ultimaCompra: string;
}

export interface OperacionSync {
  id: string;
  tipo: 'Venta' | 'Pago' | 'Merma';
  descripcion: string;
  monto?: number;
  estado: 'Enviada' | 'Enviando...' | 'Pendiente' | 'Error';
  timestamp: string;
}

export type NetworkMode = 'online' | 'offline' | 'syncing';

export const NetworkModes = {
  ONLINE: 'online' as NetworkMode,
  OFFLINE: 'offline' as NetworkMode,
  SYNCING: 'syncing' as NetworkMode,
};

