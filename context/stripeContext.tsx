"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { getProductsAction } from "../actions/getProductsAction";
import useAlert from "@/hooks/useAlert";
import Stripe from "stripe";

export type FetchedProductProps = Stripe.Product;

export type ProductProps = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: number;
  quantity: number;
  isInCart?: boolean;
};

type StripeContextType = {
  products: ProductProps[];
  setProducts: (_: any) => void;
  isCartSheetOpen: boolean,
  setIsCartSheetOpen: (_: any) => void,
};

export const StripeContext = createContext<StripeContextType | null>(null);

export default function StripeProvider({
  children,
}:
Readonly<{
  children: React.ReactNode;
}>) {
  const [fetchedProducts, setFetchedProducts] = useState<FetchedProductProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const {  errorAlert } = useAlert();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProductsAction();
      console.log(res)
      if (res.success) {
        setFetchedProducts(res.products.data);
        const filteredProducts = res.products.data.map((product: FetchedProductProps) => {
          const price = product.default_price as Stripe.Price;

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            // price: (price.unit_amount! / 100).toFixed(2),
            price: price.unit_amount,
            quantity: 1,
          };
        });
        setProducts(filteredProducts);
      } else {
        errorAlert(res.message || "Error");
      }
    };
    fetchProducts();
  }, []);

  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false)
  
  return (
    <StripeContext.Provider
      value={{
        products,
        setProducts,
        isCartSheetOpen,
        setIsCartSheetOpen,
      }}
    >
      {children}
    </StripeContext.Provider>
  );
}

export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error("useStripeContext must be used within an Provider");
  }
  return context;
};
