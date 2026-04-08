import { Settings, Store, CreditCard, Mail, Shield } from 'lucide-react'
import { requireAdmin } from '@/lib/auth/isAdmin'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  await requireAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-1">
          Gestioná la configuración de tu tienda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Store Settings */}
        <div className="rounded-lg border border-border p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Información de la Tienda</h2>
              <p className="text-sm text-muted-foreground">
                Actualizá los detalles de tu tienda
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre de la Tienda</label>
              <input
                type="text"
                defaultValue="BernalForge Tools"
                className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email de Contacto</label>
              <input
                type="email"
                defaultValue="soporte@bernalforge.com"
                className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="rounded-lg border border-border p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Configuración de Pago</h2>
              <p className="text-sm text-muted-foreground">
                Configurá los métodos de pago
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">Tarjetas de Crédito/Débito</span>
              <span className="text-xs text-green-600 dark:text-green-400">Activado</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">MercadoPago</span>
              <span className="text-xs text-green-600 dark:text-green-400">Activado</span>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="rounded-lg border border-border p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Notificaciones por Email</h2>
              <p className="text-sm text-muted-foreground">
                Gestioná las preferencias de email
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Emails de confirmación de pedido</span>
              <input type="checkbox" defaultChecked className="accent-primary" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Emails de notificación de envío</span>
              <input type="checkbox" defaultChecked className="accent-primary" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Emails de marketing</span>
              <input type="checkbox" className="accent-primary" />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border border-border p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Seguridad</h2>
              <p className="text-sm text-muted-foreground">
                Configuración de seguridad y acceso
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">Autenticación de dos factores</span>
              <span className="text-xs text-muted-foreground">No configurado</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">Tiempo de sesión</span>
              <span className="text-xs text-muted-foreground">24 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
