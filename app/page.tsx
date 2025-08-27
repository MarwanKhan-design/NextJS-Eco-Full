import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/ui/carousel";

export default async function Home() {
  const products = await stripe.products.list({ expand: ["data.default_price"], limit: 3 })

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Welcome to the store</h2>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
            <Button asChild variant={'default'}>
              <Link href="/products" className="w-full md:w-auto">
                View Products
              </Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={products.data[0].images[0]}
              alt="Hero"
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <h3 className="mb-6 text-2xl font-semibold text-gray-900">Featured Products</h3>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
