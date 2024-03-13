"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineSell, MdOutlineCategory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { GiExpense, GiMoneyStack } from "react-icons/gi";
import { RiProductHuntLine } from "react-icons/ri";
import { BsBoxes } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaPersonCirclePlus, FaUsersGear } from "react-icons/fa6";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-5 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/dashboard") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoHomeOutline className="fill-current h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
            </ul>
          </div>

          {/* <!-- Sales Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              SALES
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Record Sale --> */}
              <li>
                <Link
                  href="/admin/sale"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/sale") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineSell className="fill-current h-5 w-5" />
                  Record Sale
                </Link>
              </li>
              {/* <!-- Menu Item Record Sale --> */}
              {/* <!-- Menu Item Sales Report --> */}
              <li>
                <Link
                  href="/admin/sales"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/sales") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FcSalesPerformance className="fill-current h-5 w-5" />
                  Sales Report
                </Link>
              </li>
              {/* <!-- Menu Item Sales Report --> */}
            </ul>
          </div>
          {/* <!-- Sales Group --> */}

          {/* <!-- Expenses Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              EXPENSES
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Record Expense --> */}
              <li>
                <Link
                  href="/admin/expense"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/expense") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <GiExpense className="fill-current h-5 w-5" />
                  Record Expense
                </Link>
              </li>
              {/* <!-- Menu Item Record Sale --> */}
              {/* <!-- Menu Item Sales Report --> */}
              <li>
                <Link
                  href="/admin/expenses"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/expenses") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <GiMoneyStack className="fill-current h-5 w-5" />
                  Expenses Report
                </Link>
              </li>
              {/* <!-- Menu Item Sales Report --> */}
            </ul>
          </div>
          {/* <!-- Expenses Group --> */}

          {/* <!-- Product Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              PRODUCT
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Add Product --> */}
              <li>
                <Link
                  href="/admin/product"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/product") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiProductHuntLine className="fill-current h-5 w-5" />
                  Add Product
                </Link>
              </li>
              {/* <!-- Menu Item Add Product --> */}
              {/* <!-- Menu Item Add Category --> */}
              <li>
                <Link
                  href="/admin/category"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/category") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineCategory className="fill-current h-5 w-5" />
                  Add Category
                </Link>
              </li>
              {/* <!-- Menu Item Add Category --> */}
            </ul>
          </div>
          {/* <!-- Product Group --> */}

          {/* <!-- Stock Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              STOCK
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Add Stock --> */}
              <li>
                <Link
                  href="/admin/stock"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/stock") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BsBoxes className="fill-current h-5 w-5" />
                  Add Stock
                </Link>
              </li>
              {/* <!-- Menu Item Add Stock --> */}
              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/stocks" ||
                  pathname.includes("/admin/stocks")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/admin/stocks" ||
                            pathname.includes("/admin/stocks")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <AiOutlineStock className="fill-current h-5 w-5" />
                        Stock Reports
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/admin/stocks/balance"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/stocks/balance" &&
                                "text-white"
                              }`}
                            >
                              Stock Balance
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/stocks/soldout"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/stocks/soldout" &&
                                "text-white"
                              } `}
                            >
                              Sold Out
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/stocks/shipment"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/stocks/shipment" &&
                                "text-white"
                              } `}
                            >
                              In Shipment
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/stocks/spoilt"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/admin/stocks/spoilt" &&
                                "text-white"
                              } `}
                            >
                              Spoilt
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* <!-- Stock Group --> */}

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Manage Users --> */}
              <li>
                <Link
                  href="/admin/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/users") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaUsersGear className="fill-current h-5 w-5" />
                  Manage Users
                </Link>
              </li>
              {/* <!-- Manage Users --> */}
              {/* <!-- Customer Item Chart --> */}
              <li>
                <Link
                  href="/admin/customer"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/customer") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaPersonCirclePlus className="fill-current h-5 w-5" />
                  Add Customer
                </Link>
              </li>
              {/* <!-- Customer Item Chart --> */}
              {/* <!-- Settings Item Chart --> */}
              <li>
                <Link
                  href="/admin/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <CiSettings className="fill-current h-5 w-5" />
                  Settings
                </Link>
              </li>
              {/* <!-- Settings Item Chart --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
