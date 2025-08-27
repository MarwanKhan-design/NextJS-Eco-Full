// "use client"

// import Stripe from "stripe"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { useCartStore } from "@/store/cart-store"


// interface Props {
//     product: Stripe.Product
// }

// export default function ProductDetail({ product }: Props) {
//     const { items, addItem, removeItem } = useCartStore()
//     const cartItem = items.find((item) => item.id === product.id)

//     const quantity = cartItem ? cartItem.quantity : 0;

//     // const quantity = 

//     const price = product.default_price as Stripe.Price | null
//     const unitAmount = price && typeof price !== "string" ? price.unit_amount ?? null : null
//     const formattedPrice = unitAmount !== null ? `$${(unitAmount / 100).toFixed(2)}` : ""

//     const onAddItem = () => {
//         addItem({
//             id: product.id,
//             name: product.name,
//             price: price?.unit_amount ?? 0,
//             ImageUrl: product.images ? product.images[0] : null,
//             quantity: 1
//         })
//     }

//     return (
//         <section className="w-full max-w-6xl mx-auto px-4 py-12">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="relative w-full aspect-square overflow-hidden rounded-xl border bg-secondary">
//                     {product.images?.[0] && (
//                         <Image
//                             src={product.images[0]}
//                             alt={product.name}
//                             fill
//                             className="object-cover"
//                             sizes="(max-width: 768px) 100vw, 50vw"
//                             priority
//                         />
//                     )}
//                 </div>

//                 <div className="flex flex-col justify-center">
//                     <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{product.name}</h1>
//                     {product.description && (
//                         <p className="text-muted-foreground leading-relaxed mb-6">
//                             {product.description}
//                         </p>
//                     )}

//                     {formattedPrice && (
//                         <div className="mb-6">
//                             <span className="text-2xl font-semibold">{formattedPrice}</span>
//                         </div>
//                     )}

//                     <div className="flex items-center gap-3">
//                         <Button
//                             size="lg"
//                             onClick={() => removeItem(product.id)}
//                             variant="outline"
//                         >
//                             -
//                         </Button>
//                         <span
//                             className="inline-flex items-center justify-center h-10 w-16 rounded-md border bg-background px-3 text-lg font-semibold shadow-sm mx-2 select-none"
//                             style={{ minWidth: "3rem" }}
//                         >
//                             {quantity}
//                         </span>
//                         <Button
//                             size="lg"
//                             onClick={onAddItem}
//                         >
//                             +
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

"use client"

import Stripe from "stripe"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"

interface Props {
    product: Stripe.Product
}

export default function ProductDetail({ product }: Props) {
    const { items, addItem, removeItem } = useCartStore()
    const cartItem = items.find((item) => item.id === product.id)

    const quantity = cartItem ? cartItem.quantity : 0

    const price = product.default_price as Stripe.Price | string | null
    const unitAmount =
        price && typeof price !== "string" ? price.unit_amount ?? null : null
    const formattedPrice =
        unitAmount !== null ? `$${(unitAmount / 100).toFixed(2)}` : ""

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price && typeof price !== "string" ? price.unit_amount ?? 0 : 0,
            ImageUrl: product.images?.[0] ?? "",
            quantity: 1,
        })
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full aspect-square overflow-hidden rounded-xl border bg-secondary">
                    {product.images?.[0] && (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        {product.name}
                    </h1>

                    {product.description && (
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            {product.description}
                        </p>
                    )}

                    {formattedPrice && (
                        <div className="mb-6">
                            <span className="text-2xl font-semibold">{formattedPrice}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <Button
                            size="lg"
                            onClick={() => removeItem(product.id)}
                            variant="outline"
                        >
                            -
                        </Button>
                        <span className="inline-flex items-center justify-center h-10 w-16 rounded-md border bg-background px-3 text-lg font-semibold shadow-sm mx-2 select-none">
                            {quantity}
                        </span>
                        <Button size="lg" onClick={onAddItem}>
                            +
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
