import React from "react";
import Image from "next/image";

import { BsSearch } from "react-icons/bs";
import Link from "next/link";

const HeaderMain = () => {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <Link href={`/`}>
          <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
            {/* <Image src="/zicco-logo.png" alt="Zicco" width={100} height={100} /> */}
            <span className="text-accent">Zicco TECH</span>
          </div>
        </Link>

        <div className="w-full sm:w-[300px] md:w-[70%] relative">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter any product name..."
          />

          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
