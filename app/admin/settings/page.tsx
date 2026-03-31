import { Settings, Store, CreditCard, Mail, Shield } from 'lucide-react'
import { requireAdmin } from '@/lib/auth/isAdmin'

export default async function AdminSettingsPage() {
  await requireAdmin()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your store settings
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
              <h2 className="font-semibold">Store Information</h2>
              <p className="text-sm text-muted-foreground">
                Update your store details
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <input
                type="text"
                defaultValue="BernalForge Tools"
                className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="support@bernalforge.com"
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
              <h2 className="font-semibold">Payment Settings</h2>
              <p className="text-sm text-muted-foreground">
                Configure payment methods
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">Credit/Debit Cards</span>
              <span className="text-xs text-green-600 dark:text-green-400">Enabled</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">PayPal</span>
              <span className="text-xs text-green-600 dark:text-green-400">Enabled</span>
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
              <h2 className="font-semibold">Email Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Manage email preferences
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Order confirmation emails</span>
              <input type="checkbox" defaultChecked className="accent-primary" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Shipping notification emails</span>
              <input type="checkbox" defaultChecked className="accent-primary" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Marketing emails</span>
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
              <h2 className="font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground">
                Security and access settings
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">Two-factor authentication</span>
              <span className="text-xs text-muted-foreground">Not configured</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm">Session timeout</span>
              <span className="text-xs text-muted-foreground">24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
