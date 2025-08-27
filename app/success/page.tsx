'use client'

import { useCartStore } from "@/store/cart-store"
import { useEffect } from "react"

const SuccessPage = () => {
    const { clearCart } = useCartStore()

    useEffect(() => {
        clearCart()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <svg
                className="w-20 h-20 text-green-500 mb-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12l3 3 5-5"
                />
            </svg>
            <h1 className="text-3xl font-bold mb-4 text-primary">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground mb-2">
                Thank you for your purchase. Your transaction was successful.
            </p>
            <p className="text-base text-muted-foreground">
                We appreciate your business and hope you enjoy your order!
            </p>
        </div>
    )
}

export default SuccessPage