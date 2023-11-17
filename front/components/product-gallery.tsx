"use client"

import { useState } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"

interface Props {
  product: SanityProduct
}

export function ProductGallery({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)


  return (
    <div className="flex flex-col-reverse">
      <div className="aspect-h-1 aspect-w-1 w-full">
        <Image
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64, ${toBase64(shimmer(600, 750))}`}
          priority
          src={urlForImage(product.images[selectedImage]).url()}
          alt={`Main ${product.name} image`}
          width={600}
          height={750}
          className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        />
      </div>
    </div>
  )
}
