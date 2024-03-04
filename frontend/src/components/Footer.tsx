import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-blackish text-gray-500 text-center py-4 pb-16 md:pb-4">
      Copyright © Zicco Technologies
      <div className="flex justify-center items-center mt-2 mb-2">
        <div className="flex gap-1">
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
      </div>
      All Rights Reserved {year}
    </div>
  );
};

export default Footer;
