import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import type { Route } from "next";

interface propsType {
  id: number;
  images: {
    id: number;
    url: string;
  }[];
  name: string;
  description: string;
  price: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
}

const ProductCard: React.FC<propsType> = ({
  id,
  images,
  name,
  description,
  price,
  categoryId,
  category,
}) => {

  // const truncate = (input: string) =>
  //   input?.length > 60 ? `${input.substring(0, 50)}...` : input;

  // const desc = truncate(description);

  return (
    <Link href={`/product/${id}`}>
      <div className="px-4 border border-gray-200 rounded-xl max-w-[400px] hover:scale-105 hover:border-orange-200">
        <div>
          {images?.length > 0 && (
            <Image
              className="w-full h-auto"
              key={images[0].id}
              src={images[0].url}
              width={200}
              height={300}
              alt={name}
            />
          )}
        </div>

        <div className="space-y-2 py-2">
          <h2 className="text-accent font-medium uppercase">{name}</h2>
          <p className="text-gray-500 max-w-[150px]">
            {category.name + " : " + name}
          </p>
          <div className="font-bold flex gap-4">
            KES. {price}
            <del className="text-gray-500 font-normal">
              KES. {price + 0.2 * price}.00
            </del>
          </div>

          <button
            type="button"
            className="w-full text-white bg-orange-300 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-10 py-2.5 text-center inline-flex items-center me-2 dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-600"
          >
            <FaCartPlus className="w-5 h-5 me-2" />
            Order now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
