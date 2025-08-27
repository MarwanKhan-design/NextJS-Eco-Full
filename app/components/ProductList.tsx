'use client'

import Stripe from "stripe"
import ProductCard from "./ProductCard"
import { useState } from "react"

interface Props {
    products: Stripe.Product[]
}



const ProductList = ({ products }: Props) => {

    const [search, setSearch] = useState('')

    const filteredProducts = products.filter((product) => {
        const term = search.toLowerCase()
        const nameMatch = product.name.toLocaleLowerCase().includes(term)
        const descriptionMatch = product.description ? product.description.toLocaleLowerCase().includes(term) : false
        return nameMatch || descriptionMatch
    })

    return (
        <div>
            <div className="flex justify-center my-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-base bg-white placeholder-gray-400"
                />
            </div>

            <div className="px-4 sm:px-6 lg:px-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-6">
                    {filteredProducts.map((product) => (
                        <li key={product.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default ProductList