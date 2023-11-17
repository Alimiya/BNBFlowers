import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t mb-5">
      <div className="mx-auto px-6 py-6 sm:py-8 lg:px-8 -mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
        <Link href={"/"} className="text-sm leading-6">
          BNBFlower
        </Link>
      </div>
    </footer>
  )
}
