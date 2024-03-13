"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { FaCartPlus, FaWhatsapp } from "react-icons/fa";

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

export default function Product() {
  const { id } = useParams() as { id: string };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/product/${id}`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            {/* <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              {product.images.map((image) => (
                <img
                  className="w-full h-full object-cover"
                  key={image.id}
                  src={image.url}
                  alt={`Image ${image.id}`}
                />
              ))}
            </div> */}
            <Carousel data={product.images} />
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                {/* <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  WhatsApp us
                </button> */}
                <button
                  type="button"
                  className="text-white bg-green-300 hover:bg-green-500 focus:outline-none font-bold rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-green-400 dark:hover:bg-green-600"
                >
                  <FaWhatsapp className="w-5 h-5 me-2" />
                  WhatsApp
                </button>
              </div>
              <div className="w-1/2 px-2">
                {/* <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Cart
                </button>
                <FaCartPlus className="w-5 h-5 me-2" /> */}
                <button
                  type="button"
                  className="text-white bg-orange-300 hover:bg-orange-500 focus:outline-none font-bold rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-orange-400 dark:hover:bg-orange-600"
                >
                  <FaCartPlus className="w-5 h-5 me-2" />
                  Order now
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-accent mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              <span className="text-primary font-semibold mr-2">Category:</span>
              {product.category.name}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 mr-2">Price:</span>
                <span className="text-gray-600">KES. {product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 mr-2">
                  Availability:
                </span>
                <span className="text-gray-600">In Stock</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">
                Product Description:
              </span>
              <p className="text-gray-600 text-sm mt-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
