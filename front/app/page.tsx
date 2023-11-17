import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { ProductGrid } from "@/components/product-grid"

export default async function Page() {
  const productFilter = `_type == "product"`
  const filter = `*[${productFilter}]`
  
  const products = await client.fetch<SanityProduct[]>(
    groq`${filter}{
      _id,  
      _createdAt,
      name, 
      sku,
      images,
      currency,
      price,
      sizes,
      description,
      "slug": slug.current
    }`
  )

  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-12 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} flower{products.length === 1 ? "" : "s"}
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <ProductGrid products={products} />
          </section>
        </main>
      </div>
    </div>
  )
}
