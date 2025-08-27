import { stripe } from "@/lib/stripe";
import ProductList from "../components/ProductList";

const ProductsPage = async () => {
    const products = await stripe.products.list({ expand: ["data.default_price"] })

    return (
        <div>
            <h1 className="text-4xl font-bold text-center my-10 text-primary drop-shadow-sm tracking-tight">
                All Products
            </h1>

            <ProductList products={products.data} />
        </div>
    )
}

export default ProductsPage;