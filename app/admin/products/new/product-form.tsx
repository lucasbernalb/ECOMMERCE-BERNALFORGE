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
      toast.success("Product created successfully")
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
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Professional Drill Driver"
            required
            onChange={handleNameChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            name="slug"
            placeholder="professional-drill-driver"
            required
            onChange={handleSlugChange}
          />
          <p className="text-xs text-muted-foreground">
            URL-friendly identifier. Auto-generated from name if left empty.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            name="brand"
            placeholder="DeWalt"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Price ($) *</Label>
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
          <Label htmlFor="category_id">Category</Label>
          <Select name="category_id">
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Product description..."
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
              Featured
            </Label>
            <p className="text-xs text-muted-foreground">
              Show this product in the featured section on the homepage
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
              Best Seller
            </Label>
            <p className="text-xs text-muted-foreground">
              Show this product in the best sellers section
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
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
