"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonDemo } from "@/components/button/ButtonDemo";
import localData from "@/localData";
import { useStripeContext, ProductProps } from "@/context/stripeContext";

const { exampleImage } = localData.images;
const { shopIcon } = localData.svgs;

type ProductCardProp = {
  product: ProductProps;
  className?: string;
};

export const ProductCard = ({ product, className }: ProductCardProp) => {
  const [imageURL, setImageURL] = useState(product.images[0]);

  const { products, setProducts, setIsCartSheetOpen } = useStripeContext();
  const isInCart = products.find((p) => p.id === product.id)?.isInCart;

  const handleCartProducts = () => {
    setProducts((prevProducts: ProductProps[]) =>
      prevProducts.map((p) => {
        if (p.id === product.id && !p.isInCart) setIsCartSheetOpen(true);
        return p.id === product.id ? { ...p, isInCart: !p.isInCart } : p;
      })
    );
  };

  return (
    <div className={`${className} card product-card justify-between shadow border rounded-xl p-5 flex flex-col`}>
      <div className="card-header">
        <div className="card-image relative pt-[60%] h-0 w-full  mb-[1rem]">
          <img
            src={imageURL}
            onError={() => setImageURL(exampleImage)}
            alt=""
            className="rounded-xl block absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="card-body">
        <h4 className="card-title flex-1 !font-normal text-gray-500 mb-[1rem] text-sm">{product.name}</h4>
        <p className="card-description text-xs text-gray-500 mb-[1rem]">{product.description}</p>
        <div className="card-price mb-[1rem]">${(product.price / 100).toFixed(2)}</div>
        <div className="card-btns flex gap-3">
          <Link href={`shop/${product.id}`} className="block flex-1  card-link">
            <ButtonDemo text="View Details" variant="outline" className="w-full " />
          </Link>
          <ButtonDemo
            onClick={handleCartProducts}
            className=" rounded-full"
            variant={isInCart ? "default" : "secondary"}
            size="icon"
            icon={shopIcon}
          />
        </div>
      </div>
    </div>
  );
};
