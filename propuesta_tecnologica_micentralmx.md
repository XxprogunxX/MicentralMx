# Lenguajes y tecnologías para la PWA MiCentralMX

**Propuesta para el proyecto integrador — versión revisada | 8 de octubre de 2026**

Proponemos utilizar **TypeScript** como lenguaje principal, junto con **HTML**, **CSS** y **SQL**. El equipo conoce JavaScript y TypeScript, por lo que esta elección permite concentrar el aprendizaje en las reglas del negocio y en la sincronización offline. Esta versión incorpora las librerías concretas, las reglas de sincronización ya definidas y la estructura del proyecto, para que el equipo pueda iniciar la implementación sin decisiones pendientes de fondo.

---

## 1. Necesidades que guían la elección

El MVP requiere productos y clasificaciones, inventario, compras, ventas de contado o crédito, pagos, mermas, ajustes y usuarios con permisos. Cada negocio debe conservar sus datos completamente separados. Determinadas operaciones deben guardarse en el dispositivo sin Internet y sincronizarse posteriormente **una sola vez**. La PWA debe adaptarse a computadoras y teléfonos, incluyendo iPhone, donde las capacidades en segundo plano son limitadas [1].

---

## 2. Lenguajes propuestos

| Lenguaje | Uso en MiCentralMX | Razón de la propuesta |
|---|---|---|
| **TypeScript** | Interfaz, lógica del cliente, API, sincronización y tipos compartidos. | Define tipos para ventas, productos y pagos y detecta errores durante el desarrollo [2]. |
| **JavaScript** | Ejecución en navegador y Node.js. | TypeScript se compila a JavaScript. |
| **HTML** | Estructura semántica de formularios y pantallas. | Interfaz accesible y compatible con lectores de pantalla. |
| **CSS** | Diseño adaptable a teléfono y computadora. | Formularios, tablas y botones grandes, cómodos para uso en bodega. |
| **SQL** | Consultas, relaciones, transacciones y políticas de seguridad en PostgreSQL. | Relaciona ventas, pagos, productos y movimientos de cada negocio. |

> React y Express son herramientas de desarrollo; Node.js es un entorno de ejecución; PostgreSQL es un motor de base de datos; IndexedDB es una API de almacenamiento del navegador. Se complementan con los lenguajes anteriores.

---

## 3. Stack recomendado para el MVP

Una PWA con React y Vite, una API REST con Node.js y Express, PostgreSQL en el servidor e IndexedDB en el dispositivo. Mantener una API separada organiza responsabilidades y permite reutilizarla si más adelante existe una aplicación móvil nativa.

### 3.1 Frameworks utilizados

| Capa | Framework | Función |
|---|---|---|
| **Frontend (PWA)** | **React** + **Vite** | React construye la interfaz mediante componentes (pantallas, formularios, tablas). Vite es la herramienta de desarrollo y compilación: levanta el servidor local, transforma TypeScript y genera la versión de producción [3][18]. |
| **Backend (API)** | **Express** sobre **Node.js** | Framework para crear la API REST: rutas, *middlewares* de autenticación y permisos, validación y reglas del negocio [4]. |

> **Nota:** React es formalmente una *librería* de interfaz, no un framework completo. Por ello se complementa con **React Router** (navegación entre pantallas) y **TanStack Query** (obtención y caché de datos de la API), que en conjunto cumplen la función de un framework de frontend.

**Enunciado para la presentación:** *El frontend se desarrolla con React y Vite como PWA, y el backend con Express sobre Node.js, ambos en TypeScript.*

### 3.2 Componentes principales

| Componente | Selección | Responsabilidad |
|---|---|---|
| Interfaz | React + TypeScript + Vite | Pantallas, formularios, navegación y validación inicial [3]. |
| Servidor | Node.js LTS + Express 5 + TypeScript | Reglas del negocio, permisos y endpoints de la API [4]. |
| Datos centrales | PostgreSQL 16+ | Información confirmada de todos los negocios, con Row Level Security. |
| Datos locales | IndexedDB mediante **Dexie.js** | Catálogos descargados y cola de operaciones pendientes [6][10]. |
| Capacidades PWA | **vite-plugin-pwa** (Workbox) | Manifest, service worker, precache y carga offline de la app [11]. |
| Entrega | GitHub + Docker Compose + HTTPS | Colaboración, despliegue reproducible y conexión cifrada (requerida por el service worker). |

### 3.3 Librerías de apoyo

| Necesidad | Librería | Motivo |
|---|---|---|
| Navegación entre pantallas | **React Router** | Rutas de la PWA (Ventas, Inventario, Clientes, Reportes) y protección de rutas según permisos [19]. |
| Validación de datos | **Zod** | Un mismo esquema valida el formulario en el cliente y la solicitud en la API [12]. |
| Acceso a base de datos y migraciones | **Drizzle ORM** | Consultas tipadas, cercanas a SQL, con migraciones versionadas y transacciones [13]. |
| Aritmética decimal | **decimal.js** | Evita errores de redondeo de `number` en importes y kilos. |
| Estado del servidor en el cliente | **TanStack Query** | Caché, reintentos y manejo del estado en línea/sin conexión [14]. |
| Contraseñas | **argon2** (o bcrypt) | Almacenamiento seguro de contraseñas. |
| Pruebas | **Vitest**, **Supertest**, **Playwright** | Pruebas unitarias, de API y de extremo a extremo con simulación de pérdida de conexión. |

---

## 4. Alternativas que conviene considerar

**Next.js** es válido si el equipo ya lo domina, pero las pantallas que dependen del servidor requieren una estrategia adicional para funcionar sin conexión. React con Vite separa con claridad el cliente offline de la API [5].

**NestJS** es una alternativa a Express para el backend: también usa TypeScript y ofrece una estructura por módulos, controladores y servicios más estricta. Su curva de aprendizaje es mayor, por lo que para el MVP se prefiere Express con una organización por módulos [20].

**JavaScript sin TypeScript** puede usarse si TypeScript retrasa el avance, agregando validaciones con Zod y pruebas. **Python (Django/FastAPI)**, **Java (Spring Boot)** o **C# (ASP.NET Core)** son alternativas para la API si el equipo domina esos ecosistemas; la interfaz PWA seguirá requiriendo tecnologías web.

**SQLite** es adecuado como base local en una app móvil nativa. Para la PWA preferimos IndexedDB por su integración con el navegador. Si la entrega exige app nativa, se reevaluará SQLite [7].

---

## 5. Estructura del proyecto

Un solo repositorio (monorepo con *npm workspaces* o *pnpm*), con el servidor organizado por módulos:

```
micentralmx/
├── apps/
│   ├── web/          # PWA: React + Vite + Dexie + vite-plugin-pwa
│   └── api/          # Express + Drizzle, un módulo por área:
│                     # auth, negocios, usuarios, productos, inventario,
│                     # compras, ventas, clientes, proveedores, pagos,
│                     # mermas, reportes, auditoria, sync
├── packages/
│   └── shared/       # Tipos, esquemas Zod, permisos y constantes comunes
├── docker-compose.yml  # PostgreSQL + API
└── docs/
```

---

## 6. Modelo de datos: decisiones clave

### 6.1 Separación por negocio (multi-tenant)
- Todas las tablas operativas incluyen `negocio_id`.
- La API filtra siempre por el negocio del usuario autenticado.
- Como segunda capa de defensa, PostgreSQL aplica **Row Level Security**, que impide leer filas de otro negocio aunque exista un error en la API [15].
- En IndexedDB, los datos locales también se guardan asociados al negocio y usuario.
- El **superadministrador** opera en un esquema administrativo separado y no participa en ventas ni inventario.

### 6.2 Inventario como historial de movimientos
- La existencia **no** es un campo que se sobrescribe. Cada entrada, venta, merma, ajuste o cancelación es un registro inmutable en `movimientos_inventario`.
- La existencia de cada producto + clasificación es la suma de sus movimientos. Se mantiene una tabla `existencias` calculada que se actualiza **en la misma transacción** para consultas rápidas.
- Los errores se corrigen con un movimiento contrario, nunca editando o borrando el original.
- Beneficio: la auditoría y la sincronización trabajan con eventos, por lo que no hay datos que se pisen entre dispositivos.

### 6.3 Productos y clasificaciones
- `productos` → `clasificaciones_producto` (Primera, Segunda, Tercera u otros nombres configurables por negocio).
- Cada clasificación tiene existencia, precio de referencia de compra y de venta independientes.
- La unidad (caja, kilo, pieza, costal, tara, libra) se define por producto y presentación.

### 6.4 Tipos de datos
| Dato | Tipo en PostgreSQL | En JavaScript |
|---|---|---|
| Importes | `NUMERIC(12,2)` | `decimal.js` (se transmite como texto) |
| Cantidades | `NUMERIC(12,3)` (kilos con decimales) | `decimal.js` |
| Identificadores | `UUID` (v7, generado en cliente o servidor) | `string` |
| Fechas | `TIMESTAMPTZ`, zona `America/Mexico_City` para reportes | `Date` / ISO 8601 |

### 6.5 Ventas y pagos
- Cada renglón de venta conserva **precio aplicado, clasificación, unidad, cantidad y usuario**, sin depender del precio vigente del catálogo [9].
- Las ventas a crédito generan saldo en la cuenta del cliente; los abonos se registran como pagos relacionados con una o varias ventas.
- Las cancelaciones no borran la venta: cambian su estado y generan el movimiento inverso de inventario y dinero.

---

## 7. Almacenamiento offline y sincronización

IndexedDB guarda los catálogos descargados y las operaciones pendientes; PostgreSQL confirma el resultado compartido por el negocio. El **motor de sincronización** es un módulo propio en TypeScript: ninguna base de datos lo resuelve automáticamente.

### 7.1 Flujo de sincronización
1. **Registro local.** La venta y su operación pendiente se guardan en una sola transacción de Dexie, con `operacion_id` (UUID v7), `negocio_id`, `usuario_id`, `dispositivo_id`, fecha del dispositivo y estado `pendiente`.
2. **Envío.** Al recuperar conexión, al abrir la app, de forma periódica mientras está abierta y mediante un **botón de sincronización manual**, se envían los pendientes en orden.
3. **Procesamiento único (idempotencia).** El servidor registra cada `operacion_id` con una restricción `UNIQUE (negocio_id, operacion_id)`. Si la operación llega repetida por un reintento, responde con el resultado original sin duplicarla.
4. **Confirmación.** El servidor valida permisos y reglas y confirma la venta y su movimiento de inventario en una transacción. El cliente marca la operación como `sincronizada` y descarga cambios recientes (existencias, precios, clientes).
5. **Revisión.** Las operaciones rechazadas o marcadas para revisión se muestran a un usuario autorizado para resolverlas.

### 7.2 Estados de una operación
`pendiente` → `enviando` → `sincronizada` | `en_revision` | `rechazada`

La interfaz muestra siempre el estado de conexión y el número de operaciones pendientes.

### 7.3 Consideraciones de plataforma
- **Background Sync no está disponible en Safari/iOS** ni garantiza ejecución continua en otros navegadores. La sincronización mientras la app está abierta y el botón manual son el mecanismo principal [8][16].
- Se solicita `navigator.storage.persist()` para reducir el riesgo de que el navegador borre los datos locales [17].
- La app requiere una **primera carga con conexión** para descargar recursos, catálogos y sesión.

---

## 8. Reglas de negocio definidas

| Regla | Decisión |
|---|---|
| **Stock negativo** | Se permite en ventas offline, porque la mercancía ya se entregó físicamente. La operación queda marcada `en_revision` y se genera una alerta para el administrador. En línea, el sistema advierte antes de confirmar. |
| **Conflictos en ventas y pagos** | Nunca se resuelven sobrescribiendo con el último dato recibido. Cada operación es un evento independiente que se suma al historial. |
| **Conflictos en catálogos** (precios, datos de cliente) | Prevalece el dato del servidor; el cambio local rechazado se notifica al usuario. |
| **Folios de venta** | Offline se asigna un folio provisional con prefijo del dispositivo (ej. `D3-000123`); el servidor asigna el folio definitivo consecutivo al sincronizar y conserva ambos. |
| **Operaciones permitidas offline** | Ventas, abonos de clientes, registro de mermas, alta de clientes y consultas de catálogo. |
| **Operaciones solo en línea** | Gestión de usuarios, roles y permisos; ajustes de inventario autorizados; cancelaciones; configuración del negocio; reportes consolidados. |
| **Sesión offline** | *Access token* JWT de corta duración y *refresh token* en cookie `httpOnly`. Sin conexión, la sesión local es válida hasta 12 horas desde el último acceso en línea (configurable). Al sincronizar, el servidor vuelve a validar el estado y los permisos del usuario. |
| **Usuario suspendido** | Las operaciones offline que haya registrado después de su suspensión quedan `en_revision`. |
| **Fechas** | Se guarda la fecha del dispositivo (`creado_en_dispositivo`) y la del servidor (`recibido_en_servidor`). Los reportes usan la fecha del dispositivo. |

---

## 9. Seguridad y permisos

- Los permisos se definen como acciones (`ventas.crear`, `inventario.ajustar`, `reportes.financieros`, etc.) agrupadas en roles editables por el administrador.
- La interfaz oculta lo que el usuario no puede hacer, pero **la API valida siempre** cada permiso; los tipos de TypeScript no validan solicitudes por sí solos.
- Cada operación relevante genera un registro en `auditoria` con usuario, fecha, tipo de operación, registro afectado y valores anteriores y nuevos.
- Se aplica limitación de intentos de inicio de sesión, HTTPS obligatorio y contraseñas con argon2.

---

## 10. Plan de construcción sugerido

| Fase | Entregable |
|---|---|
| **0. Base** | Monorepo, Docker con PostgreSQL, migraciones iniciales, autenticación y separación por negocio. |
| **1. Demostración clave** | Iniciar sesión → seleccionar un producto clasificado → **vender sin conexión** → sincronizar una sola vez → ver la existencia actualizada. |
| **2. Operación diaria** | Productos, clasificaciones, compras/entradas, ventas de contado y crédito, clientes y abonos. |
| **3. Control** | Mermas y ajustes, proveedores y cuentas por pagar, ingresos y egresos, auditoría. |
| **4. Visibilidad** | Dashboard y reportes; panel del superadministrador. |

La fase 1 valida la elección tecnológica antes de ampliar los módulos del MVP.

### Pruebas obligatorias de la sincronización
- Reenvío duplicado de la misma operación.
- Pérdida de conexión a mitad del envío.
- Error del servidor y reintento.
- Dos dispositivos vendiendo la misma mercancía sin conexión.
- Intento de un usuario de consultar datos de otro negocio.
- Sesión expirada o usuario suspendido con operaciones pendientes.

---

## 11. Conclusión para presentar

Proponemos desarrollar MiCentralMX con **TypeScript, HTML, CSS y SQL**. Utilizaremos **React con Vite** y **vite-plugin-pwa** para la PWA, **Node.js con Express** para la API, **PostgreSQL** con Row Level Security para los datos centrales e **IndexedDB mediante Dexie** para las operaciones locales, con **Zod** y **Drizzle** para validación y acceso a datos.

El inventario se modela como un historial de movimientos y cada operación offline lleva un identificador único, lo que permite sincronizar sin duplicados ni sobrescrituras. Las reglas de stock negativo, folios, sesión offline y conflictos quedan definidas desde el inicio. El principal trabajo técnico será implementar y probar la sincronización, los permisos y la consistencia del inventario y de los pagos.

---

## Fuentes consultadas

1. Documento del proyecto. *MVP Integradora.pdf*. MiCentralMX.
2. TypeScript. *The TypeScript Handbook*. https://www.typescriptlang.org/docs/handbook/intro.html
3. Vite. *Getting Started*. https://vite.dev/guide/
4. Express. Documentación oficial. https://expressjs.com/
5. Next.js. *Progressive Web Applications*. https://nextjs.org/docs/app/guides/progressive-web-apps
6. MDN. *IndexedDB API*. https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
7. SQLite. *WebAssembly and JavaScript*. https://sqlite.org/wasm/doc/trunk/index.md
8. MDN. *Offline and background operation*. https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation
9. PostgreSQL. *Numeric Types*. https://www.postgresql.org/docs/current/datatype-numeric.html
10. Dexie.js. Documentación oficial. https://dexie.org/
11. Vite PWA. *vite-plugin-pwa*. https://vite-pwa-org.netlify.app/
12. Zod. Documentación oficial. https://zod.dev/
13. Drizzle ORM. Documentación oficial. https://orm.drizzle.team/
14. TanStack Query. Documentación oficial. https://tanstack.com/query
15. PostgreSQL. *Row Security Policies*. https://www.postgresql.org/docs/current/ddl-rowsecurity.html
16. MDN. *Background Synchronization API*. https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API
17. MDN. *StorageManager: persist()*. https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist
18. React. Documentación oficial. https://react.dev/
19. React Router. Documentación oficial. https://reactrouter.com/
20. NestJS. Documentación oficial. https://docs.nestjs.com/

*Documentación consultada el 8 de octubre de 2026.*
