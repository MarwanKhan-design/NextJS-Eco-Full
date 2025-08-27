'use client'

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    products: Stripe.Product[]
}

const Carousel = ({ products }: Props) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        const total = products.length || 1
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % total);
        }, 3000)

        return () => clearInterval(interval)
    }, [products])

    const currentProduct = products[currentIndex]
    const price = currentProduct.default_price as Stripe.Price;

    return (
        <div className="relative w-full max-w-5xl mx-auto">
            <Card className="overflow-hidden rounded-lg shadow-md border-gray-300">
                <div className="flex flex-col md:flex-row">
                    <div className="relative h-80 w-full md:h-96 md:w-1/2">
                        {products.map((product, idx) => {
                            const isActive = idx === currentIndex;
                            return (
                                <div
                                    key={product.id}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                                    aria-hidden={!isActive}
                                >
                                    {product.images && product.images[0] && (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="rounded-lg"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <CardContent className="md:w-1/2 p-6 flex flex-col justify-center gap-3">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                            {currentProduct.name}
                        </CardTitle>
                        {price && price.unit_amount && (
                            <p className="text-lg md:text-xl text-muted-foreground">
                                ${(price.unit_amount / 100).toFixed(2)}
                            </p>
                        )}
                    </CardContent>
                </div>
            </Card>
            {/* Carousel Controls */}
            <div className="absolute left-0 right-0 bottom-4 flex justify-between items-center px-4 z-20">
                <button
                    className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition disabled:opacity-50"
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)}
                    aria-label="Previous"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <div className="flex gap-2">
                    {products.map((_, idx) => (
                        <button
                            key={idx}
                            className={`w-2.5 h-2.5 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-white/60"} border border-gray-300 transition`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition disabled:opacity-50"
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
                    aria-label="Next"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
            </div>
        </div>
    )
}

export default Carousel;