import React from "react";
import { cookies, headers } from "next/headers";

import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ReactNode } from "react";
import Link from "next/link";

const HeaderTop = () => {
  const token = cookies().get("mobiapp-session")?.value;
  const headersList = headers();
  console.log(headersList.get("next-url"));

  return (
    <div className="border-b border-gray-200 sm:block">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_top__icon_wrapper">
              <BsFacebook />
            </div>
            <div className="header_top__icon_wrapper">
              <BsTwitter />
            </div>
            <div className="header_top__icon_wrapper">
              <BsInstagram />
            </div>
            <div className="header_top__icon_wrapper">
              <BsLinkedin />
            </div>
          </div>

          <div className="text-gray-500 text-[12px]">
            <b>BEST OFFERS</b> FOR WHOLESALE AND RETAIL PURCHASES
          </div>

          <div className="flex justify-end items-center space-x-2 bg-gray-100 p-2 rounded-full">
            <Link href={`/admin/dashboard`}>
              <NavIcon>
                <BiUser className="w-6 h-6" />
              </NavIcon>
            </Link>
            <NavIcon>
              <HiOutlineShoppingBag className="w-6 h-6" />
            </NavIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

const NavIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
      {children}
    </div>
  );
};
