
"use server";
import { stripe } from "@/lib/Stripe";
import Stripe from "stripe";

type ProductProps = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: number;
  quantity: number;
  isInCart?: boolean;
};


export const checkoutAction = async ({ products }: { products: ProductProps[] }) => {
  const cartProducts = products.filter((product) => product.isInCart);
  try {
    const line_items = cartProducts.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: { name: product.name },
        unit_amount: product.price, // Stripe expects amount in cents
      },
      quantity: product.quantity,
    }));
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cart`,
    });
    
    return { success: true, url: session.url };
  } catch (error: any) {
    // console.error("Stripe checkout error:", error);
     return { success: false, message: error.message };
  }
};
