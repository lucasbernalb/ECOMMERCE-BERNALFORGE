import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold">Página No Encontrada</h2>
        <p className="text-muted-foreground max-w-md">
          La página que estás buscando no existe o fue movida.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">
            Volver al Inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}
