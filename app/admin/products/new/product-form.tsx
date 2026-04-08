"use client"

import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { Category } from "@/lib/types"
import { slugify } from "@/lib/slugify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProductFormAction = (
  prevState: { success: boolean; error?: string },
  formData: FormData
) => Promise<{ success: boolean; error?: string }>

interface ProductFormProps {
  categories: Category[]
  action: ProductFormAction
}

const initialState = { success: false, error: undefined }

export function ProductForm({ categories, action }: ProductFormProps) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(action, initialState)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  useEffect(() => {
    if (state.success) {
      toast.success("Producto creado exitosamente")
      router.push("/admin/products")
      router.refresh()
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state, router])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!slugManuallyEdited) {
      const slugInput = document.getElementById("slug") as HTMLInputElement
      if (slugInput) {
        slugInput.value = slugify(e.target.value)
      }
    }
  }

  const handleSlugChange = () => {
    setSlugManuallyEdited(true)
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Taladro Percutor Profesional"
            required
            onChange={handleNameChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="taladro-percutor-profesional"
            required
            onChange={handleSlugChange}
          />
          <p className="text-xs text-muted-foreground">
            Identificador amigable para URLs. Se genera automáticamente del nombre si se deja vacío.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="brand">Marca *</Label>
          <Input
            id="brand"
            name="brand"
            placeholder="DeWalt"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Precio ($) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="99.99"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              step="1"
              min="0"
              placeholder="100"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category_id">Categoría</Label>
          <Select name="category_id">
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Descripción del producto..."
            rows={4}
          />
        </div>

        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <Checkbox
            id="featured"
            name="featured"
            value="true"
            onCheckedChange={(checked) => {
              const input = document.getElementById("featured") as HTMLInputElement
              if (input) {
                input.value = String(checked)
              }
            }}
          />
          <div className="space-y-1 leading-none">
            <Label
              htmlFor="featured"
              className="text-sm font-medium cursor-pointer"
            >
              Destacado
            </Label>
            <p className="text-xs text-muted-foreground">
              Mostrar este producto en la sección destacada de la página principal
            </p>
          </div>
          <input type="hidden" id="featured" name="featured" value="false" />
        </div>

        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <Checkbox
            id="best_seller"
            name="best_seller"
            value="true"
            onCheckedChange={(checked) => {
              const input = document.getElementById("best_seller") as HTMLInputElement
              if (input) {
                input.value = String(checked)
              }
            }}
          />
          <div className="space-y-1 leading-none">
            <Label
              htmlFor="best_seller"
              className="text-sm font-medium cursor-pointer"
            >
              Más Vendido
            </Label>
            <p className="text-xs text-muted-foreground">
              Mostrar este producto en la sección de más vendidos
            </p>
          </div>
          <input type="hidden" id="best_seller" name="best_seller" value="false" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creando...
            </>
          ) : (
            "Crear Producto"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
