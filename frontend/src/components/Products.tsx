"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  images: {
    id: number;
    url: string;
  }[];
}

const Products = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);

  //fetch products
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/api/products`);
  //       setProducts(response.json());
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then((response) => response.json())
      .then((json) => setProducts(json));
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container pt-5">
        <h2 className="font-medium text-2xl pb-4">New Products</h2>

        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {Array.isArray(products) &&
            products.map((item, index) => (
              <ProductCard
                key={index}
                id={item.id}
                images={item.images}
                name={item.name}
                description={item.description}
                price={item.price}
                categoryId={item.categoryId}
                category={item.category}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
