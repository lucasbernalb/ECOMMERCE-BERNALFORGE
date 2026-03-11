import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function createProduct(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const name = formData.get("name");
  const slug = formData.get("slug");
  const brand = formData.get("brand");
  const price = formData.get("price");
  const stock = formData.get("stock");
  const categories_id = formData.get("categories_id");
  const description = formData.get("description");

  await supabase.from("products").insert({
    name,
    slug,
    brand,
    price,
    stock,
    categories_id,
    description,
  });

  redirect("/admin/products");
}

async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");

  console.log("CATEGORIES:", data);
  console.log("ERROR:", error);

  return data || [];
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Add Product</h1>

      <form action={createProduct} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="slug"
          placeholder="Slug"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="brand"
          placeholder="Brand"
          className="w-full border p-2 rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category_id"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select category</option>

          {categories?.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
