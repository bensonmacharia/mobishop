"use client";
import React, { useState, useEffect, useRef } from "react";
import { GrCommand } from "react-icons/gr";

interface Category {
  id: string;
  name: string;
}

const Categories = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const defaultCategory = { id: "0", name: "All" };
  const [categories, setCategories] = useState<Category[]>([defaultCategory]);
  const initialCategories = useRef<Category[]>([defaultCategory]);

  //fetch categories
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/categories`);
  //       setCategories([...initialCategories.current, ...response.data]);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((json) => setCategories([...initialCategories.current, ...json]));
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:block">
      <div className="container py-4">
        <div className="flex justify-start items-center space-x-4 overflow-x-scroll snap-x">
          {Array.isArray(categories) &&
            categories.map((item) => (
              <ProductType key={item.id} id={item.id} name={item.name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

const ProductType: React.FC<Category> = ({ id, name }) => {
  return (
    <div className="flex justify-start items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full font-semibold snap-start cursor-pointer hover:brightness-75 hover:scale-105 transition-all">
      <GrCommand className="w-5 h-5" />
      <span>{name}</span>
    </div>
  );
};
