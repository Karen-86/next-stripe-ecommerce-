import React from "react";
import Template from "./Template";
import Stripe from "stripe";
import { stripe } from "@/lib/Stripe";

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });
  const serializedProduct = JSON.parse(JSON.stringify(product));


  return <Template fetchedProduct={serializedProduct} />;
}
