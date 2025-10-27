"use client";

import React, { useEffect, useState } from "react";
import { Header, Footer, ProductCard, ButtonDemo } from "@/components/index.js";
import localData from "@/localData";
import Link from "next/link";
import { useStripeContext, FetchedProductProps } from "@/context/stripeContext";

import Stripe from "stripe";

const { exampleImage } = localData.images;

const Template = ({ fetchedProduct }: { fetchedProduct: FetchedProductProps }) => {
  return (
    <main className="home-page pt-[150px]  min-h-[100vh]">
      <ShowcaseSection fetchedProduct={fetchedProduct} />
    </main>
  );
};

const ShowcaseSection = ({ fetchedProduct }: { fetchedProduct: FetchedProductProps }) => {
  return (
    <section className="">
      <div className="container">
        <h2 className="text-3xl mb-[1rem]">Product Details</h2>
        <ProductDetail fetchedProduct={fetchedProduct} />
      </div>
    </section>
  );
};

const ProductDetail = ({ fetchedProduct }: { fetchedProduct: FetchedProductProps }) => {
  const {products} = useStripeContext()

  const findProduct = products.find(product=>product.id === fetchedProduct.id)

  if(!findProduct) return 'Not Found'
  return <ProductCard product={findProduct} className="border-none shadow-none [&>.card-header]:max-w-[300px] [&_.card-link]:hidden" />
};

export default Template;
