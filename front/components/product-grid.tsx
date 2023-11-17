"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"

interface Props {
  products: SanityProduct[]
}

export function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-3 lg:gap-x-8">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product.slug}`} className="group text-sm">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
            <Image
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64, ${toBase64(shimmer(225, 280))}`}
              src={urlForImage(product.images[0]).url()}
              alt={product.name}
              width={225}
              height={280}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-4 font-medium">{product.name}</h3>
          <p className="mt-2 font-medium">{formatCurrencyString({ currency: product.currency, value: product.price })}</p>
        </Link>
      ))}
    </div>
  )
}
