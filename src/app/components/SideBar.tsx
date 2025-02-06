"use client";
import Link from "next/link";
import React from "react";
import {
  FaBox,
  FaShoppingCart,
  FaChartLine,
  FaFileAlt,
  FaSignOutAlt,  // Logout icon
} from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const SideBar = () => {

  return (
    <div className="">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col md:fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-700 text-white p-5 transition-all duration-300 font-sans">
        {/* Sidebar Header */}
        <div className="mb-6 pt-10 text-center">
          <h2 className="text-[28px] text-blue-500">Asra`s Furniture</h2>
        </div>

        {/* Sidebar Links */}
        <ul className="list-none p-0">
          <li className="mb-4">
            <Link href="/dashboard">
              <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                <FaChartLine className="mr-3" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <li className="mb-4">
            <Link href="/product">
              <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                <FaBox className="mr-3" />
                <span>Products</span>
              </div>
            </Link>
          </li>

          <li className="mb-4">
            <Link href="/order">
              <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                <FaShoppingCart className="mr-3" />
                <span>Orders</span>
              </div>
            </Link>
          </li>

          <li className="mb-4">
            <Link href="/chart">
              <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                <FaFileAlt className="mr-3" />
                <span>Chart</span>
              </div>
            </Link>
          </li>

          <li className="mb-4">
                <Link href="/login">
                <button
                  className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all w-full"
                >
                  <FaSignOutAlt className="mr-3" />
                  <span>Logout</span>
                </button>
                </Link>
              </li>
        </ul>
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger className="md:hidden bg-gradient-to-t from-gray-200 to-gray-50 w-full flex items-center justify-between px-5 py-3 mt-4">
          <Menu className="text-blue-900" size={24} />
          <h1 className="text-blue-500 text-[26px]">Asra`s Furniture</h1>
        </SheetTrigger>

        <SheetContent className="p-4 bg-gray-800 text-white">
          <div className="flex flex-col h-full pt-10">
            {/* Sidebar Links */}
            <ul className="list-none p-0">
              <li className="mb-4">
                <Link href="/dashboard">
                  <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                    <FaChartLine className="mr-3" />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </li>

              <li className="mb-4">
                <Link href="/product">
                  <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                    <FaBox className="mr-3" />
                    <span>Products</span>
                  </div>
                </Link>
              </li>

              <li className="mb-4">
                <Link href="/order">
                  <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                    <FaShoppingCart className="mr-3" />
                    <span>Orders</span>
                  </div>
                </Link>
              </li>

              <li className="mb-4">
                <Link href="/chart">
                  <div className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all">
                    <FaFileAlt className="mr-3" />
                    <span>Chart</span>
                  </div>
                </Link>
              </li>

              {/* Logout Button */}
              <li className="mb-4">
                <Link href="/login">
                <button
                  className="flex items-center text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500 transition-all w-full"
                >
                  <FaSignOutAlt className="mr-3" />
                  <span>Logout</span>
                </button>
                </Link>
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideBar;
