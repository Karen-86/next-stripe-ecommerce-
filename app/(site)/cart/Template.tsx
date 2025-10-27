"use client";

import React, { useState } from "react";
import { Header, Footer, ProductCard, ButtonDemo } from "@/components/index.js";
import { useStripeContext, ProductProps } from "@/context/stripeContext";
import useAlert from "@/hooks/useAlert";
import localData from "@/localData";
import Stripe from "stripe";
import { stripe } from "@/lib/Stripe";
import { checkoutAction } from "./CheckoutAction";
import { redirect } from "next/navigation";

const { exampleImage, preloader } = localData.images;

const Template = () => {
  return (
    <main className="home-page pt-[150px] min-h-[100vh]">
      <ShowcaseSection />
    </main>
  );
};

const ShowcaseSection = () => {
  const { products } = useStripeContext();
  const [isLoading, setIsLoading] = useState(false);
  const { errorAlert } = useAlert();

  const cartProducts = products.filter((product) => product.isInCart);

  // const handleCheckout = async () => {
  //   try {
  //     const line_items = cartItems.map((cartItem: any) => ({
  //       price_data: {
  //         currency: "cad",
  //         product_data: { name: cartItem.name },
  //         unit_amount: Math.round(cartItem.price * 100), // Stripe expects amount in cents
  //       },
  //       quantity: cartItem.quantity,
  //     }));

  //     const res = await fetch("/api/checkout", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ line_items }),
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       console.log("Checkout failed:", errorData);
  //       alert("Checkout failed. Please try again.");
  //       return;
  //     }

  //     const { id } = await res.json();
  //     window.location.href = `https://checkout.stripe.com/pay/${id}`;
  //   } catch (error) {
  //     console.log("Checkout error:", error);
  //     alert("An unexpected error occurred during checkout.");
  //   }
  // };

  const handleCheckout = async () => {
    setIsLoading(true);
    const res = await checkoutAction({ products });
    setIsLoading(false);
    if (res.success) {
      // alert('sucess')
      redirect(res.url!);
    } else {
      // alert(res.message || "error");
      errorAlert(res.message || "error");
    }
  };

  return (
    <section>
      <div className="container">
        <h2 className="text-3xl mb-[1rem]">Your Cart</h2>

        {!cartProducts.length ? (
          "Empty"
        ) : (
          <>
            <CartList products={products} />

            <div className="flex justify-end">
              <ButtonDemo
                disabled={isLoading}
                className="relative"
                startIcon={isLoading ? <img src={preloader} className=" w-[18px] h-[18px]" /> : null}
                onClick={handleCheckout}
                text={`Proceed to checkout`}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

type ProductListProps = {
  products: ProductProps[];
};

const CartList = ({ products }: ProductListProps) => {
  const cartProducts = products.filter((product) => product.isInCart);
  return (
    <div className="">
      {cartProducts.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            className="sm:flex-row [&>.card-header]:flex-1 [&>.card-body]:flex-1 [&>.card-header]:max-w-[300px] mb-[1rem]"
          />
        );
      })}
    </div>
  );
};

export default Template;
