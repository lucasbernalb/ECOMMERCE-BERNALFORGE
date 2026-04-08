# 🛠️ BernalForge E-Commerce

> Tienda online de herramientas profesionales construida con Next.js 16, React 19 y Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Enabled-brightgreen?style=flat-square&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)]()

---

## ✨ Características

### 🛒 E-Commerce
- **Catálogo de productos** con filtros, búsqueda y ordenamiento
- **Carrito de compras** con persistencia en localStorage
- **Lista de favoritos** (wishlist) para usuarios autenticados
- **Checkout** optimizado con validación completa
- **Gestión de órdenes** para clientes y admins

### 🎨 UX/UI
- **Diseño responsive** para móvil, tablet y desktop
- **Modo claro/oscuro** con persistencia
- **Animaciones suaves** y micro-interacciones
- **Imágenes optimizadas** con fallback para errores
- **Toast notifications** para feedback instantáneo

### 🔐 Autenticación & Seguridad
- **Auth de Supabase** (login, registro, recuperación de contraseña)
- **RLS (Row Level Security)** en todas las tablas de la base de datos
- **Middleware** para protección de rutas administrativas
- **Validación de inputs** en server actions
- **Panel de admin** con acceso restringido a admins

### 📦 Admin Dashboard
- **Gestión de productos** (crear, editar, eliminar)
- **Gestión de categorías**
- **Órdenes** con estados y seguimiento
- **Clientes** con historial de compras
- **Dashboard** con estadísticas y gráficos

---

## 🚀 Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Estilos** | [Tailwind CSS 4](https://tailwindcss.com/) + [Radix UI](https://radix-ui.com/) |
| **Base de datos** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Auth** | [Supabase Auth](https://supabase.com/auth) |
| **Animaciones** | [Framer Motion](https://www.framer.com/motion/) + [Embla Carousel](https://www.emb Carousel.com/) |
| **Formularios** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Toasts** | [Sonner](https://sonner.vercel.app/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📁 Estructura del Proyecto

```
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rutas de autenticación
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── sign-up-success/
│   ├── account/             # Cuenta del usuario
│   │   └── orders/         # Historial de pedidos
│   ├── admin/               # Panel de administración
│   │   ├── products/       # CRUD de productos
│   │   ├── categories/     # Gestión de categorías
│   │   ├── orders/         # Gestión de pedidos
│   │   ├── customers/      # Gestión de clientes
│   │   └── settings/       # Configuración
│   ├── categories/          # Páginas de categorías
│   ├── checkout/           # Proceso de compra
│   ├── order-confirmation/ # Confirmación de pedido
│   ├── product/[slug]/      # Detalle de producto
│   ├── products/           # Catálogo de productos
│   ├── wishlist/           # Lista de favoritos
│   ├── auth/               # Auth pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Estilos globales
│
├── components/              # Componentes React
│   ├── ui/                 # Componentes base (shadcn/ui style)
│   ├── product-card.tsx    # Card de producto
│   ├── product-detail.tsx  # Detalle de producto
│   ├── product-grid-client.tsx # Grid de productos
│   ├── category-card.tsx  # Card de categoría
│   ├── header.tsx         # Header con nav
│   ├── footer.tsx          # Footer
│   ├── cart-sheet.tsx      # Carrito deslizable
│   └── ...
│
├── lib/                    # Utilidades y configuración
│   ├── actions/           # Server Actions
│   │   ├── orders.ts      # Crear órdenes
│   │   └── wishlist.ts    # Gestionar favoritos
│   ├── auth/              # Helpers de auth
│   │   └── isAdmin.ts     # Verificación de admin
│   ├── supabase/          # Clientes de Supabase
│   │   ├── client.ts      # Cliente browser
│   │   ├── server.ts      # Cliente server
│   │   └── middleware.ts  # Middleware de auth
│   ├── cart-context.tsx   # Context del carrito
│   ├── data.ts           # Funciones de datos
│   ├── types.ts          # Tipos TypeScript
│   └── utils.ts          # Utilidades
│
├── public/                 # Archivos estáticos
│   └── video-hero.*       # Video del hero
│
├── middleware.ts           # Middleware de Next.js
├── tailwind.config.ts     # Config de Tailwind
└── next.config.ts         # Config de Next.js
```

---

## 🏃‍♂️ Getting Started

### Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- Una cuenta de [Supabase](https://supabase.com)

### Instalación

1. **Clonar el repositorio**

```bash
git clone <tu-repo-url>
cd ecommerce-bernalforge
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

Editá `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/account
```

4. **Obtener credenciales de Supabase**

1. Creá un proyecto en [supabase.com](https://supabase.com)
2. Ve a Settings > API
3. Copiá `Project URL` y `anon public` key

5. **Ejecutar en desarrollo**

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🗄️ Configuración de Base de Datos

### Tablas Requeridas

El proyecto usa las siguientes tablas en Supabase:

| Tabla | Descripción |
|-------|-------------|
| `profiles` | Perfiles de usuario (extensión de auth.users) |
| `categories` | Categorías de productos |
| `products` | Catálogo de productos |
| `orders` | Órdenes de compra |
| `order_items` | Items de cada orden |
| `wishlist` | Favoritos de usuarios |

### Habilitar Row Level Security (RLS)

```sql
-- Ejecutá esto en el SQL Editor de Supabase

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- 2. Policies para lectura pública de productos y categorías
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- 3. Policies para wishlist (solo usuario autenticado puede ver/modificar los suyos)
CREATE POLICY "Users manage own wishlist" ON wishlist 
  FOR ALL USING (auth.uid() = user_id);

-- 4. Policies para orders
CREATE POLICY "Users view own orders" ON orders 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public can create orders" ON orders 
  FOR INSERT WITH CHECK (true);
```

### Seed Data (Opcional)

Podés usar el archivo `Nueva carpeta/scripts/002_seed_data.sql` para agregar datos de prueba.

---

## 🚢 Deploy

### Netlify (Recomendado)

1. Push tu código a GitHub
2. Conectá el repo en [Netlify](https://netlify.com)
3. Configurá:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node.js version:** 18+

4. Agregá las environment variables en Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Deploy! 🎉

### Vercel

```bash
npm i -g vercel
vercel
```

### Variables de Entorno de Producción

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase |

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción

# Calidad de código
npm run lint         # ESLint
npx tsc --noEmit    # TypeScript check
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Creá una rama (`git checkout -b feature/nueva-funcion`)
3. Commitá tus cambios (`git commit -m 'Agregar nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abrí un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Créditos

- Diseño basado en [shadcn/ui](https://ui.shadcn.com/)
- Iconos de [Lucide](https://lucide.dev/)
- Imágenes de [Unsplash](https://unsplash.com/)

---

<div align="center">
  <strong>Hecho con 🛠️ por <a href="https://github.com/lucasbernalb">lucasbernalb</a></strong>
  <br>
  <sub>¿Encontraste un bug? Abrí un issue. ¿Tenés una idea? Compartila.</sub>
</div>
