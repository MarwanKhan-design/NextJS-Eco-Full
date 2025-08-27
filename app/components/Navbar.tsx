"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { items } = useCartStore()
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-lg font-semibold tracking-tight hover:text-primary transition-colors">
                        EcoShop
                    </Link>
                </div>

                {/* Desktop nav */}
                <div className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
                    <Link href="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Products</Link>
                    <Link href="/checkout" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Checkout</Link>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/checkout"
                        className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold leading-none text-primary-foreground">
                            {cartCount}
                        </span>
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile panel */}
            {isOpen && (
                <div className="border-b bg-background md:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-3">
                            <Link onClick={() => setIsOpen(false)} href="/" className="text-sm font-medium text-foreground/90 hover:text-foreground">Home</Link>
                            <Link onClick={() => setIsOpen(false)} href="/products" className="text-sm font-medium text-foreground/90 hover:text-foreground">Products</Link>
                            <Link onClick={() => setIsOpen(false)} href="/checkout" className="text-sm font-medium text-foreground/90 hover:text-foreground">Checkout</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}