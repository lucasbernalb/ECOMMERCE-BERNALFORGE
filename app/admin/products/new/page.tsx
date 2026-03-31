import { createClient } from "@/lib/supabase/server"
import type { Category } from "@/lib/types"
import { slugify } from "@/lib/slugify"
import { ProductForm } from "./product-form"
import { requireAdmin } from "@/lib/auth/isAdmin"

async function createProduct(
  _prevState: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  "use server"

  try {
    const name = formData.get("name") as string
    const slugInput = formData.get("slug") as string
    const brand = formData.get("brand") as string
    const price = formData.get("price")
    const stock = formData.get("stock")
    const category_id = formData.get("category_id") as string | null
    const description = formData.get("description") as string | null
    const featured = formData.get("featured") === "true"
    const best_seller = formData.get("best_seller") === "true"

    if (!name?.trim()) {
      return { success: false, error: "Product name is required" }
    }

    if (!brand?.trim()) {
      return { success: false, error: "Brand is required" }
    }

    const slug = slugInput?.trim() ? slugInput.trim() : slugify(name)

    if (!price) {
      return { success: false, error: "Price is required" }
    }

    if (!stock) {
      return { success: false, error: "Stock is required" }
    }

    const priceNum = Number(price)
    const stockNum = Number(stock)

    if (isNaN(priceNum) || priceNum < 0) {
      return { success: false, error: "Price must be a valid positive number" }
    }

    if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      return { success: false, error: "Stock must be a valid non-negative integer" }
    }

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "You must be logged in to create products" }
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      return { success: false, error: "Admin privileges required" }
    }

    const { error } = await supabase.from("products").insert({
      name: name.trim(),
      slug,
      brand: brand.trim(),
      price: priceNum,
      stock: stockNum,
      category_id: category_id || null,
      description: description?.trim() || null,
      featured,
      best_seller,
      images: [],
      technical_specs: null,
    })

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "A product with this slug already exists" }
      }
      console.error("Product creation error:", error)
      return { success: false, error: `Failed to create product: ${error.message}` }
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error creating product:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) {
      console.error("Failed to fetch categories:", error)
      return []
    }

    return (data ?? []) as Category[]
  } catch (error) {
    console.error("Unexpected error fetching categories:", error)
    return []
  }
}

export default async function NewProductPage() {
  await requireAdmin()
  const categories = await getCategories()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
        <p className="text-muted-foreground mt-1">
          Create a new product for your store
        </p>
      </div>

      <ProductForm categories={categories} action={createProduct} />
    </div>
  )
}
