"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const productsData = [
  {
    img: "/jacket-1.jpg",
    title: "Jacket",
    desc: "MEN Yarn Fleece Full-Zip Jacket",
    rating: 4,
    price: "45.00",
  },
  {
    img: "/skirt-1.jpg",
    title: "Skirt",
    desc: "Black Floral Wrap Midi Skirt",
    rating: 5,
    price: "55.00",
  },
  {
    img: "/party-wear-1.jpg",
    title: "Party Wear",
    desc: "Women's Party Wear Shoes",
    rating: 3,
    price: "25.00",
  },
  {
    img: "/shirt-1.jpg",
    title: "Shirt",
    desc: "Pure Garment Dyed Cotton Shirt",
    rating: 4,
    price: "45.00",
  },
  {
    img: "/sports-1.jpg",
    title: "Sports",
    desc: "Trekking & Running Shoes - Black",
    rating: 3,
    price: "58.00",
  },
  {
    img: "/watch-1.jpg",
    title: "Watches",
    desc: "Smart Watches Vital Plus",
    rating: 4,
    price: "100.00",
  },
  {
    img: "/watch-2.jpg",
    title: "Watches",
    desc: "Pocket Watch Leather Pouch",
    rating: 4,
    price: "120.00",
  },
];

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
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
