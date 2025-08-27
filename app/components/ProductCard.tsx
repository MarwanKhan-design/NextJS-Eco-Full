import { Card } from "@/components/ui/card"
import Link from "next/link"
import Stripe from "stripe"

interface Props {
    product: Stripe.Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <Link href={`/products/${product.id}`}>
            <Card className="p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow">
                {product.images && product.images[0] && (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-40 h-40 object-cover rounded-md mb-2"
                    />
                )}
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                {product.default_price && typeof product.default_price === "object" && "unit_amount" in product.default_price && (
                    <p className="text-primary font-bold">
                        ${((product.default_price.unit_amount as number) / 100).toFixed(2)}
                    </p>
                )}
            </Card>
        </Link>
    )
}
export default ProductCard