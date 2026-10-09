import type { Producto, Cliente, Venta, OperacionSync } from '../types';

export const INITIAL_PRODUCTOS: Producto[] = [
  {
    id: 'prod-1',
    nombre: 'Jitomate Saladette',
    unidad: 'caja',
    avisoInventarioBajo: 15,
    clasificaciones: [
      { id: 'clas-1-1', nombre: 'Primera / Grande', existencia: 80, precio: 420 },
      { id: 'clas-1-2', nombre: 'Segunda / Mediano', existencia: 35, precio: 340 },
      { id: 'clas-1-3', nombre: 'Tercera / Chico', existencia: 12, precio: 260, avisoBajo: true }
    ]
  },
  {
    id: 'prod-2',
    nombre: 'Aguacate Hass',
    unidad: 'caja',
    avisoInventarioBajo: 10,
    clasificaciones: [
      { id: 'clas-2-1', nombre: 'Primera / Grande', existencia: 24, precio: 650 },
      { id: 'clas-2-2', nombre: 'Segunda / Mediano', existencia: 6, precio: 480, avisoBajo: true }
    ]
  },
  {
    id: 'prod-3',
    nombre: 'Chile serrano',
    unidad: 'kg',
    avisoInventarioBajo: 20,
    clasificaciones: [
      { id: 'clas-3-1', nombre: 'Única', existencia: 140, precio: 38 }
    ]
  },
  {
    id: 'prod-4',
    nombre: 'Limón persa',
    unidad: 'caja',
    avisoInventarioBajo: 10,
    clasificaciones: [
      { id: 'clas-4-1', nombre: 'Primera / Grande', existencia: 45, precio: 580 },
      { id: 'clas-4-2', nombre: 'Segunda / Mediano', existencia: 18, precio: 500 }
    ]
  }
];

export const INITIAL_CLIENTES: Cliente[] = [
  {
    id: 'cli-1',
    nombre: 'Juan Pérez',
    telefono: '55 1234 5678',
    negocio: 'Puesto 112, Nave I',
    saldoPendiente: 2500,
    estadoDeuda: 'Vencida',
    ultimaCompra: 'Hoy'
  },
  {
    id: 'cli-2',
    nombre: 'Fonda El Comal',
    telefono: '55 9876 5432',
    negocio: 'Restaurante Comalito',
    saldoPendiente: 4100,
    estadoDeuda: 'Vencida',
    ultimaCompra: 'Hoy'
  },
  {
    id: 'cli-3',
    nombre: 'Abarrotes Doña Lupe',
    telefono: '55 4567 8901',
    negocio: 'Abarrotes La Guadalupana',
    saldoPendiente: 2600,
    estadoDeuda: 'Próxima',
    ultimaCompra: 'Hoy'
  },
  {
    id: 'cli-4',
    nombre: 'Frutería Los Arcos',
    telefono: '55 3322 1100',
    negocio: 'Frutería Los Arcos',
    saldoPendiente: 3200,
    estadoDeuda: 'Vencida',
    ultimaCompra: '29/09/2026'
  },
  {
    id: 'cli-5',
    nombre: 'Cocina Económica Rosy',
    telefono: '55 7788 9900',
    negocio: 'Cocina Rosy',
    saldoPendiente: 1850,
    estadoDeuda: 'Al corriente',
    ultimaCompra: '30/09/2026'
  },
  {
    id: 'cli-6',
    nombre: 'Mercado Sobre Ruedas Iztapalapa',
    telefono: '55 6655 4433',
    negocio: 'Comerciante Ambulante',
    saldoPendiente: 0,
    estadoDeuda: 'Sin saldo',
    ultimaCompra: '27/09/2026'
  }
];

export const INITIAL_VENTAS: Venta[] = [
  {
    id: 'v-000129',
    folio: '#000129',
    fecha: '01/10/2026',
    hora: '16:14',
    clienteNombre: 'Venta de mostrador',
    tipoPago: 'Contado',
    metodoPago: 'Efectivo',
    total: 1700,
    pagado: 1700,
    saldo: 0,
    estado: 'Completada',
    sincronizada: false,
    registradoPor: 'Ana H.',
    items: [
      {
        productoId: 'prod-1',
        productoNombre: 'Jitomate Saladette',
        clasificacionId: 'clas-1-2',
        clasificacionNombre: 'Segunda / Mediano',
        cantidad: 5,
        precioUnitario: 340,
        subtotal: 1700,
        unidad: 'cajas'
      }
    ]
  },
  {
    id: 'v-000128',
    folio: '#000128',
    fecha: '01/10/2026',
    hora: '16:05',
    clienteNombre: 'Venta de mostrador',
    tipoPago: 'Contado',
    metodoPago: 'Efectivo',
    total: 1180,
    pagado: 1180,
    saldo: 0,
    estado: 'Completada',
    sincronizada: true,
    registradoPor: 'Carlos M.',
    items: [
      {
        productoId: 'prod-1',
        productoNombre: 'Jitomate Saladette',
        clasificacionId: 'clas-1-1',
        clasificacionNombre: 'Primera / Grande',
        cantidad: 2,
        precioUnitario: 420,
        subtotal: 840,
        unidad: 'cajas'
      },
      {
        productoId: 'prod-3',
        productoNombre: 'Chile serrano',
        clasificacionId: 'clas-3-1',
        clasificacionNombre: 'Única',
        cantidad: 8.95,
        precioUnitario: 38,
        subtotal: 340,
        unidad: 'kg'
      }
    ]
  },
  {
    id: 'v-000127',
    folio: '#000127',
    fecha: '01/10/2026',
    hora: '15:48',
    clienteNombre: 'Abarrotes Doña Lupe',
    clienteId: 'cli-3',
    tipoPago: 'Crédito',
    metodoPago: 'Efectivo',
    total: 3600,
    pagado: 1000,
    saldo: 2600,
    estado: 'Crédito pendiente',
    fechaVencimiento: '06/10/2026',
    diasParaVencer: 5,
    sincronizada: true,
    registradoPor: 'Carlos M. · Trabajador',
    items: [
      {
        productoId: 'prod-2',
        productoNombre: 'Aguacate Hass',
        clasificacionId: 'clas-2-1',
        clasificacionNombre: 'Primera / Grande',
        cantidad: 4,
        precioUnitario: 650,
        subtotal: 2600,
        unidad: 'cajas'
      },
      {
        productoId: 'prod-4',
        productoNombre: 'Limón persa',
        clasificacionId: 'clas-4-2',
        clasificacionNombre: 'Segunda / Mediano',
        cantidad: 2,
        precioUnitario: 500,
        subtotal: 1000,
        unidad: 'cajas'
      }
    ]
  },
  {
    id: 'v-000126',
    folio: '#000126',
    fecha: '01/10/2026',
    hora: '15:30',
    clienteNombre: 'Juan Pérez',
    clienteId: 'cli-1',
    tipoPago: 'Contado',
    metodoPago: 'Transferencia',
    total: 2450,
    pagado: 2450,
    saldo: 0,
    estado: 'Completada',
    sincronizada: true,
    registradoPor: 'Ana H.',
    items: [
      {
        productoId: 'prod-1',
        productoNombre: 'Jitomate Saladette',
        clasificacionId: 'clas-1-2',
        clasificacionNombre: 'Segunda / Mediano',
        cantidad: 5,
        precioUnitario: 340,
        subtotal: 1700,
        unidad: 'cajas'
      },
      {
        productoId: 'prod-3',
        productoNombre: 'Chile serrano',
        clasificacionId: 'clas-3-1',
        clasificacionNombre: 'Única',
        cantidad: 19.7,
        precioUnitario: 38,
        subtotal: 750,
        unidad: 'kg'
      }
    ]
  }
];

export const INITIAL_SYNC_QUEUE: OperacionSync[] = [
  {
    id: 'op-1',
    tipo: 'Venta',
    descripcion: 'Venta #000129 · $1,700',
    monto: 1700,
    estado: 'Enviada',
    timestamp: '16:14'
  },
  {
    id: 'op-2',
    tipo: 'Pago',
    descripcion: 'Pago de Juan Pérez · $1,500',
    monto: 1500,
    estado: 'Enviado' as any,
    timestamp: '16:18'
  },
  {
    id: 'op-3',
    tipo: 'Merma',
    descripcion: 'Merma · Jitomate Segunda, 3 cajas',
    estado: 'Enviando...',
    timestamp: '16:19'
  }
];
