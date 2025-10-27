'use client'

import React from "react";
import { Header, Footer, ProductCard } from "@/components/index.js";
import { useStripeContext, ProductProps } from "@/context/stripeContext";

const Template = () => {
  return (
    <main className="home-page pt-[150px]  min-h-[100vh]">
      <ShowcaseSection />
    </main>
  );
};

const ShowcaseSection = () => {
  const { products } = useStripeContext();

  return (
    <section>
      <div className="container">
        <h2 className="text-3xl mb-[1rem]">All Products</h2>
        <ProductList products={products} />
      </div>
    </section>
  );
};

type ProductListProps = {
  products: ProductProps[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="card-group products-card-group grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5 gap-y-10">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Template;
