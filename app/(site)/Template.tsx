"use client";

import React, { useEffect, useState } from "react";
import { Header, Footer, ProductCard, ControlledSheetDemo } from "@/components/index.js";
import { useStripeContext, ProductProps } from "@/context/stripeContext";
import Image from "next/image";
import localData from "@/localData";

const { exampleImage } = localData.images;

const Template = () => {
  return (
    <main className="home-page  min-h-[100vh]">
      <HeroSection />
      <ShowcaseSection />
    </main>
  );
};



const HeroSection = () => {
  const [state, setState] = useState({
    name: "",
    cover: exampleImage,
  });
  const [cover, setCover] = useState("");
  const { products } = useStripeContext();

  useEffect(() => {
    if (!products.length) return;
    setCover(products[0].images[0]);
    setState((prev) => ({
      name: products[0].name,
      cover: products[0].images[0],
    }));
  }, [products]);

  return (
    <section className="hero !pt-[100px] pb-[80px] flex ">
      <div className="container">
        <div className="banner rounded-xl shadow h-[200px] overflow-hidden border bg-[#fcf0e4] flex  justify-between">
          <div className="hero-content  p-[30px]">
            <h1 className="text-3xl">{state.name}</h1>
          </div>
          <div className="w-[200px]">
            <div className="pt-[100%] w-full h-0 ml-auto relative">
              <Image
                src={state.cover}
                fill
                alt="image"
                priority
                sizes="100vw, (min-width: 768px) 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  const { products } = useStripeContext();

  return (
    <section>
      <div className="container">
        <h2 className="text-3xl mb-[1rem]">Featured Products</h2>
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
