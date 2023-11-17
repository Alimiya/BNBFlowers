import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"

export default function Page() {
  return (
    <div>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h4 className="font-bold tracking-tight sm:text-4xl">
          Cart
        </h4>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <CartItems />
          </section>
          <CartSummary />
        </form>
      </main>
    </div>
  )
}
