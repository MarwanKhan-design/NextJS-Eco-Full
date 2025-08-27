'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import Link from "next/link";

const CheckoutPage = () => {
    const { items, addItem, removeItem } = useCartStore()

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    if (total === 0 || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h1 className="text-3xl font-bold mb-4 text-primary">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-6">Looks like you have not added anything to your cart yet.</p>
                <Link href="/products">
                    <Button variant="default" className="px-6 py-2 text-base font-semibold">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">Checkout</h1>
            <Card className="max-w-xl mx-auto shadow-lg border-primary/30 border">
                <CardHeader className="bg-primary/10 rounded-t-lg">
                    <CardTitle className="text-xl font-semibold text-primary tracking-wide">
                        Order Summary
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 py-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between px-2 py-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-lg">{item.name}</span>
                                <span className="text-xs text-muted-foreground">
                                    Unit price: <span className="font-semibold">${(item.price / 100).toFixed(2)}</span>
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Quantity: <span className="font-semibold">{item.quantity}</span>
                                </span>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        className="px-2 py-1 rounded bg-primary/20 hover:bg-primary/40 text-primary font-bold text-lg"
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Remove one ${item.name}`}
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <span className="inline-block min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 rounded bg-primary/20 hover:bg-primary/40 text-primary font-bold text-lg"
                                        onClick={() => addItem({ ...item, quantity: 1 })}
                                        aria-label={`Add one ${item.name}`}
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <span className="font-bold text-primary text-lg">
                                ${((item.price * item.quantity) / 100).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between border-t pt-4 mt-4">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-2xl text-primary">
                            ${items.reduce((acc, item) => acc + (item.price * item.quantity) / 100, 0).toFixed(2)}
                        </span>
                    </div>
                </CardContent>
            </Card>
            <div className="flex flex-col items-center mt-8">
                <div className="mb-4 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-900 text-center font-semibold">
                    <span className="block">
                        <strong>Test Mode:</strong> Do <u>not</u> enter your real payment details.
                    </span>
                    <span className="block text-sm mt-1">
                        Use Stripe test cards only (e.g. <code>4242 4242 4242 4242</code>).
                    </span>
                </div>
                <form action={checkoutAction} className="flex justify-center w-full">
                    <input type="hidden" name="items" value={JSON.stringify(items)} />
                    <Button
                        size="lg"
                        className="w-full max-w-xs py-6 text-xl font-bold bg-white text-black shadow transition-all duration-200 hover:text-white hover:shadow-lg"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 12h14M7 12v7a2 2 0 002 2h6a2 2 0 002-2v-7" />
                            </svg>
                            Proceed to Payment
                        </span>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CheckoutPage;