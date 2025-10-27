"use server";

import { stripe } from "@/lib/Stripe";

export const getProductsAction = async () => {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
      const plainProducts = JSON.parse(JSON.stringify(products));
      
    return { success: true, products: plainProducts };
  } catch (error: any) {
    // console.error("Stripe checkout error:", error);
    return { success: false, message: error.message };
  }
};
